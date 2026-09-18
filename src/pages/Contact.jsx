import React from "react";
import { ArrowRight, Phone, Send, Clock, Users, Headphones } from "lucide-react";
import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import { whatsappLink, SITE } from "@/data/site";
import ContactBody from "@/components/contact/ContactBody";

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function Contact() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById("send-message");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const actionButtonClass =
    "inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-full px-6 text-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:gap-1.5 lg:px-3 lg:text-xs xl:gap-2.5 xl:px-6 xl:text-sm";

  return (
    <>
      <SplitHero
        image={IMAGES.contactHero}
        alt="Fibrehood customer support specialist"
        title={
          <>
            Let’s get you <br className="hidden sm:inline" />
            <span className="text-loop">connected.</span>
          </>
        }
        subtitle="Tell us who you are and what you need. We’ll route it to the right team — or reach us instantly on WhatsApp."
      >
        <div>
          {/* Action pills row */}
          <div className="flex flex-wrap items-stretch gap-3 sm:gap-3.5 lg:flex-nowrap lg:gap-2 xl:gap-3.5">
            <a
              href={whatsappLink("Hi Fibrehood, I'd like to get connected.")}
              target="_blank"
              rel="noreferrer"
              className={`${actionButtonClass} bg-loop font-bold text-signal hover:bg-loop/90 hover:shadow-loop focus-visible:outline-loop`}
            >
              <WhatsAppIcon className="h-4 w-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className={`${actionButtonClass} border border-paper/40 bg-transparent font-semibold text-paper hover:border-paper hover:bg-paper/10 focus-visible:outline-paper`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call us</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#send-message"
              onClick={handleScrollToForm}
              className={`${actionButtonClass} border border-paper/40 bg-transparent font-semibold text-paper hover:border-paper hover:bg-paper/10 focus-visible:outline-paper`}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Send Message</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Trust features row directly under buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-paper/85">
            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 text-loop shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-medium text-paper/90">Quick response</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-paper/25" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 text-loop shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-medium text-paper/90">Real people</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-paper/25" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              <Headphones className="h-5 w-5 text-loop shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-medium text-paper/90">Dedicated support</span>
            </div>
          </div>
        </div>
      </SplitHero>
      <ContactBody />
    </>
  );
}