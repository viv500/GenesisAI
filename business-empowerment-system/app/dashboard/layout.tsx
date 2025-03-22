"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  ChevronDown,
  DollarSign,
  Globe,
  HelpCircle,
  Home,
  LogOut,
  MenuIcon,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { title: "Business Plan", href: "/dashboard/plan", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { title: "AI Coach", href: "/dashboard/coach", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { title: "Market Insights", href: "/dashboard/market", icon: <Globe className="mr-2 h-4 w-4" /> },
    { title: "Financial Tools", href: "/dashboard/finance", icon: <DollarSign className="mr-2 h-4 w-4" /> },
    { title: "Community", href: "/dashboard/community", icon: <Users className="mr-2 h-4 w-4" /> },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
        <div className="p-4 flex items-center space-x-2">
          <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">B</div>
          <span className="font-semibold text-xl">BES</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="px-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <ul className="px-2 space-y-1">
            <li>
              <Link
                href="/dashboard/settings"
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/help"
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/dashboard/help") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-4 flex items-center space-x-2 border-b">
                  <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <span className="font-semibold text-xl">BES</span>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                  <ul className="px-2 space-y-1">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                            isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Separator className="my-4" />

                  <ul className="px-2 space-y-1">
                    <li>
                      <Link
                        href="/dashboard/settings"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          isActive("/dashboard/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/help"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                          isActive("/dashboard/help") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Link>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-4 lg:hidden">
              <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                B
              </div>
            </div>
          </div>

          <div className="flex items-center ml-auto">
            <Button variant="outline" size="icon" className="mr-2">
              <HelpCircle className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

