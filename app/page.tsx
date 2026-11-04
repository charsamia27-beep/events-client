import { About } from "@/components/home/About";
import { Banner } from "@/components/home/Banner";
import { Features } from "@/components/home/Features";
import { Promise as OurPromise } from "@/components/home/Promise";

export default function HomePage() {
  return (
    <>
      <Banner />
      <About />
      <Features />
      <OurPromise />
    </>
  );
}
