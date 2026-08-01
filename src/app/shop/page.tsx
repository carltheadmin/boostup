"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product { id: number; name: string; description: string; price: number; badge?: string | null; category: string; }

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [qtys, setQtys] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch("/api/products").then(r=>r.json()).then(d=>{ if(Array.isArray(d)) setProducts(d); setLoading(false); });
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p=>p.category)))];
  const filtered = filter === "All" ? products : products.filter(p=>p.category===filter);

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Shop Boosts <span className="text-[#FFC700]">⚡</span></h1>
          <p className="mt-2 text-sm text-white/50">Choose your package • Manual processing • Secure GCash/PayMaya</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} onClick={()=>setFilter(c)} className={`rounded-xl px-4 py-2 text-sm font-semibold border transition ${filter===c ? "bg-[#FFC700] text-black border-[#FFC700]" : "bg-white/[0.05] border-white/10 text-white/60 hover:bg-white/[0.08]"}`}>{c}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3"><div className="h-48 animate-pulse bg-white/5 rounded-2xl"></div><div className="h-48 animate-pulse bg-white/5 rounded-2xl"></div><div className="h-48 animate-pulse bg-white/5 rounded-2xl"></div></div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => {
            const qty = qtys[p.id] || 1;
            return (
              <div key={p.id} className="group relative rounded-[22px] border border-white/10 bg-gradient-to-br from-[#171722] to-[#12121A] p-6 hover:border-[#FFC700]/30 transition-all hover:-translate-y-1">
                {p.badge && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-[#FFC700] px-3 py-1 text-[10px] font-black text-black tracking-widest">{p.badge.toUpperCase()}</div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFC700]/10 border border-[#FFC700]/20 text-[#FFC700] font-black text-sm">FB</div>
                  <span className="text-[11px] text-white/30 font-mono">#{p.id.toString().padStart(4,"0")}</span>
                </div>
                <h3 className="mt-5 text-[17px] font-bold leading-snug">{p.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50 min-h-[40px]">{p.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-2xl font-black text-[#FFC700]">₱{p.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 rounded-xl bg-black/60 border border-white/10 px-2 py-1">
                    <button onClick={()=>setQtys(s=>({...s,[p.id]: Math.max(1,(s[p.id]||1)-1)}))} className="h-7 w-7 rounded-lg bg-white/10">-</button>
                    <span className="w-6 text-center text-sm font-bold">{qty}</span>
                    <button onClick={()=>setQtys(s=>({...s,[p.id]:(s[p.id]||1)+1}))} className="h-7 w-7 rounded-lg bg-white/10">+</button>
                  </div>
                </div>

                <button
                  onClick={()=>addItem({ id: p.id, name: p.name, price: p.price, description: p.description }, qty)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-white to-white/90 py-3.5 text-sm font-black text-black hover:from-[#FFD84D] hover:to-[#FFC700] transition-all shimmer"
                >
                  <span>🛒</span> Add to Cart • ₱{(p.price*qty).toLocaleString()}
                </button>

                <div className="mt-3 flex items-center gap-2 text-[10px] text-white/30"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Manual processing • No password needed</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-16 rounded-[24px] border border-white/10 bg-[#0E0E17] p-8 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-lg">GCash / PayMaya Manual Verification</h3>
          <p className="mt-2 text-sm text-white/50">All payments are manually verified by our team. Upload a clear screenshot after sending payment to 09325361831. Fake receipts = instant rejection.</p>
        </div>
        <div className="rounded-xl bg-[#FFC700]/10 border border-[#FFC700]/20 p-4">
          <p className="text-xs text-[#FFC700]/70 tracking-widest font-bold">PAY TO</p>
          <p className="mt-1 font-mono text-xl font-black">0932 536 1831</p>
          <p className="text-xs text-white/40 mt-1">BoostUp PH • GCash & PayMaya accepted • Send exact amount</p>
        </div>
      </div>
    </div>
  );
}
