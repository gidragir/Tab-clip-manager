import "@/style/App.scss"
import { ModeToggle } from "@/components/theme/ModeToggle"
import { SidebarProvider } from "@/components/ui/sidebar.tsx"
import { Home, Keyboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar.tsx"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Hotkeys",
    url: "#",
    icon: Keyboard,
  },
]


export default function App() {
  return (
    <SidebarProvider className="h-20">
      <Sidebar collapsible="none">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tab clip manager</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
              <ModeToggle />
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
