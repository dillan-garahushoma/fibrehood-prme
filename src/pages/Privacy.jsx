import React from "react";
import { LegalLayout, LegalSection } from "@/components/common/LegalLayout";
import { SITE } from "@/data/site";

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="August 2026"
      intro="How FibreHood collects, uses, and protects the information you share with us."
    >
      <LegalSection title="Overview">
        <p>{SITE.legal.entity} ("FibreHood", "we") respects your privacy. This policy explains what we collect through this website and how we use it. We aim to collect only what's necessary to check coverage, respond to enquiries, and provide service.</p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>When you check coverage or submit a contact request, you may provide:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Your name and phone number, used to respond to your request.</li>
          <li>An optional email and address, used to assess coverage and route your enquiry.</li>
          <li>A segment preference (home or business) and an optional message.</li>
          <li>Optional marketing context (such as referral source) if provided in the link you used.</li>
        </ul>
        <p>We do not request sensitive personal data through this site and you should not include it in messages.</p>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>We use the information you submit to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Respond to connection and coverage enquiries.</li>
          <li>Assess interest in future coverage areas.</li>
          <li>Provide and support the services you request.</li>
        </ul>
        <p>We do not sell your personal information. We share it only where necessary to provide service or where required by law.</p>
      </LegalSection>

      <LegalSection title="WhatsApp and third-party services">
        <p>Some actions open WhatsApp or other messaging services with a pre-filled message. Once you leave this site, the relevant provider's terms and privacy practices apply to that interaction.</p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>We retain enquiry information for as long as needed to respond to you and for reasonable record-keeping. You may ask us to update or remove your details at any time by contacting us.</p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>You can choose not to provide information, though that may limit what we can do for you. Consent is requested before we contact you, and you can withdraw it at any time.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about this policy or your data? Contact us at {SITE.email}.</p>
      </LegalSection>
    </LegalLayout>
  );
}