"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080e]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-xl bg-black ring-1 ring-white/10 group-hover:ring-[#FFC700]/30 transition">
            <img src="/logo.png" alt="BoostUp PH Logo" className="h-full w-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <p className="font-black tracking-tight leading-none text-[15px]">BOOSTUP<span className="text-[#FFC700]"> PH</span></p>
            <p className="text-[9px] tracking-[0.2em] text-white/50">LEVEL UP TO A BETTER YOU</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map(n => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-white/70 hover:text-white transition relative group">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#FFC700] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"><path d="M9 8h8l-1 9H8L9 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9.5" cy="19.5" r="1" fill="white"/><circle cx="15.5" cy="19.5" r="1" fill="white"/></svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFC700] px-1 text-[11px] font-black text-black">{count}</span>
            )}
          </button>

          <Link href="/admin" className="hidden sm:flex h-10 items-center rounded-xl bg-[#1A1A26] px-4 text-sm font-semibold border border-white/10 hover:bg-white/10 transition">Admin</Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10">
            <div className="space-y-1.5">
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}></div>
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? "opacity-0" : ""}`}></div>
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A12] px-4 py-4">
          <div className="flex flex-col gap-3">
            {nav.map(n => (
              <Link key={n.href} href={n.href} onClick={()=>setMobileOpen(false)} className="py-2 text-[15px] font-medium text-white/80">{n.label}</Link>
            ))}
            <Link href="/admin" className="mt-2 rounded-xl bg-[#FFC700] py-3 text-center font-bold text-black">Admin Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  );
}
