import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import Priorities from "@/components/Priorities";
import CallForExperts from "@/components/CallForExperts";
import ProjectTracker from "@/components/ProjectTracker";
import LamjungMap from "@/components/LamjungMap";
import Parliament from "@/components/Parliament";
import News from "@/components/News";
import Grievance from "@/components/Grievance";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Marquee />
      <Hero />
      <Priorities />
      <CallForExperts />
      <ProjectTracker />
      <LamjungMap />
      <Parliament />
      <News />
      <Grievance />
      <Events />
      <Footer />
    </>
  );
}
