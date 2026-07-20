import React, { useState, useMemo } from "react";
import { Leaf, ShoppingBag, X, Plus, Minus, Search, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Витамин D3 + K2",
    category: "Витамин",
    price: 45000,
    unit: "60 капсул",
    rating: 4.8,
    tag: "Их зарагддаг",
    blurb: "Ясны эрүүл мэнд, дархлаанд туслах өдөр тутмын хэрэглээ",
  },
  {
    id: 2,
    name: "Омега-3 загасны тос",
    category: "Витамин",
    price: 52000,
    unit: "90 капсул",
    rating: 4.7,
    tag: null,
    blurb: "Зүрх, тархины эрүүл мэндэд зориулсан цэвэр тос",
  },
  {
    id: 3,
    name: "Магни цитрат",
    category: "Витамин",
    price: 38000,
    unit: "60 таблетка",
    rating: 4.6,
    tag: null,
    blurb: "Булчин, мэдрэлийн тогтолцоог тайвшруулна",
  },
  {
    id: 4,
    name: "Пробиотик 20 тэрбум",
    category: "Гэдэс",
    price: 61000,
    unit: "30 капсул",
    rating: 4.9,
    tag: "Шинэ",
    blurb: "Гэдэсний микрофлорыг тэнцвэржүүлнэ",
  },
  {
    id: 5,
    name: "Коллаген пептид",
    category: "Гоо сайхан",
    price: 68000,
    unit: "300г нунтаг",
    rating: 4.5,
    tag: null,
    blurb: "Арьс, үс, хумсны эрүүл мэндэд",
  },
  {
    id: 6,
    name: "Ногоон цайны экстракт",
    category: "Байгалийн",
    price: 29000,
    unit: "60 капсул",
    rating: 4.4,
    tag: null,
    blurb: "Антиоксидант баялаг, метаболизмд туслана",
  },
  {
    id: 7,
    name: "Мелатонин 5мг",
    category: "Нойр",
    price: 24000,
    unit: "60 таблетка",
    rating: 4.6,
    tag: null,
    blurb: "Унтахад бэлтгэх, нойрны чанарыг сайжруулна",
  },
  {
    id: 8,
    name: "Электролит нунтаг",
    category: "Байгалийн",
    price: 33000,
    unit: "20 уут",
    rating: 4.7,
    tag: "Их зарагддаг",
    blurb: "Дасгалын дараах шингэн, эрдэс нөхөх",
  },
  {
    id: 9,
    name: "Аштваганда экстракт",
    category: "Байгалийн",
    price: 41000,
    unit: "90 капсул",
    rating: 4.5,
    tag: null,
    blurb: "Стресст дасан зохицоход туслах ургамлын ханд",
  },
];

const CATEGORIES = ["Бүгд", "Витамин", "Гэдэс", "Гоо сайхан", "Байгалийн", "Нойр"];

function formatPrice(n) {
  return n.toLocaleString("mn-MN") + "₮";
}

