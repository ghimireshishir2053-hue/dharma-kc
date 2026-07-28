export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout allows all /admin/* routes to render
  return <>{children}</>;
}
