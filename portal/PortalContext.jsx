import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CURRENT_PLAN_ID, NOTIFICATIONS, PLANS } from "./data";

const PortalContext = createContext(null);

let toastId = 0;

export function PortalProvider({ children }) {
  // ── Theme (scoped to the portal subtree, never touches <html>) ────────────
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("fibrehood-portal-theme") || "light";
    } catch {
      return "light";
    }
  });
  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("fibrehood-portal-theme", next);
      } catch {}
      return next;
    });
  }, []);

  // ── Simulated app boot (loading state) ────────────────────────────────────
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t);
  }, []);

  // ── Toasts ────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);
  const notify = useCallback(
    ({ title, description, type = "info" }, duration = 4200) => {
      const id = ++toastId;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, type }]);
      timers.current[id] = setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast]
  );

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );
  const markRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  // ── Plan state ────────────────────────────────────────────────────────────
  const [currentPlanId, setCurrentPlanId] = useState(CURRENT_PLAN_ID);
  const currentPlan = useMemo(
    () => PLANS.find((p) => p.id === currentPlanId) || PLANS.find((p) => p.id === CURRENT_PLAN_ID),
    [currentPlanId]
  );
  const switchPlan = useCallback(
    (id) => {
      const plan = PLANS.find((p) => p.id === id);
      setCurrentPlanId(id);
      if (plan) {
        notify({
          type: "success",
          title: "Plan updated",
          description: `You're now on ${plan.name}. Your next bill will reflect the new price.`,
        });
      }
    },
    [notify]
  );

  // ── Billing state ─────────────────────────────────────────────────────────
  const [billPaid, setBillPaid] = useState(false);
  const payNow = useCallback(() => {
    setBillPaid(true);
    notify({
      type: "success",
      title: "Payment successful",
      description: "Your invoice for this cycle has been paid. A receipt was emailed to you.",
    });
  }, [notify]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      booted,
      toasts,
      dismissToast,
      notify,
      notifications,
      unreadCount,
      markRead,
      markAllRead,
      currentPlanId,
      currentPlan,
      switchPlan,
      billPaid,
      payNow,
    }),
    [theme, toggleTheme, booted, toasts, dismissToast, notify, notifications, unreadCount, markRead, markAllRead, currentPlanId, currentPlan, switchPlan, billPaid, payNow]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
