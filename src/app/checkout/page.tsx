"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ customerName: "", fbProfile: "", email: "", notes: "" });
  const [receiptUrl, setReceiptUrl] = useState("");
  const [receiptFilename, setReceiptFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg","image/png","image/jpg","application/pdf"];
    if (!allowed.includes(file.type) && file.type !== "image/jpeg" && !file.type.includes("png") && !file.type.includes("pdf")) {
      setError("Only JPG, PNG, PDF allowed"); return;
    }
    setUploading(true); setError("");
    const fd = new FormData(); fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setReceiptUrl(data.url);
      setReceiptFilename(file.name);
    } catch (err: any) {
      setError(err.message);
    } finally { setUploading(false); }
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.fbProfile) { setError("Name and Facebook profile link are required"); return; }
    if (!receiptUrl) { setError("Please upload payment receipt (JPG/PNG/PDF)"); return; }
    if (items.length===0) { setError("Cart empty"); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, totalAmount: total, receiptUrl, receiptFilename, cart: items })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      setSuccessId(data.orderId);
      clear();
    } catch (err:any) { setError(err.message); }
    finally { setSubmitting(false); }
  };

  if (successId) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-20 text-center">
        <div className="rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl">✓</div>
          <h1 className="mt-6 text-3xl font-black">Order Submitted!</h1>
          <p className="mt-3 text-white/60">Your order <span className="text-white font-mono font-bold">#{successId}</span> is now pending verification. We manually verify GCash/PayMaya payments within 1-3 hours.</p>
          <div className="mt-6 rounded-xl bg-black/40 border border-white/10 p-4 text-left text-sm">
            <p className="font-bold">What’s next?</p>
            <ul className="mt-2 space-y-1 text-white/60 list-disc pl-5">
              <li>We verify your receipt (do not send fake receipts)</li>
              <li>Order status changes to Verified → Processing</li>
              <li>Delivery in 12-48h, we’ll message your FB link</li>
            </ul>
          </div>
          <Link href="/shop" className="mt-8 inline-flex rounded-xl bg-[#FFC700] px-8 py-3 font-black text-black">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="text-3xl font-black tracking-tighter">Checkout 🧾</h1>
      <p className="mt-2 text-sm text-white/50">Review order • Send payment • Upload receipt • Submit</p>

      <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        {/* Form */}
        <div className="rounded-[22px] border border-white/10 bg-[#12121A] p-6 md:p-8">
          <h2 className="font-bold text-lg">Customer Information</h2>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-xs font-bold tracking-widest text-white/50">CUSTOMER NAME *</label>
              <input value={form.customerName} onChange={e=>setForm({...form,customerName:e.target.value})} placeholder="Juan Dela Cruz" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#FFC700]/50" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-white/50">FACEBOOK PROFILE LINK / USERNAME *</label>
              <input value={form.fbProfile} onChange={e=>setForm({...form,fbProfile:e.target.value})} placeholder="https://facebook.com/yourprofile" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#FFC700]/50" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold tracking-widest text-white/50">EMAIL (OPTIONAL)</label>
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@email.com" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#FFC700]/50" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-white/50">NOTES (OPTIONAL)</label>
                <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any special instructions?" className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#FFC700]/50" />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#FFC700]/20 bg-[#FFC700]/5 p-5">
            <h3 className="font-bold flex items-center gap-2">💳 Payment Instructions</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-black/50 border border-white/10 p-4">
                <p className="text-[11px] tracking-widest text-white/40">GCASH NUMBER</p>
                <p className="mt-1 font-mono text-lg font-black">09325361831</p>
              </div>
              <div className="rounded-xl bg-black/50 border border-white/10 p-4">
                <p className="text-[11px] tracking-widest text-white/40">PAYMAYA NUMBER</p>
                <p className="mt-1 font-mono text-lg font-black">09325361831</p>
              </div>
            </div>
            <ol className="mt-4 space-y-2 text-sm text-white/70 list-decimal pl-5">
              <li>Send the payment to the GCash or Paymaya number above.</li>
              <li>Take a clear screenshot of the successful payment.</li>
              <li>Upload the payment screenshot using the form below.</li>
              <li>Click "Submit Order."</li>
            </ol>
          </div>

          <div className="mt-8">
            <h3 className="font-bold">Upload Payment Receipt * (JPG/PNG/PDF)</h3>
            <div className="mt-3 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6">
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleUpload} className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-[#FFC700] file:px-4 file:py-2 file:text-sm file:font-bold file:text-black hover:file:brightness-110" />
              {uploading && <p className="mt-3 text-sm text-[#FFC700]">Uploading... please wait</p>}
              {receiptUrl && (
                <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-3">
                  <span className="text-emerald-400">✓</span>
                  <div><p className="text-sm font-bold text-emerald-300">Receipt uploaded</p><p className="text-xs text-white/50">{receiptFilename}</p></div>
                  <a href={receiptUrl} target="_blank" className="ml-auto text-xs underline">View</a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-500/25 bg-red-500/10 p-5">
            <p className="flex items-center gap-2 text-sm font-black text-red-300">⚠️ Important</p>
            <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-red-200/80 list-disc pl-5">
              <li>Do NOT upload fake, edited, or altered payment receipts.</li>
              <li>Orders with fake or edited receipts will be rejected immediately.</li>
              <li>Payments are manually verified before processing.</li>
              <li>Orders are processed only after payment has been confirmed.</li>
            </ul>
          </div>

          {error && <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-300">{error}</div>}

          <button onClick={handleSubmit} disabled={submitting || uploading} className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#FFD84D] to-[#FFC700] py-4 font-black text-black disabled:opacity-50 glow-gold">
            {submitting ? "Submitting Order..." : `Submit Order • ₱${total.toLocaleString()}`}
          </button>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-[22px] border border-white/10 bg-[#0E0E17] p-6">
          <h3 className="font-bold">Order Summary</h3>
          {items.length===0 ? <p className="mt-4 text-sm text-white/50">No items in cart. <Link href="/shop" className="text-[#FFC700] underline">Shop now</Link></p> : (
            <>
              <div className="mt-5 space-y-3">
                {items.map(i=>(
                  <div key={i.id} className="flex justify-between text-sm"><span className="text-white/70">{i.name} x{i.quantity}</span><span className="font-bold">₱{(i.price*i.quantity).toLocaleString()}</span></div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-4 flex justify-between"><span className="font-bold">Total</span><span className="text-xl font-black text-[#FFC700]">₱{total.toLocaleString()}</span></div>
              <p className="mt-3 text-[11px] text-white/40">Secure manual verification • 12-48h delivery</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
