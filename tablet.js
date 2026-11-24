// tablet.js - Логика планшета кухни «Семь вкусов»

let currentFilter = "active";
let soundEnabled = true;
let audioCtx = null;
let broadcastChannel = null;

// Чистый громкий кухонный звонок колокольчика кухни «Динь-Дон» через Web Audio API
function playKitchenBell() {
  if (!soundEnabled) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Тон 1: высокий звон (880 Гц / Ля 5)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.8);

    // Тон 2: резонансный звон (1174 Гц / Ре 6)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1174, now + 0.16);
    gain2.gain.setValueAtTime(0.65, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 1.2);
  } catch (err) {
    console.warn("Audio warning:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initOrdersStorage();
  initBroadcastListener();
  setupTabletControls();
  renderOrders();
  setInterval(renderOrders, 60000);
});

function initOrdersStorage() {
  let orders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");
  if (orders.length === 0) {
    orders = [
      {
        id: 1700000000001,
        orderNumber: "#102",
        createdAt: "5 минут назад",
        timestamp: Date.now() - 5 * 60 * 1000,
        customer: {
          name: "Михаил",
          phone: "+7 (963) 901-18-18",
          address: "ул. Ленина, д. 12, кв. 34",
          type: "Доставка",
          comment: "Оплата курьеру при получении",
        },
        items: [
          { name: "Филадельфия гриль", price: 529, count: 2, variant: "260 г · 8 шт." },
          { name: "Пепперони", price: 619, count: 1, variant: "30 см · 510 г" },
          { name: "Цитрусовый лимонад", price: 219, count: 2, variant: "500 мл" },
        ],
        total: 2115,
        payment: {
          method: "Оплата при получении (наличными или картой)",
          status: "ОПЛАТА ПРИ ПОЛУЧЕНИИ",
          isPaid: false,
        },
        status: "new",
      },
    ];
    localStorage.setItem("cafe_orders", JSON.stringify(orders));
  }
}

function initBroadcastListener() {
  try {
    broadcastChannel = new BroadcastChannel("cafe_orders_channel");
    broadcastChannel.onmessage = (event) => {
      if (event.data && event.data.type === "NEW_ORDER") {
        playKitchenBell();
        renderOrders(event.data.order.id);
      }
    };
  } catch (e) {
    console.log("BroadcastChannel listener setup:", e);
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "cafe_orders") {
      playKitchenBell();
      renderOrders();
    }
  });
}

function setupTabletControls() {
  document.querySelectorAll(".t-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".t-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderOrders();
    });
  });

  document.getElementById("btnTestSound")?.addEventListener("click", () => {
    playKitchenBell();
  });

  document.getElementById("btnSimulateOrder")?.addEventListener("click", () => {
    simulateIncomingOrder();
  });

  const muteBtn = document.getElementById("btnToggleSound");
  muteBtn?.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    muteBtn.innerHTML = soundEnabled ? "🔔 Звук: ВКЛ" : "🔕 Звук: ВЫКЛ";
    if (soundEnabled) playKitchenBell();
  });

  document.getElementById("btnClearDone")?.addEventListener("click", () => {
    if (confirm("Очистить архив выполненных заказов?")) {
      let orders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");
      orders = orders.filter((o) => o.status !== "done");
      localStorage.setItem("cafe_orders", JSON.stringify(orders));
      renderOrders();
    }
  });
}

