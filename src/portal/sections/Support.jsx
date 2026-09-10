import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Clock3,
  Gauge,
  Headset,
  Loader2,
  MessageCircle,
  Receipt,
  Router,
  Send,
  Signal,
  Sparkles,
  WifiOff,
  Wrench,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import { SUPPORT_QUICK_ACTIONS, TICKETS } from "../data";
import { Button, Card, CardHeader, EmptyState, Field, Modal, StatusPill, inputClass } from "../ui";
import { cn } from "@/lib/utils";

const ACTION_ICONS = {
  down: WifiOff,
  slow: Gauge,
  wifi: Signal,
  router: Router,
  billing: Receipt,
  install: Wrench,
};

const ACTION_STEPS = {
  down: ["Check your router's power and fibre light.", "Run an instant line check for your area.", "Still down? We'll raise a ticket and keep you updated."],
  slow: ["Run a speed test on the device you're using.", "Move closer to your router or try a wired connection.", "If speeds stay low, we'll investigate your line."],
  wifi: ["Restart your router from the app.", "Check for interference — move the router to a central spot.", "Split your 2.4 GHz and 5 GHz networks."],
  router: ["We can restart your router remotely.", "Check for a pending firmware update.", "Book a replacement if hardware is faulty."],
  billing: ["View your latest invoice in Billing.", "Check for pro-rated or one-off charges.", "Dispute a charge and our team will review it."],
  install: ["View or reschedule an upcoming appointment.", "Track your technician on install day.", "Report an issue with a recent installation."],
};

