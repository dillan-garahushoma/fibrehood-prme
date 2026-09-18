import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CheckCheck,
  ChevronRight,
  CircleUser,
  CreditCard,
  ExternalLink,
  Gauge,
  Info,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  Package,
  Settings,
  Sparkles,
  Sun,
  Wrench,
  X,
} from "lucide-react";
import { LoopMark } from "@/components/brand/LoopMark";
import { cn } from "@/lib/utils";
import { PortalProvider, usePortal } from "./PortalContext";
import { CUSTOMER } from "./data";
import { StatusDot } from "./ui";

export const NAV_ITEMS = [
  { to: "/portal/overview", key: "overview", label: "Overview", icon: LayoutDashboard },
  { to: "/portal/internet", key: "internet", label: "My Internet", icon: Gauge },
  { to: "/portal/plan", key: "plan", label: "My Plan", icon: Package },
  { to: "/portal/billing", key: "billing", label: "Billing", icon: CreditCard },
  { to: "/portal/support", key: "support", label: "Support", icon: LifeBuoy },
  { to: "/portal/account", key: "account", label: "Account", icon: CircleUser },
];

const NOTIF_ICON = {
  payment: CreditCard,
  maintenance: Wrench,
  service: CheckCheck,
  plan: Sparkles,
  support: LifeBuoy,
};

const NOTIF_TONE = {
  payment: "text-emerald-600 dark:text-emerald-400",
  maintenance: "text-amber-600 dark:text-loop",
  service: "text-sky-600 dark:text-sky-400",
  plan: "text-signal dark:text-paper",
  support: "text-violet-600 dark:text-violet-400",
};

function Brand() {
  return (
    <Link to="/portal/overview" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-loop text-signal">
        <LoopMark className="h-4 w-7" stroke={3.6} />
      </span>
      <span className="font-heading text-xl font-extrabold tracking-tighter text-paper">
        fibreh<span className="text-loop">oo</span>d
      </span>
    </Link>
  );
}

