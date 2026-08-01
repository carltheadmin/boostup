import { db } from "@/db";
import { products } from "@/db/schema";

export const defaultProducts = [
  { name: "1,000 Facebook Followers", description: "High-quality FB followers, gradual delivery, no password needed. Perfect for new pages.", price: 100, badge: "Starter", category: "Followers" },
  { name: "2,500 Facebook Followers", description: "Boost credibility fast with 2.5k premium followers. Manual processing, 24-48h delivery.", price: 230, badge: "Popular", category: "Followers" },
  { name: "5,000 Facebook Followers", description: "Most ordered! 5k followers for serious growth. Safe & stable, money-back guarantee.", price: 450, badge: "Best Seller", category: "Followers" },
  { name: "10,000 Facebook Followers", description: "Go viral with 10k followers. Huge social proof, business-grade delivery.", price: 850, badge: "Best Value", category: "Followers" },
  { name: "20,000 Facebook Followers", description: "Enterprise growth package. 20k followers + priority support & refill guarantee.", price: 1600, badge: "Premium", category: "Followers" },
  { name: "1,000 Facebook Page Likes", description: "Real-looking page likes to increase trust and page authority.", price: 120, badge: "New", category: "Likes" },
  { name: "5,000 Facebook Page Likes", description: "5k page likes bundle for rapid page monetization qualification.", price: 500, badge: "Hot", category: "Likes" },
  { name: "1,000 Facebook Post Reactions", description: "Choose ❤️ 😆 😮 Mix reactions for viral posts. Instant start.", price: 80, badge: null, category: "Engagement" },
];

export async function ensureSeed() {
  try {
    const existing = await db.select().from(products).limit(1);
    if (existing.length === 0) {
      for (const p of defaultProducts) {
        await db.insert(products).values({
          name: p.name,
          description: p.description,
          price: p.price,
          badge: p.badge,
          category: p.category,
          platform: "facebook",
        });
      }
    }
  } catch (e) {
    console.error("seed error", e);
  }
}
