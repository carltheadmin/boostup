const faqs = [
  { q: "How long does delivery take?", a: "After your GCash/PayMaya payment is manually verified (usually 1-3 hours), delivery starts. Most orders complete within 12-48 hours depending on quantity. Bigger packages may take up to 72 hours for natural gradual delivery." },
  { q: "Is payment required first?", a: "Yes. We operate on first-pay basis. Send payment to GCash/PayMaya 09325361831, upload receipt, then we verify and process. This prevents fake orders and protects both sides." },
  { q: "What payment methods are accepted?", a: "Currently GCash and PayMaya only — both using number 09325361831. We will add more methods soon (Coins.ph, bank transfer, PayPal). Upload JPG/PNG/PDF receipt." },
  { q: "What if I upload the wrong receipt?", a: "Contact us immediately via Facebook Page. If receipt is unreadable or wrong, order status will be set to Rejected with reason. You can resubmit with correct receipt." },
  { q: "Can I cancel my order?", a: "You can cancel within 30 minutes before verification. Once status is Verified/Processing, cancellation is not possible because boosting has started." },
  { q: "Do you need my Facebook password?", a: "Never. We only need your public profile link or username. No password, no login. 100% safe." },
  { q: "Are followers real people?", a: "They are high-quality premium profiles for social proof. They help you unlock monetization and trust, but engagement depends on your content. We offer refill guarantee for drop." },
  { q: "What happens if I upload fake receipt?", a: "Your order will be immediately rejected and blacklisted. We manually check GCash reference numbers, amounts, timestamps. Don't risk it." },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <h1 className="text-4xl font-black tracking-tighter">FAQ • <span className="text-[#FFC700]">Everything you need</span></h1>
      <p className="mt-2 text-white/50 text-sm">Manual verification, secure payments, fast delivery.</p>

      <div className="mt-10 space-y-3">
        {faqs.map((f,i)=>(
          <details key={i} className="group rounded-2xl border border-white/10 bg-[#12121A] open:bg-[#181825] transition">
            <summary className="flex cursor-pointer list-none items-center justify-between p-6">
              <span className="font-bold text-[15px] pr-6">{f.q}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-open:rotate-45 transition">+</span>
            </summary>
            <div className="px-6 pb-6 text-sm leading-relaxed text-white/60">{f.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[#FFC700]/20 bg-[#FFC700]/5 p-6 text-center">
        <p className="font-bold">Still have questions?</p>
        <p className="mt-1 text-sm text-white/60">Message us on Facebook — we reply in minutes 9AM-10PM daily.</p>
        <a href="https://www.facebook.com/boostupph" target="_blank" className="mt-4 inline-flex rounded-xl bg-[#1877F2] px-6 py-3 text-sm font-bold">Message on Facebook</a>
      </div>
    </div>
  );
}
