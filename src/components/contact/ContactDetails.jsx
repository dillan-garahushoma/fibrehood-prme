import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/contactContent";
import { whatsappLink } from "@/data/site";

export default function ContactDetails() {
  return (
    <section aria-labelledby="details-heading" className="fh-contact__section">
      <div className="fh-contact__intro">
        <p className="fh-contact__eyebrow">
          <span className="fh-contact__eyebrow-line" aria-hidden="true" /> CONTACT DETAILS
        </p>
        <h2 id="details-heading" className="fh-contact__heading">
          Reach the right team, <span className="fh-contact__accent">directly.</span>
        </h2>
        <p className="fh-contact__lede">
          Choose the route best suited to your need — each team and channel is listed so your enquiry lands with the people who can help.
        </p>
        <a
          href={whatsappLink("Hi FibreHood, I'd like to get connected.")}
          className="fh-contact__cta"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Chat on WhatsApp
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="fh-contact__hero-panel">
        <ul className="fh-contact__contact-list">
          {CONTACT_DETAILS.map((d) => (
            <li key={d.label} className="fh-contact__contact-row">
              <d.icon className="fh-contact__contact-icon" size={18} aria-hidden="true" />
              <div>
                <p className="fh-contact__contact-label">{d.label}</p>
                <a href={d.href} className="fh-contact__contact-value">{d.value}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}