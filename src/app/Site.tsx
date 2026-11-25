import { useEffect, useMemo, useState } from "react";

type Category = "Все" | "Паста" | "Лимонады" | "Десерты";

type SizeOption = {
  label: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  category: "Паста" | "Лимонады" | "Десерты";
  description: string;
  price: number;
  weight?: string;
  image: string;
  badge?: string;
  sizes?: SizeOption[];
};

const products: Product[] = [
  // Паста
  {
    id: 13,
    name: "Карбонара",
    category: "Паста",
    description: "Классическая паста с обжаренным беконом, нежным сливочным соусом, тёртым пармезаном и микрозеленью",
    price: 590,
    weight: "350 г",
    badge: "Хит",
    image: "/images/pasta-carbonara.jpg",
  },
  {
    id: 14,
    name: "Паста с курицей и грибами",
    category: "Паста",
    description: "Нежное филе цыплёнка, обжаренные шампиньоны, сливочный соус и ароматные итальянские травы",
    price: 580,
    weight: "350 г",
    badge: "Любимое",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 15,
    name: "Паста с лангустинами (с чёрными спагетти)",
    category: "Паста",
    description: "Эффектные чёрные спагетти с чернилами каракатицы, сочные лангустины, черри и пикантный соус",
    price: 880,
    weight: "310 г",
    badge: "Премиум",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 16,
    name: "Паста с кальмарами (с чёрными спагетти)",
    category: "Паста",
    description: "Чёрные спагетти с нежным тихоокеанским кальмаром, чесночными нотками и сливочно-томатным соусом",
    price: 730,
    weight: "350 г",
    badge: "Выбор шефа",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 17,
    name: "Паста с говядиной",
    category: "Паста",
    description: "Томлёная сочная говядина в насыщенном мясном соусе с прованскими травами и выдержанным пармезаном",
    price: 870,
    weight: "350 г",
    badge: "Сытно",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=1000&q=88",
  },

  // Лимонады
  {
    id: 1,
    name: "Манго-маракуйя",
    category: "Лимонады",
    description: "Спелое тропическое манго, сочная маракуйя, газированная основа и свежая мята",
    price: 280,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "300 мл", price: 280 },
      { label: "500 мл", price: 430 },
    ],
  },
  {
    id: 2,
    name: "Ягодный",
    category: "Лимонады",
    description: "Микс лесных ягод, малина, черника, лёгкая цитрусовая кислинка и дроблёный лёд",
    price: 250,
    badge: "Популярное",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "300 мл", price: 250 },
      { label: "500 мл", price: 380 },
    ],
  },
  {
    id: 3,
    name: "Облепиха-апельсин",
    category: "Лимонады",
    description: "Натуральная облепиха, свежевыжатый сок апельсина, тростниковый сахар и кубики льда",
    price: 250,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "300 мл", price: 250 },
      { label: "500 мл", price: 380 },
    ],
  },
  {
    id: 4,
    name: "Облепиха-груша",
    category: "Лимонады",
    description: "Сладкая десертная груша в гармоничном сочетании с яркой алтайской облепихой",
    price: 250,
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "300 мл", price: 250 },
      { label: "500 мл", price: 380 },
    ],
  },
  {
    id: 5,
    name: "Мерцающий",
    category: "Лимонады",
    description: "Волшебный мерцающий лимонад лазурного цвета с цитрусовым вкусом, долькой лимона и мятой",
    price: 200,
    badge: "Фирменный",
    image: "/images/lemonade-shimmering.jpg",
    sizes: [
      { label: "300 мл", price: 200 },
    ],
  },
  {
    id: 6,
    name: "Мохито",
    category: "Лимонады",
    description: "Освежающий классический микс: сочный лайм, мята, тростниковый сироп и газированная вода",
    price: 290,
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "300 мл", price: 290 },
      { label: "500 мл", price: 440 },
    ],
  },

  // Десерты
  {
    id: 7,
    name: "Чизкейк в ассортименте",
    category: "Десерты",
    description: "Нежнейший сливочный чизкейк с бархатистой текстурой (классический, шоколадный или ягодный)",
    price: 270,
    weight: "100 г",
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 8,
    name: "Легендарный штрудель классический с фруктами и орехами",
    category: "Десерты",
    description: "Тонкое хрустящее тесто, сочная фруктовая начинка с орехами и корицей. Подаётся с шариком мороженого",
    price: 420,
    weight: "200 г",
    badge: "Легендарный",
    image: "/images/strudel-classic.jpg",
  },
  {
    id: 9,
    name: "Легендарный штрудель с грушей и орехами",
    category: "Десерты",
    description: "Ароматный штрудель со спелой грушей, грецкими орехами и золотистой корочкой. Подаётся с мороженым",
    price: 420,
    weight: "200 г",
    badge: "Выбор гостей",
    image: "/images/strudel-classic.jpg",
  },
  {
    id: 10,
    name: "Венские вафли с мороженым",
    category: "Десерты",
    description: "Свежеиспечённые пышные венские вафли с хрустящей корочкой и шариком сливочного пломбира",
    price: 270,
    weight: "150 г",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Венские вафли с банановым мороженым и шоколадным топингом",
    category: "Десерты",
    description: "Золотистые тёплые вафли, нежное банановое мороженое и тёплый шоколадный топинг",
    price: 290,
    weight: "180 г",
    badge: "Сладко",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 12,
    name: "Венские вафли с клубничным мороженым и топингом",
    category: "Десерты",
    description: "Ароматные венские вафли, яркое клубничное мороженое и натуральный ягодный топинг",
    price: 290,
    weight: "180 г",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1000&q=88",
  },
];

