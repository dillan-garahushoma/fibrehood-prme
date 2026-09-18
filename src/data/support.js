import {
  Wifi,
  Gauge,
  Router,
  Settings,
  FileText,
  User,
  Lock,
  MapPin,
  Phone
} from "lucide-react";

export const SUPPORT_CATEGORIES = [
  { id: "all", name: "All topics", label: "All topics", icon: Wifi },
  { id: "no-internet", name: "No internet", label: "No internet", icon: Wifi },
  { id: "slow-internet", name: "Slow internet", label: "Slow internet", icon: Gauge, alias: ["slow"] },
  { id: "router-wifi", name: "Router & Wi-Fi", label: "Router & Wi-Fi", icon: Router },
  { id: "installation", name: "Installation", label: "Installation", icon: Settings },
  { id: "billing", name: "Billing & account", label: "Billing & account", icon: FileText },
  { id: "general", name: "General & coverage", label: "General", icon: User, alias: ["coverage", "contact"] },
];

export const SUPPORT_ARTICLES = [
  {
    id: "connection-dropped",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "My connection has dropped completely",
    title: "My connection has dropped completely",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "First, check that your router and ONT (Optical Network Terminal) are powered on and all cables are securely connected. If the problem persists, try restarting your router by unplugging it for 30 seconds and plugging it back in. If you're still offline, it may be a local network issue — contact our support team and we'll help you get back online.",
    steps: [
      "Check that the Optical Network Terminal (ONT) at your premises has power and a steady PON light.",
      "Restart your router — unplug the power cord for 30 seconds, then reconnect and wait 2 minutes for it to handshake.",
      "Ensure all yellow fibre cables and blue Ethernet cables are firmly seated with no sharp bends.",
      "If the red LOS light is flashing on the ONT, contact our WhatsApp support team immediately for line diagnostics."
    ]
  },
  {
    id: "some-devices-cant-connect",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "Only some devices can't connect",
    title: "Only some devices can't connect",
    popular: true,
    featured: false,
    updated: "Recently updated",
    answer:
      "This usually comes down to a device-specific Wi-Fi setting rather than your network. Try forgetting the network on the affected device and reconnecting, restarting the device, and checking it's within range of your router. If it still won't connect, contact support with the device model.",
    steps: [
      "Check whether the affected device can connect to mobile data or another hotspot to isolate device vs router.",
      "Forget the Wi-Fi network in your device's network settings and rejoin with your password.",
      "Restart the device's Wi-Fi toggle or reboot the device completely.",
      "Verify if the device supports the 5GHz frequency band or only 2.4GHz."
    ]
  },
  {
    id: "no-internet-after-outage",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "No internet after a power outage",
    title: "No internet after a power outage",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Give your router a minute to fully restart after power returns. If it's still offline after that, unplug it for 30 seconds and plug it back in to force a clean restart.",
    steps: [
      "Allow 2 to 3 minutes after electricity restores for neighborhood street nodes to fully boot up.",
      "Unplug both the ONT and the router from the wall socket for 30 seconds.",
      "Plug the ONT in first, wait for the optical light to turn green, then plug the router in.",
      "If the connection remains down after 10 minutes, message WhatsApp support to check local feeder node status."
    ]
  },
  {
    id: "red-light-on-router",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "Red light showing on my router or ONT",
    title: "Red light showing on my router or ONT",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "A red light usually means the router or ONT has lost its connection to our optical network. Check that the fibre cable is firmly connected, then restart the router. If the light stays red, contact support.",
    steps: [
      "Locate the red light: on the ONT, an 'LOS' (Loss of Signal) red light indicates no optical signal from the street.",
      "Inspect the thin optical patch cord; ensure there are no sharp kinks, pinches, or disconnections.",
      "Gently verify that the green optical connector is clicked firmly into the ONT port.",
      "If the LOS light remains red after a reboot, our field technicians will need to inspect the external fibre drop."
    ]
  },
  {
    id: "internet-only-one-room",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "Internet works but only in one room",
    title: "Internet works but only in one room",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "This is a Wi-Fi coverage issue rather than an outage — see the Router & Wi-Fi section below for tips on extending coverage to more rooms, or ask our team about whole-home mesh extenders.",
    steps: [
      "Check signal strength on your device: if speed drops only as you move away, the fibre line is working fine.",
      "Relocate the router to a central, elevated position away from concrete walls, metal cabinets, and appliances.",
      "Ask our team about deploying a FibreHood mesh extender to blanket your back rooms and outdoor areas."
    ]
  },
  {
    id: "connection-drops-randomly",
    categoryId: "no-internet",
    category: "no-internet",
    icon: Wifi,
    question: "My connection keeps dropping randomly",
    title: "My connection keeps dropping randomly",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Intermittent drops are often caused by an overheating router or a loose cable. Make sure your router has space to ventilate, check all cable connections, and let us know if it keeps happening so we can check the line.",
    steps: [
      "Ensure the router is in an open area with airflow and not enclosed in a tight cabinet or warm cupboard.",
      "Check all power and Ethernet cables to confirm snug connections.",
      "If drops occur at specific times of day, note the timestamps and send them to WhatsApp support for line monitoring."
    ]
  },
  {
    id: "speeds-slower-than-plan",
    categoryId: "slow-internet",
    category: "slow-internet",
    icon: Gauge,
    question: "Speeds are slower than my plan",
    title: "Speeds are slower than my plan",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "Run a speed test over a wired connection first to rule out Wi-Fi interference. Speeds can also be affected by the number of connected devices and your router's placement. If wired speeds are still below your plan, contact support and we'll investigate.",
    steps: [
      "Connect a computer directly to the router's LAN port using a Cat5e or Cat6 Ethernet cable.",
      "Pause any ongoing heavy downloads, game updates, or streaming on other household devices.",
      "Run a speed test at speedtest.net or fast.com against a local Harare/Zimbabwe server.",
      "If wired speeds remain well below your plan tier, share the speed test screenshot with support."
    ]
  },
  {
    id: "speeds-slow-evening",
    categoryId: "slow-internet",
    category: "slow-internet",
    icon: Gauge,
    question: "Speeds slow down in the evening",
    title: "Speeds slow down in the evening",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Evenings are peak usage time for most households. If it's affecting you significantly, let us know — persistent evening slowdowns can indicate local network congestion we need to address.",
    steps: [
      "Check which household devices are streaming 4K video or running large cloud backups simultaneously.",
      "Connect bandwidth-heavy devices to the 5GHz Wi-Fi band or via wired Ethernet.",
      "If you notice consistent drops during peak hours (7 PM - 10 PM), notify support so our network engineers can balance local capacity."
    ]
  },
  {
    id: "streaming-buffering",
    categoryId: "slow-internet",
    category: "slow-internet",
    icon: Gauge,
    question: "Streaming keeps buffering",
    title: "Streaming keeps buffering",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Lower the stream quality to see if that resolves it — if it does, the issue is likely Wi-Fi coverage rather than your overall connection. A wired connection to your streaming device is the most reliable fix.",
    steps: [
      "Restart your Smart TV or streaming stick to clear background application memory.",
      "Switch your TV or streaming box to the 5GHz Wi-Fi band, or connect it via an Ethernet cable.",
      "Test streaming on a phone right next to the router to confirm whether it is an app issue or local Wi-Fi range."
    ]
  },
  {
    id: "gaming-high-ping",
    categoryId: "slow-internet",
    category: "slow-internet",
    icon: Gauge,
    question: "Gaming has high ping or lag",
    title: "Gaming has high ping or lag",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Wired connections give the most consistent ping for gaming. If you're on Wi-Fi, move closer to the router or reduce the number of devices streaming or downloading at the same time.",
    steps: [
      "Always connect gaming consoles or PCs via a wired Ethernet cable to avoid Wi-Fi packet jitter.",
      "Make sure no cloud backups (iCloud, Google Drive, OneDrive) or file transfers are running in the background.",
      "Verify that your in-game matchmaking server is set to the nearest region (e.g. South Africa)."
    ]
  },
  {
    id: "wifi-doesnt-reach-back-rooms",
    categoryId: "router-wifi",
    category: "router-wifi",
    icon: Router,
    question: "Wi-Fi doesn't reach the back rooms",
    title: "Wi-Fi doesn't reach the back rooms",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "Wi-Fi signal weakens with distance and through walls. Try repositioning your router to a more central, elevated spot, or ask our team about a mesh Wi-Fi extender for larger homes.",
    steps: [
      "Fibre delivers high speeds to your premises; Wi-Fi coverage inside is dictated by home layout and thick brick walls.",
      "Elevate the router and keep it clear of metal cupboards, mirrors, and tight corners.",
      "Where a single router cannot cover your entire space, ask about our FibreHood mesh nodes."
    ]
  },
  {
    id: "change-wifi-password",
    categoryId: "router-wifi",
    category: "router-wifi",
    icon: Lock,
    question: "How do I change my Wi-Fi password?",
    title: "How do I change my Wi-Fi password?",
    popular: true,
    featured: false,
    updated: "Recently updated",
    answer:
      "Log in to your router's admin page — the address and default login are printed on a sticker on the router — open Wireless settings, and update your network password. You can also contact support for assistance.",
    steps: [
      "Connect to your Wi-Fi and open your web browser to the gateway IP address (e.g. 192.168.1.1 or 192.168.0.1).",
      "Log in using the admin credentials printed on the label beneath your router.",
      "Locate 'Wireless Settings' or 'WLAN Security', enter your new password, and save.",
      "Reconnect your phone, laptop, and TV using the new password."
    ]
  },
  {
    id: "reset-router",
    categoryId: "router-wifi",
    category: "router-wifi",
    icon: Router,
    question: "How do I reset my router?",
    title: "How do I reset my router?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Hold the reset button on the back of the router for 10 seconds until the lights flash. This restores factory settings, so you'll need to reconnect your devices afterward.",
    steps: [
      "Locate the pinhole reset button on the back of your router.",
      "Use a pin or paperclip to press and hold the button for 10 seconds while powered on.",
      "Release the button once the indicator lights flash off and on.",
      "Wait 3 minutes for the router to restart with its original factory name and password."
    ]
  },
  {
    id: "use-own-router",
    categoryId: "router-wifi",
    category: "router-wifi",
    icon: Router,
    question: "Can I use my own router?",
    title: "Can I use my own router?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Yes — connect your router to our ONT box in bridge mode. Note that our support team can only troubleshoot up to the ONT for third-party routers.",
    steps: [
      "Connect the WAN port of your router to LAN Port 1 on the FibreHood ONT using a Cat6 cable.",
      "Contact FibreHood support on WhatsApp to enable bridge mode on your ONT if required.",
      "Set your router WAN mode to DHCP or PPPoE as advised by our support team."
    ]
  },
  {
    id: "2-4-vs-5ghz",
    categoryId: "router-wifi",
    category: "router-wifi",
    icon: Router,
    question: "What's the difference between 2.4GHz and 5GHz?",
    title: "What's the difference between 2.4GHz and 5GHz?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "2.4GHz reaches further but is slower; 5GHz is faster but covers less distance. Use 5GHz for devices near the router and 2.4GHz for devices further away.",
    steps: [
      "2.4GHz: Greater range, penetrates brick walls better, ideal for IoT, smart plugs, and distant rooms.",
      "5GHz: Much faster speeds and lower latency, ideal for gaming, 4K streaming, and fast downloads near the router.",
      "Many modern FibreHood routers combine both into a single smart network that switches automatically."
    ]
  },
  {
    id: "what-does-installation-involve",
    categoryId: "installation",
    category: "installation",
    icon: Settings,
    question: "What does installation involve?",
    title: "What does installation involve?",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "Our technician runs fibre to your home, installs the ONT box, connects your router, and tests your connection before they leave. Installation typically takes 1–2 hours.",
    steps: [
      "A technician runs a dedicated fibre optic drop cable from the street box to your premises.",
      "An Optical Network Terminal (ONT) is mounted inside and your router is configured.",
      "We test the speed in your presence to confirm performance matches your chosen package.",
      "Typical installs take 1 to 2 hours; our dispatch team coordinates timing ahead of time."
    ]
  },
  {
    id: "how-long-installation",
    categoryId: "installation",
    category: "installation",
    icon: Settings,
    question: "How long does installation take?",
    title: "How long does installation take?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Most installations take 1–2 hours, depending on the layout of your home and how far the fibre needs to run from the street connection.",
    steps: [
      "Standard residential home: 1 to 2 hours.",
      "Complex layout or long boundary run: 2 to 3 hours.",
      "Our team confirms booking dates and arrival windows via SMS or WhatsApp."
    ]
  },
  {
    id: "need-to-be-home",
    categoryId: "installation",
    category: "installation",
    icon: Settings,
    question: "Do I need to be home for installation?",
    title: "Do I need to be home for installation?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Yes, someone 18 or older needs to be present to grant access, agree on equipment placement, and confirm the setup works before the technician leaves.",
    steps: [
      "An adult over 18 must be on site to provide access.",
      "You will be asked to approve the route of the cable and router placement.",
      "You will test the connection on your own phone or laptop before sign-off."
    ]
  },
  {
    id: "view-pay-bill",
    categoryId: "billing",
    category: "billing",
    icon: FileText,
    question: "How do I view or pay my bill?",
    title: "How do I view or pay my bill?",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "Invoices are issued monthly in advance. You can pay directly online or settle via EcoCash, bank transfer, or card. Contact support to view statement details or confirm payments.",
    steps: [
      "Billing is monthly in advance for active services.",
      "Payment options include EcoCash, ZIPIT, bank transfer (USD and local currency), and debit/credit card.",
      "Payment confirmation and account receipts are sent upon transaction clearance.",
      "Contact FibreHood accounts on WhatsApp for immediate invoice queries."
    ]
  },
  {
    id: "change-payment-method",
    categoryId: "billing",
    category: "billing",
    icon: FileText,
    question: "Can I change my payment method?",
    title: "Can I change my payment method?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Yes — update your card or payment method any time by contacting our accounts support team.",
    steps: [
      "Message our accounts desk on WhatsApp or email support@fibrehood.co.zw.",
      "Provide your FibreHood account ID and requested new payment method.",
      "We will update your billing record for subsequent billing cycles."
    ]
  },
  {
    id: "missed-payment",
    categoryId: "billing",
    category: "billing",
    icon: FileText,
    question: "What happens if I miss a payment?",
    title: "What happens if I miss a payment?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "We'll send a reminder before your service is affected. If a payment is missed, contact support as soon as possible to arrange payment and avoid a service interruption.",
    steps: [
      "Reminder notices are issued in advance of due dates.",
      "If your service is temporarily paused, submitting proof of payment on WhatsApp triggers prompt reconnection.",
      "We provide grace periods upon request if arranged in advance."
    ]
  },
  {
    id: "upgrade-downgrade-plan",
    categoryId: "billing",
    category: "billing",
    icon: FileText,
    question: "How do I upgrade or downgrade my plan?",
    title: "How do I upgrade or downgrade my plan?",
    popular: true,
    featured: false,
    updated: "Recently updated",
    answer:
      "You can change your plan any time by contacting our support team and we'll take care of it for you with zero disruption.",
    steps: [
      "Review our available packages on the Plans page.",
      "Send a message via WhatsApp requesting your desired plan change.",
      "Plan speed upgrades are applied remotely to your line with no technical downtime."
    ]
  },
  {
    id: "available-in-my-area",
    categoryId: "general",
    category: "general",
    icon: MapPin,
    question: "Is Fibrehood available in my area?",
    title: "Is Fibrehood available in my area?",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "Check our coverage page and enter your address to see current availability, or view what's live, in progress, or planned near you.",
    steps: [
      "Visit our Coverage Checker page to search your exact street or area.",
      "If your area is live, you can request installation immediately.",
      "If your street is in progress or planned, register your interest to help prioritize rollout."
    ]
  },
  {
    id: "contact-support",
    categoryId: "general",
    category: "general",
    icon: User,
    question: "How do I contact support?",
    title: "How do I contact support?",
    popular: true,
    featured: true,
    updated: "Recently updated",
    answer:
      "WhatsApp is our fastest channel. You can also call us during operating hours, submit a message on our Contact page, or email support@fibrehood.co.zw.",
    steps: [
      "WhatsApp: Use the WhatsApp action on any page for the fastest response.",
      "Phone: Call us directly during operating hours.",
      "Contact page: Submit a detailed enquiry for sales, billing, or technical assistance.",
      "Email: Reach us at support@fibrehood.co.zw."
    ]
  },
  {
    id: "coverage-request-survey",
    categoryId: "general",
    category: "general",
    icon: Phone,
    question: "Can I request a fibre survey for my complex or neighbourhood?",
    title: "Can I request a fibre survey for my complex or neighbourhood?",
    popular: false,
    featured: false,
    updated: "Recently updated",
    answer:
      "Yes! Group interest from residents and property developers helps us prioritize network expansion to your street or complex.",
    steps: [
      "Use WhatsApp support or our Contact page to submit your area request.",
      "Gather contact info of interested neighbours to strengthen the business case.",
      "Our engineering team will conduct a physical feasibility survey."
    ]
  }
];

export function searchArticles(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return SUPPORT_ARTICLES;
  return SUPPORT_ARTICLES.filter((a) =>
    (a.question && a.question.toLowerCase().includes(q)) ||
    (a.title && a.title.toLowerCase().includes(q)) ||
    (a.answer && a.answer.toLowerCase().includes(q)) ||
    (a.category && a.category.toLowerCase().includes(q)) ||
    (a.categoryId && a.categoryId.toLowerCase().includes(q)) ||
    (a.steps && a.steps.some((s) => s.toLowerCase().includes(q)))
  );
}