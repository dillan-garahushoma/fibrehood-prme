import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FlowModal } from "./FlowModal";
import { FlowFooter } from "./FlowButtons";
import { FlowError } from "./FlowField";
import { StepPlan } from "./StepPlan";
import { StepInstallation } from "./StepInstallation";
import { StepContact } from "./StepContact";
import { StepReview } from "./StepReview";
import { FlowDone } from "./FlowDone";
import { getPlan, plansBySegment } from "@/data/plans";
import { DEPLOYMENT_STATUS, LEAD_INTENT, RESOLUTION } from "@/data/coverageStatus";
import { submitLead, coverageContext, makeReference } from "@/lib/leads";
import { WA_INTENTS } from "@/data/site";
import { LocationPanel } from "@/components/coverage/LocationPanel";
import { resolveCoverage } from "@/lib/coverageService";

const EMPTY_INSTALL = {
  locationType: "home",
  streetNumber: "10",
  streetName: "Mbovu Road",
  customName: "",
  orderType: "new",
  phone: "",
  altPhone: "",
  notes: ""
};

const EMPTY_ACCOUNT = { firstName: "", lastName: "", email: "" };

const LABELS = { plan: "Package", install: "Installation", contact: "Contact", review: "Review" };
const TITLES = {
  plan: "Choose your package",
  install: "Fibre installation",
  contact: "Your contact details",
  review: "Review & confirm"
};

const STEPS = ["plan", "install", "contact", "review"];

/**
 * Guided connection journey for a LIVE location: package → installation →
 * contact → review, ending in a saved installation request via /api/lead.
 */
