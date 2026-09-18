import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import ContactCTA from "./ContactCTA";

export default function ContactBody() {
  return (
    <div className="fh-contact-page">
      <ContactDetails />
      <ContactForm />
      <ContactCTA />
    </div>
  );
}