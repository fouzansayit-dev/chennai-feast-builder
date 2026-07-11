import { useState, type ChangeEvent, type FormEvent } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import { CornerKolam } from "./Kolam";
import { enquiriesAPI } from "@/services/crmApi";

type FormState = {
  name: string;
  phone: string;
  date: string;
  eventType: string;
  guests: string;
  budget: string;
  venue: string;
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    date: "",
    eventType: "Grand Wedding",
    guests: "150",
    budget: "₹1000 - ₹1500",
    venue: "",
  });

  const change = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const celebrate = () =>
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#3A235A", "#1E4620", "#FAF6F0"],
    });

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`New Event Inquiry: ${form.eventType} - ${form.name}`);
    const body = encodeURIComponent(
      `Hello MCC Catering Team,\n\nI would like to book catering for an upcoming event:\n\n` +
        `• Name: ${form.name}\n` +
        `• Phone/WhatsApp: ${form.phone}\n` +
        `• Event Type: ${form.eventType}\n` +
        `• Event Date: ${form.date}\n` +
        `• Guest Count: ${form.guests}\n` +
        `• Budget / Plate: ${form.budget}\n` +
        `• Venue Location: ${form.venue}\n\n` +
        `Please send me a detailed proposal and availability.\n\nThank you!`
    );
    return `mailto:mychennaicateringservices@gmail.com?subject=${subject}&body=${body}`;
  };

  const getWhatsappUrl = () => {
    const text = encodeURIComponent(
      `Hello MCC Catering! I submitted an inquiry on your website:\n` +
        `*Name:* ${form.name}\n` +
        `*Event:* ${form.eventType}\n` +
        `*Date:* ${form.date}\n` +
        `*Guests:* ${form.guests}\n` +
        `*Venue:* ${form.venue}\n` +
        `*Phone:* ${form.phone}`
    );
    return `https://wa.me/919940396005?text=${text}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Send to CRM backend — creates an ENQ order visible in the admin panel
      await enquiriesAPI.create({
        name: form.name,
        phone: form.phone,
        event_type: form.eventType,
        event_date: form.date,
        venue: form.venue,
        guests: Number(form.guests) || 0,
        special_requests: `Budget per plate: ${form.budget}`,
      });
    } catch (err) {
      // Best-effort: don't block the customer if the backend is unreachable
      console.warn("CRM enquiry submission failed (non-blocking):", err);
    }

    try {
      // 2. Also send via email (formsubmit.co) as a backup notification
      await fetch("https://formsubmit.co/ajax/mychennaicateringservices@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Catering Inquiry: ${form.eventType} - ${form.name}`,
          name: form.name,
          phone: form.phone,
          eventType: form.eventType,
          date: form.date,
          guests: form.guests,
          budget: form.budget,
          venue: form.venue,
          _replyto: "mychennaicateringservices@gmail.com",
        }),
      });
    } catch (err) {
      console.warn("Email submission attempt completed with fallback option ready.", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      celebrate();
    }
  };


  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 md:p-10 border border-gold/30 text-center shadow-glow-gold"
      >
        <div className="w-16 h-16 rounded-full bg-leaf/10 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-leaf" />
        </div>
        <h3 className="font-serif text-2xl text-plum mb-3">Event Inquiry Received</h3>
        <p className="text-foreground/70 text-sm mb-4 max-w-md mx-auto">
          Dhanyavadah! Your request has been dispatched to <strong>mychennaicateringservices@gmail.com</strong>.
          MCC & team will review your <strong>{form.eventType}</strong> for <strong>{form.date}</strong> and contact you at <strong>{form.phone}</strong>.
        </p>

        <div className="bg-cream/70 border border-gold/20 rounded-2xl p-4 mb-6 text-xs text-foreground/80 space-y-2 max-w-md mx-auto text-left">
          <div className="font-semibold text-plum uppercase tracking-wider text-[10px] mb-1">Inquiry Details Summary:</div>
          <div><span className="text-plum/60 font-medium">Name:</span> {form.name}</div>
          <div><span className="text-plum/60 font-medium">Event:</span> {form.eventType} ({form.guests} guests)</div>
          <div><span className="text-plum/60 font-medium">Date & Venue:</span> {form.date} · {form.venue}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href={getMailtoUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-plum hover:bg-plum-dark text-cream rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>Send Direct Email to Owner</span>
          </a>
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>Send via WhatsApp (+91 99403 96005)</span>
          </a>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="text-xs text-plum/70 hover:text-plum underline font-medium"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative bg-white rounded-3xl p-7 md:p-9 border border-gold/25 shadow-glow-plum overflow-hidden"
    >
      {/* Decorative Traditional Corner Kolams */}
      <CornerKolam size={45} color="var(--gold)" className="absolute top-2 left-2 opacity-25" />
      <CornerKolam size={45} color="var(--gold)" className="absolute top-2 right-2 opacity-25 rotate-90" />
      <div className="flex items-center justify-between mb-7">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold-dark">
          Step {step} of 3
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                step >= i ? "bg-gold w-10" : "bg-plum/10 w-6"
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-plum mb-7">
        Plan Your Traditional Celebration
      </h3>

      {step === 1 && (
        <div className="space-y-4">
          <Field icon={User} label="Full Name">
            <input
              required
              name="name"
              value={form.name}
              onChange={change}
              placeholder="As per invitation"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
            />
          </Field>
          <Field icon={Phone} label="Phone / WhatsApp">
            <input
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder="+91"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field icon={Calendar} label="Event Date">
              <input
                required
                type="date"
                name="date"
                value={form.date}
                onChange={change}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
              />
            </Field>
            <Field label="Event Type">
              <select
                name="eventType"
                value={form.eventType}
                onChange={change}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
              >
                <option>Grand Wedding</option>
                <option>Reception</option>
                <option>Corporate Event</option>
                <option>Birthday</option>
                <option>Seemantham (Baby Shower)</option>
                <option>Griha Pravesham</option>
              </select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field icon={Users} label="Guests">
              <input
                type="number"
                name="guests"
                value={form.guests}
                onChange={change}
                min={50}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
              />
            </Field>
            <Field label="Budget per Plate">
              <select
                name="budget"
                value={form.budget}
                onChange={change}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
              >
                <option>₹500 - ₹1000</option>
                <option>₹1000 - ₹1500</option>
                <option>₹1500 - ₹2000</option>
                <option>₹2000+</option>
              </select>
            </Field>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Field icon={MapPin} label="Event Location / Venue">
            <input
              required
              name="venue"
              value={form.venue}
              onChange={change}
              placeholder="Hall name, locality, Chennai"
              className="w-full px-4 py-3 rounded-xl bg-cream border border-plum/15 focus:border-gold focus:outline-none text-sm"
            />
          </Field>
          <div className="text-xs text-foreground/60 bg-gold/5 border border-gold/20 rounded-xl p-4 leading-relaxed">
            Standard packages include traditional South Indian vegetarian dishes,
            polite traditional servers, banana-leaf settings, and complete dining setup.
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={prev}
            disabled={submitting}
            className="px-5 py-3 rounded-xl border border-plum/20 text-plum text-sm font-medium hover:bg-plum/5 disabled:opacity-50"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="flex-1 py-3 rounded-xl bg-plum text-cream text-sm font-semibold hover:bg-plum-dark"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 py-3 rounded-xl bg-gold text-plum-dark text-sm font-semibold hover:bg-gold-light shadow-glow-gold disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? "Sending Request..." : "Confirm Inquiry"}
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-plum/70 mb-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-gold" />}
        {label}
      </span>
      {children}
    </label>
  );
}