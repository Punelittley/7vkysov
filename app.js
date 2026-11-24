// app.js - Реальное меню кафе «Семь вкусов» (Белорецк, ул. Ленина, 38)

const products = [
  // --- ПИЦЦА ---
  {
    id: 101,
    name: "Пицца Мясное ассорти",
    category: "Пицца",
    description: "Ветчина, карбонад, колбаски салями, чесночный соус, моцарелла",
    weight: "Ø30 см (также Ø20 и Ø35)",
    price: 810,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 450 },
      { name: "Ø30 см", price: 810, default: true },
      { name: "Ø35 см", price: 890 }
    ]
  },
  {
    id: 102,
    name: "Пицца Пепперони",
    category: "Пицца",
    description: "Колбаски Пепперони, томатный соус, моцарелла",
    weight: "Ø30 см",
    price: 810,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1564936281291-294551497d81?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 470 },
      { name: "Ø30 см", price: 810, default: true },
      { name: "Ø35 см", price: 980 }
    ]
  },
  {
    id: 103,
    name: "Пицца Гурман",
    category: "Пицца",
    description: "Ветчина, карбонад, колбаски салями, шампиньоны, томатный соус, моцарелла",
    weight: "Ø30 см",
    price: 815,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 460 },
      { name: "Ø30 см", price: 815, default: true },
      { name: "Ø35 см", price: 980 }
    ]
  },
  {
    id: 104,
    name: "Пицца Мясная XXL",
    category: "Пицца",
    description: "Охотничьи колбаски, бекон, пепперони, фирменный соус, томатный соус, моцарелла",
    weight: "Ø30 см",
    price: 990,
    badge: "XXL Сытно",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 540 },
      { name: "Ø30 см", price: 990, default: true },
      { name: "Ø35 см", price: 1170 }
    ]
  },
  {
    id: 105,
    name: "Пицца Сырная",
    category: "Пицца",
    description: "Двойная порция моцареллы, кусочки брынзы, сырный соус",
    weight: "Ø30 см",
    price: 850,
    badge: "Сырная",
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 470 },
      { name: "Ø30 см", price: 850, default: true },
      { name: "Ø35 см", price: 1050 }
    ]
  },
  {
    id: 106,
    name: "Пицца Цыплёнок Барбекю",
    category: "Пицца",
    description: "Бекон, копчёная курочка, красный лук, соус барбекю, томатный соус, моцарелла",
    weight: "Ø30 см",
    price: 730,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 430 },
      { name: "Ø30 см", price: 730, default: true },
      { name: "Ø35 см", price: 890 }
    ]
  },
  {
    id: 107,
    name: "Пицца Чикита",
    category: "Пицца",
    description: "Копчёная курочка, шампиньоны, томат, моцарелла, томатный соус",
    weight: "Ø30 см",
    price: 715,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 430 },
      { name: "Ø30 см", price: 715, default: true },
      { name: "Ø35 см", price: 850 }
    ]
  },
  {
    id: 108,
    name: "Пицца Маргарита",
    category: "Пицца",
    description: "Томатный соус, нежная моцарелла, свежие сочные томаты",
    weight: "Ø30 см",
    price: 575,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 345 },
      { name: "Ø30 см", price: 575, default: true },
      { name: "Ø35 см", price: 670 }
    ]
  },
  {
    id: 109,
    name: "Пицца Гавайская",
    category: "Пицца",
    description: "Консервированные ананасы, копчёная курочка, моцарелла, томатный соус",
    weight: "Ø30 см",
    price: 695,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    sizes: [
      { name: "Ø20 см", price: 400 },
      { name: "Ø30 см", price: 695, default: true },
      { name: "Ø35 см", price: 850 }
    ]
  },

  // --- САЛАТЫ ---
  {
    id: 201,
    name: "Цезарь с курицей",
    category: "Салаты",
    description: "Хрустящий салат айсберг, нежное куриное филе, томаты черри, пармезан, гренки и соус цезарь",
    weight: "200 г",
    price: 650,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 202,
    name: "Цезарь с лососем",
    category: "Салаты",
    description: "Слабосоленый лосось, листья салата, томаты, сыр пармезан, чесночные крутоны, соус",
    weight: "200 г",
    price: 740,
    badge: "Премиум",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 203,
    name: "Цезарь с лангустинами",
    category: "Салаты",
    description: "Обжаренные лангустины, микс салата, соус цезарь, сыр пармезан, помидорки черри",
    weight: "200 г",
    price: 740,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 204,
    name: "Греческий салат",
    category: "Салаты",
    description: "Свежие огурцы, сладкий перец, спелые томаты, сыр фета, маслины, оливковое масло",
    weight: "200 г",
    price: 520,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 205,
    name: "Поке с лососем",
    category: "Салаты",
    description: "Охлажденный лосось, рис, бобы эдамаме, свежий огурец, яйцо, томаты, фирменная заправка",
    weight: "330 г",
    price: 740,
    badge: "Выбор шефа",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 206,
    name: "Салат с говядиной",
    category: "Салаты",
    description: "Нежная говядина, обжаренные грибы, болгарский перец, огурцы, томаты, листья салата, масляная заправка",
    weight: "160 г",
    price: 620,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },

  // --- ГОРЯЧЕЕ ---
  {
    id: 301,
    name: "Цыпленок по-тирольски",
    category: "Горячее",
    description: "Фирменный сочный цыпленок под пряным сливочным соусом с травами",
    weight: "400/30 г",
    price: 750,
    badge: "Фирменное",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 302,
    name: "Оджахури со свининой",
    category: "Горячее",
    description: "Традиционное грузинское блюдо: обжаренное сочное мясо со сладким луком, золотистым картофелем и зеленью",
    weight: "450 г",
    price: 750,
    badge: "Сытно",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 303,
    name: "Оджахури с курицей",
    category: "Горячее",
    description: "Нежное филе цыпленка с печеным картофелем, томатами, чесноком и кавказскими специями",
    weight: "450 г",
    price: 750,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 304,
    name: "Скоблянка с говядиной",
    category: "Горячее",
    description: "Тонкие ломтики отборной говядины, томленые с грибами и картофелем в сливочном соусе",
    weight: "400 г",
    price: 820,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 305,
    name: "Стейк из лосося",
    category: "Горячее",
    description: "Стейк на гриле или на пару на подушке из сочных овощей с соусом наршараб и долькой лимона",
    weight: "200/30/10 г",
    price: 1370,
    badge: "Премиум",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 306,
    name: "Судак Орли",
    category: "Горячее",
    description: "Филе нежного судака в пышном воздушном кляре с авторским соусом тар-тар",
    weight: "350 г",
    price: 740,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
  },

  // --- ПАСТА ---
  {
    id: 401,
    name: "Паста Карбонара",
    category: "Паста",
    description: "Классическая итальянская паста с обжаренной грудинкой, пармезаном и сливочно-желтковым соусом",
    weight: "350 г",
    price: 590,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 402,
    name: "Паста с курицей и грибами",
    category: "Паста",
    description: "Феттуччине с нежным филе цыпленка, лесными шампиньонами и сыром в густом сливочном соусе",
    weight: "350 г",
    price: 580,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 403,
    name: "Паста с лангустинами (черные спагетти)",
    category: "Паста",
    description: "Изысканные спагетти с чернилами каракатицы, крупными лангустинами и вялеными томатами",
    weight: "310 г",
    price: 880,
    badge: "Гурман",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
  },

  // --- СУПЫ ---
  {
    id: 501,
    name: "Солянка мясная Лучшая*",
    category: "Супы",
    description: "Насыщенная мясная сборная солянка с маслинами, каперсами, лимоном (*по мнению гостей кафе)",
    weight: "450 г",
    price: 510,
    badge: "Выбор гостей",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 502,
    name: "Борщ с гренками и салом",
    category: "Супы",
    description: "Наваристый домашний борщ из говядины, подается с хрустящими чесночными гренками и нежным салом",
    weight: "450 г",
    price: 480,
    image: "https://images.unsplash.com/photo-1578873375972-e1d51c360098?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 503,
    name: "Лапша куриная домашняя",
    category: "Супы",
    description: "Легкий прозрачный бульон с домашней лапшой, нежным цыпленком и свежей зеленью",
    weight: "450 г",
    price: 300,
    image: "https://images.unsplash.com/photo-1594756201795-6380622d07b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 504,
    name: "Грибной суп-пюре",
    category: "Супы",
    description: "Нежнейший крем-суп из шампиньонов и белых грибов со сливками и сухариками",
    weight: "370 г",
    price: 500,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },

  // --- ЗАКУСКИ & ГАРНИРЫ ---
  {
    id: 601,
    name: "Мясная тарелка",
    category: "Закуски",
    description: "Ассорти мясных деликатесов собственного приготовления, буженина, колбасы, соус",
    weight: "260 г",
    price: 860,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 602,
    name: "Сырная тарелка",
    category: "Закуски",
    description: "Благородные сорта сыров с грецкими орехами, цветочным мёдом и виноградом",
    weight: "150 г",
    price: 1130,
    image: "https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 603,
    name: "Картофель фри",
    category: "Закуски",
    description: "Золотистые хрустящие брусочки картофеля с морской солью",
    weight: "120 г",
    price: 225,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 604,
    name: "Овощи гриль",
    category: "Закуски",
    description: "Болгарский перец, баклажаны, цукини, томаты и сочные шампиньоны на мангале",
    weight: "300 г",
    price: 510,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80"
  },

  // --- ДЕСЕРТЫ ---
  {
    id: 701,
    name: "Легендарный штрудель с мороженым",
    category: "Десерты",
    description: "Теплый классический штрудель с яблоками, фруктами и корицей, подаётся с шариком сливочного мороженого",
    weight: "200 г",
    price: 420,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 702,
    name: "Венские вафли с мороженым",
    category: "Десерты",
    description: "Воздушные горячие венские вафли с мороженым и шоколадным топингом",
    weight: "150 г",
    price: 270,
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 703,
    name: "Чизкейк в ассортименте",
    category: "Десерты",
    description: "Классический сливочный чизкейк Нью-Йорк с ягодным соусом",
    weight: "100 г",
    price: 270,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },

  // --- НАПИТКИ ---
  {
    id: 801,
    name: "Лимонад Манго-Маракуйя",
    category: "Напитки",
    description: "Освежающий натуральный лимонад с тропическим пюре манго и маракуйи со льдом и мятой",
    weight: "500 мл",
    price: 430,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 802,
    name: "Морс фруктово-ягодный",
    category: "Напитки",
    description: "Домашний морс из спелых лесных ягод",
    weight: "0.9 л",
    price: 340,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 803,
    name: "Авторский чай Облепиха-апельсин",
    category: "Напитки",
    description: "Согревающий витаминный чай со свежей облепихой, апельсином и пряностями",
    weight: "650 мл",
    price: 370,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 804,
    name: "Кофе Капучино",
    category: "Напитки",
    description: "Ароматный эспрессо со взбитой бархатистой молочной пенкой",
    weight: "300 г",
    price: 260,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["Всё меню", "Пицца", "Салаты", "Горячее", "Паста", "Супы", "Закуски", "Десерты", "Напитки"];

let currentCategory = "Всё меню";
let cart = JSON.parse(localStorage.getItem("cafe_cart") || "{}");
let promo = "";
let promoApplied = false;
let broadcastChannel = null;

try {
  broadcastChannel = new BroadcastChannel("cafe_orders_channel");
} catch (e) {
  console.log("BroadcastChannel не поддерживается");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryBar();
  renderProducts();
  updateCartUI();
  setupScrollReveal();
});

