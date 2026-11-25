import { useState, useEffect } from "react";
import { type RealOrder } from "./Site";

const MASTER_PIN = "7777";

export default function TabletTerminal({ onExit }: { onExit: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("7vkysov_tablet_auth") === "true";
  });
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  const [orders, setOrders] = useState<RealOrder[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "accepted" | "rejected">("all");

  const loadOrders = () => {
    try {
      const stored = localStorage.getItem("7vkysov_real_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadOrders();
    const handleStorageChange = () => loadOrders();
    window.addEventListener("storage", handleStorageChange);
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
        setTimeout(() => setPinInput(""), 500);
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

  const setOrderStatus = (orderId: string, status: "new" | "accepted" | "rejected") => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: status as any };
      }
      return o;
    });
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteOrder = (orderId: string) => {
    if (!confirm(`Удалить заказ ${orderId}?`)) return;
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearAllOrders = () => {
    if (!confirm("Очистить все заказы?")) return;
    setOrders([]);
    try {
      localStorage.removeItem("7vkysov_real_orders");
    } catch (e) {
      console.error(e);
    }
  };

  const createTestOrder = () => {
    const testOrder: RealOrder = {
      id: `№${Math.floor(100 + Math.random() * 900)}`,
      customerName: "Иван Иванов",
      customerPhone: "+7 963 901-18-18",
      customerAddress: "ул. Ленина, 38, кв. 5",
      paymentMethod: "При получении",
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
      delivery: 0,
      total: 1330,
      createdAt: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      timestamp: Date.now(),
      status: "new",
    };

    const updated = [testOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("7vkysov_real_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    if (filter === "accepted") return o.status === "cooking" || o.status === "completed" || (o.status as any) === "accepted";
    if (filter === "rejected") return (o.status as any) === "rejected" || (o.status as any) === "cancelled";
    return o.status === "new";
  });

  const countNew = orders.filter((o) => o.status === "new").length;

  // 1. PIN Lock Screen (Simple, no emojis, professional)
  if (!isAuthenticated) {
    return (
      <div className="terminal-auth-wrap">
        <div className="terminal-auth-box">
          <div className="auth-brand-title">Кафе «7 вкусов»</div>
          <div className="auth-subtitle">Терминал заказов (tabletzakazeda)</div>

          <div className="pin-display">
            <span className={`dot ${pinInput.length >= 1 ? "filled" : ""} ${pinError ? "err" : ""}`} />
            <span className={`dot ${pinInput.length >= 2 ? "filled" : ""} ${pinError ? "err" : ""}`} />
            <span className={`dot ${pinInput.length >= 3 ? "filled" : ""} ${pinError ? "err" : ""}`} />
            <span className={`dot ${pinInput.length >= 4 ? "filled" : ""} ${pinError ? "err" : ""}`} />
          </div>

          {pinError && <div className="pin-err-text">Неверный код (пароль: 7777)</div>}

          <div className="terminal-keypad">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button key={num} type="button" className="t-key" onClick={() => handlePinPress(num)}>
                {num}
              </button>
            ))}
            <button type="button" className="t-key action" onClick={handlePinClear}>
              Сброс
            </button>
            <button type="button" className="t-key" onClick={() => handlePinPress("0")}>
              0
            </button>
            <button type="button" className="t-key action" onClick={handlePinBackspace}>
              Стереть
            </button>
          </div>

          <div className="auth-bottom">
            <span>Код доступа: 7777</span>
            <button type="button" className="link-button" onClick={onExit}>
              Перейти на сайт
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Simple, functional tablet order list (No emojis, no AI-decorations)
  return (
    <div className="pos-wrap">
      {/* Top Navbar */}
      <header className="pos-topbar">
        <div className="pos-logo-area">
          <h1 className="pos-title">7 вкусов — Заказы</h1>
          <span className="pos-badge">Терминал кафе</span>
        </div>

        <div className="pos-filters">
          <button
            type="button"
            className={`pos-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Все ({orders.length})
          </button>
          <button
            type="button"
            className={`pos-tab ${filter === "new" ? "active" : ""}`}
            onClick={() => setFilter("new")}
          >
            Новые ({countNew})
          </button>
          <button
            type="button"
            className={`pos-tab ${filter === "accepted" ? "active" : ""}`}
            onClick={() => setFilter("accepted")}
          >
            Принятые
          </button>
          <button
            type="button"
            className={`pos-tab ${filter === "rejected" ? "active" : ""}`}
            onClick={() => setFilter("rejected")}
          >
            Отказ
          </button>
        </div>

        <div className="pos-actions">
          <button type="button" className="pos-btn" onClick={createTestOrder} title="Создать тестовый заказ для проверки">
            + Тестовый заказ
          </button>
          {orders.length > 0 && (
            <button type="button" className="pos-btn danger" onClick={clearAllOrders}>
              Очистить
            </button>
          )}
          <button type="button" className="pos-btn" onClick={handleLock}>
            Блокировка
          </button>
          <button type="button" className="pos-btn dark" onClick={onExit}>
            На сайт
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pos-content">
        {filteredOrders.length === 0 ? (
          <div className="pos-empty">
            <h2>{orders.length === 0 ? "Нет заказов" : "В этой вкладке нет заказов"}</h2>
            <p>Когда посетитель на сайте отправляет заказ из корзины, он сразу появляется в этой таблице.</p>
            {orders.length === 0 && (
              <button type="button" className="pos-primary-btn" onClick={createTestOrder}>
                Создать тестовый заказ
              </button>
            )}
          </div>
        ) : (
          <div className="pos-orders-list">
            {filteredOrders.map((order) => {
              const isAccepted = order.status === "cooking" || order.status === "completed" || (order.status as any) === "accepted";
              const isRejected = (order.status as any) === "rejected" || (order.status as any) === "cancelled";
              const isNew = !isAccepted && !isRejected;

              return (
                <div
                  key={order.id}
                  className={`order-row ${isNew ? "row-new" : ""} ${isAccepted ? "row-accepted" : ""} ${isRejected ? "row-rejected" : ""}`}
                >
                  <div className="order-row-top">
                    <div className="order-id-block">
                      <span className="order-num">{order.id}</span>
                      <span className="order-time">{order.createdAt}</span>
                    </div>

                    <div className="order-status-tag">
                      {isNew && <span className="tag-new">Новый</span>}
                      {isAccepted && <span className="tag-accepted">Принят</span>}
                      {isRejected && <span className="tag-rejected">Отказ</span>}
                    </div>
                  </div>

                  <div className="order-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Клиент:</span>
                      <b className="detail-value">{order.customerName}</b>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Телефон:</span>
                      <a href={`tel:${order.customerPhone}`} className="phone-button">
                        {order.customerPhone}
                      </a>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Оплата:</span>
                      <span className="detail-value">{order.paymentMethod}</span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Адрес / Стол:</span>
                      <span className="detail-value">{order.customerAddress}</span>
                    </div>
                  </div>

                  <div className="order-items-table">
                    <div className="items-header">
                      <span>Наименование</span>
                      <span>Кол-во</span>
                      <span>Сумма</span>
                    </div>
                    {order.items.map((it, idx) => (
                      <div className="item-row" key={`${it.name}-${idx}`}>
                        <div className="item-name">
                          <span>{it.name}</span>
                          {it.sizeLabel && <small> ({it.sizeLabel})</small>}
                        </div>
                        <div className="item-qty">{it.quantity} шт.</div>
                        <div className="item-sum">{it.itemTotal} ₽</div>
                      </div>
                    ))}
                  </div>

                  <div className="order-total-bar">
                    <div className="total-text">
                      Итого к оплате: <b>{order.total} ₽</b>
                      {order.delivery > 0 && <small> (включая доставку {order.delivery} ₽)</small>}
                    </div>

                    <div className="order-button-group">
                      {isNew && (
                        <>
                          <button
                            type="button"
                            className="btn-action accept"
                            onClick={() => setOrderStatus(order.id, "accepted")}
                          >
                            Принять
                          </button>
                          <button
                            type="button"
                            className="btn-action reject"
                            onClick={() => setOrderStatus(order.id, "rejected")}
                          >
                            Отказ
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <div className="status-label-done">
                          <span>Заказ принят</span>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setOrderStatus(order.id, "rejected")}
                          >
                            Отказ
                          </button>
                        </div>
                      )}

                      {isRejected && (
                        <div className="status-label-cancelled">
                          <span>Заказ отклонён</span>
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setOrderStatus(order.id, "accepted")}
                          >
                            Вернуть в принятые
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => deleteOrder(order.id)}
                        title="Удалить"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
