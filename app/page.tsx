import Nav from "@/components/Nav";
import AnnouncementModal from "@/components/AnnouncementModal";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import Priorities from "@/components/Priorities";
import CallForExperts from "@/components/CallForExperts";
import ProjectTracker from "@/components/ProjectTracker";
import LamjungMap from "@/components/LamjungMap";
import Videos from "@/components/Videos";
import News from "@/components/News";
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
      <Videos />
      <News />
      <Events />
      <Footer />
      <AnnouncementModal />
    </>
  );
}