const categories: Category[] = ["Все", "Паста", "Лимонады", "Десерты"];

function Icon({ name, size = 20 }: { name: "cart" | "arrow" | "close" | "minus" | "plus" | "check" | "phone" | "pin"; size?: number }) {
  const paths = {
    cart: <><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.5 11h11l2-7H7"/></>,
    arrow: <><path d="M5 12h14"/><path d="m15 8 4 4-4 4"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.9Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Site() {
  const [category, setCategory] = useState<Category>("Все");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    products.forEach((p) => {
      if (p.sizes && p.sizes.length > 0) {
        initial[p.id] = p.sizes[0].label;
      }
    });
    return initial;
  });

  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [payment, setPayment] = useState("card");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const visible = category === "Все" ? products : products.filter((p) => p.category === category);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([key, quantity]) => {
        const [idStr, sizeLabel] = key.split(":");
        const product = products.find((p) => p.id === Number(idStr));
        if (!product) return null;
        const sizeOption = product.sizes?.find((s) => s.label === sizeLabel);
        const price = sizeOption ? sizeOption.price : product.price;
        const displaySubtext = sizeOption ? sizeOption.label : product.weight;
        return {
          key,
          product,
          sizeLabel: displaySubtext,
          price,
          quantity,
          itemTotal: price * quantity,
        };
      })
      .filter(Boolean) as {
        key: string;
        product: Product;
        sizeLabel?: string;
        price: number;
        quantity: number;
        itemTotal: number;
      }[];
  }, [cart]);

  const count = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.itemTotal, 0), [cartItems]);
  const delivery = subtotal > 0 && subtotal < 1500 ? 199 : 0;
  const total = subtotal + delivery;

  const changeCart = (key: string, amount: number) => {
    setCart((current) => {
      const next = { ...current, [key]: (current[key] ?? 0) + amount };
      if (next[key] <= 0) delete next[key];
      return next;
    });
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span>7</span>
          <b>
            семь вкусов
            <small>кафе · паста · десерты · лимонады</small>
          </b>
        </a>
        <nav>
          <a href="#menu">Меню</a>
          <a href="#about">О нас</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <Icon name="cart" />
          <span>Корзина</span>
          {count > 0 && <b>{count}</b>}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <img src="/images/restaurant-table-hero.png" alt="Ужин в ресторане Семь вкусов" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <h1>
              Вкусные встречи<br />
              <em>начинаются здесь</em>
            </h1>
            <p>Горячая авторская паста, освежающие лимонады, фирменные десерты и уютная атмосфера.</p>
            <div>
              <a className="primary" href="#menu">
                Выбрать блюда <Icon name="arrow" />
              </a>
              <a className="text-link" href="tel:+79639011818">
                Забронировать стол
              </a>
            </div>
          </div>
          <div className="hero-meta">
            <span><b>4.9</b> оценка гостей</span>
            <span><b>45 мин</b> средняя доставка</span>
          </div>
        </section>

        <section className="menu" id="menu">
          <div className="section-head reveal" style={{ justifyContent: "center", textAlign: "center", marginBottom: "30px" }}>
            <div>
              <h2 style={{ textAlign: "center" }}>
                Что будете<br />
                <em>сегодня?</em>
              </h2>
            </div>
          </div>

          <div className="filters" style={{ justifyContent: "center" }}>
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visible.map((product) => {
              const hasSizes = (product.sizes?.length ?? 0) > 1;
              const activeSize = selectedSizes[product.id] || product.sizes?.[0]?.label;
              const sizeOption = product.sizes?.find((s) => s.label === activeSize);
              const currentPrice = sizeOption ? sizeOption.price : product.price;
              const itemKey = hasSizes ? `${product.id}:${activeSize}` : `${product.id}`;
              const inCartQty = cart[itemKey] ?? 0;

              return (
                <article className="product-card reveal" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span>{product.badge}</span>}
                  </div>
                  <div className="product-info">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <small>{product.category}</small>
                      {product.weight && (
                        <small style={{ color: "#71807b", fontWeight: 700 }}>{product.weight}</small>
                      )}
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    {hasSizes && product.sizes && (
                      <div className="size-selector">
                        {product.sizes.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            className={activeSize === s.label ? "active" : ""}
                            onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: s.label }))}
                          >
                            {s.label} · {s.price} ₽
                          </button>
                        ))}
                      </div>
                    )}

                    <div>
                      <strong>
                        {currentPrice} ₽
                        {product.weight && !hasSizes && (
                          <small style={{ fontSize: "12px", fontWeight: "normal", color: "#71807b", marginLeft: "4px" }}>
                            / {product.weight}
                          </small>
                        )}
                      </strong>

                      {inCartQty > 0 ? (
                        <div className="stepper">
                          <button onClick={() => changeCart(itemKey, -1)} aria-label="Уменьшить">
                            <Icon name="minus" size={16} />
                          </button>
                          <span>{inCartQty}</span>
                          <button onClick={() => changeCart(itemKey, 1)} aria-label="Увеличить">
                            <Icon name="plus" size={16} />
                          </button>
                        </div>
                      ) : (
                        <button className="add" onClick={() => changeCart(itemKey, 1)}>
                          В корзину <Icon name="plus" size={17} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="story" id="about">
          <div className="story-copy reveal">
            <h2>
              Место, куда<br />
              <em>хочется вернуться</em>
            </h2>
            <p>Открытая кухня, горячая паста, свежая выпечка и уютный зал. Приходите на вкусный вечер или заказывайте любимое домой.</p>
            <a href="tel:+79639011818">
              Забронировать стол <Icon name="arrow" />
            </a>
          </div>
          <div className="photo-stack reveal">
            <figure>
              <img src="/images/pasta-carbonara.jpg" alt="Паста Карбонара" />
            </figure>
            <figure>
              <img src="/images/strudel-classic.jpg" alt="Легендарный штрудель" />
            </figure>
          </div>
        </section>

        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="gallery-heading reveal">
            <div>
              <h2 id="gallery-title">
                Увидеть. Почувствовать.<br />
                <em>Попробовать.</em>
              </h2>
            </div>
            <p>Каждый вечер складывается из деталей: аппетитной горячей пасты, десертов и освежающих напитков.</p>
          </div>
          <div className="gallery-window reveal">
            <div className="gallery-track">
              {[
                ["/images/pasta-carbonara.jpg", "Паста Карбонара", "01"],
                ["/images/strudel-classic.jpg", "Горячий штрудель", "02"],
                ["/images/lemonade-shimmering.jpg", "Мерцающий лимонад", "03"],
                ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=88", "Паста с лангустинами", "04"],
                ["https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=88", "Манго-маракуйя", "05"],
                ["https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1000&q=88", "Венские вафли", "06"],
              ].map(([image, title, number], index) => (
                <figure className={`gallery-card gallery-card-${index + 1}`} key={title}>
                  <img src={image} alt={title} loading="lazy" />
                  <figcaption>
                    <span>{number}</span>
                    <b>{title}</b>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="gallery-ticker" aria-hidden="true">
            <div>
              <span>Горячая паста</span><i>·</i>
              <span>Свежая выпечка</span><i>·</i>
              <span>Авторские лимонады</span><i>·</i>
              <span>Тёплые встречи</span><i>·</i>
              <span>Горячая паста</span><i>·</i>
              <span>Свежая выпечка</span><i>·</i>
            </div>
          </div>
        </section>

        <section className="reasons">
          <div className="reasons-intro reveal">
            <h2>
              Всё, что важно<br />
              для хорошего вечера
            </h2>
          </div>
          <div className="reason-list">
            {[
              ["01", "Настоящая итальянская паста", "Готовим с правильной текстурой аль денте, нежными соусами и выдержанным пармезаном."],
              ["02", "Свежие морепродукты и мясо", "Лангустины, тихоокеанские кальмары, сочная говядина и отборный бекон."],
              ["03", "Бережная доставка", "Привезём пасту горячей в термоупаковке от 45 минут по Белорецку."],
            ].map(([number, title, text], index) => (
              <article className="reason reveal" style={{ transitionDelay: `${index * 90}ms` }} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Icon name="arrow" size={19} />
              </article>
            ))}
          </div>
        </section>

        <section className="reviews">
          <div className="reviews-score reveal">
            <span>4.9</span>
            <div>
              <b>★★★★★</b>
              <small>средняя оценка гостей</small>
            </div>
          </div>
          <blockquote className="reveal">
            <p>«Карбонара просто потрясающая — правильный соус, много сыра и хрустящий бекон! А чёрные спагетти с лангустинами выглядят как в дорогом ресторане».</p>
            <footer>
              <b>Михаил</b>
              <span>Ноябрь 2026</span>
            </footer>
          </blockquote>
          <div className="review-note reveal">
            <span>Более 500 отзывов</span>
            <p>Спасибо, что выбираете «7 вкусов» для вкусных обедов и ужинов.</p>
          </div>
        </section>

        <section className="delivery reveal">
          <span>Доставка</span>
          <h2>Горячее и свежее — к вашему столу</h2>
          <p>От 45 минут по Белорецку. Бесплатно при заказе от 1 500 ₽.</p>
          <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>
            Собрать заказ <Icon name="arrow" />
          </button>
        </section>
      </main>

      <footer id="contacts">
        <div>
          <a className="footer-brand" href="#top">7 вкусов</a>
          <p>Кафе и доставка любимых блюд, десертов и напитков</p>
        </div>
        <div>
          <small>Позвонить</small>
          <a href="tel:+79639011818">8 963 901-18-18</a>
          <span>Белорецк</span>
        </div>
        <div>
          <small>Мы рядом</small>
          <b><Icon name="pin" size={17} /> Белорецк</b>
          <span>Республика Башкортостан</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={() => setCartOpen(false)}>
          <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <h2>Корзина</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Закрыть">
                <Icon name="close" />
              </button>
            </div>

            {count === 0 ? (
              <div className="empty">
                <Icon name="cart" size={36} />
                <h3>Здесь пока пусто</h3>
                <p>Добавьте горячую пасту, десерты или напитки из меню.</p>
                <button className="primary" onClick={() => setCartOpen(false)}>
                  Выбрать позиции
                </button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.key}>
                      <img src={item.product.image} alt={item.product.name} />
                      <div>
                        <b>{item.product.name}</b>
                        {item.sizeLabel && (
                          <span className="cart-item-size">{item.sizeLabel}</span>
                        )}
                        <span>{item.price} ₽</span>
                        <div className="stepper">
                          <button onClick={() => changeCart(item.key, -1)} aria-label="Уменьшить">
                            <Icon name="minus" size={15} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeCart(item.key, 1)} aria-label="Увеличить">
                            <Icon name="plus" size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary">
                  <p>
                    <span>Позиции</span>
                    <b>{subtotal} ₽</b>
                  </p>
                  <p>
                    <span>Доставка</span>
                    <b>{delivery ? `${delivery} ₽` : "Бесплатно"}</b>
                  </p>
                  <div>
                    <span>Итого</span>
                    <strong>{total} ₽</strong>
                  </div>
                </div>

                <button className="primary wide" onClick={() => setCheckout(true)}>
                  Оформить заказ <Icon name="arrow" />
                </button>
                <small className="payment-note">Карта · СБП · наличные при получении</small>
              </>
            )}
          </aside>
        </div>
      )}

      {checkout && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <button
              className="modal-close"
              onClick={() => {
                setCheckout(false);
                setOrdered(false);
              }}
            >
              <Icon name="close" />
            </button>
            {ordered ? (
              <div className="success">
                <span>
                  <Icon name="check" size={30} />
                </span>
                <h2>Заказ оформлен!</h2>
                <p>Мы получили ваш заказ и уже готовим горячие блюда.</p>
                <button
                  className="primary"
                  onClick={() => {
                    setCheckout(false);
                    setCartOpen(false);
                    setOrdered(false);
                    setCart({});
                  }}
                >
                  Отлично
                </button>
              </div>
            ) : (
              <>
                <h2>Оформление</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOrdered(true);
                  }}
                >
                  <label>
                    Имя
                    <input required placeholder="Анна" />
                  </label>
                  <label>
                    Телефон
                    <input required type="tel" placeholder="+7 (___) ___-__-__" />
                  </label>
                  <label>
                    Адрес доставки
                    <input required placeholder="Улица, дом, квартира" />
                  </label>
                  <fieldset>
                    <legend>Способ оплаты</legend>
                    {[
                      ["card", "Картой онлайн", "МИР · Visa · Mastercard"],
                      ["sbp", "СБП", "По QR-коду"],
                      ["cash", "При получении", "Картой или наличными"],
                    ].map(([value, title, note]) => (
                      <label className={payment === value ? "selected" : ""} key={value}>
                        <input
                          type="radio"
                          name="payment"
                          value={value}
                          checked={payment === value}
                          onChange={(e) => setPayment(e.target.value)}
                        />
                        <span>
                          <b>{title}</b>
                          <small>{note}</small>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                  <button className="primary wide" type="submit">
                    Подтвердить заказ · {total} ₽
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {count > 0 && !cartOpen && (
        <button className="mobile-cart" onClick={() => setCartOpen(true)}>
          <span>
            <Icon name="cart" /> {count}
          </span>
          <b>{total} ₽</b>
        </button>
      )}
    </div>
  );
}