export default function HealthStore() {
  const [category, setCategory] = useState("Бүгд");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "Бүгд" || p.category === category;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [category, query]);

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((i) => i.qty > 0);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  function addToCart(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }
  function changeQty(id, delta) {
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + delta);
      return { ...c, [id]: next };
    });
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#FAF8F3", minHeight: "100vh", color: "#2B3A32" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .serif { font-family: 'Fraunces', serif; }
        button { font-family: inherit; cursor: pointer; }
        .card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(43,58,50,0.08); }
      `}</style>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "#FAF8F3", borderBottom: "1px solid #E5E1D6", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Leaf size={22} color="#8FA998" />
            <span className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Ургамал</span>
          </div>
          <div style={{ flex: 1, maxWidth: 400, position: "relative", display: "none" }} />
          <div style={{ flex: 1, maxWidth: 420, position: "relative" }}>
            <Search size={16} color="#8B9189" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Бүтээгдэхүүн хайх..."
              style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: 999, border: "1px solid #E5E1D6", background: "#fff", fontSize: 14, outline: "none" }}
            />
          </div>
          <button
            onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "#2B3A32", color: "#fff", border: "none", borderRadius: 999, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}
          >
            <ShoppingBag size={16} />
            Сагс
            {cartCount > 0 && (
              <span style={{ background: "#E8A87C", color: "#2B3A32", borderRadius: 999, fontSize: 11, fontWeight: 700, padding: "1px 7px" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 40px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 420px" }}>
          <div style={{ fontSize: 13, letterSpacing: 1, textTransform: "uppercase", color: "#8FA998", fontWeight: 600, marginBottom: 12 }}>
            Өдөр бүрийн эрүүл мэнд
          </div>
          <h1 className="serif" style={{ fontSize: 44, lineHeight: 1.15, fontWeight: 500, margin: "0 0 16px" }}>
            Бие махбодоо<br />дотроос нь тэтгэ
          </h1>
          <p style={{ fontSize: 16, color: "#5B655D", lineHeight: 1.6, maxWidth: 440, marginBottom: 24 }}>
            Лабораторийн шалгалт өнгөрсөн, цэвэр найрлагатай витамин, нэмэлт хоол — таны өдөр тутмын эрүүл мэндэд.
          </p>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#8FA998", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600 }}
          >
            Дэлгүүр үзэх
          </button>
        </div>
        <div style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 280, height: 280, borderRadius: "50%", background: "linear-gradient(135deg, #E9F0E7, #F4EADD)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={90} color="#8FA998" strokeWidth={1.2} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="products" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: category === c ? "1px solid #2B3A32" : "1px solid #E5E1D6",
                background: category === c ? "#2B3A32" : "#fff",
                color: category === c ? "#fff" : "#5B655D",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, paddingBottom: 60 }}>
          {filtered.map((p) => (
            <div key={p.id} className="card" style={{ background: "#fff", border: "1px solid #EDE9DE", borderRadius: 16, padding: 18, display: "flex", flexDirection: "column" }}>
              <div style={{ height: 120, borderRadius: 10, background: "linear-gradient(135deg, #F0F4EE, #FBF6EE)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, position: "relative" }}>
                <Leaf size={34} color="#B7C7B8" strokeWidth={1.3} />
                {p.tag && (
                  <span style={{ position: "absolute", top: 10, left: 10, background: "#E8A87C", color: "#2B3A32", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999 }}>
                    {p.tag}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: "#8FA998", fontWeight: 600, marginBottom: 4 }}>{p.category}</div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "#8B9189", marginBottom: 8, flex: 1 }}>{p.blurb}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#8B9189", marginBottom: 10 }}>
                <Star size={12} fill="#E8A87C" color="#E8A87C" />
                {p.rating} · {p.unit}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(p.price)}</span>
                <button
                  onClick={() => addToCart(p.id)}
                  style={{ background: "#2B3A32", color: "#fff", border: "none", borderRadius: 999, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}
                  aria-label={`${p.name} сагсанд нэмэх`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#8B9189" }}>
              Илэрц олдсонгүй. Өөр үг оруулж үзнэ үү.
            </div>
          )}
        </div>
      </section>

      {/* Cart drawer */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 30, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(43,58,50,0.35)" }} />
          <div style={{ position: "relative", width: 380, maxWidth: "90vw", background: "#FAF8F3", height: "100%", padding: 24, display: "flex", flexDirection: "column", boxShadow: "-8px 0 24px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span className="serif" style={{ fontSize: 20, fontWeight: 600 }}>Таны сагс</span>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none" }}>
                <X size={20} color="#2B3A32" />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.length === 0 && <div style={{ color: "#8B9189", fontSize: 14, marginTop: 40, textAlign: "center" }}>Сагс хоосон байна</div>}
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", border: "1px solid #EDE9DE", borderRadius: 12, padding: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: "#F0F4EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Leaf size={18} color="#B7C7B8" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#8B9189" }}>{formatPrice(item.price)}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ background: "#F0EFE8", border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: 13, fontWeight: 600, minWidth: 14, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ background: "#F0EFE8", border: "none", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 0 && (
              <div style={{ borderTop: "1px solid #E5E1D6", paddingTop: 16, marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 15 }}>
                  <span style={{ color: "#5B655D" }}>Нийт дүн</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(cartTotal)}</span>
                </div>
                <button style={{ width: "100%", background: "#8FA998", color: "#fff", border: "none", padding: "13px", borderRadius: 999, fontSize: 15, fontWeight: 600 }}>
                  Захиалга баталгаажуулах
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
