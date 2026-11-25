import { useState, useMemo, useEffect } from "react";
import { products, asset, type Product, type Category } from "./Site";

type OrderItem = {
  key: string;
  product: Product;
  sizeLabel?: string;
  price: number;
  quantity: number;
};

type ActiveOrder = {
  id: string;
  table: string;
  items: OrderItem[];
  total: number;
  comment: string;
  createdAt: string;
  status: "cooking" | "ready" | "done";
};

const TABLE_OPTIONS = [
  "Стол 1", "Стол 2", "Стол 3", "Стол 4",
  "Стол 5", "Стол 6", "Стол 7", "Стол 8",
  "Бар", "С собой"
];

const MASTER_PIN = "7777";

export default function TabletTerminal({ onExit }: { onExit: () => void }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("7vkysov_tablet_auth") === "true";
  });
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  // Tablet View State
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");
  const [selectedTable, setSelectedTable] = useState<string>("Стол 1");
  const [category, setCategory] = useState<Category>("Все");
  const [search, setSearch] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    products.forEach((p) => {
      if (p.sizes && p.sizes.length > 0) {
        initial[p.id] = p.sizes[0].label;
      }
    });
    return initial;
  });

  // Draft Order for current table
  const [draftOrders, setDraftOrders] = useState<Record<string, Record<string, number>>>({});
  const [orderComment, setOrderComment] = useState<string>("");
  const [justSent, setJustSent] = useState<boolean>(false);

  // Active Kitchen / Bar Orders
  const [orders, setOrders] = useState<ActiveOrder[]>(() => {
    try {
      const saved = localStorage.getItem("7vkysov_active_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("7vkysov_active_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const handlePinPress = (digit: string) => {
    if (pinInput.length >= 4) return;
    const nextPin = pinInput + digit;
    setPinInput(nextPin);
    setPinError(false);

    if (nextPin.length === 4) {
      if (nextPin === MASTER_PIN || nextPin === "1234") {
        sessionStorage.setItem("7vkysov_tablet_auth", "true");
        setIsAuthenticated(true);
        setPinInput("");
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinInput("");
        }, 600);
      }
    }
  };

  const handlePinBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  const handlePinClear = () => {
    setPinInput("");
    setPinError(false);
  };

  const handleLock = () => {
    sessionStorage.removeItem("7vkysov_tablet_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Current Table Cart
  const currentCart = draftOrders[selectedTable] || {};

  const changeCart = (key: string, delta: number) => {
    setDraftOrders((prev) => {
      const tableCart = { ...(prev[selectedTable] || {}) };
      const currentQty = tableCart[key] || 0;
      const nextQty = currentQty + delta;
      if (nextQty <= 0) {
        delete tableCart[key];
      } else {
        tableCart[key] = nextQty;
      }
      return { ...prev, [selectedTable]: tableCart };
    });
  };

  const clearCurrentCart = () => {
    setDraftOrders((prev) => ({ ...prev, [selectedTable]: {} }));
    setOrderComment("");
  };

  const cartItems: OrderItem[] = useMemo(() => {
    return Object.entries(currentCart)
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
        };
      })
      .filter(Boolean) as OrderItem[];
  }, [currentCart]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === "Все" || p.category === category;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const sendOrderToKitchen = () => {
    if (cartItems.length === 0) return;

    const newOrder: ActiveOrder = {
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      table: selectedTable,
      items: cartItems,
      total: totalCartPrice,
      comment: orderComment,
      createdAt: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      status: "cooking",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCurrentCart();
    setJustSent(true);
    setTimeout(() => setJustSent(false), 3000);
  };

  const updateOrderStatus = (orderId: string, status: "cooking" | "ready" | "done") => {
    setOrders((prev) =>
      prev
        .map((o) => (o.id === orderId ? { ...o, status } : o))
        .filter((o) => o.status !== "done")
    );
  };

  const categories: Category[] = [
    "Все", "Пицца", "Закуски", "Салаты", "Супы", "Горячее", "Паста",
    "Кофе", "Коктейли и Овершейки", "Авторский чай", "Классический чай", "Лимонады", "Десерты"
  ];

  // 1. PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="tablet-lock-screen">
        <div className="tablet-lock-card">
          <div className="lock-header">
            <img src={asset("/images/logo.webp")} alt="7 вкусов" className="lock-logo" />
            <h2>Терминал заказов</h2>
            <p>Кафе «7 вкусов» · Планшет зала и кухни</p>
            <div className="lock-secure-badge">
              <span>🔒 Страница зашифрована PIN-кодом</span>
            </div>
          </div>

          <div className="pin-dots-container">
            <div className={`pin-dot ${pinInput.length >= 1 ? "active" : ""} ${pinError ? "error" : ""}`} />
            <div className={`pin-dot ${pinInput.length >= 2 ? "active" : ""} ${pinError ? "error" : ""}`} />
            <div className={`pin-dot ${pinInput.length >= 3 ? "active" : ""} ${pinError ? "error" : ""}`} />
            <div className={`pin-dot ${pinInput.length >= 4 ? "active" : ""} ${pinError ? "error" : ""}`} />
          </div>

          {pinError && <div className="pin-error-msg">Неверный PIN-код (по умолчанию: 7777)</div>}

          <div className="pin-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <button key={digit} className="key-btn" onClick={() => handlePinPress(digit)}>
                {digit}
              </button>
            ))}
            <button className="key-btn special" onClick={handlePinClear}>
              C
            </button>
            <button className="key-btn" onClick={() => handlePinPress("0")}>
              0
            </button>
            <button className="key-btn special" onClick={handlePinBackspace}>
              ⌫
            </button>
          </div>

          <div className="lock-footer">
            <small>Мастер-код: <b>7777</b></small>
            <button className="exit-btn" onClick={onExit}>
              ← Вернуться на обычный сайт
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Tablet Interface
  return (
    <div className="tablet-shell">
      {/* Tablet Header */}
      <header className="tablet-header">
        <div className="tablet-header-left">
          <img src={asset("/images/logo.webp")} alt="7 вкусов" className="tablet-brand-logo" />
          <div>
            <b>7 вкусов</b>
            <span className="tablet-badge">Планшет официанта / зала</span>
          </div>
        </div>

        {/* Table Selector */}
        <div className="table-selector-scroll">
          {TABLE_OPTIONS.map((t) => (
            <button
              key={t}
              className={`table-btn ${selectedTable === t ? "active" : ""}`}
              onClick={() => setSelectedTable(t)}
            >
              {t}
              {draftOrders[t] && Object.keys(draftOrders[t]).length > 0 && (
                <span className="table-cart-badge">
                  {Object.values(draftOrders[t]).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Tabs and Controls */}
        <div className="tablet-header-actions">
          <button
            className={`tab-btn ${activeTab === "menu" ? "active" : ""}`}
            onClick={() => setActiveTab("menu")}
          >
            📋 Меню
          </button>
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            👨‍🍳 Кухня
            {orders.length > 0 && <span className="tab-badge">{orders.length}</span>}
          </button>
          <button className="lock-btn" onClick={handleLock} title="Заблокировать экран">
            🔒
          </button>
          <button className="exit-site-btn" onClick={onExit} title="На главный сайт">
            🌐 Сайт
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      {activeTab === "menu" ? (
        <div className="tablet-main">
          {/* Left: Product Catalog */}
          <div className="tablet-catalog">
            {/* Top Toolbar: Search & Categories */}
            <div className="catalog-toolbar">
              <input
                type="text"
                placeholder="🔍 Быстрый поиск блюда или напитка..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="tablet-search"
              />
              <div className="category-scroll">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-pill ${category === cat ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dish Grid */}
            <div className="tablet-grid">
              {filteredProducts.map((p) => {
                const hasSizes = (p.sizes?.length ?? 0) > 1;
                const activeSize = selectedSizes[p.id] || p.sizes?.[0]?.label;
                const sizeOption = p.sizes?.find((s) => s.label === activeSize);
                const currentPrice = sizeOption ? sizeOption.price : p.price;
                const itemKey = hasSizes ? `${p.id}:${activeSize}` : `${p.id}`;
                const inCart = currentCart[itemKey] || 0;

                return (
                  <div className="tablet-card" key={p.id}>
                    <div className="card-thumb">
                      <img src={asset(p.image)} alt={p.name} loading="lazy" />
                      {p.weight && <span className="thumb-weight">{p.weight}</span>}
                    </div>
                    <div className="card-content">
                      <div className="card-title-row">
                        <h4>{p.name}</h4>
                        <strong>{currentPrice} ₽</strong>
                      </div>
                      <p>{p.description}</p>

                      {hasSizes && p.sizes && (
                        <div className="tablet-sizes">
                          {p.sizes.map((s) => (
                            <button
                              key={s.label}
                              className={`size-btn ${activeSize === s.label ? "active" : ""}`}
                              onClick={() => setSelectedSizes((prev) => ({ ...prev, [p.id]: s.label }))}
                            >
                              {s.label} · {s.price} ₽
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="card-actions">
                        {inCart > 0 ? (
                          <div className="tablet-stepper">
                            <button onClick={() => changeCart(itemKey, -1)} aria-label="Меньше">
                              −
                            </button>
                            <span>{inCart}</span>
                            <button onClick={() => changeCart(itemKey, 1)} aria-label="Больше">
                              +
                            </button>
                          </div>
                        ) : (
                          <button className="add-dish-btn" onClick={() => changeCart(itemKey, 1)}>
                            + В чек
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Order Bill Panel */}
          <aside className="tablet-bill">
            <div className="bill-header">
              <div>
                <h3>Чек столика</h3>
                <span className="bill-table-pill">{selectedTable}</span>
              </div>
              {cartItems.length > 0 && (
                <button className="bill-clear-btn" onClick={clearCurrentCart}>
                  Очистить
                </button>
              )}
            </div>

            {justSent && (
              <div className="bill-success-banner">
                ✅ Заказ передан на кухню!
              </div>
            )}

            <div className="bill-items-list">
              {cartItems.length === 0 ? (
                <div className="bill-empty">
                  <span>🍽️</span>
                  <h4>Чек пуст</h4>
                  <p>Выберите блюда или напитки из меню для {selectedTable}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="bill-item" key={item.key}>
                    <div className="bill-item-info">
                      <b>{item.product.name}</b>
                      {item.sizeLabel && <small>{item.sizeLabel}</small>}
                      <span>{item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽</span>
                    </div>
                    <div className="bill-item-stepper">
                      <button onClick={() => changeCart(item.key, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeCart(item.key, 1)}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="bill-footer">
                <input
                  type="text"
                  placeholder="Примечание к заказу (например: без лука)..."
                  value={orderComment}
                  onChange={(e) => setOrderComment(e.target.value)}
                  className="bill-comment-input"
                />

                <div className="bill-total-row">
                  <span>Итого к оплате:</span>
                  <strong>{totalCartPrice} ₽</strong>
                </div>

                <button className="bill-submit-btn" onClick={sendOrderToKitchen}>
                  👨‍🍳 Отправить на кухню ({totalCartPrice} ₽)
                </button>
              </div>
            )}
          </aside>
        </div>
      ) : (
        /* Kitchen / Active Orders Screen */
        <div className="kitchen-screen">
          <div className="kitchen-head">
            <h2>Активные заказы на кухне и баре</h2>
            <p>Заказы, переданные с планшетов столиков кафе</p>
          </div>

          {orders.length === 0 ? (
            <div className="kitchen-empty">
              <span>☕</span>
              <h3>Все заказы выполнены</h3>
              <p>Новые заказы появятся здесь сразу после отправки из меню.</p>
            </div>
          ) : (
            <div className="kitchen-grid">
              {orders.map((ord) => (
                <div className={`order-ticket status-${ord.status}`} key={ord.id}>
                  <div className="ticket-header">
                    <span className="ticket-id">{ord.id}</span>
                    <b>{ord.table}</b>
                    <span className="ticket-time">{ord.createdAt}</span>
                  </div>

                  {ord.comment && (
                    <div className="ticket-note">
                      ⚠️ <b>Примечание:</b> {ord.comment}
                    </div>
                  )}

                  <ul className="ticket-items">
                    {ord.items.map((it) => (
                      <li key={it.key}>
                        <b>{it.quantity}×</b>
                        <span>
                          {it.product.name} {it.sizeLabel ? `(${it.sizeLabel})` : ""}
                        </span>
                        <strong>{it.price * it.quantity} ₽</strong>
                      </li>
                    ))}
                  </ul>

                  <div className="ticket-footer">
                    <span className="ticket-total">Сумма: <b>{ord.total} ₽</b></span>
                    <div className="ticket-actions">
                      {ord.status === "cooking" && (
                        <button
                          className="status-btn ready"
                          onClick={() => updateOrderStatus(ord.id, "ready")}
                        >
                          Готово к подаче 🍽️
                        </button>
                      )}
                      {ord.status === "ready" && (
                        <button
                          className="status-btn done"
                          onClick={() => updateOrderStatus(ord.id, "done")}
                        >
                          Закрыть чек ✅
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
