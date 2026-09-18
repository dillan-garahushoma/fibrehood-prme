import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellRing,
  Check,
  Eye,
  EyeOff,
  Hash,
  KeyRound,
  Laptop,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Monitor,
  Pencil,
  Phone,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from "lucide-react";
import { usePortal } from "../PortalContext";
import { CUSTOMER } from "../data";
import { Button, Card, CardHeader, DetailRow, Field, IconBox, Pill, Switch, inputClass } from "../ui";
import { cn } from "@/lib/utils";

function ProfileCard() {
  const { notify } = usePortal();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: CUSTOMER.fullName,
    email: CUSTOMER.email,
    phone: CUSTOMER.phone,
    address: CUSTOMER.serviceAddress,
  });

  const save = () => {
    setEditing(false);
    notify({ type: "success", title: "Profile updated", description: "Your account details were saved." });
  };

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-signal text-lg font-bold text-paper">
            {CUSTOMER.initials}
          </span>
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">{CUSTOMER.fullName}</h2>
            <p className="text-sm text-muted-foreground">Customer since {CUSTOMER.memberSince}</p>
          </div>
        </div>
        {!editing && (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(inputClass, "pl-10")} value={form.name} disabled={!editing} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </Field>
        <Field label="Phone">
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(inputClass, "pl-10")} value={form.phone} disabled={!editing} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </Field>
        <Field label="Email" className="sm:col-span-2">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(inputClass, "pl-10")} value={form.email} disabled={!editing} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </Field>
        <Field label="Service address" hint="Where your fibre line is installed." className="sm:col-span-2">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 -translate-y-0 text-muted-foreground" />
            <input className={cn(inputClass, "pl-10")} value={form.address} disabled={!editing} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
        </Field>
      </div>

      {editing && (
        <div className="mt-5 flex justify-end gap-2 border-t border-border pt-5">
          <Button variant="outline" size="sm" onClick={() => { setEditing(false); setForm({ name: CUSTOMER.fullName, email: CUSTOMER.email, phone: CUSTOMER.phone, address: CUSTOMER.serviceAddress }); }}>
            <X className="h-3.5 w-3.5" /> Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={save}>
            <Check className="h-3.5 w-3.5" /> Save changes
          </Button>
        </div>
      )}
    </Card>
  );
}

