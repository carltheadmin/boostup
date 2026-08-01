export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-16">
      <h1 className="text-3xl font-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-white/40">Last updated: January 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>BoostUp PH respects your privacy. We collect only data needed to fulfill your boosting orders.</p>
        <h3 className="font-bold text-white">Data We Collect</h3>
        <ul className="list-disc pl-6"><li>Customer name, Facebook profile link, email (optional), notes</li><li>Order details and uploaded payment receipts</li><li>No passwords, no private messages</li></ul>
        <h3 className="font-bold text-white">How We Use</h3><p>To verify GCash/PayMaya payments manually, process orders, contact you if issues arise. Receipts stored securely, accessible only to admin.</p>
        <h3 className="font-bold text-white">Security</h3><p>Receipts are stored in protected uploads. We manually check each. We never sell data.</p>
      </div>
    </div>
  );
}
