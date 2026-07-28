import Nav from "@/components/Nav";
import AnnouncementModal from "@/components/AnnouncementModal";
import Hero from "@/components/Hero";
import CallForExperts from "@/components/CallForExperts";
import ProjectTracker from "@/components/ProjectTracker";
import LamjungMap from "@/components/LamjungMap";
import Videos from "@/components/Videos";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <CallForExperts />
      <ProjectTracker />
      <LamjungMap />
      <Videos />
      <Footer />
      <AnnouncementModal />
    </>
  );
}
