import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BsCalendar from "@/components/BsCalendar";

export const metadata: Metadata = {
  title: "Program calendar — Dharma Raj K.C., MP Lamjung 1",
  description:
    "Bikram Sambat calendar of Hon. Dharma Raj K.C.'s public engagements, field visits, and parliamentary schedule.",
};

export default function CalendarPage() {
  return (
    <>
      <Nav />
      <BsCalendar />
      <Footer />
    </>
  );
}
