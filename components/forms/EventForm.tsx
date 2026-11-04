"use client";

import { Button, Label, ListBox, Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { toLocalInput } from "@/lib/format";
import { errorMessage, privateFetch } from "@/lib/private-fetch";
import type { EventItem } from "@/lib/types";
import { EVENT_TYPES, type FieldErrors, eventFormSchema, fieldErrors } from "@/lib/validators";
import { Field } from "./Field";

interface EventFormProps {
  /** With an event, the form updates it. Without one, it creates a new event. */
  event?: EventItem;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [values, setValues] = useState({
    title: event?.title ?? "",
    description: event?.description ?? "",
    eventType: event?.eventType ?? "",
    thumbnail: event?.thumbnail ?? "",
    location: event?.location ?? "",
    eventDate: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [minDate, setMinDate] = useState<string>();

  // Both depend on the viewer's clock and time zone, so they are set after mount.
  useEffect(() => {
    setMinDate(toLocalInput(new Date()));
    if (event) {
      setValues((current) => ({ ...current, eventDate: toLocalInput(new Date(event.eventDate)) }));
    }
  }, [event]);

  const set = (key: keyof typeof values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    const parsed = eventFormSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      toast.error("Check the highlighted fields");
      return;
    }

    setPending(true);
    try {
      const response = await privateFetch(event ? `/events/${event._id}` : "/events", {
        method: event ? "PATCH" : "POST",
        body: JSON.stringify({
          ...parsed.data,
          eventDate: new Date(parsed.data.eventDate).toISOString(),
        }),
      });
      if (!response.ok) {
        toast.error(await errorMessage(response, "The event could not be saved. Try again"));
        return;
      }
      toast.success(event ? "Event updated" : "Event created");
      router.push(event ? "/manage-events" : "/events");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The event could not be saved. Try again");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="event-form" noValidate onSubmit={handleSubmit}>
      <Field error={errors.title} label="Title" name="title" onChange={set("title")} placeholder="Canal cleanup before the rains" value={values.title} />
      <Field
        error={errors.description}
        label="Description"
        multiline
        name="description"
        onChange={set("description")}
        placeholder="What will people do, and what should they bring?"
        value={values.description}
      />
      <div className="form-row">
        <div className="field">
          <Select
            aria-label="Event type"
            className="field"
            isInvalid={Boolean(errors.eventType)}
            onChange={(key) => set("eventType")(String(key ?? ""))}
            placeholder="Choose a type"
            value={values.eventType || null}
          >
            <Label className="field-label">Event type</Label>
            <Select.Trigger className="field-input select-trigger">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {EVENT_TYPES.map((type) => (
                  <ListBox.Item id={type} key={type} textValue={type}>
                    {type}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {errors.eventType && (
            <p className="field-error" role="alert">
              {errors.eventType}
            </p>
          )}
        </div>
        <Field
          error={errors.eventDate}
          label="Event date and time"
          min={minDate}
          name="eventDate"
          onChange={set("eventDate")}
          type="datetime-local"
          value={values.eventDate}
        />
      </div>
      <Field error={errors.location} label="Location" name="location" onChange={set("location")} placeholder="Mirpur 10, Dhaka" value={values.location} />
      <Field error={errors.thumbnail} label="Thumbnail image URL" name="thumbnail" onChange={set("thumbnail")} placeholder="https://..." type="url" value={values.thumbnail} />
      <div className="form-actions">
        <Button className="btn btn-primary" isPending={pending} type="submit">
          {event ? "Update event" : "Create event"}
        </Button>
      </div>
    </form>
  );
}
