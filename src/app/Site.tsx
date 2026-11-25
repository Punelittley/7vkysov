import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

export type SitePage = "home" | "menu" | "about" | "delivery";

type Category = "Роллы" | "Пицца" | "Горячее" | "Напитки";

type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  weight: string;
  price: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Филадельфия гриль",
    category: "Роллы",
    description: "Лосось, сливочный сыр, огурец, соус унаги",
    weight: "260 г · 8 шт.",
    price: 529,
    badge: "Хит",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Семь вкусов",
    category: "Роллы",
    description: "Лосось, тунец, креветка, авокадо и авторский соус",
    weight: "245 г · 8 шт.",
    price: 589,
    badge: "Выбор шефа",
    image:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Запечённый краб",
    category: "Роллы",
    description: "Снежный краб, сливочный сыр, огурец, яки-соус",
    weight: "280 г · 8 шт.",
    price: 469,
    image:
      "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Пепперони",
    category: "Пицца",
    description: "Пепперони, моцарелла и томатный соус на тонком тесте",
    weight: "30 см · 510 г",
    price: 619,
    badge: "Хит",
    image:
      "https://images.unsplash.com/photo-1564936281291-294551497d81?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Груша и горгонзола",
    category: "Пицца",
    description: "Груша, горгонзола, моцарелла, мёд и грецкий орех",
    weight: "30 см · 490 г",
    price: 689,
    image:
      "https://images.unsplash.com/photo-1724232822245-f430d53466e0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Рамен с курицей",
    category: "Горячее",
    description: "Насыщенный бульон, лапша, курица, яйцо и зелень",
    weight: "430 г",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Удон с говядиной",
    category: "Горячее",
    description: "Пшеничная лапша, говядина, овощи и соус терияки",
    weight: "350 г",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Цитрусовый лимонад",
    category: "Напитки",
    description: "Апельсин, лимон, лайм, мята и содовая",
    weight: "500 мл",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1642522538458-0ece1670d495?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = ["Всё меню", "Роллы", "Пицца", "Горячее", "Напитки"];