function renderOrders(newOrderId = null) {
  const container = document.getElementById("ordersGrid");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");

  const counts = {
    active: orders.filter((o) => o.status !== "done").length,
    new: orders.filter((o) => o.status === "new").length,
    cooking: orders.filter((o) => o.status === "cooking").length,
    delivering: orders.filter((o) => o.status === "delivering").length,
    done: orders.filter((o) => o.status === "done").length,
  };

  document.getElementById("cntActive").textContent = counts.active;
  document.getElementById("cntNew").textContent = counts.new;
  document.getElementById("cntCooking").textContent = counts.cooking;
  document.getElementById("cntDelivering").textContent = counts.delivering;
  document.getElementById("cntDone").textContent = counts.done;

  let filtered = orders;
  if (currentFilter === "active") {
    filtered = orders.filter((o) => o.status !== "done");
  } else if (currentFilter !== "all") {
    filtered = orders.filter((o) => o.status === currentFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-orders" style="grid-column: 1 / -1;">
        <div class="empty-icon">🍳</div>
        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-bottom: 8px;">Нет активных заказов</h2>
        <p style="font-size: 0.95rem;">Заказы клиентов из кафе «Семь вкусов» моментально появятся здесь со звуковым сигналом</p>
        <button class="t-btn t-btn-accent" style="margin-top: 18px;" onclick="simulateIncomingOrder()">
          + Создать тестовый заказ для проверки
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((order) => {
      const isNewFlashing = order.status === "new" || order.id === newOrderId;

      let timeAgo = order.createdAt;
      if (order.timestamp) {
        const diffMin = Math.floor((Date.now() - order.timestamp) / 60000);
        if (diffMin <= 0) timeAgo = "Только что";
        else timeAgo = `${diffMin} мин назад`;
      }

      let actionBtnHtml = "";
      if (order.status === "new") {
        actionBtnHtml = `
          <button class="order-status-btn btn-cook" onclick="changeOrderStatus(${order.id}, 'cooking')">
            🍳 Начать готовить
          </button>
        `;
      } else if (order.status === "cooking") {
        actionBtnHtml = `
          <button class="order-status-btn btn-deliver" onclick="changeOrderStatus(${order.id}, 'delivering')">
            🚗 Передать курьеру
          </button>
        `;
      } else if (order.status === "delivering") {
        actionBtnHtml = `
          <button class="order-status-btn btn-done" onclick="changeOrderStatus(${order.id}, 'done')">
            ✓ Завершить и выдать
          </button>
        `;
      } else {
        actionBtnHtml = `
          <div class="order-status-btn btn-completed">
            ✓ Заказ выполнен
          </div>
        `;
      }

      return `
      <div class="order-card ${isNewFlashing ? "new-order-flash" : ""}" id="orderCard_${order.id}">
        <div class="order-header">
          <div>
            <div class="order-number">${order.orderNumber}</div>
            <div class="order-time">⏰ ${timeAgo} (${order.customer.type})</div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 6px; background: #e8eee5; color: var(--ink);">
            ${getStatusName(order.status)}
          </span>
        </div>

        <div class="order-payment-bar">
          <span>✓ ${order.payment.status}</span>
          <span>${order.total} ₽</span>
        </div>

        <div class="order-body">
          <div class="customer-info-box">
            <div class="customer-name">👤 ${order.customer.name}</div>
            <div class="customer-address">📍 ${order.customer.address}</div>
            <div>📞 <a href="tel:${order.customer.phone}" class="customer-phone">${order.customer.phone}</a></div>
            ${order.customer.comment ? `<div class="customer-comment">💬 "${order.customer.comment}"</div>` : ""}
          </div>

          <div class="items-list">
            ${order.items
              .map(
                (item) => `
              <div class="order-item-row">
                <div>
                  <span class="item-qty">${item.count}x</span>
                  <span class="item-title">${item.name}</span>
                  ${item.variant ? `<div class="item-sub">${item.variant}</div>` : ""}
                </div>
                <div class="item-sum">${item.price * item.count} ₽</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total-row">
            <span>Итого:</span>
            <span style="color: var(--coral);">${order.total} ₽</span>
          </div>
          ${actionBtnHtml}
        </div>
      </div>
    `;
    })
    .join("");
}

function getStatusName(status) {
  switch (status) {
    case "new":
      return "🔥 Новый";
    case "cooking":
      return "🍳 Готовится";
    case "delivering":
      return "🚗 В доставке";
    case "done":
      return "✓ Выдан";
    default:
      return status;
  }
}

window.changeOrderStatus = function (orderId, nextStatus) {
  let orders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");
  orders = orders.map((o) => {
    if (o.id === orderId) {
      return { ...o, status: nextStatus };
    }
    return o;
  });
  localStorage.setItem("cafe_orders", JSON.stringify(orders));
  renderOrders();
};

window.simulateIncomingOrder = function () {
  const num = Math.floor(100 + Math.random() * 900);
  const sampleOrder = {
    id: Date.now(),
    orderNumber: `#${num}`,
    createdAt: "Только что",
    timestamp: Date.now(),
    customer: {
      name: "Анна Смирнова",
      phone: "+7 (963) 901-18-18",
      address: "ул. Ленина, д. 28, кв. 15",
      type: "Доставка",
      comment: "Оплата курьеру при получении",
    },
    items: [
      { name: "Семь вкусов", price: 589, count: 1, variant: "245 г · 8 шт." },
      { name: "Груша и горгонзола", price: 689, count: 1, variant: "30 см · 490 г" },
      { name: "Цитрусовый лимонад", price: 219, count: 2, variant: "500 мл" },
    ],
    total: 1716,
    payment: {
      method: "Оплата при получении (наличными или картой)",
      status: "ОПЛАТА ПРИ ПОЛУЧЕНИИ",
      isPaid: false,
    },
    status: "new",
  };

  let orders = JSON.parse(localStorage.getItem("cafe_orders") || "[]");
  orders.unshift(sampleOrder);
  localStorage.setItem("cafe_orders", JSON.stringify(orders));

  playKitchenBell();
  renderOrders(sampleOrder.id);
};
