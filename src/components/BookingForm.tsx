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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    celebrate();
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 border border-gold/30 text-center shadow-glow-gold"
      >
        <div className="w-16 h-16 rounded-full bg-leaf/10 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-leaf" />
        </div>
        <h3 className="font-serif text-2xl text-plum mb-3">Event Inquiry Received</h3>
        <p className="text-foreground/70 text-sm mb-6 max-w-md mx-auto">
          Dhanyavadah! MCC and the team will review your{" "}
          <strong>{form.eventType}</strong> for <strong>{form.date}</strong> and reach you at{" "}
          <strong>{form.phone}</strong> with a curated proposal.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="px-6 py-2.5 bg-plum text-cream rounded-xl text-sm font-medium hover:bg-plum-dark"
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
            Standard packages include Vedic slow-cooked traditional Brahmin vegetarian dishes,
            hosts in silk sarees, banana-leaf settings, and complete dining setup.
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={prev}
            className="px-5 py-3 rounded-xl border border-plum/20 text-plum text-sm font-medium hover:bg-plum/5"
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
            className="flex-1 py-3 rounded-xl bg-gold text-plum-dark text-sm font-semibold hover:bg-gold-light shadow-glow-gold"
          >
            Confirm Inquiry
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