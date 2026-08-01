export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <h1 className="text-4xl font-black tracking-tighter">Contact Us</h1>
      <p className="mt-2 text-white/50">We respond within minutes 9AM-10PM.</p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-[22px] border border-white/10 bg-[#12121A] p-8">
          <p className="text-xs tracking-widest font-bold text-[#FFC700]">FACEBOOK PAGE (FASTEST)</p>
          <p className="mt-3 font-mono text-lg font-bold">facebook.com/boostupph</p>
          <a href="https://www.facebook.com/boostupph" target="_blank" className="mt-5 inline-flex w-full justify-center rounded-xl bg-[#1877F2] py-3 font-bold">Open Facebook Page →</a>
          <p className="mt-4 text-xs text-white/40">Preferred for order inquiries, receipt issues, status updates.</p>
        </div>
        <div className="rounded-[22px] border border-white/10 bg-[#12121A] p-8">
          <p className="text-xs tracking-widest font-bold text-white/40">PAYMENT SUPPORT</p>
          <p className="mt-3 font-mono text-xl font-black">0932 536 1831</p>
          <p className="mt-1 text-sm text-white/50">GCash & PayMaya • Name: BoostUp PH</p>
          <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 text-xs leading-relaxed text-white/60">
            <p>• Send exact amount shown at checkout</p>
            <p>• Screenshot must show ref no., amount, time</p>
            <p>• No cropped/blurred images</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[22px] border border-white/10 bg-[#0E0E17] p-8">
        <h3 className="font-bold">Send us a message (form – placeholder for future)</h3>
        <div className="mt-6 grid gap-4">
          <input placeholder="Your Name" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
          <input placeholder="Your FB Link" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
          <textarea placeholder="Your message..." rows={4} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
          <button className="rounded-xl bg-white/10 py-3 font-bold text-white/60 cursor-not-allowed">Coming Soon – Use Facebook for now</button>
        </div>
      </div>
    </div>
  );
}
