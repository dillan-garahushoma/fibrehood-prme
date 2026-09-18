import React from "react";
import { LegalLayout, LegalSection } from "@/components/common/LegalLayout";
import { SITE } from "@/data/site";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated="August 2026"
      intro="The terms that apply when you use the Fibrehood website and request our services."
    >
      <LegalSection title="Using this site">
        <p>This website is provided by {SITE.legal.entity} to help you check coverage, discover plans, and request a connection. You agree to use it lawfully and not to misuse any forms or contact channels.</p>
      </LegalSection>

      <LegalSection title="Indicative information">
        <p>Plan pricing, specifications, and coverage results shown on this site are indicative development content where not yet replaced with verified service data. Nothing here constitutes a binding offer or a guarantee of service availability. Confirmed terms are provided when you request and proceed with a connection.</p>
      </LegalSection>

      <LegalSection title="Requests and enquiries">
        <p>Submitting a contact or connection request expresses your interest in our services. It does not by itself create a service contract. A contract is formed only when you and Fibrehood agree to specific service terms, including plan, pricing, installation, and contract length.</p>
      </LegalSection>

      <LegalSection title="Service availability">
        <p>Fibre availability depends on infrastructure at your premises. We may determine that a requested service is not available at your address, in which case we will let you know and discuss alternatives or future interest where possible.</p>
      </LegalSection>

      <LegalSection title="Third-party links">
        <p>This site may link to or open third-party services (such as WhatsApp). We are not responsible for the terms, availability, or practices of those services.</p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>To the extent permitted by law, {SITE.legal.entity} is not liable for indirect or consequential losses arising from use of this website or reliance on indicative information shown here. Nothing in these terms limits any rights you may have under applicable consumer law.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>We may update these terms as our services develop. Material changes will be reflected by the "last updated" date above.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about these terms? Contact us at {SITE.email}.</p>
      </LegalSection>
    </LegalLayout>
  );
}