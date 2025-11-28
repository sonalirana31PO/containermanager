import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/App";
import {
  Package,
  FileText,
  DollarSign,
  Truck,
  Users,
  Settings,
  LayoutDashboard,
  Navigation,
  Bell,
  LogOut,
  Search,
  ChevronDown,
  Sparkles,
  Building2,
  UserCircle,
  ArrowLeftRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AppShellProps {
  onLogout: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/containers", label: "Track & Trace", icon: Navigation },
  { path: "/shipments", label: "Shipments", icon: Package },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/invoices", label: "Billing", icon: DollarSign },
  { path: "/fleet", label: "Fleet", icon: Truck, adminOnly: true },
  { path: "/customers", label: "Customers", icon: Users, adminOnly: true },
  { path: "/settings", label: "Settings", icon: Settings, adminOnly: true },
];

export function AppShell({ onLogout }: AppShellProps) {
  const { userRole, setUserRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || userRole === "admin"
  );

  const currentPageLabel =
    filteredNavItems.find((item) => location.pathname.startsWith(item.path))
      ?.label || "Dashboard";

  const handleRoleSwitch = (newRole: "customer" | "admin") => {
    if (newRole === userRole) return;

    setUserRole(newRole);

    // If switching from admin to customer and on an admin-only page, redirect to dashboard
    if (newRole === "customer") {
      const adminPaths = ["/fleet", "/customers", "/settings"];
      if (adminPaths.some((path) => location.pathname.startsWith(path))) {
        navigate("/dashboard");
      }
    }
  };

  const isAdmin = userRole === "admin";

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-stone-200 bg-white">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-stone-100 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 shadow-md shadow-teal-500/20">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-stone-900">
              DoKaSch
            </span>
            <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400">
              Logistics
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="p-4">
          <button className="flex w-full items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-400 transition-colors hover:border-teal-300 hover:bg-white">
            <Search className="h-4 w-4" />
            <span>Quick search...</span>
            <kbd className="ml-auto rounded bg-stone-200 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
              Menu
            </p>
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                      isActive ? "text-white" : "text-stone-400 group-hover:text-teal-500"
                    )}
                  />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </ScrollArea>

        {/* Pro Upgrade Banner */}
        <div className="mx-3 mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 to-stone-800 p-4">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold">Upgrade to Pro</span>
          </div>
          <p className="mt-1 text-xs text-stone-400">
            Get advanced analytics & priority support
          </p>
          <button className="mt-3 w-full rounded-lg bg-white/10 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20">
            Learn More
          </button>
        </div>

        {/* User Section with Role Toggle */}
        <div className="border-t border-stone-100 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-stone-50">
                <div className="relative">
                  <Avatar className="h-9 w-9 ring-2 ring-stone-100">
                    <AvatarFallback
                      className={cn(
                        "text-sm font-semibold text-white transition-colors",
                        isAdmin
                          ? "bg-gradient-to-br from-violet-500 to-purple-600"
                          : "bg-gradient-to-br from-teal-400 to-teal-600"
                      )}
                    >
                      {isAdmin ? "A" : "C"}
                    </AvatarFallback>
                  </Avatar>
                  {/* Role indicator dot */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white",
                      isAdmin ? "bg-violet-500" : "bg-teal-500"
                    )}
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-stone-900">
                      {isAdmin ? "Admin User" : "Customer User"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isAdmin ? (
                      <UserCircle className="h-3 w-3 text-violet-500" />
                    ) : (
                      <Building2 className="h-3 w-3 text-teal-500" />
                    )}
                    <p className="truncate text-xs text-stone-500">
                      {isAdmin ? "Staff Access" : "Client Portal"}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-stone-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-64 mb-2">
              <DropdownMenuLabel className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4 text-stone-400" />
                Switch View
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Client View Option */}
              <DropdownMenuItem
                onClick={() => handleRoleSwitch("customer")}
                className={cn(
                  "flex items-center gap-3 py-3 cursor-pointer",
                  !isAdmin && "bg-teal-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    !isAdmin
                      ? "bg-teal-500 text-white"
                      : "bg-stone-100 text-stone-500"
                  )}
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">Client Portal</p>
                  <p className="text-xs text-stone-500">View as customer</p>
                </div>
                {!isAdmin && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </DropdownMenuItem>

              {/* Staff View Option */}
              <DropdownMenuItem
                onClick={() => handleRoleSwitch("admin")}
                className={cn(
                  "flex items-center gap-3 py-3 cursor-pointer",
                  isAdmin && "bg-violet-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    isAdmin
                      ? "bg-violet-500 text-white"
                      : "bg-stone-100 text-stone-500"
                  )}
                >
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">Staff Access</p>
                  <p className="text-xs text-stone-500">Full admin controls</p>
                </div>
                {isAdmin && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="py-2 text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200 bg-white/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              {currentPageLabel}
            </h1>
            <Badge
              variant="outline"
              className="border-teal-200 bg-teal-50 text-teal-700"
            >
              Live
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Indicator Badge */}
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-3 py-1 transition-colors",
                isAdmin
                  ? "border-violet-200 bg-violet-50 text-violet-700"
                  : "border-teal-200 bg-teal-50 text-teal-700"
              )}
            >
              {isAdmin ? (
                <>
                  <UserCircle className="h-3.5 w-3.5" />
                  Staff View
                </>
              ) : (
                <>
                  <Building2 className="h-3.5 w-3.5" />
                  Client View
                </>
              )}
            </Badge>

            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Bell className="h-5 w-5 text-stone-600" />
                  <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary" className="text-xs">
                    3 new
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-medium">Critical Alert</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    OC-2404: Temperature exceeded threshold
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="font-medium">Warning Alert</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    OC-2401: Battery level low (45%)
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-medium">Critical Alert</span>
                  </div>
                  <span className="text-xs text-stone-500">
                    OC-2404: Battery level critical (23%)
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center py-2 font-medium text-teal-600">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
