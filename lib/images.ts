/** Free photos from Unsplash, listed by photographer in the README. */
const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

export const HERO_SLIDES = [
  { src: unsplash("1593113616828-6f22bca04804", 1600), alt: "Volunteers in blue shirts packing food into bags", caption: "Packing meals for neighbours" },
  { src: unsplash("1598335624134-5bceb5de202d", 1600), alt: "A woman and a child planting a small tree", caption: "Planting the next generation of shade" },
  { src: unsplash("1758599668429-121d54188b9c", 1600), alt: "Volunteers cleaning a park with blue trash bags", caption: "Clearing a park together" },
  { src: unsplash("1488521787991-ed7bbaae773c", 1600), alt: "Five children smiling and making peace signs", caption: "Children at the heart of the work" },
];

export const ABOUT_IMAGE = {
  src: unsplash("1542810634-71277d95dcbb"),
  alt: "A group of children sitting on the ground together",
};

export const PROMISE_IMAGE = {
  src: unsplash("1599059813005-11265ba4b4ce"),
  alt: "Volunteers sorting canned food donations",
};

export const GALLERY = [
  { src: unsplash("1783028104792-8506735c0383", 800), alt: "Volunteers organising items under a blue tent", caption: "Relief tent" },
  { src: unsplash("1577071309899-d44b2b1b7b5b", 800), alt: "People planting together outdoors", caption: "Planting day" },
  { src: unsplash("1628717341663-0007b0ee2597", 800), alt: "Two women in masks and gloves packing paper bags", caption: "Food parcels" },
  { src: unsplash("1593113598332-cd288d649433", 800), alt: "Three people loading boxes onto a truck", caption: "Loading donations" },
  { src: unsplash("1509062522246-3755977927d7", 800), alt: "A teacher presenting to students in a classroom", caption: "Free classes" },
  { src: unsplash("1652971876875-05db98fab376", 800), alt: "A group of people standing next to a river", caption: "River care" },
  { src: unsplash("1559027615-cd4628902d4a", 800), alt: "A volunteer in a red shirt", caption: "Ready to help" },
  { src: unsplash("1551791506-57d68c0c6882", 800), alt: "People farming on a field in daylight", caption: "Field work" },
];
