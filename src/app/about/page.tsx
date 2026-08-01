export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-16">
      <div className="rounded-[28px] border border-white/10 bg-[#12121A] p-8 md:p-12">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="BoostUp PH Logo" className="h-16 w-16 rounded-xl object-cover bg-black" />
          <div><h1 className="text-3xl font-black">About BoostUp PH</h1><p className="text-sm text-white/50">Level Up To A Better You • Since 2024</p></div>
        </div>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-white/70">
          <p><span className="text-white font-bold">BoostUp PH</span> is the Philippines’ most trusted social media boosting service. We started with one mission: make social growth affordable, safe, and real for Filipino creators, small businesses, and influencers.</p>
          <p>Unlike auto-bots that risk your account, we do <span className="text-[#FFC700] font-bold">100% manual order processing</span>. Every payment is verified by a real person. Every order is fulfilled carefully to protect your profile.</p>
          <h3 className="pt-4 text-white font-bold text-lg">Our Values</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="text-white">Trust:</span> 10,000+ completed orders, 4.9★ rating</li>
            <li><span className="text-white">Affordability:</span> Start at ₱100, cheapest in PH</li>
            <li><span className="text-white">Safety:</span> No password needed, no selling data</li>
            <li><span className="text-white">Transparency:</span> Manual verification, clear proof</li>
          </ul>
          <div className="mt-8 rounded-2xl bg-[#FFC700]/10 border border-[#FFC700]/20 p-5">
            <p className="font-bold text-[#FFC700]">Why gamers love us?</p>
            <p className="mt-2 text-sm">Our gaming-inspired brand means speed, leveling up, and victory. We designed BoostUp PH to feel like you’re powering up your social stats — XP boost for your Facebook!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