function Sidebar({ onNavigate }) {
  const { currentPlan } = usePortal();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[268px] flex-col border-r border-white/10 bg-signal text-paper lg:flex">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-16 top-24 h-64 w-64 rounded-full bg-loop/10 blur-[90px]" />
      <div className="relative flex h-full flex-col overflow-y-auto no-scrollbar">
        <div className="px-6 pb-6 pt-7">
          <Brand />
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">
            Client Portal
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.key}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-loop text-signal shadow-[0_4px_16px_-6px_rgba(255,204,0,0.55)]"
                      : "text-paper/65 hover:bg-white/5 hover:text-paper"
                  )
                }
              >
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.1} />
                {item.label}
                {item.key === "support" && (
                  <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-paper/15 text-[10px] font-bold text-paper">
                    1
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-3 px-4 pb-5 pt-4">
          {/* connection status */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center gap-2">
              <StatusDot tone="green" pulse />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">
                Connection
              </span>
            </div>
            <p className="mt-1.5 text-sm font-bold text-paper">Connected</p>
            <p className="mt-0.5 text-xs text-paper/50">{currentPlan.name}</p>
          </div>

          {/* profile */}
          <Link
            to="/portal/account"
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-colors hover:bg-white/10"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-loop text-sm font-bold text-signal">
              {CUSTOMER.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-paper">{CUSTOMER.fullName}</span>
              <span className="block truncate text-xs text-paper/50">#{CUSTOMER.accountNumber}</span>
            </span>
            <ChevronRight className="h-4 w-4 text-paper/40 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium text-paper/50 transition-colors hover:bg-white/5 hover:text-paper"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Back to Fibrehood website
          </Link>
        </div>
      </div>
    </aside>
  );
}

function NotificationsPanel({ open, onClose }) {
  const { notifications, unreadCount, markRead, markAllRead } = usePortal();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-signal/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col border-l border-border bg-card shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-signal transition-colors hover:bg-muted dark:text-loop"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              {notifications.length === 0 ? (
                <div className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                  You're all caught up.
                </div>
              ) : (
                <ul className="space-y-1">
                  {notifications.map((n) => {
                    const Icon = NOTIF_ICON[n.type] || Info;
                    return (
                      <li key={n.id}>
                        <button
                          onClick={() => markRead(n.id)}
                          className={cn(
                            "flex w-full items-start gap-3.5 rounded-xl px-3.5 py-3.5 text-left transition-colors hover:bg-muted/70",
                            n.unread && "bg-loop/[0.06] dark:bg-white/[0.04]"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted",
                              NOTIF_TONE[n.type]
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold text-foreground">{n.title}</span>
                              {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-loop" />}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                              {n.body}
                            </span>
                            <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                              {n.time}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileDrawer({ open, onClose }) {
  const { theme, toggleTheme } = usePortal();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-signal/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-[71] flex w-[290px] flex-col bg-signal text-paper lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-6">
              <Brand />
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg text-paper/70 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors",
                        isActive ? "bg-loop text-signal" : "text-paper/70 hover:bg-white/5 hover:text-paper"
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="space-y-2 border-t border-white/10 p-4">
              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-paper/80 hover:bg-white/5"
              >
                <span className="flex items-center gap-3">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </span>
              </button>
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-paper/70 hover:bg-white/5"
              >
                <ExternalLink className="h-5 w-5" />
                Back to Fibrehood website
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Topbar({ onMenu, onBell, onAccount, accountOpen }) {
  const { theme, toggleTheme, unreadCount } = usePortal();
  const location = useLocation();
  const active = NAV_ITEMS.find((n) => location.pathname.startsWith(n.to));

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-10">
        <button
          onClick={onMenu}
          className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden lg:block">
          <p className="text-xs font-medium text-muted-foreground">Fibrehood Client Portal</p>
          <p className="font-heading text-[15px] font-bold tracking-tight text-foreground">
            {active ? active.label : "Portal"}
          </p>
        </div>
        <div className="lg:hidden">
          <p className="font-heading text-[15px] font-bold tracking-tight text-foreground">
            {active ? active.label : "Portal"}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onBell}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-loop px-1 text-[10px] font-bold text-signal">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative ml-1">
            <button
              onClick={onAccount}
              className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-muted sm:pr-3"
              aria-haspopup="menu"
              aria-expanded={accountOpen}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-xs font-bold text-paper">
                {CUSTOMER.initials}
              </span>
              <span className="hidden text-sm font-semibold text-foreground md:block">
                {CUSTOMER.firstName}
              </span>
            </button>
            <AnimatePresence>
              {accountOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={onAccount} />
                  <motion.div
                    className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-lift"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                  >
                    <div className="border-b border-border px-3 py-2.5">
                      <p className="text-sm font-semibold text-foreground">{CUSTOMER.fullName}</p>
                      <p className="truncate text-xs text-muted-foreground">{CUSTOMER.email}</p>
                    </div>
                    <div className="p-1.5">
                      <MenuLink to="/portal/account" icon={Settings} label="Account settings" onClick={onAccount} />
                      <MenuLink to="/portal/billing" icon={CreditCard} label="Billing & payments" onClick={onAccount} />
                      <MenuLink to="/" icon={LogOut} label="Sign out" onClick={onAccount} />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      {label}
    </Link>
  );
}

function MobileNav() {
  const items = NAV_ITEMS.filter((n) => n.key !== "account");
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-5" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors",
                  isActive ? "text-signal dark:text-loop" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.3 : 1.9} />
                    {item.key === "support" && (
                      <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-loop ring-2 ring-card" />
                    )}
                  </span>
                  <span className="truncate">{item.label.split(" ")[0]}</span>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-nav-dot"
                      className="absolute -top-0 h-1 w-8 rounded-full bg-loop"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

const TOAST_ICON = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};
const TOAST_STYLE = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-signal dark:text-loop",
};

function Toaster() {
  const { toasts, dismissToast } = usePortal();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end lg:bottom-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = TOAST_ICON[t.type] || Info;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-lift"
            >
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", TOAST_STYLE[t.type])} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismissToast(t.id)}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function BootLoader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-signal text-paper">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="grid h-16 w-16 place-items-center rounded-3xl bg-loop text-signal">
          <LoopMark className="h-7 w-12 animate-draw-on" stroke={3.4} animated />
        </span>
        <div className="text-center">
          <p className="font-heading text-lg font-extrabold tracking-tight">Fibrehood</p>
          <p className="mt-1 text-sm text-paper/60">Checking your connection…</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-loop"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Shell() {
  const { theme, booted } = usePortal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    document.title = "Fibrehood Client Portal";
    return () => {
      document.title = "Fibrehood — Bridging the Access Gap";
    };
  }, []);

  return (
    <div className={cn("min-h-screen bg-background text-foreground", theme === "dark" && "dark")}>
      <AnimatePresence>{!booted && <BootLoader key="boot" />}</AnimatePresence>

      <Sidebar onNavigate={() => {}} />

      <div className="lg:pl-[268px]">
        <Topbar
          onMenu={() => setDrawerOpen(true)}
          onBell={() => setBellOpen((v) => !v)}
          onAccount={() => setAccountOpen((v) => !v)}
          accountOpen={accountOpen}
        />
        <main className="mx-auto w-full max-w-[1180px] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-9">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <NotificationsPanel open={bellOpen} onClose={() => setBellOpen(false)} />
      <Toaster />
    </div>
  );
}

export default function PortalLayout() {
  return (
    <PortalProvider>
      <Shell />
    </PortalProvider>
  );
}
