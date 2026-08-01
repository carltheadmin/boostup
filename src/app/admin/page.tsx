"use client";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  customerName: string;
  fbProfile: string;
  email: string | null;
  notes: string | null;
  totalAmount: number;
  receiptUrl: string;
  receiptFilename: string;
  status: string;
  createdAt: string;
  items: { productName: string; quantity: number; price: number }[];
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  badge: string | null;
};

const statuses = ["pending","verified","processing","completed","rejected"] as const;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newProd, setNewProd] = useState({ name:"", description:"", price:"", category:"Followers", badge:"" });
  const [tab, setTab] = useState<"orders"|"products">("orders");

  useEffect(() => {
    const saved = localStorage.getItem("boostup_admin_auth");
    if (saved === "ok") setAuthed(true);
  }, []);

  const login = () => {
    if (pw === "boostupadmin123" || pw === "admin123") {
      localStorage.setItem("boostup_admin_auth","ok");
      setAuthed(true);
    } else alert("Wrong password. Try: boostupadmin123");
  };

  const fetchAll = async () => {
    const o = await fetch(`/api/orders${q ? `?q=${q}` : ""}`).then(r=>r.json());
    if (Array.isArray(o)) setOrders(o);
    const p = await fetch("/api/products").then(r=>r.json());
    if (Array.isArray(p)) setProducts(p);
  };
  useEffect(()=>{ if(authed) fetchAll(); }, [authed]);

  const updateStatus = async (id:number, status:string) => {
    await fetch(`/api/orders/${id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ status }) });
    fetchAll();
  };
  const deleteOrder = async (id:number) => {
    if (!confirm("Delete order?")) return;
    await fetch(`/api/orders/${id}`, { method:"DELETE" });
    fetchAll();
  };

  const addProduct = async () => {
    if (!newProd.name || !newProd.price) return alert("Need name and price");
    await fetch("/api/products", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name:newProd.name, description:newProd.description || "Boost service", price: Number(newProd.price), category: newProd.category, badge: newProd.badge || null }) });
    setNewProd({ name:"", description:"", price:"", category:"Followers", badge:"" });
    fetchAll();
  };
  const deleteProd = async (id:number) => {
    if (!confirm("Delete product?")) return;
    await fetch(`/api/products/${id}`, { method:"DELETE" });
    fetchAll();
  };

  const filteredOrders = filterStatus==="all" ? orders : orders.filter(o=>o.status===filterStatus);

  if (!authed) {
    return (
      <div className="min-h-[80vh] grid place-items-center px-6">
        <div className="w-full max-w-[380px] rounded-[22px] border border-white/10 bg-[#12121A] p-8 text-center">
          <div className="mx-auto h-14 w-14 overflow-hidden rounded-xl bg-black"><img src="/logo.png" alt="BoostUp PH Admin Logo" className="h-full w-full object-cover" /></div>
          <h1 className="mt-6 text-xl font-black">Admin Access</h1>
          <p className="mt-2 text-sm text-white/50">Enter admin password to manage orders & products.</p>
          <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} type="password" placeholder="Admin password" className="mt-6 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm" />
          <button onClick={login} className="mt-3 w-full rounded-xl bg-[#FFC700] py-3 font-black text-black">Login to Dashboard</button>
          <p className="mt-4 text-[11px] text-white/30">Demo: boostupadmin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-xl bg-black object-cover" />
          <div><h1 className="text-xl font-black">BoostUp PH • Admin</h1><p className="text-xs text-white/50">{orders.length} orders • {products.length} products • Manual verification active</p></div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>{ localStorage.removeItem("boostup_admin_auth"); setAuthed(false); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">Logout</button>
          <button onClick={fetchAll} className="rounded-xl bg-white text-black px-4 py-2 text-sm font-bold">Refresh</button>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button onClick={()=>setTab("orders")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border ${tab==="orders" ? "bg-[#FFC700] text-black border-[#FFC700]" : "bg-white/5 border-white/10"}`}>📦 Orders ({orders.length})</button>
        <button onClick={()=>setTab("products")} className={`rounded-xl px-5 py-2.5 text-sm font-bold border ${tab==="products" ? "bg-[#FFC700] text-black border-[#FFC700]" : "bg-white/5 border-white/10"}`}>🛍️ Products ({products.length})</button>
      </div>

      {tab==="orders" ? (
        <>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchAll()} placeholder="Search name, FB link, order ID..." className="flex-1 rounded-xl border border-white/10 bg-[#12121A] px-4 py-3 text-sm" />
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="rounded-xl border border-white/10 bg-[#12121A] px-4 py-3 text-sm">
              <option value="all">All Status</option>{statuses.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={fetchAll} className="rounded-xl bg-[#FFC700] px-6 py-3 text-sm font-black text-black">Search</button>
          </div>

          <div className="mt-6 grid gap-4">
            {filteredOrders.length===0 ? <p className="py-20 text-center text-white/40">No orders yet. New orders will appear here with receipt.</p> : filteredOrders.map(o=>(
              <div key={o.id} className="rounded-[18px] border border-white/10 bg-[#12121A] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2"><span className="font-mono font-bold">#{o.id}</span><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${o.status==="pending"?"bg-yellow-500/20 text-yellow-300":o.status==="verified"?"bg-blue-500/20 text-blue-300":o.status==="processing"?"bg-purple-500/20 text-purple-300":o.status==="completed"?"bg-emerald-500/20 text-emerald-300":"bg-red-500/20 text-red-300"}`}>{o.status}</span><span className="text-xs text-white/40">{new Date(o.createdAt).toLocaleString()}</span></div>
                    <p className="mt-2 font-bold">{o.customerName} • <a href={o.fbProfile} target="_blank" className="text-[#FFC700] underline font-normal text-sm">{o.fbProfile.slice(0,40)}</a></p>
                    {o.email && <p className="text-xs text-white/50">{o.email} • {o.notes || ""}</p>}
                    <div className="mt-3 flex flex-wrap gap-1.5">{o.items.map((it,idx)=><span key={idx} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px]">{it.productName} x{it.quantity}</span>)}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-[#FFC700]">₱{o.totalAmount.toLocaleString()}</p>
                    <div className="mt-2 flex gap-1.5 justify-end">
                      <a href={o.receiptUrl} target="_blank" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold hover:bg-white/20">Open Receipt</a>
                      <button onClick={()=>deleteOrder(o.id)} className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300">Delete</button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={()=>updateStatus(o.id,"verified")} className="rounded-xl bg-blue-500 px-4 py-2 text-xs font-bold text-white">✓ Approve / Verified</button>
                  <button onClick={()=>updateStatus(o.id,"processing")} className="rounded-xl bg-purple-500 px-4 py-2 text-xs font-bold text-white">⚙️ Processing</button>
                  <button onClick={()=>updateStatus(o.id,"completed")} className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white">✅ Complete</button>
                  <button onClick={()=>updateStatus(o.id,"rejected")} className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white">✕ Reject</button>
                  <button onClick={()=>updateStatus(o.id,"pending")} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold">↩ Pending</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 grid lg:grid-cols-[360px_1fr] gap-6">
          <div className="rounded-[18px] border border-white/10 bg-[#12121A] p-6 h-fit">
            <h3 className="font-bold">Add New Product</h3>
            <div className="mt-4 grid gap-3">
              <input value={newProd.name} onChange={e=>setNewProd({...newProd,name:e.target.value})} placeholder="Service Name e.g., 1,000 Followers" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
              <textarea value={newProd.description} onChange={e=>setNewProd({...newProd,description:e.target.value})} placeholder="Description" rows={3} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input value={newProd.price} onChange={e=>setNewProd({...newProd,price:e.target.value})} placeholder="Price ₱" type="number" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
                <select value={newProd.category} onChange={e=>setNewProd({...newProd,category:e.target.value})} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm">
                  <option>Followers</option><option>Likes</option><option>Engagement</option><option>Views</option>
                </select>
              </div>
              <input value={newProd.badge} onChange={e=>setNewProd({...newProd,badge:e.target.value})} placeholder="Badge e.g., Best Seller (optional)" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm" />
              <button onClick={addProduct} className="rounded-xl bg-[#FFC700] py-3 font-black text-black">Add Product</button>
            </div>
          </div>

          <div className="grid gap-3">
            {products.map(p=>(
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#14141F] p-4">
                <div><p className="font-bold text-sm">{p.name} <span className="text-[#FFC700]">₱{p.price}</span> {p.badge && <span className="ml-2 rounded-full bg-[#FFC700]/20 px-2 py-0.5 text-[10px] text-[#FFC700]">{p.badge}</span>}</p><p className="text-xs text-white/50">{p.description.slice(0,80)}</p></div>
                <button onClick={()=>deleteProd(p.id)} className="ml-4 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