export function SignupFlow({ open, location, initialPlanId, onClose }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [segment, setSegment] = useState("home");
  const [planId, setPlanId] = useState("smart-home-connect");
  const [install, setInstall] = useState(EMPTY_INSTALL);
  const [account, setAccount] = useState(EMPTY_ACCOUNT);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);
  const [flowLocation, setFlowLocation] = useState(location);
  const [addressPickerOpen, setAddressPickerOpen] = useState(!location);
  const [addressError, setAddressError] = useState("");

  const current = STEPS[Math.min(index, STEPS.length - 1)];

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    const initialPlan = getPlan(initialPlanId);
    if (initialPlan) {
      setSegment(initialPlan.segment);
      setPlanId(initialPlan.id);
    }
    setInstall(EMPTY_INSTALL);
    setAccount(EMPTY_ACCOUNT);
    setConsent(false);
    setError("");
    setDone(null);
    setFlowLocation(location || null);
    setAddressPickerOpen(!location);
    setAddressError("");
  }, [open, initialPlanId, location]);

  const dirty = !done && (index > 0 || install.streetName || account.email);

  const requestClose = () => {
    if (dirty && !window.confirm("Close this signup? The details you've entered won't be saved.")) return;
    onClose?.();
  };

  const goBack = () => {
    setError("");
    setIndex((i) => Math.max(0, i - 1));
  };

  const advance = () => {
    setError("");
    setIndex((i) => i + 1);
  };

  const handleSegmentChange = (newSeg) => {
    setSegment(newSeg);
    const segPlans = plansBySegment(newSeg);
    const curPlan = getPlan(planId);
    if (!curPlan || curPlan.segment !== newSeg) {
      const preferred = segPlans.find((p) => p.popular) || segPlans[0];
      if (preferred) setPlanId(preferred.id);
    }
  };

  const validateInstall = () => {
    if (!install.locationType) return "Please select the type of property.";
    if (!install.streetNumber.trim() || !install.streetName.trim()) return "Please enter the street number and name.";
    if (!install.orderType) return "Please select whether this is a new installation or a migration.";
    if (install.phone.trim().length < 6) return "Please enter a contact number for the installation.";
    return "";
  };

  const validateContact = () => {
    if (!account.firstName.trim() || !account.lastName.trim()) return "Please enter your first and last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email.trim())) return "Please enter a valid email address.";
    return "";
  };

  const submit = async () => {
    if (!consent) return setError("Please confirm you're happy for us to contact you about this installation.");
    setBusy(true);
    setError("");
    const reference = makeReference();
    const plan = getPlan(planId);
    try {
      await submitLead({
        ...coverageContext(flowLocation),
        name: `${account.firstName} ${account.lastName}`.trim() || "FibreHood customer",
        phone: install.phone.trim(),
        alt_phone: install.altPhone.trim(),
        email: account.email.trim(),
        segment,
        intent: LEAD_INTENT.INSTALL_REQUEST,
        reference,
        selected_plan: planId,
        order_type: install.orderType,
        location_type: install.locationType,
        street_number: install.streetNumber.trim(),
        street_name: install.streetName.trim(),
        custom_address_name: install.customName.trim(),
        message: install.notes.trim(),
        source: "coverage",
        consent: true
      });
      setDone({ reference, planName: plan?.name });
    } catch (err) {
      setError(err?.message || "We couldn't submit your request. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onNext = () => {
    if (current === "plan") {
      if (!planId) return setError("Please choose a package to continue.");
      return advance();
    }
    if (current === "install") {
      if (addressPickerOpen || !flowLocation) {
        return setError("Please check and select a live installation address to continue.");
      }
      const problem = validateInstall();
      if (problem) return setError(problem);
      return advance();
    }
    if (current === "contact") {
      const problem = validateContact();
      if (problem) return setError(problem);
      return advance();
    }
    return submit();
  };

  const nextLabel = current === "review" ? "Submit installation request" : "Continue";

  const handleAddressResolve = (input) => {
    const checked = resolveCoverage(input);
    if (checked.status !== DEPLOYMENT_STATUS.LIVE || checked.resolution === RESOLUTION.NEARBY) {
      setAddressError("This address is not currently live for FibreHood. Please check another address.");
      return;
    }
    setFlowLocation(checked);
    setAddressError("");
    setAddressPickerOpen(false);
  };

  const footer = done ? null : (
    <FlowFooter
      onBack={index > 0 ? goBack : undefined}
      onNext={onNext}
      nextLabel={nextLabel}
      busy={busy}
      tone={current === "review" ? "loop" : "signal"}
      note="Your details are only used to arrange your connection."
    />
  );

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      };

  return (
    <FlowModal
      open={open}
      title={done ? "You're all set" : TITLES[current]}
      steps={done ? [] : STEPS.map((s) => LABELS[s])}
      current={index}
      onClose={requestClose}
      footer={footer}
    >
      <FlowError>{error}</FlowError>

      {done ? (
        <FlowDone
          title="Installation request received"
          body={`Your ${done.planName} connection request for ${flowLocation?.label} is with our provisioning team. We'll be in touch on ${install.phone} to confirm your installation window.`}
          reference={done.reference}
          next={[
            "Our team reviews your line location and confirms serviceability.",
            "We contact you to agree an installation date and time.",
            "A FibreHood technician installs and activates your line."
          ]}
          onClose={onClose}
          waHref={WA_INTENTS.coverage(flowLocation?.label || "")}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={current} {...motionProps}>
            {current === "plan" && (
              <StepPlan segment={segment} onSegmentChange={handleSegmentChange} planId={planId} onPlanChange={setPlanId} />
            )}
            {current === "install" && (
              addressPickerOpen ? (
                <div>
                  <h1 className="ff-serif text-3xl sm:text-[2.2rem] leading-[1.1] text-[#031630] font-semibold tracking-tight">
                    Check your installation address
                  </h1>
                  <p className="text-stone-700 mt-3 text-[15px] leading-relaxed max-w-md">
                    Search for the address where you want FibreHood installed.
                  </p>
                  <div className="mt-8">
                    <LocationPanel onResolve={handleAddressResolve} />
                    {addressError && <p className="mt-3 text-sm text-red-700">{addressError}</p>}
                  </div>
                </div>
              ) : (
                <StepInstallation
                  install={install}
                  onChange={setInstall}
                  location={flowLocation}
                  onChangeAddress={() => {
                    setAddressError("");
                    setAddressPickerOpen(true);
                  }}
                />
              )
            )}
            {current === "contact" && <StepContact account={account} onChange={setAccount} />}
            {current === "review" && (
              <StepReview
                data={{ planId, install, account }}
                location={flowLocation}
                consent={consent}
                onConsentChange={setConsent}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </FlowModal>
  );
}

export default SignupFlow;