function SecurityCard() {
  const { notify } = usePortal();
  const [twoFactor, setTwoFactor] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const changePassword = () => {
    if (!pass.current) {
      setError("Enter your current password.");
      return;
    }
    if (pass.next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (pass.next !== pass.confirm) {
      setError("New passwords don't match.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setPass({ current: "", next: "", confirm: "" });
      notify({ type: "success", title: "Password updated", description: "Use your new password next time you sign in." });
    }, 1100);
  };

  return (
    <Card className="p-5 sm:p-6">
      <CardHeader eyebrow="Security" title="Password & sign-in" icon={<KeyRound className="h-4 w-4" />} />

      <div className="mt-5 space-y-4">
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPass ? "text" : "password"}
            className={cn(inputClass, "pl-10 pr-11")}
            placeholder="Current password"
            value={pass.current}
            onChange={(e) => setPass({ ...pass, current: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="password" className={inputClass} placeholder="New password" value={pass.next} onChange={(e) => setPass({ ...pass, next: e.target.value })} />
          <input type="password" className={inputClass} placeholder="Confirm new password" value={pass.confirm} onChange={(e) => setPass({ ...pass, confirm: e.target.value })} />
        </div>
        {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex justify-end">
          <Button variant="navy" size="sm" onClick={changePassword} disabled={saving}>
            {saving ? "Updating…" : "Update password"}
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-border pt-5">
        <Switch
          checked={twoFactor}
          onChange={(v) => { setTwoFactor(v); notify({ type: "success", title: v ? "Two-step verification on" : "Two-step verification off", description: v ? "We'll ask for a code when you sign in." : "Your account now signs in with a password only." }); }}
          label="Two-step verification"
          description="Extra security via an authenticator code on sign-in."
        />
      </div>
    </Card>
  );
}

function AccountRefCard() {
  return (
    <Card className="p-5 sm:p-6">
      <CardHeader eyebrow="Account" title="Account reference" icon={<Hash className="h-4 w-4" />} />
      <div className="mt-4 divide-y divide-border">
        <DetailRow label="Account number" value={CUSTOMER.accountNumber} mono />
        <DetailRow label="Customer ID" value={CUSTOMER.customerId} mono />
        <DetailRow label="Member since" value={CUSTOMER.memberSince} />
        <DetailRow label="Service since" value={CUSTOMER.serviceSince} />
        <DetailRow label="Service address" value={CUSTOMER.serviceAddress} />
      </div>
      <p className="mt-4 rounded-xl bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        Quote your account number when contacting Fibrehood so we can find you faster.
      </p>
    </Card>
  );
}

function CommunicationCard() {
  const { notify } = usePortal();
  const [prefs, setPrefs] = useState(CUSTOMER.communication);
  const toggle = (key, value) => {
    setPrefs((p) => ({ ...p, [key]: value }));
    notify({ type: "info", title: "Preferences saved", description: "Your communication preferences were updated." });
  };
  return (
    <Card className="p-5 sm:p-6">
      <CardHeader eyebrow="Communication" title="How we reach you" icon={<BellRing className="h-4 w-4" />} />
      <div className="mt-4 space-y-2.5">
        <Switch checked={prefs.email} onChange={(v) => toggle("email", v)} label="Email updates" description="Bills, receipts and service notices." />
        <Switch checked={prefs.sms} onChange={(v) => toggle("sms", v)} label="SMS alerts" description="Outage and payment reminders." />
        <Switch checked={prefs.whatsapp} onChange={(v) => toggle("whatsapp", v)} label="WhatsApp" description="Support chat and quick updates." />
        <Switch checked={prefs.marketing} onChange={(v) => toggle("marketing", v)} label="Product news" description="Occasional offers and new area launches." />
      </div>
    </Card>
  );
}

function SessionsCard() {
  const { notify } = usePortal();
  const sessions = [
    { id: 1, device: "This browser · Chrome on macOS", location: "Harare, ZW", current: true, icon: Monitor },
    { id: 2, device: "iPhone 15 · Fibrehood app", location: "Harare, ZW", current: false, icon: Smartphone },
    { id: 3, device: "Living room TV · Fibrehood TV", location: "Harare, ZW", current: false, icon: Laptop },
  ];
  return (
    <Card className="p-5 sm:p-6">
      <CardHeader eyebrow="Devices" title="Active sessions" icon={<ShieldCheck className="h-4 w-4" />} />
      <ul className="mt-4 divide-y divide-border">
        {sessions.map((s) => {
          const Icon = s.icon;
          return (
            <li key={s.id} className="flex items-center gap-3.5 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{s.device}</p>
                <p className="text-xs text-muted-foreground">{s.location}</p>
              </div>
              {s.current ? (
                <Pill tone="green" dot="green">This device</Pill>
              ) : (
                <button
                  onClick={() => notify({ type: "info", title: "Session ended", description: `${s.device} was signed out.` })}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Sign out
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default function Account() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">Account</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Your personal details, security and how Fibrehood gets in touch.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <ProfileCard />
          <SecurityCard />
        </div>
        <div className="space-y-4">
          <AccountRefCard />
          <CommunicationCard />
          <SessionsCard />
        </div>
      </div>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <IconBox tone="neutral">
            <LogOut className="h-5 w-5" />
          </IconBox>
          <div>
            <p className="text-sm font-semibold text-foreground">Sign out of the portal</p>
            <p className="text-xs text-muted-foreground">You'll return to the Fibrehood website.</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </Card>
    </div>
  );
}
