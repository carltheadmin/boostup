"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, total, count } = useCart();

  return (
    <>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />}
      <div className={`fixed right-0 top-0 z-[70] flex h-full w-[92%] max-w-[420px] flex-col bg-[#0E0E17] border-l border-white/10 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h3 className="text-lg font-bold">Your Cart</h3>
            <p className="text-xs text-white/50">{count} items • Secure checkout</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-20 w-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-3xl">🛒</div>
              <p className="mt-4 font-semibold">Cart is empty</p>
              <p className="mt-1 text-sm text-white/50">Add some boosting services to get started</p>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="mt-6 rounded-xl bg-[#FFC700] px-6 py-3 text-sm font-bold text-black">Browse Shop</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFC700]/20 to-[#FFA600]/10 border border-[#FFC700]/20 text-sm font-black">FB</div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/50 truncate">{item.description.slice(0,60)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="h-7 w-7 rounded-lg bg-white/10 text-sm">-</button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="h-7 w-7 rounded-lg bg-white/10 text-sm">+</button>
                    <span className="ml-auto text-sm font-bold text-[#FFC700]">₱{item.price * item.quantity}</span>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start text-white/30 hover:text-red-400 text-xs">Remove</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#0A0A12] p-6">
            <div className="flex justify-between text-sm text-white/60"><span>Subtotal</span><span className="text-white font-bold text-lg">₱{total.toLocaleString()}</span></div>
            <p className="mt-1 text-[11px] text-white/40">GCash / PayMaya • Manual verification</p>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="mt-4 flex w-full justify-center rounded-xl bg-gradient-to-r from-[#FFD84D] to-[#FFC700] py-3.5 font-black text-black hover:brightness-110 transition glow-gold">Proceed to Checkout →</Link>
            <button onClick={() => setIsOpen(false)} className="mt-3 w-full text-center text-sm text-white/50 hover:text-white">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}
