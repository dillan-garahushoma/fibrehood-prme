import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, Headset, Mail, Megaphone, Receipt, Shield } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";

const serviceOptions = [
  "Check fibre coverage",
  "New connection",
  "Existing connection support",
  "Billing question",
  "Business enquiry",
  "Partnership enquiry",
  "Other",
];

const contactDetails = [
  { icon: Building2, label: "FIBREHOOD BUSINESS", value: "+263 780 797 695", href: "tel:+263780797695" },
  { icon: Receipt, label: "BILLING", value: "+263 780 257 425", href: "tel:+263780257425" },
  { icon: Headset, label: "CUSTOMER SUPPORT", value: "+263 784 416 605", href: "tel:+263784416605" },
  { icon: Megaphone, label: "SALES & MARKETING", value: "+263 780 711 337", href: "tel:+263780711337" },
  { icon: Mail, label: "SUPPORT EMAIL", value: "support@fibrehood.co.zw", href: "mailto:support@fibrehood.co.zw" },
  { icon: Mail, label: "SALES EMAIL", value: "sales@fibrehood.co.zw", href: "mailto:sales@fibrehood.co.zw" },
];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Contact() {
  const { ref, inView } = useInView();
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", area: "", service: "", message: "" });
  const revealClass = inView ? " is-visible" : "";

  function handleChange(event) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitStatus("submitting");
    try {
      const leads = JSON.parse(localStorage.getItem("fibrehood_leads") || "[]");
      leads.push({ ...formData, source: "fibrehood-contact", submitted_at: new Date().toISOString() });
      localStorage.setItem("fibrehood_leads", JSON.stringify(leads));
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get you connected."
        subtitle="Tell us who you are and what you need. We'll route it to the right team — or reach us instantly on WhatsApp."
      />
      <div className="app-contact-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700;800&display=swap');
          .app-contact-page { min-height: 100vh; background: #1a1a1a; color: #f9f6f1; font-family: Jost, system-ui, sans-serif; }
          .app-contact-section { position: relative; width: 100%; padding: 96px 0 120px; overflow: hidden; background: radial-gradient(ellipse 72% 60% at 82% 18%, rgba(198,146,42,.14), transparent 70%), linear-gradient(135deg,#101010 0%,#1a1a1a 60%,#0c0c0c 100%); }
          .app-contact-section:before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(198,146,42,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(198,146,42,.045) 1px,transparent 1px); background-size: 96px 96px; mask-image: radial-gradient(circle at 70% 28%,black,transparent 72%); pointer-events: none; }
          .app-contact-section:after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(198,146,42,.72),transparent); }
          .app-contact-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
          .app-contact-masthead { max-width: 720px; margin: 0 auto 64px; text-align: center; }
          .app-contact-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
          .app-contact-reveal.is-visible { opacity: 1; transform: translateY(0); }
          .app-contact-eyebrow { display: inline-flex; align-items: center; gap: 14px; color: #C6922A; font-size: 11px; font-weight: 800; letter-spacing: .2em; line-height: 1.4; text-transform: uppercase; }
          .app-contact-eyebrow:before,.app-contact-eyebrow:after { content: ''; width: 42px; height: 1px; background: #C6922A; }
          .app-contact-title { max-width: 700px; margin: 16px auto 0; color: #f9f6f1; font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(42px,5.2vw,68px); font-weight: 500; letter-spacing: 0; line-height: 1.02; }
          .app-contact-title em { color: #C6922A; font-style: italic; }
          .app-contact-copy { max-width: 560px; margin: 20px auto 0; color: rgba(249,246,241,.68); font-size: 18px; line-height: 1.7; }
          .app-contact-grid { display: grid; grid-template-columns: minmax(0,1.15fr) minmax(300px,.85fr); gap: 80px; align-items: start; }
          .app-contact-form { max-width: 600px; }
          .app-contact-form-intro { margin-bottom: 28px; }
          .app-contact-form-intro h2 { margin: 0; color: #f9f6f1; font-size: 25px; font-weight: 500; letter-spacing: 0; }
          .app-contact-form-intro p { margin: 8px 0 0; color: rgba(249,246,241,.58); font-size: 14px; line-height: 1.55; }
          .app-contact-field { position: relative; margin-bottom: 18px; }
          .app-contact-field label { display: block; margin-bottom: 7px; color: rgba(249,246,241,.58); font-size: 12px; font-weight: 700; }
          .app-contact-input,.app-contact-select,.app-contact-textarea { width: 100%; border: 1px solid rgba(249,246,241,.16); border-radius: 8px; background: rgba(17,17,17,.82); color: #f9f6f1; padding: 14px 16px; font: 15px/1.5 Jost,system-ui,sans-serif; outline: none; transition: border-color .25s,box-shadow .25s,background .25s; }
          .app-contact-select { cursor: pointer; }.app-contact-select option { color: #f9f6f1; background: #111; }.app-contact-textarea { min-height: 138px; resize: vertical; }.app-contact-input::placeholder,.app-contact-textarea::placeholder { color: #777; }
          .app-contact-input:focus,.app-contact-select:focus,.app-contact-textarea:focus { border-color: #C6922A; background: rgba(22,22,22,.94); box-shadow: 0 0 0 3px rgba(198,146,42,.18),0 0 22px rgba(198,146,42,.2); }
          .app-contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .app-contact-submit { display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; border: 0; border-radius: 999px; background: #C6922A; color: #fff; padding: 15px 24px; font: 500 14px Jost,system-ui,sans-serif; letter-spacing: .075em; text-transform: uppercase; cursor: pointer; transition: background .2s, transform .2s; }
          .app-contact-submit:hover:not(:disabled) { background: #b0811f; transform: translateY(-1px); }.app-contact-submit:disabled { cursor: wait; opacity: .7; }
          .app-contact-message { margin: 0 0 20px; padding: 20px; border: 1px solid rgba(198,146,42,.38); border-radius: 10px; background: rgba(17,17,17,.82); }.app-contact-message h3 { margin: 0; color: #f9f6f1; font-size: 20px; font-weight: 500; }.app-contact-message p { margin: 6px 0 0; color: rgba(249,246,241,.68); line-height: 1.5; }
          .app-contact-details { display: flex; flex-direction: column; gap: 26px; padding-left: 8px; }
          .app-contact-detail { display: flex; align-items: flex-start; gap: 15px; }.app-contact-detail-icon { flex: 0 0 auto; margin-top: 3px; color: #C6922A; }.app-contact-detail-label { display: block; margin-bottom: 4px; color: rgba(249,246,241,.56); font-size: 10px; font-weight: 800; letter-spacing: .16em; line-height: 1.4; text-transform: uppercase; }.app-contact-detail-value { color: #f9f6f1; font-size: 18px; line-height: 1.45; text-decoration: none; transition: color .2s; }.app-contact-detail-value:hover { color: #C6922A; }
          .app-contact-channel-note { margin: 42px 0 0; padding: 18px 20px; border-left: 3px solid #C6922A; background: rgba(17,17,17,.72); color: rgba(249,246,241,.62); font-size: 13px; line-height: 1.55; }.app-contact-channel-note strong { display: block; margin-bottom: 4px; color: #f9f6f1; font-size: 14px; }
          .app-contact-trust { display: flex; align-items: flex-start; justify-content: center; gap: 9px; max-width: 520px; margin: 56px auto 0; color: rgba(249,246,241,.48); font-size: 12px; line-height: 1.5; text-align: center; }.app-contact-trust svg { flex: 0 0 auto; margin-top: 1px; color: rgba(249,246,241,.42); }
          @media(max-width:900px){.app-contact-grid{grid-template-columns:1fr;gap:60px}.app-contact-form{max-width:680px}.app-contact-details{padding-left:0;display:grid;grid-template-columns:1fr 1fr;gap:26px 32px}}
          @media(max-width:560px){.app-contact-section{padding:68px 0 86px}.app-contact-inner{padding:0 20px}.app-contact-masthead{margin-bottom:48px}.app-contact-copy{font-size:16px}.app-contact-form-row{grid-template-columns:1fr}.app-contact-details{display:flex;gap:24px}.app-contact-eyebrow{gap:10px;font-size:9px}.app-contact-eyebrow:before,.app-contact-eyebrow:after{width:24px}}
        `}</style>
        <section className="app-contact-section" id="contact" ref={ref}>
          <div className="app-contact-inner">
            <div className={`app-contact-masthead app-contact-reveal${revealClass}`}>
              <div className="app-contact-eyebrow">Official communication channels</div>
              <h1 className="app-contact-title">We are here to help you <em>get connected.</em></h1>
              <p className="app-contact-copy">Connect with FibreHood directly. Our teams are ready to help with your fibre connection, account, coverage, and business needs.</p>
            </div>
            <div className="app-contact-grid">
              <div>
                <div className={`app-contact-form-intro app-contact-reveal${revealClass}`}><h2>Send us an enquiry</h2><p>Tell us what you need and we will route your enquiry to the right FibreHood team.</p></div>
                {submitStatus === "success" ? (
                  <div className={`app-contact-message app-contact-reveal${revealClass}`} role="status"><h3>Thanks for reaching out.</h3><p>Your enquiry has been received by FibreHood.</p></div>
                ) : (
                  <form className={`app-contact-form app-contact-reveal${revealClass}`} name="contact" onSubmit={handleSubmit}>
                    <div className="app-contact-form-row">
                      <div className="app-contact-field"><label htmlFor="contact-name">Full name</label><input id="contact-name" className="app-contact-input" name="name" autoComplete="name" required value={formData.name} onChange={handleChange} /></div>
                      <div className="app-contact-field"><label htmlFor="contact-phone">Phone number</label><input id="contact-phone" className="app-contact-input" type="tel" name="phone" autoComplete="tel" required value={formData.phone} onChange={handleChange} /></div>
                    </div>
                    <div className="app-contact-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" className="app-contact-input" type="email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} /></div>
                    <div className="app-contact-field"><label htmlFor="contact-area">Area or suburb</label><input id="contact-area" className="app-contact-input" name="area" autoComplete="address-level2" value={formData.area} onChange={handleChange} /></div>
                    <div className="app-contact-field"><label htmlFor="contact-service">How can we help?</label><select id="contact-service" className="app-contact-select" name="service" value={formData.service} onChange={handleChange}><option value="">Select an enquiry type</option>{serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
                    <div className="app-contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" className="app-contact-textarea" name="message" placeholder="Tell us how we can help..." value={formData.message} onChange={handleChange} /></div>
                    {submitStatus === "error" && <div className="app-contact-message" role="alert"><h3>Something went wrong.</h3><p>Please call or email FibreHood directly.</p></div>}
                    <button className="app-contact-submit" type="submit" disabled={submitStatus === "submitting"}>{submitStatus === "submitting" ? "Sending" : "Send enquiry"}<ArrowRight size={16} aria-hidden="true" /></button>
                  </form>
                )}
              </div>
              <div className={`app-contact-reveal${revealClass}`} style={{ transitionDelay: inView ? "0.15s" : "0s" }}>
                <div className="app-contact-details">{contactDetails.map(({ icon: Icon, ...detail }) => <div className="app-contact-detail" key={detail.label}><Icon className="app-contact-detail-icon" size={21} strokeWidth={1.8} aria-hidden="true" /><div><span className="app-contact-detail-label">{detail.label}</span><a className="app-contact-detail-value" href={detail.href}>{detail.value}</a></div></div>)}</div>
                <div className="app-contact-channel-note"><strong>Choose the fastest route</strong>For technical help, contact Customer Support. For payments, contact Billing. For a new connection or coverage enquiry, contact Sales & Marketing.</div>
              </div>
            </div>
            <div className="app-contact-trust"><Shield size={15} aria-hidden="true" /><span>Your information is kept private and used only to respond to your enquiry.</span></div>
          </div>
        </section>
      </div>
    </>
  );
}
