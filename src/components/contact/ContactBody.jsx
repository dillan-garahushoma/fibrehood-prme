import ChooseHelp from "./ChooseHelp";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import BeforeContact from "./BeforeContact";
import ContactCTA from "./ContactCTA";

export default function ContactBody() {
  return (
    <>
      <ChooseHelp />
      <ContactDetails />
      <ContactForm />
      <BeforeContact />
      <ContactCTA />
    </>
  );
}