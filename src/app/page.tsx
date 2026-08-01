"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product { id: number; name: string; description: string; price: number; badge?: string | null; category: string; }

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setProducts(d.slice(0,4)); });
  }, []);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
        <div className="absolute -top-32 left-1/2 h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FFC700]/15 via-transparent to-transparent blur-[80px]"></div>

        <div className="relative mx-auto max-w-[1280px] px-6 pt-14 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC700]/30 bg-[#FFC700]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#FFC700]">
                <span className="h-2 w-2 rounded-full bg-[#FFC700] animate-pulse"></span> TRUSTED BY 10,000+ FILIPINOS
              </div>
              <h1 className="mt-6 text-[40px] sm:text-[56px] font-black leading-[0.95] tracking-tighter">
                Fast, Affordable<br />
                <span className="text-gradient-gold">& Trusted</span><br />
                <span className="text-white">Social Media</span><br />
                <span className="text-white/60">Boosting Services</span>
              </h1>
              <p className="mt-6 text-[17px] leading-relaxed text-white/60 max-w-[540px]">
                Boost your social media presence with affordable and reliable services. Manual processing, secure GCash/PayMaya, fast delivery — level up today.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD84D] to-[#FFC700] px-8 py-4 text-[15px] font-black text-black glow-gold hover:brightness-110 transition">
                  Shop Now <span className="transition group-hover:translate-x-1">→</span>
                </Link>
                <a href="#why" className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-[14px] font-semibold hover:bg-white/[0.08] transition">How It Works</a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-[420px]">
                <div><p className="text-2xl font-black text-white">4.9/5</p><p className="text-[11px] text-white/50 tracking-widest uppercase">Trust Rating</p></div>
                <div><p className="text-2xl font-black text-white">15K+</p><p className="text-[11px] text-white/50 tracking-widest uppercase">Orders Done</p></div>
                <div><p className="text-2xl font-black text-[#FFC700]">24/7</p><p className="text-[11px] text-white/50 tracking-widest uppercase">Support</p></div>
              </div>
            </div>

            <div className="relative lg:pl-10">
              <div className="relative aspect-square max-w-[520px] mx-auto">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#FFC700]/20 to-transparent blur-2xl"></div>
                <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-[#15151F] to-[#0E0E14] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                  {/* Logo hero */}
                  <div className="rounded-[20px] bg-black p-5 flex items-center justify-center">
                    <img src="/logo.png" alt="BoostUp PH Official Logo" className="w-full max-w-[320px] object-contain float" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[11px] tracking-widest text-white/40">GCASH • PAYMAYA</p>
                      <p className="mt-1 font-mono font-bold">0932 536 1831</p>
                      <p className="mt-1 text-[10px] text-emerald-400 flex items-center gap-1"><span className="h-1.5 w-1.5 bg-emerald-400 rounded-full"></span> Verified payments only</p>
                    </div>
                    <div className="rounded-2xl border border-[#FFC700]/20 bg-[#FFC700]/10 p-4">
                      <p className="text-[11px] tracking-widest text-[#FFC700]/70">DELIVERY</p>
                      <p className="mt-1 text-sm font-bold">12-48 Hours</p>
                      <p className="mt-1 text-[11px] text-white/50">Manual processing</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#0A0A0F] p-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i=><div key={i} className="h-8 w-8 rounded-full border-2 border-[#15151F] bg-gradient-to-br from-white/20 to-white/5"></div>)}
                    </div>
                    <p className="text-xs text-white/60"><span className="text-white font-semibold">+2,341</span> happy customers this month</p>
                    <div className="ml-auto text-[#FFC700]">★★★★★</div>
                  </div>
                </div>

                {/* floating badges */}
                <div className="absolute -top-4 -right-2 rounded-xl border border-[#FFC700]/20 bg-[#11111A] px-3 py-2 text-[11px] font-bold shadow-xl rotate-3">⚡ INSTANT START</div>
                <div className="absolute -bottom-3 -left-3 rounded-xl border border-white/10 bg-[#11111A] px-3 py-2 text-[11px] font-bold shadow-xl -rotate-2">🛡️ 100% SAFE & SECURE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#FFC700] font-bold">WHY BOOSTUP PH</p>
            <h2 className="mt-3 text-3xl md:text-[36px] font-black tracking-tight leading-none">Built for creators who<br />want to <span className="text-[#FFC700]">level up fast.</span></h2>
          </div>
          <p className="max-w-[380px] text-sm text-white/50 leading-relaxed">We manually verify every payment and process every order — no bots, no fake receipts, just real growth you can trust.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: "⚡", title: "Fast Delivery", desc: "Orders start within minutes after verification. Most orders completed 12-48h.", color: "from-amber-400/20 to-orange-400/10" },
            { icon: "💰", title: "Affordable Prices", desc: "Cheapest in PH market. Start at ₱100 for 1,000 followers. Bulk discounts available.", color: "from-emerald-400/20 to-green-400/10" },
            { icon: "🔒", title: "Secure Payments", desc: "GCash & PayMaya only. Manual verification, encrypted storage, no data selling.", color: "from-blue-400/20 to-indigo-400/10" },
            { icon: "👁️", title: "Manual Order Processing", desc: "Every order reviewed by a real person. No automation that risks your account.", color: "from-purple-400/20 to-pink-400/10" },
            { icon: "💬", title: "Customer Support", desc: "Messenger support daily 9AM-10PM. We respond within minutes, not hours.", color: "from-pink-400/20 to-rose-400/10" },
            { icon: "🏆", title: "Why Choose Us", desc: "10K+ completed, 4.9★ rating, refill guarantee. The most trusted boosting in PH.", color: "from-[#FFC700]/20 to-yellow-400/10" },
          ].map(card => (
            <div key={card.title} className="group relative rounded-[20px] border border-white/[0.07] bg-[#11111A] p-6 hover:bg-[#181825] transition border-gradient">
              <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-xl">{card.icon}</div>
                <h3 className="mt-4 font-bold text-[16px]">{card.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="border-y border-white/[0.06] bg-[#0C0C13]">
        <div className="mx-auto max-w-[1280px] px-6 py-14">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Popular Boost Packages 🔥</h2>
            <Link href="/shop" className="text-sm font-semibold text-[#FFC700] hover:underline">View all →</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.map(p => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-[#14141F] p-5 hover:border-[#FFC700]/30 transition group">
                <div className="flex justify-between"><span className="text-[11px] px-2 py-1 rounded-full bg-[#FFC700]/15 text-[#FFC700] font-bold">{p.badge || p.category}</span><span className="text-[11px] text-white/30">FB</span></div>
                <h4 className="mt-4 font-bold leading-tight">{p.name}</h4>
                <p className="mt-2 text-xs text-white/50 line-clamp-2">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-[#FFC700]">₱{p.price}</p>
                  <Link href="/shop" className="rounded-xl bg-white/[0.06] px-4 py-2 text-xs font-bold hover:bg-white/[0.1]">Add →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* payment instructions teaser */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[24px] border border-[#FFC700]/20 bg-gradient-to-br from-[#FFC700]/10 to-transparent p-8">
            <p className="text-xs tracking-widest font-bold text-[#FFC700]">HOW TO ORDER</p>
            <h3 className="mt-3 text-2xl font-black">4 easy steps to level up</h3>
            <div className="mt-6 space-y-4">
              {[
                "Choose your package & add to cart",
                "Send GCash/PayMaya to 09325361831",
                "Upload clear payment screenshot",
                "We verify & start boosting (12-48h)"
              ].map((s,i) => (
                <div key={i} className="flex gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC700] text-black text-xs font-black">{i+1}</span><span className="text-sm text-white/70 pt-1">{s}</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/5 p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300">⚠️ Important Notice</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/70 list-disc pl-5 marker:text-red-400">
              <li>Do NOT upload fake, edited, or altered payment receipts.</li>
              <li>Orders with fake or edited receipts will be rejected immediately.</li>
              <li>Payments are manually verified before processing.</li>
              <li>Orders are processed only after payment has been confirmed.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