function Icon({
  name,
  size = 20,
}: {
  name: "cart" | "phone" | "pin" | "clock" | "arrow" | "close" | "minus" | "plus" | "check";
  size?: number;
}) {
  const paths = {
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />
        <path d="M3 4h2l2.5 11h11l2-7H7" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.9Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m15 8 4 4-4 4" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    plus: (
      <>
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Site({ page }: { page: SitePage }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Всё меню");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const visible =
    category === "Всё меню" ? products : products.filter((p) => p.category === category);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = useMemo(
    () =>
      Object.entries(cart).reduce(
        (sum, [id, quantity]) =>
          sum + (products.find((p) => p.id === Number(id))?.price ?? 0) * quantity,
        0,
      ),
    [cart],
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 1500 || subtotal === 0 ? 0 : 199;
  const total = subtotal - discount + delivery;

  const add = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  const change = (id: number, amount: number) =>
    setCart((current) => {
      const next = (current[id] ?? 0) + amount;
      const updated = { ...current };
      if (next <= 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });

  const goToMenu = () => {
    if (page !== "menu") {
      navigate("/menu");
      return;
    }
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`app-shell page-${page}`}>
      <header className="topbar">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="На главную">
            <span className="brand-mark">7</span>
            <span>
              <b>семь вкусов</b>
              <small>кафе · доставка</small>
            </span>
          </Link>
          <nav>
            <NavLink to="/" end>Главная</NavLink>
            <NavLink to="/menu">Меню</NavLink>
            <NavLink to="/about">О кафе</NavLink>
            <NavLink to="/delivery">Доставка</NavLink>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="header-actions">
            <a className="phone" href="tel:+79639011818">
              <Icon name="phone" size={18} />
              <span>8 963 901-18-18</span>
            </a>
            <button className="cart-button" onClick={() => setCartOpen(true)}>
              <Icon name="cart" />
              <span>Корзина</span>
              {count > 0 && <b>{count}</b>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="restaurant-hero hero-cinematic">
          <img
            className="hero-cinematic-image"
            src="/images/restaurant-table-hero.png"
            alt="Сервированный стол в тёплом интерьере ресторана Семь вкусов"
          />
          <div className="hero-cinematic-shade" />
          <div className="hero-cinematic-glow hero-glow-left" />
          <div className="hero-cinematic-glow hero-glow-right" />
          <div className="hero-cinematic-center">
            <span className="script">Здесь встречаются</span>
            <h1>
              Семь
              <em>вкусов</em>
            </h1>
            <p>Ресторан, в котором каждый вечер становится особенным</p>
            <div>
              <button className="primary-btn" onClick={goToMenu}>
                Смотреть меню <Icon name="arrow" />
              </button>
              <a href="tel:+79639011818">Забронировать стол</a>
            </div>
          </div>
          <div className="hero-cinematic-rail" aria-label="Популярные категории">
            {["Роллы", "Пицца", "Горячее"].map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  setCategory(item);
                  setTimeout(goToMenu, 0);
                }}
              >
                <span>0{index + 1}</span>
                {item}
              </button>
            ))}
          </div>
          <div className="hero-cinematic-bottom">
            <div>
              <strong>4.9</strong>
              <span>
                <b className="stars">★★★★★</b>
                <small>оценка гостей</small>
              </span>
            </div>
            <p>Открытая кухня · Тёплый зал · Доставка по городу</p>
            <button onClick={goToMenu} aria-label="Перейти к меню">
              <Icon name="arrow" size={22} />
            </button>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="container">
            <div className="section-heading center-heading">
              <h2>
                Что будете
                <br />
                <em>сегодня?</em>
              </h2>
            </div>
            <div className="menu-controls">
              <div className="category-bar">
                {categories.map((item, index) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    <span>0{index + 1}</span>
                    {item}
                  </button>
                ))}
              </div>
              <div className="menu-result">{visible.length} позиций</div>
            </div>
            <div className="product-grid">
              {visible.map((product, index) => (
                <article
                  className={`product-card ${category === "Всё меню" && index === 0 ? "featured-product" : ""}`}
                  key={product.id}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && <span className="badge">{product.badge}</span>}
                    <span className="weight">{product.weight}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-title">
                      <h3>{product.name}</h3>
                      <span>{product.category}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className="product-bottom">
                      <strong>{product.price} ₽</strong>
                      {cart[product.id] ? (
                        <div className="stepper">
                          <button onClick={() => change(product.id, -1)} aria-label="Уменьшить">
                            <Icon name="minus" size={17} />
                          </button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => change(product.id, 1)} aria-label="Увеличить">
                            <Icon name="plus" size={17} />
                          </button>
                        </div>
                      ) : (
                        <button className="add-btn" onClick={() => add(product.id)}>
                          Добавить <Icon name="plus" size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="signature-section">
          <div className="signature-orbit" />
          <div className="container signature-grid">
            <div className="signature-visual reveal">
              <div className="signature-image">
                <img
                  src="/images/signature-table.png"
                  alt="Авторские блюда ресторана Семь вкусов"
                  loading="lazy"
                />
              </div>
              <div className="signature-stamp">
                <span>7</span>
                <small>вкусов<br />в одном месте</small>
              </div>
              <div className="signature-caption">
                <span>Сезонное меню</span>
                <b>Обновляем сочетания,<br />сохраняем любимые вкусы</b>
              </div>
            </div>
            <div className="signature-copy reveal">
              <span className="script">Знакомое звучит по-новому</span>
              <h2>
                Один стол.
                <br />
                <em>Много историй.</em>
              </h2>
              <p>
                Мы собрали в меню то, что действительно любим сами: яркие роллы, пиццу из печи и
                горячие блюда, которые хочется разделить с близкими.
              </p>
              <div className="signature-values">
                {[
                  ["01", "Свежие продукты", "привозим каждый день"],
                  ["02", "Открытая кухня", "готовим у вас на глазах"],
                  ["03", "Авторская подача", "красиво до последней детали"],
                ].map(([number, title, text]) => (
                  <div key={number}>
                    <span>{number}</span>
                    <b>{title}</b>
                    <small>{text}</small>
                  </div>
                ))}
              </div>
              <button className="outline-btn" onClick={goToMenu}>
                Познакомиться с меню <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>

        <div className="taste-marquee" aria-hidden="true">
          <div>
            <span>Тёплые встречи</span><i>·</i>
            <span>Открытая кухня</span><i>·</i>
            <span>Любимые вкусы</span><i>·</i>
            <span>Каждый день</span><i>·</i>
            <span>Тёплые встречи</span><i>·</i>
            <span>Открытая кухня</span><i>·</i>
            <span>Любимые вкусы</span><i>·</i>
            <span>Каждый день</span><i>·</i>
          </div>
        </div>

        <section className="kitchen-showcase" id="cafe">
          <div className="container">
            <div className="kitchen-showcase-heading reveal">
              <div>
                <h2>
                  Здесь начинается
                  <br />
                  <em>ваш вкусный вечер</em>
                </h2>
              </div>
              <p>
                Знакомые блюда, сезонные идеи и тёплый зал —
                <br />
                собрали всё, ради чего хочется возвращаться.
              </p>
            </div>

            <article className="kitchen-feature reveal">
              <img
                src="/images/editorial-menu-table.png"
                alt="Фирменные блюда ресторана Семь вкусов"
                loading="lazy"
              />
              <div className="kitchen-feature-shade" />
              <div className="kitchen-feature-copy">
                <span>Сезонная коллекция · 2025</span>
                <h3>Фирменные блюда</h3>
                <p>Авторские сочетания, которые раскрываются с первой подачи.</p>
              </div>
              <button onClick={goToMenu} aria-label="Перейти к фирменным блюдам">
                <Icon name="arrow" size={24} />
              </button>
              <div className="kitchen-feature-index">01 / 04</div>
            </article>

            <div className="kitchen-cards">
              {[
                {
                  number: "02",
                  title: "Кухня",
                  note: "роллы · пицца · горячее",
                  image:
                    "https://images.unsplash.com/photo-1559183533-ee5f4826d3db?auto=format&fit=crop&w=1000&q=88",
                },
                {
                  number: "03",
                  title: "Открытый огонь",
                  note: "яркие вкусы от шефа",
                  image:
                    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
                },
                {
                  number: "04",
                  title: "Тёплый зал",
                  note: "встречи без повода",
                  image:
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=88",
                },
              ].map((item) => (
                <article className="kitchen-card reveal" key={item.number}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="kitchen-card-shade" />
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <small>{item.note}</small>
                  </div>
                  <button onClick={goToMenu} aria-label={`Открыть раздел ${item.title}`}>
                    <Icon name="arrow" size={20} />
                  </button>
                </article>
              ))}
            </div>

            <div className="kitchen-story reveal">
              <span className="script">Место, где хорошо</span>
              <h3>Заходите как к друзьям</h3>
              <p>
                Для неспешных обедов, семейных вечеров и встреч, которые хочется продлить. Готовим
                на открытой кухне, выбираем свежие продукты и помним, что особенно любят наши гости.
              </p>
              <div>
                <span><b>10:00–23:00</b> ежедневно</span>
                <span><b>4.9</b> оценка гостей</span>
                <a href="tel:+79639011818">
                  Забронировать стол <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="offer-section offer-full" id="delivery">
          <div className="offer-full-word" aria-hidden="true">ОБЕД</div>
          <div className="offer-full-copy">
            <span className="script">Каждый будний день</span>
            <h2>Большой обед.<br />Маленькая пауза.</h2>
            <p>Собрали полноценный ланч, чтобы ваш день стал вкуснее и немного спокойнее.</p>
            <button className="light-btn" onClick={goToMenu}>
              Выбрать обед <Icon name="arrow" />
            </button>
          </div>
          <div className="offer-full-time">
            <span>по будням</span>
            <b>12:00</b>
            <i>—</i>
            <b>15:00</b>
          </div>
          <div className="offer-full-note">
            <span>Новое меню</span>
            <b>каждую неделю</b>
          </div>
        </section>

        <section className="moments-section">
          <div className="container moments-heading reveal">
            <div>
              <h2>
                Ваши вкусные
                <br />
                <em>моменты</em>
              </h2>
            </div>
            <p>
              Можно долго рассказывать про уют.
              <br />
              Но лучше один раз заглянуть к нам.
            </p>
          </div>
          <div className="moments-track reveal">
            {[
              [
                "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=86",
                "Авторские роллы",
              ],
              [
                "https://images.unsplash.com/photo-1559183533-ee5f4826d3db?auto=format&fit=crop&w=900&q=86",
                "Пицца из печи",
              ],
              [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=86",
                "Тёплый зал",
              ],
              [
                "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=900&q=86",
                "Горячие блюда",
              ],
            ].map(([image, label], index) => (
              <figure key={label} className={`moment-card moment-${index + 1}`}>
                <img src={image} alt={label} loading="lazy" />
                <figcaption>
                  <span>0{index + 1}</span>
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="reviews-section">
          <div className="container">
            <div className="reviews-top reveal">
              <div>
                <span className="script">Говорят наши гости</span>
                <h2>
                  С любовью
                  <br />о «7 вкусах»
                </h2>
              </div>
              <div className="reviews-rating">
                <strong>4.9</strong>
                <span className="stars">★★★★★</span>
                <small>средняя оценка</small>
              </div>
            </div>
            <div className="reviews-grid">
              {[
                [
                  "Алина",
                  "Очень уютное место. Пицца горячая, роллы свежие, а персонал общается так, будто мы давно знакомы.",
                  "Семейный ужин",
                ],
                [
                  "Максим",
                  "Заходим на бизнес-ланч почти каждую неделю. Быстро, вкусно и порции действительно радуют.",
                  "Постоянный гость",
                ],
                [
                  "Ирина",
                  "Отмечали здесь день рождения. Всё подали вовремя, детям понравилось, а мы наконец спокойно отдохнули.",
                  "Праздник в кафе",
                ],
              ].map(([name, text, visit], index) => (
                <article
                  className="review-card reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={name}
                >
                  <span className="quote-mark">“</span>
                  <p>{text}</p>
                  <div>
                    <span className="review-avatar">{name[0]}</span>
                    <b>
                      {name}
                      <small>{visit}</small>
                    </b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section delivery-editorial">
          <div className="container delivery-editorial-grid">
            <div className="delivery-heading reveal">
              <span className="script">Привезём тепло</span>
              <h2>Из нашей<br />кухни —<br /><em>к вашему столу</em></h2>
              <p>
                Бережно готовим, красиво упаковываем и привозим горячим — так, будто вы заказали
                столик у себя дома.
              </p>
              <button onClick={goToMenu}>
                Перейти в меню <Icon name="arrow" size={18} />
              </button>
            </div>
            <div className="delivery-route">
              {[
                {
                  icon: "clock" as const,
                  number: "01",
                  title: "Готовим после заказа",
                  text: "Никаких заготовок. Только свежие блюда прямо с кухни.",
                  note: "Свежесть",
                },
                {
                  icon: "pin" as const,
                  number: "02",
                  title: "Везём по Белорецку",
                  text: "Доставка от 45 минут. При заказе от 1 500 ₽ — бесплатно.",
                  note: "Быстро",
                },
                {
                  icon: "check" as const,
                  number: "03",
                  title: "Оплата как удобно",
                  text: "Картой онлайн, через СБП или курьеру при получении.",
                  note: "Удобно",
                },
              ].map((item, index) => (
                <article
                  className="delivery-step reveal"
                  style={{ transitionDelay: `${index * 110}ms` }}
                  key={item.number}
                >
                  <span className="delivery-number">{item.number}</span>
                  <span className="delivery-icon"><Icon name={item.icon} size={23} /></span>
                  <div>
                    <small>{item.note}</small>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <Icon name="arrow" size={20} />
                </article>
              ))}
              <div className="delivery-promise reveal">
                <span>Бесплатно</span>
                <p>доставим заказ <b>от 1 500 ₽</b></p>
                <strong>0 ₽</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="restaurant-footer">
        <div className="footer-orbit footer-orbit-one" />
        <div className="footer-orbit footer-orbit-two" />
        <div className="container footer-invitation">
          <span className="script">До встречи в «7 вкусах»</span>
          <h2>
            Встретимся
            <br />
            <em>за столом?</em>
          </h2>
          <div>
            <a href="tel:+79639011818" className="footer-book">
              Забронировать стол <Icon name="arrow" />
            </a>
            <button onClick={goToMenu}>Заказать доставку</button>
          </div>
        </div>
        <div className="container footer-main">
          <div className="footer-identity">
            <div className="footer-logo">
              <span>7</span>
              <div>
                <b>семь вкусов</b>
                <small>ресторан · доставка</small>
              </div>
            </div>
            <p>Место для вкусных встреч, семейных вечеров и любимых блюд.</p>
          </div>
          <div className="footer-contact">
            <small>Связаться с нами</small>
            <a href="tel:+79639011818">8 963 901-18-18</a>
            <span>Каждый день · 10:00–23:00</span>
          </div>
          <div className="footer-location">
            <small>Мы рядом</small>
            <b>Белорецк</b>
            <span>Республика Башкортостан</span>
            <Link to="/about">
              Посмотреть ресторан <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="footer-nav">
            <small>Навигация</small>
            <button onClick={goToMenu}>Меню</button>
            <Link to="/about">О ресторане</Link>
            <Link to="/delivery">Доставка</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2025 Ресторан «7 вкусов»</span>
          <span>Создано с теплом в Белорецке</span>
          <span>Политика конфиденциальности</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={() => setCartOpen(false)}>
          <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div>
                <span className="script">Ваш заказ</span>
                <h2>Корзина</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Закрыть">
                <Icon name="close" />
              </button>
            </div>
            {count === 0 ? (
              <div className="empty-cart">
                <span>
                  <Icon name="cart" size={36} />
                </span>
                <h3>Здесь пока пусто</h3>
                <p>Добавьте блюда из меню — мы приготовим всё с пылу с жару.</p>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setCartOpen(false);
                    goToMenu();
                  }}
                >
                  Выбрать блюда
                </button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {products
                    .filter((p) => cart[p.id])
                    .map((product) => (
                      <div className="cart-item" key={product.id}>
                        <img src={product.image} alt="" />
                        <div>
                          <b>{product.name}</b>
                          <span>{product.price} ₽</span>
                          <div className="stepper">
                            <button onClick={() => change(product.id, -1)}>
                              <Icon name="minus" size={15} />
                            </button>
                            <span>{cart[product.id]}</span>
                            <button onClick={() => change(product.id, 1)}>
                              <Icon name="plus" size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="promo">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Промокод"
                  />
                  <button onClick={() => setPromoApplied(promo.trim().toLowerCase() === "вкусно")}>
                    {promoApplied ? <Icon name="check" size={18} /> : "Применить"}
                  </button>
                </div>
                {promo && !promoApplied && promo.toLowerCase() !== "вкусно" && (
                  <small className="promo-hint">Попробуйте промокод ВКУСНО</small>
                )}
                <div className="summary">
                  <p>
                    <span>Сумма</span>
                    <b>{subtotal} ₽</b>
                  </p>
                  {discount > 0 && (
                    <p className="discount">
                      <span>Скидка</span>
                      <b>−{discount} ₽</b>
                    </p>
                  )}
                  <p>
                    <span>Доставка</span>
                    <b>{delivery ? `${delivery} ₽` : "Бесплатно"}</b>
                  </p>
                  <div>
                    <span>Итого</span>
                    <strong>{total} ₽</strong>
                  </div>
                </div>
                <button className="primary-btn checkout-btn" onClick={() => setCheckout(true)}>
                  Оформить заказ <Icon name="arrow" />
                </button>
                <small className="payment-note">Оплата картой, через СБП или при получении</small>
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
                  <Icon name="check" size={34} />
                </span>
                <h2>Заказ принят!</h2>
                <p>Мы уже передали его на кухню и скоро позвоним, чтобы уточнить детали.</p>
                <button
                  className="primary-btn"
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
                <span className="script">Последний шаг</span>
                <h2>Оформление заказа</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setOrdered(true);
                  }}
                >
                  <label>
                    Ваше имя
                    <input required placeholder="Например, Анна" />
                  </label>
                  <label>
                    Телефон
                    <input required type="tel" placeholder="+7 (___) ___-__-__" />
                  </label>
                  <label>
                    Адрес доставки
                    <input required placeholder="Улица, дом, квартира" />
                  </label>
                  <div className="payment-choice">
                    <span>Способ оплаты</span>
                    <label>
                      <input type="radio" name="pay" defaultChecked /> Картой онлайн
                    </label>
                    <label>
                      <input type="radio" name="pay" /> СБП
                    </label>
                    <label>
                      <input type="radio" name="pay" /> При получении
                    </label>
                  </div>
                  <button className="primary-btn checkout-btn" type="submit">
                    Заказать на {total} ₽
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
            <Icon name="cart" /> {count} товара
          </span>
          <b>{total} ₽</b>
        </button>
      )}
    </div>
  );
}
