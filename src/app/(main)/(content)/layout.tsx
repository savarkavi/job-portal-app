import RecruiterSidebar from "@/components/general/recruiter-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <RecruiterSidebar />
      {children}
    </SidebarProvider>
  );
}
