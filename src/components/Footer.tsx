import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080e] mt-20">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
                <img src="/logo.png" alt="BoostUp PH Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-black leading-none">BOOSTUP<span className="text-[#FFC700]"> PH</span></p>
                <p className="text-[9px] tracking-[0.2em] text-white/50">LEVEL UP TO A BETTER YOU</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">Fast, affordable & trusted social media boosting services. Helping Filipino creators level up since 2024.</p>
            <div className="mt-5 flex gap-2">
              <a href="https://www.facebook.com/boostupph" target="_blank" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 hover:bg-[#1877F2] transition">
                <span className="text-sm font-bold">f</span>
              </a>
              <div className="flex h-9 items-center rounded-lg bg-[#FFC700]/10 px-3 text-xs font-bold text-[#FFC700] border border-[#FFC700]/20">100% Manual • Secure</div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold tracking-widest text-white/90">QUICK LINKS</p>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="/" className="hover:text-[#FFC700]">Home</Link></li>
              <li><Link href="/shop" className="hover:text-[#FFC700]">Shop</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC700]">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-[#FFC700]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold tracking-widest text-white/90">SUPPORT</p>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li><Link href="/contact" className="hover:text-[#FFC700]">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-[#FFC700]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#FFC700]">Terms of Service</Link></li>
              <li><a href="https://www.facebook.com/boostupph" target="_blank" className="hover:text-[#FFC700]">Facebook Page</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold tracking-widest text-white/90">PAYMENTS</p>
            <div className="rounded-xl border border-[#FFC700]/20 bg-[#FFC700]/5 p-4">
              <p className="text-xs text-white/60">GCash / PayMaya</p>
              <p className="mt-1 font-mono text-lg font-black text-white tracking-wider">0932 536 1831</p>
              <p className="mt-3 text-[11px] leading-relaxed text-white/40">Manual verification • Upload receipt after payment. No fake receipts.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-white/30">
          <p>© 2026 BoostUp PH. All Rights Reserved. Level Up To A Better You.</p>
          <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> All systems operational • Manual processing active</p>
        </div>
      </div>
    </footer>
  );
}