function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  elements.forEach((el) => observer.observe(el));
}

function renderCategoryBar() {
  const container = document.getElementById("categoryBar");
  if (!container) return;

  container.innerHTML = categories
    .map(
      (cat, idx) => `
      <button class="${currentCategory === cat ? "active" : ""}" onclick="setCategoryFilter('${cat}')">
        <span>0${idx + 1}</span>${cat}
      </button>
    `
    )
    .join("");
}

window.setCategoryFilter = function (cat) {
  currentCategory = cat;
  renderCategoryBar();
  renderProducts();
};

window.goToMenu = function () {
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
};

function renderProducts() {
  const container = document.getElementById("productGrid");
  const countEl = document.getElementById("menuCount");
  if (!container) return;

  const visible =
    currentCategory === "Всё меню"
      ? products
      : products.filter((p) => p.category === currentCategory);

  if (countEl) countEl.textContent = `${visible.length} позиций`;

  container.innerHTML = visible
    .map((product, index) => {
      const isFeatured = currentCategory === "Всё меню" && index === 0;
      const countInCart = cart[product.id] || 0;

      const bottomHtml =
        countInCart > 0
          ? `
          <div class="stepper">
            <button onclick="changeQuantity(${product.id}, -1)" aria-label="Уменьшить">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /></svg>
            </button>
            <span>${countInCart}</span>
            <button onclick="changeQuantity(${product.id}, 1)" aria-label="Увеличить">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </button>
          </div>
        `
          : `
          <button class="add-btn" onclick="addToCart(${product.id})">
            Добавить
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
          </button>
        `;

      return `
      <article class="product-card ${isFeatured ? "featured-product" : ""}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}
          <span class="weight">${product.weight}</span>
        </div>
        <div class="product-info">
          <div class="product-title">
            <h3>${product.name}</h3>
            <span>${product.category}</span>
          </div>
          <p>${product.description}</p>
          <div class="product-bottom">
            <strong>${product.price} ₽</strong>
            ${bottomHtml}
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

// Корзина
window.addToCart = function (id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderProducts();
  updateCartUI();
};

window.changeQuantity = function (id, delta) {
  const current = cart[id] || 0;
  const next = current + delta;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
  saveCart();
  renderProducts();
  updateCartUI();
};

function saveCart() {
  localStorage.setItem("cafe_cart", JSON.stringify(cart));
}

function getCartCalculations() {
  const count = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, q]) => {
    const prod = products.find((p) => p.id === Number(id));
    return sum + (prod ? prod.price * q : 0);
  }, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 1500 || subtotal === 0 ? 0 : 199;
  const total = subtotal - discount + delivery;
  return { count, subtotal, discount, delivery, total };
}

function updateCartUI() {
  const calc = getCartCalculations();

  // Бейдж в шапке
  const headerBadge = document.getElementById("headerCartBadge");
  if (headerBadge) {
    headerBadge.textContent = calc.count;
    headerBadge.style.display = calc.count > 0 ? "grid" : "none";
  }

  // Плавающая мобильная корзина
  const mobileBtn = document.getElementById("mobileCartBtn");
  if (mobileBtn) {
    mobileBtn.style.display = calc.count > 0 ? "flex" : "none";
    document.getElementById("mobileCartCount").textContent = `${calc.count} блюд`;
    document.getElementById("mobileCartTotal").textContent = `${calc.total} ₽`;
  }

  // Контент в Drawer
  const container = document.getElementById("cartContentWrap");
  if (!container) return;

  if (calc.count === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <span>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M3 4h2l2.5 11h11l2-7H7" /></svg>
        </span>
        <h3>Здесь пока пусто</h3>
        <p>Добавьте блюда из меню кафе «Семь вкусов» — приготовим из свежих продуктов.</p>
        <button class="primary-btn" onclick="closeCart(); goToMenu();">
          Выбрать блюда
        </button>
      </div>
    `;
  } else {
    const itemsHtml = Object.entries(cart)
      .map(([id, q]) => {
        const product = products.find((p) => p.id === Number(id));
        if (!product) return "";
        return `
        <div class="cart-item">
          <img src="${product.image}" alt="" />
          <div>
            <b>${product.name}</b>
            <span>${product.price} ₽</span>
            <div class="stepper">
              <button onclick="changeQuantity(${product.id}, -1)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /></svg>
              </button>
              <span>${q}</span>
              <button onclick="changeQuantity(${product.id}, 1)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    container.innerHTML = `
      <div class="cart-list">${itemsHtml}</div>
      <div class="promo">
        <input id="promoInput" value="${promo}" placeholder="Промокод" oninput="promo = this.value" />
        <button onclick="applyPromo()">
          ${promoApplied ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6" /></svg>` : "Применить"}
        </button>
      </div>
      ${promo && !promoApplied && promo.toLowerCase() !== "вкусно" ? `<small class="promo-hint">Попробуйте промокод ВКУСНО</small>` : ""}
      
      <div class="summary">
        <p>
          <span>Сумма</span>
          <b>${calc.subtotal} ₽</b>
        </p>
        ${calc.discount > 0 ? `<p class="discount"><span>Скидка</span><b>−${calc.discount} ₽</b></p>` : ""}
        <p>
          <span>Доставка</span>
          <b>${calc.delivery ? `${calc.delivery} ₽` : "Бесплатно"}</b>
        </p>
        <div>
          <span>Итого</span>
          <strong>${calc.total} ₽</strong>
        </div>
      </div>
      <button class="primary-btn checkout-btn" onclick="openCheckout()">
        Оформить заказ
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14" /><path d="m15 8 4 4-4 4" /></svg>
      </button>
      <small class="payment-note">Оплата наличными или картой при получении</small>
    `;
  }
}

window.applyPromo = function () {
  if (promo.trim().toLowerCase() === "вкусно") {
    promoApplied = true;
  } else {
    promoApplied = false;
  }
  updateCartUI();
};

window.openCart = function () {
  document.getElementById("cartOverlay").style.display = "block";
};

window.closeCart = function () {
  document.getElementById("cartOverlay").style.display = "none";
};

window.openCheckout = function () {
  closeCart();
  const calc = getCartCalculations();
  document.getElementById("checkoutTotalSum").textContent = `${calc.total} ₽`;
  document.getElementById("checkoutFormBlock").style.display = "block";
  document.getElementById("checkoutSuccessBlock").style.display = "none";
  document.getElementById("checkoutOverlay").style.display = "flex";
};

window.closeCheckout = function () {
  document.getElementById("checkoutOverlay").style.display = "none";
};

// Отправка заказа
window.handleOrderSubmit = function (e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const calc = getCartCalculations();
  const orderNumber = Math.floor(100 + Math.random() * 900);

  const orderItems = Object.entries(cart).map(([id, q]) => {
    const p = products.find((item) => item.id === Number(id));
    return {
      name: p ? p.name : "Блюдо",
      price: p ? p.price : 0,
      count: q,
      variant: p ? p.weight : "",
    };
  });

  const orderData = {
    id: Date.now(),
    orderNumber: `#${orderNumber}`,
    createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    timestamp: Date.now(),
    customer: {
      name,
      phone,
      address,
      type: "Доставка (Белорецк)",
      comment: "Оплата курьеру при получении",
    },
    items: orderItems,
    total: calc.total,
    payment: {
      method: "Оплата при получении (наличными или картой)",
      status: "ОПЛАТА ПРИ ПОЛУЧЕНИИ",
      isPaid: false,
    },
    status: "new",
  };

  // 1. Сохраняем в localStorage для планшета
  const existingOrders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");
  existingOrders.unshift(orderData);
  localStorage.setItem("cafe_orders", JSON.stringify(existingOrders));

  // 2. Отправляем в BroadcastChannel
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: "NEW_ORDER", order: orderData });
    } catch (err) {
      console.error(err);
    }
  }

  // 3. Очищаем корзину
  cart = {};
  saveCart();
  renderProducts();
  updateCartUI();

  // 4. Показываем успех
  document.getElementById("checkoutFormBlock").style.display = "none";
  document.getElementById("checkoutSuccessBlock").style.display = "block";
  document.getElementById("successOrderNum").textContent = `#${orderNumber}`;
};

window.finishOrder = function () {
  closeCheckout();
};