function QuickActions({ onOpenTicket }) {
  const [expanded, setExpanded] = useState(null);
  const { notify } = usePortal();

  const runLineCheck = () => {
    notify({
      type: "success",
      title: "Line check complete",
      description: "No issues found on your connection right now.",
    });
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">Connection help</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Quick, guided fixes for the most common situations.</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SUPPORT_QUICK_ACTIONS.map((a) => {
          const Icon = ACTION_ICONS[a.id];
          const isOpen = expanded === a.id;
          return (
            <Card key={a.id} className={cn("transition-shadow hover:shadow-lift", isOpen && "border-loop/50")}>
              <button
                className="flex w-full items-start gap-3.5 p-5 text-left"
                onClick={() => setExpanded(isOpen ? null : a.id)}
                aria-expanded={isOpen}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal/[0.06] text-signal dark:bg-signal/20 dark:text-paper">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[15px] font-bold tracking-tight text-foreground">{a.title}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{a.body}</span>
                </span>
                <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              {isOpen && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <ol className="space-y-2.5">
                    {ACTION_STEPS[a.id].map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-loop/15 text-[11px] font-bold text-amber-700 dark:text-loop">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex gap-2">
                    {a.id === "slow" || a.id === "down" ? (
                      <Button variant="soft" size="sm" onClick={runLineCheck}>Run line check</Button>
                    ) : null}
                    <Button variant="outline" size="sm" onClick={() => onOpenTicket(a.title)}>
                      Open a ticket <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function NewTicketModal({ open, onClose, preset, onCreate }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("form"); // form | sending | done
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setSubject(preset || "");
      setMessage("");
      setState("form");
      setError("");
    }
  }, [open, preset]);

  const submit = () => {
    if (!subject.trim()) {
      setError("Please add a short subject.");
      return;
    }
    if (!message.trim()) {
      setError("Please describe the issue so we can help faster.");
      return;
    }
    setError("");
    setState("sending");
    setTimeout(() => {
      onCreate({ subject: subject.trim(), message: message.trim() });
      setState("done");
      setTimeout(onClose, 1200);
    }, 1100);
  };

  return (
    <Modal
      open={open}
      onClose={() => setState("form") || onClose()}
      title={state === "done" ? "Ticket created" : "Get help"}
      sub={state === "done" ? "We've logged it and will be in touch shortly." : "Tell us what's going on — we usually reply within a few hours."}
      footer={
        state === "form" ? (
          <>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={submit}>Submit ticket</Button>
          </>
        ) : undefined
      }
    >
      {state === "form" && (
        <div className="space-y-4">
          <Field label="Subject">
            <input
              className={inputClass}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Slow Wi-Fi in the study"
            />
          </Field>
          <Field label="How can we help?">
            <textarea
              className={cn(inputClass, "h-28 resize-none py-3")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe what you're seeing, when it started, and anything you've already tried…"
            />
          </Field>
          {error && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4" /> {error}
            </p>
          )}
        </div>
      )}
      {state === "sending" && (
        <div className="flex flex-col items-center gap-3 py-6">
          <Loader2 className="h-8 w-8 animate-spin text-loop" />
          <p className="text-sm text-muted-foreground">Opening your ticket…</p>
        </div>
      )}
      {state === "done" && (
        <div className="flex flex-col items-center gap-3 py-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-7 w-7" />
          </span>
          <p className="font-heading text-lg font-bold text-foreground">You're in the queue</p>
          <p className="text-center text-sm text-muted-foreground">Our team has been notified.</p>
        </div>
      )}
    </Modal>
  );
}

function Tickets({ tickets, onGetHelp }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <CardHeader eyebrow="Support tickets" title="Your requests" icon={<MessageCircle className="h-4 w-4" />} />
        <Button variant="primary" onClick={onGetHelp}>
          <Headset className="h-4 w-4" /> Get help
        </Button>
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon={<MessageCircle className="h-5 w-5" />}
          title="No tickets yet"
          body="When you contact support, your tickets and updates will appear here."
        />
      ) : (
        <ul className="divide-y divide-border">
          {tickets.map((t) => (
            <li key={t.id} className="flex flex-col gap-3 p-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{t.id}</span>
                  <StatusPill status={t.status} label={t.status === "open" ? "Open" : "Resolved"} />
                  {t.unread && <span className="h-2 w-2 rounded-full bg-loop" />}
                </div>
                <p className="mt-1.5 font-heading text-[15px] font-bold tracking-tight text-foreground">{t.subject}</p>
                <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{t.lastMessage}</p>
              </div>
              <div className="flex shrink-0 items-center gap-5 text-xs text-muted-foreground sm:flex-col sm:items-end sm:gap-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" /> Updated {t.updated}
                </span>
                <button className="font-semibold text-signal transition-colors hover:text-signal/80 dark:text-loop">View conversation</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

const BOT_REPLIES = [
  { match: /slow|speed/i, reply: "Got it — let's check that. Run a speed test from My Internet and tell me the download result. If it's under 24 Mbps, I can raise a line investigation for you." },
  { match: /down|not working|outage/i, reply: "Sorry to hear that. I've just checked your area — there's no active outage. Can you confirm the light on your router is solid green?" },
  { match: /bill|payment|invoice|charge/i, reply: "Happy to help with billing. Your next payment of US$65.00 is due 1 Oct 2026, and auto-pay is enabled. Want me to email your latest invoice?" },
  { match: /install|installation/i, reply: "For installations, I can check available slots and book you in. Would you like a weekday or weekend appointment?" },
  { match: /wifi|router/i, reply: "Wi-Fi trouble is usually a quick fix. I can restart your router remotely — just say the word, and I'll do it now." },
  { match: /hello|hi|hey/i, reply: "Hey Welly! How can I help with your FibreHood connection today?" },
];

const CHAT_SUGGESTIONS = ["My internet is slow", "I have a billing question", "Wi-Fi keeps dropping"];

function ChatWidget() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi Welly 👋 I'm FibreHood Assistant. Ask me about your connection, billing or installation — I'm here 24/7." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const respond = (text) => {
    const found = BOT_REPLIES.find((r) => r.match.test(text));
    return found ? found.reply : "Thanks — I've noted that. For anything urgent, open a ticket and a human from our local team will pick it up right away.";
  };

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) {
      setError("Please type a message first.");
      return;
    }
    setError("");
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: respond(text) }]);
    }, 1100 + Math.random() * 500);
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border p-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-loop text-signal">
          <Headset className="h-5 w-5" />
        </span>
        <div>
          <p className="font-heading text-[15px] font-bold tracking-tight text-foreground">FibreHood Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online · replies instantly
          </p>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4" style={{ height: 300 }}>
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-snug",
                m.from === "user"
                  ? "rounded-br-sm bg-signal text-paper"
                  : "rounded-bl-sm border border-border bg-muted/60 text-foreground"
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-muted/60 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {CHAT_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); if (error) setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className={cn(inputClass, "flex-1")}
            aria-label="Chat message"
          />
          <Button variant="primary" size="icon" className="h-11 w-11" onClick={() => send()} aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
      </div>
    </Card>
  );
}

export default function Support() {
  const [tickets, setTickets] = useState(TICKETS);
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState("");
  const { notify } = usePortal();

  const openTicket = (subject) => {
    setPreset(subject || "");
    setOpen(true);
  };

  const createTicket = ({ subject, message }) => {
    const ref = `SUP-${2841 + Math.floor(Math.random() * 900)}`;
    setTickets((prev) => [
      {
        id: ref,
        subject,
        status: "open",
        priority: "normal",
        created: "Just now",
        updated: "Just now",
        lastMessage: message,
        unread: false,
      },
      ...prev,
    ]);
    notify({ type: "success", title: "Support ticket created", description: `${ref} — we'll email you an update.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Support</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Self-service fixes, your tickets, and a team that actually knows your line.
          </p>
        </div>
        <Button variant="primary" onClick={() => openTicket("")}>
          <Headset className="h-4 w-4" /> Get help
        </Button>
      </div>

      <QuickActions onOpenTicket={openTicket} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <Tickets tickets={tickets} onGetHelp={() => openTicket("")} />
        </div>
        <div className="xl:col-span-2">
          <ChatWidget />
        </div>
      </div>

      <NewTicketModal open={open} onClose={() => setOpen(false)} preset={preset} onCreate={createTicket} />
    </div>
  );
}
