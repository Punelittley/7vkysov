import { useEffect, useMemo, useState } from "react";

type Category = "Все" | "Лимонады";

type SizeOption = {
  label: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  category: "Лимонады";
  description: string;
  price: number;
  image: string;
  badge?: string;
  sizes: SizeOption[];
};

const products: Product[] = [
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
];

const categories: Category[] = ["Все", "Лимонады"];

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
      initial[p.id] = p.sizes[0].label;
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
        const sizeOption = product.sizes.find((s) => s.label === sizeLabel) ?? product.sizes[0];
        const price = sizeOption.price;
        return {
          key,
          product,
          sizeLabel,
          price,
          quantity,
          itemTotal: price * quantity,
        };
      })
      .filter(Boolean) as {
        key: string;
        product: Product;
        sizeLabel: string;
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
            <small>кафе · доставка</small>
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
            <p>Освежающие авторские лимонады, любимые блюда и тёплая атмосфера для каждого гостя.</p>
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
              const activeSize = selectedSizes[product.id] || product.sizes[0].label;
              const sizeOption = product.sizes.find((s) => s.label === activeSize) ?? product.sizes[0];
              const currentPrice = sizeOption.price;
              const itemKey = `${product.id}:${activeSize}`;
              const inCartQty = cart[itemKey] ?? 0;

              return (
                <article className="product-card reveal" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span>{product.badge}</span>}
                  </div>
                  <div className="product-info">
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    {product.sizes.length > 1 && (
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
                      <strong>{currentPrice} ₽</strong>
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
            <p>Открытая кухня, понятные продукты и тёплый зал. Приходите на неспешный вечер или закажите любимое домой.</p>
            <a href="tel:+79639011818">
              Забронировать стол <Icon name="arrow" />
            </a>
          </div>
          <div className="photo-stack reveal">
            <figure>
              <img src="/images/signature-table.png" alt="Авторские напитки и блюда ресторана" />
            </figure>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=88"
                alt="Интерьер ресторана"
              />
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
            <p>Каждый вечер складывается из деталей: тёплого света, красивой подачи и освежающих напитков.</p>
          </div>
          <div className="gallery-window reveal">
            <div className="gallery-track">
              {[
                ["/images/lemonade-shimmering.jpg", "Мерцающий лимонад", "01"],
                ["https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=88", "Манго-маракуйя", "02"],
                ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=88", "Освежающий мохито", "03"],
                ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=88", "Тёплый зал", "04"],
                ["https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=88", "Ягодный микс", "05"],
                ["https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=88", "Облепиха-апельсин", "06"],
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
              <span>Свежие вкусы</span><i>·</i>
              <span>Авторские лимонады</span><i>·</i>
              <span>Тёплые встречи</span><i>·</i>
              <span>Каждый день</span><i>·</i>
              <span>Свежие вкусы</span><i>·</i>
              <span>Авторские лимонады</span><i>·</i>
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
              ["01", "Натуральные ингредиенты", "Используем свежие фрукты, ягоды, мяту и натуральные пюре."],
              ["02", "Авторские рецепты", "Каждый лимонад смешиваем индивидуально прямо перед подачей."],
              ["03", "Быстрая доставка", "Аккуратно упакуем в герметичные стаканы и привезём холодным."],
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
            <p>«Очень вкусные лимонады! Мерцающий просто восторг, дети были очарованы, а мохито идеально освежает в любую погоду».</p>
            <footer>
              <b>Алина</b>
              <span>Март 2025</span>
            </footer>
          </blockquote>
          <div className="review-note reveal">
            <span>Более 500 отзывов</span>
            <p>Спасибо, что выбираете нас для важных и обычных дней.</p>
          </div>
        </section>

        <section className="delivery reveal">
          <span>Доставка</span>
          <h2>Свежесть — к вашему столу</h2>
          <p>От 45 минут по Белорецку. Бесплатно при заказе от 1 500 ₽.</p>
          <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>
            Собрать заказ <Icon name="arrow" />
          </button>
        </section>
      </main>

      <footer id="contacts">
        <div>
          <a className="footer-brand" href="#top">7 вкусов</a>
          <p>Кафе и доставка любимых блюд и напитков</p>
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
                <p>Добавьте освежающие лимонады из меню — всё приготовим с любовью.</p>
                <button className="primary" onClick={() => setCartOpen(false)}>
                  Выбрать напитки
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
                        <span className="cart-item-size">{item.sizeLabel}</span>
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
                    <span>Напитки</span>
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
                <p>Мы получили ваш заказ и уже готовим освежающие напитки.</p>
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
