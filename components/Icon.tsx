"use client";

import {
  Sprout, Mountain, Zap, Route, Droplet, ArrowRight, ArrowUpRight,
  Menu, Search, Check, X, Clock, MapPin, Mail, Phone, FileText,
  Mic, Users, Calendar, Building2, Globe, Sun, Moon,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  sprout: Sprout,
  mountain: Mountain,
  bolt: Zap,
  road: Route,
  drop: Droplet,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  menu: Menu,
  search: Search,
  check: Check,
  x: X,
  clock: Clock,
  pin: MapPin,
  mail: Mail,
  phone: Phone,
  doc: FileText,
  mic: Mic,
  users: Users,
  calendar: Calendar,
  building: Building2,
  globe: Globe,
  sun: Sun,
  moon: Moon,
};

export default function Icon({
  name,
  size = 18,
  strokeWidth = 1.6,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const Cmp = MAP[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} />;
}
