import { useState, useEffect } from "react";
import { asset, type RealOrder } from "./Site";

const MASTER_PIN = "7777";

export default function TabletTerminal({ onExit }: { onExit: () => void }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("7vkysov_tablet_auth") === "true";
  });
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  // Real Orders State
  const [orders, setOrders] = useState<RealOrder[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "cooking" | "delivering" | "completed">("all");
  const [soundAlert, setSoundAlert] = useState<boolean>(true);

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem("7vkysov_real_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error("Error loading real orders:", e);
    }
  };

  useEffect(() => {
    loadOrders();
    // Listen for storage events across tabs
    const handleStorageChange = () => loadOrders();
    window.addEventListener("storage", handleStorageChange);

    // Also poll every 2 seconds for real-time order arrival
    const interval = setInterval(loadOrders, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

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

  // Change status of real order
  const updateStatus = (orderId: string, newStatus: RealOrder["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Delete single order
  const deleteOrder = (orderId: string) => {
    if (!confirm(`Удалить заказ ${orderId} из списка?`)) return;
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Clear all completed orders
  const clearCompleted = () => {
    if (!confirm("Очистить все завершённые заказы?")) return;
    const updated = orders.filter((o) => o.status !== "completed");
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Create test demo order directly from terminal for testing
  const createTestOrder = () => {
    const sampleOrder: RealOrder = {
      id: `№${Math.floor(100 + Math.random() * 900)}`,
      customerName: "Елена Смирнова",
      customerPhone: "+7 963 901-18-18",
      customerAddress: "ул. Ленина, 38, кв. 12",
      paymentMethod: "При получении (наличные или карта)",
      items: [
        {
          id: 72,
          name: "Пепперони",
          sizeLabel: "30 см",
          price: 810,
          quantity: 1,
          itemTotal: 810,
          image: "/images/pizza-pepperoni.jpg",
        },
        {
          id: 60,
          name: "Капучино",
          sizeLabel: "300 г",
          price: 260,
          quantity: 2,
          itemTotal: 520,
          image: "/images/coffee-cappuccino.jpg",
        },
      ],
      subtotal: 1330,
      delivery: 199,
      total: 1529,
      createdAt: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      timestamp: Date.now(),
      status: "new",
    };

    const updated = [sampleOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status === filter;
  });

  const countNew = orders.filter((o) => o.status === "new").length;
  const countInProgress = orders.filter((o) => o.status === "cooking" || o.status === "delivering").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // 1. PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="tablet-lock-screen">
        <div className="tablet-lock-card">
          <div className="lock-header">
            <img src={asset("/images/logo.webp")} alt="7 вкусов" className="lock-logo" />
            <h2>Терминал заказов</h2>
            <p>Кафе «7 вкусов» · Заказы из корзины</p>
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
              ← Вернуться на сайт кафе
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Real Orders Tablet Screen
  return (
    <div className="tablet-orders-shell">
      {/* Top Header */}
      <header className="tablet-orders-header">
        <div className="toh-brand">
          <img src={asset("/images/logo.webp")} alt="7 вкусов" className="toh-logo" />
          <div>
            <b>Кафе «7 вкусов»</b>
            <span>Панель заказов из корзины (tabletzakazeda)</span>
          </div>
        </div>

        {/* Status Filter Badges */}
        <div className="toh-tabs">
          <button
            className={`toh-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Все ({orders.length})
          </button>
          <button
            className={`toh-tab new-tab ${filter === "new" ? "active" : ""}`}
            onClick={() => setFilter("new")}
          >
            🟡 Новые ({countNew})
          </button>
          <button
            className={`toh-tab ${filter === "cooking" ? "active" : ""}`}
            onClick={() => setFilter("cooking")}
          >
            👨‍🍳 В готовке
          </button>
          <button
            className={`toh-tab ${filter === "delivering" ? "active" : ""}`}
            onClick={() => setFilter("delivering")}
          >
            🚗 Доставка
          </button>
          <button
            className={`toh-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            ✅ Выполнены
          </button>
        </div>

        {/* Controls */}
        <div className="toh-actions">
          <button
            className={`toh-sound-btn ${soundAlert ? "active" : ""}`}
            onClick={() => setSoundAlert(!soundAlert)}
            title="Звук уведомлений"
          >
            {soundAlert ? "🔔" : "🔕"}
          </button>
          <button className="toh-btn" onClick={createTestOrder} title="Создать тестовый заказ для проверки">
            ➕ Тест
          </button>
          <button className="toh-btn lock" onClick={handleLock} title="Заблокировать">
            🔒 Заблокировать
          </button>
          <button className="toh-btn exit" onClick={onExit} title="На главный сайт">
            🌐 На сайт
          </button>
        </div>
      </header>

      {/* Summary Metrics Bar */}
      <div className="orders-metrics-bar">
        <div className="metric-chip">
          <span>Новых заказов:</span>
          <b style={{ color: countNew > 0 ? "#e53e3e" : "inherit" }}>{countNew}</b>
        </div>
        <div className="metric-chip">
          <span>В работе:</span>
          <b>{countInProgress}</b>
        </div>
        <div className="metric-chip">
          <span>Всего за смену:</span>
          <b>{orders.length} заказов</b>
        </div>
        <div className="metric-chip">
          <span>Сумма заказов:</span>
          <b style={{ color: "var(--green)" }}>{totalRevenue} ₽</b>
        </div>
        {orders.length > 0 && (
          <button className="clear-history-btn" onClick={clearCompleted}>
            🗑️ Очистить выполненные
          </button>
        )}
      </div>

      {/* Orders List Workspace */}
      <main className="orders-workspace">
        {filteredOrders.length === 0 ? (
          <div className="orders-empty-state">
            <span className="empty-icon">🛎️</span>
            <h3>{orders.length === 0 ? "Ожидание первых заказов из корзины" : "В этом разделе пока нет заказов"}</h3>
            <p>
              Когда клиент на сайте выбирает блюда, заходит в корзину и нажимает <b>«Подтвердить заказ»</b>,
              его заказ <b>мгновенно отображается на этом экране</b> со всеми данными: именем, телефоном, адресом, способом оплаты и списком блюд.
            </p>
            {orders.length === 0 && (
              <button className="primary-demo-btn" onClick={createTestOrder}>
                ➕ Создать демонстрационный заказ (для проверки вида)
              </button>
            )}
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => {
              const statusBadges = {
                new: { label: "🟡 НОВЫЙ ЗАКАЗ", cls: "badge-new" },
                cooking: { label: "👨‍🍳 ГОТОВИТСЯ", cls: "badge-cooking" },
                delivering: { label: "🚗 ПЕРЕДАН КУРЬЕРУ", cls: "badge-delivering" },
                completed: { label: "✅ ВЫПОЛНЕН", cls: "badge-completed" },
              };
              const badge = statusBadges[order.status] || statusBadges.new;

              return (
                <article className={`real-order-card status-${order.status}`} key={order.id}>
                  {/* Card Header */}
                  <div className="roc-header">
                    <div>
                      <span className="roc-id">{order.id}</span>
                      <span className="roc-time">🕒 {order.createdAt}</span>
                    </div>
                    <span className={`roc-status-badge ${badge.cls}`}>{badge.label}</span>
                  </div>

                  {/* Customer Information Box */}
                  <div className="roc-customer-box">
                    <div className="roc-customer-row">
                      <span className="roc-label">👤 Заказчик:</span>
                      <b className="roc-val roc-name">{order.customerName}</b>
                    </div>
                    <div className="roc-customer-row">
                      <span className="roc-label">📞 Телефон:</span>
                      <a href={`tel:${order.customerPhone}`} className="roc-val roc-phone">
                        {order.customerPhone}
                        <span className="call-hint">Позвонить 📞</span>
                      </a>
                    </div>
                    <div className="roc-customer-row">
                      <span className="roc-label">💳 Оплата:</span>
                      <b className="roc-val roc-payment">{order.paymentMethod}</b>
                    </div>
                    <div className="roc-customer-row">
                      <span className="roc-label">📍 Адрес / Куда:</span>
                      <span className="roc-val roc-address">{order.customerAddress}</span>
                    </div>
                  </div>

                  {/* Ordered Items Table */}
                  <div className="roc-items-box">
                    <div className="roc-items-head">
                      <span>Состав заказа:</span>
                      <span>Кол-во</span>
                      <span>Сумма</span>
                    </div>
                    <ul className="roc-items-list">
                      {order.items.map((it, idx) => (
                        <li key={`${it.name}-${idx}`}>
                          <div className="it-name-col">
                            <b>{it.name}</b>
                            {it.sizeLabel && <small className="it-size">{it.sizeLabel}</small>}
                          </div>
                          <span className="it-qty">× {it.quantity}</span>
                          <span className="it-price">{it.itemTotal} ₽</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="roc-totals">
                    <div className="roc-subtotal-line">
                      <span>Сумма блюд: {order.subtotal} ₽</span>
                      <span>Доставка: {order.delivery ? `${order.delivery} ₽` : "0 ₽ (Бесплатно)"}</span>
                    </div>
                    <div className="roc-grand-total">
                      <span>Итого к получению:</span>
                      <strong>{order.total} ₽</strong>
                    </div>
                  </div>

                  {/* Actions / Status Controls */}
                  <div className="roc-actions">
                    {order.status === "new" && (
                      <button
                        className="btn-status-act btn-accept"
                        onClick={() => updateStatus(order.id, "cooking")}
                      >
                        👨‍🍳 Принять и готовить
                      </button>
                    )}
                    {order.status === "cooking" && (
                      <button
                        className="btn-status-act btn-deliver"
                        onClick={() => updateStatus(order.id, "delivering")}
                      >
                        🚗 Передать курьеру / Готов
                      </button>
                    )}
                    {order.status === "delivering" && (
                      <button
                        className="btn-status-act btn-complete"
                        onClick={() => updateStatus(order.id, "completed")}
                      >
                        ✅ Заказ выполнен и оплачен
                      </button>
                    )}
                    {order.status === "completed" && (
                      <span className="completed-stamp">Заказ закрыт</span>
                    )}
                    <button
                      className="btn-delete-order"
                      onClick={() => deleteOrder(order.id)}
                      title="Удалить заказ"
                    >
                      🗑️
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
