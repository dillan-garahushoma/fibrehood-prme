import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import ContactBody from "@/components/contact/ContactBody";

export default function Contact() {
  return (
    <>
      <SplitHero
        image={IMAGES.contactHero}
        alt="FibreHood customer support specialist"
        eyebrow="Contact"
        title="Let's get you connected."
        subtitle="Tell us who you are and what you need. We'll route it to the right team — or reach us instantly on WhatsApp."
      />
      <ContactBody />
    </>
  );
}