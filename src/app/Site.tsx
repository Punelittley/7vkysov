import { useEffect, useMemo, useState } from "react";

const asset = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  return `${cleanBase}${cleanUrl}`;
};

type Category = "Все" | "Пицца" | "Закуски" | "Салаты" | "Супы" | "Горячее" | "Паста" | "Кофе" | "Коктейли и Овершейки" | "Авторский чай" | "Классический чай" | "Лимонады" | "Десерты";

type SizeOption = {
  label: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  category: "Пицца" | "Закуски" | "Салаты" | "Супы" | "Горячее" | "Паста" | "Кофе" | "Коктейли и Овершейки" | "Авторский чай" | "Классический чай" | "Лимонады" | "Десерты";
  description: string;
  price: number;
  weight?: string;
  image: string;
  badge?: string;
  sizes?: SizeOption[];
};

const products: Product[] = [
  // Пицца
  {
    id: 70,
    name: "Мясное ассорти",
    category: "Пицца",
    description: "Ветчина, нежный карбонад, пикантные колбаски салями, чесночный соус и тягучая моцарелла",
    price: 450,
    badge: "Сытно",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 450 },
      { label: "30 см", price: 810 },
      { label: "35 см", price: 890 },
    ],
  },
  {
    id: 71,
    name: "Гурман",
    category: "Пицца",
    description: "Ветчина, сочный карбонад, колбаски салями, свежие шампиньоны, фирменный томатный соус и моцарелла",
    price: 460,
    badge: "Хит",
    image: "/images/pizza-gourmet.jpg",
    sizes: [
      { label: "20 см", price: 460 },
      { label: "30 см", price: 815 },
      { label: "35 см", price: 980 },
    ],
  },
  {
    id: 72,
    name: "Пепперони",
    category: "Пицца",
    description: "Острые колбаски пепперони, пряный томатный соус и двойная порция расплавленного сыра моцарелла",
    price: 470,
    badge: "Хит",
    image: "/images/pizza-pepperoni.jpg",
    sizes: [
      { label: "20 см", price: 470 },
      { label: "30 см", price: 810 },
      { label: "35 см", price: 980 },
    ],
  },
  {
    id: 73,
    name: "Чикита",
    category: "Пицца",
    description: "Ароматная копченая курочка, шампиньоны, спелые томаты, сыр моцарелла и фирменный томатный соус",
    price: 430,
    badge: "Любимое",
    image: "/images/pizza-gourmet.jpg",
    sizes: [
      { label: "20 см", price: 430 },
      { label: "30 см", price: 715 },
      { label: "35 см", price: 850 },
    ],
  },
  {
    id: 74,
    name: "Мясная XXL",
    category: "Пицца",
    description: "Охотничьи колбаски, хрустящий бекон, пепперони, маринованные огурчики, томатный соус и сыр моцарелла",
    price: 540,
    badge: "XXL",
    image: "/images/pizza-pepperoni.jpg",
    sizes: [
      { label: "20 см", price: 540 },
      { label: "30 см", price: 990 },
      { label: "35 см", price: 1170 },
    ],
  },
  {
    id: 75,
    name: "Палермо",
    category: "Пицца",
    description: "Нежная ветчина, отборные шампиньоны, сливочный грибной соус и золотистая сырная корочка моцареллы",
    price: 430,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 430 },
      { label: "30 см", price: 715 },
      { label: "35 см", price: 750 },
    ],
  },
  {
    id: 76,
    name: "Сырная",
    category: "Пицца",
    description: "Двойная порция сливочной моцареллы, пикантные кусочки брынзы и ароматный сырный соус",
    price: 470,
    badge: "Сырная",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 470 },
      { label: "30 см", price: 850 },
      { label: "35 см", price: 1050 },
    ],
  },
  {
    id: 77,
    name: "Цыпленок Барбекю",
    category: "Пицца",
    description: "Копченая курочка, сочный бекон, красный крымский лук, дымный соус барбекю, томаты и моцарелла",
    price: 430,
    badge: "Барбекю",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 430 },
      { label: "30 см", price: 730 },
      { label: "35 см", price: 890 },
    ],
  },
  {
    id: 78,
    name: "Грибная",
    category: "Пицца",
    description: "Щедрая порция свежих шампиньонов, нежный сливочно-грибной соус и расплавленная моцарелла",
    price: 430,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 430 },
      { label: "30 см", price: 810 },
      { label: "35 см", price: 860 },
    ],
  },
  {
    id: 79,
    name: "Сицилия",
    category: "Пицца",
    description: "Сладкий болгарский перец, шампиньоны, рассольная брынза, маслины, сыр моцарелла и томатный соус",
    price: 440,
    badge: "Средиземноморская",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 440 },
      { label: "30 см", price: 780 },
      { label: "35 см", price: 910 },
    ],
  },
  {
    id: 80,
    name: "Маргарита",
    category: "Пицца",
    description: "Классическая итальянская пицца: пряный томатный соус, сочные спелые томаты и нежная моцарелла",
    price: 345,
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 345 },
      { label: "30 см", price: 575 },
      { label: "35 см", price: 670 },
    ],
  },
  {
    id: 81,
    name: "Гавайская",
    category: "Пицца",
    description: "Сочные кусочки ананаса, копченое куриное филе, томатный соус и тягучий сыр моцарелла",
    price: 400,
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "20 см", price: 400 },
      { label: "30 см", price: 695 },
      { label: "35 см", price: 850 },
    ],
  },

  // Супы
  {
    id: 66,
    name: "Борщ",
    category: "Супы",
    description: "Наваристый домашний борщ со свежей зеленью. Подается с чесночными гренками из бородинского хлеба, ароматным салом и густой сметаной",
    price: 480,
    weight: "450 г",
    badge: "Фирменный",
    image: "/images/soup-borscht.jpg",
  },
  {
    id: 67,
    name: "Солянка мясная «Лучшая»",
    category: "Супы",
    description: "Насыщенный мясной сборный суп с оливками, солеными огурчиками, лимоном, каперсами и сметаной — по мнению гостей кафе",
    price: 510,
    weight: "450 г",
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 68,
    name: "Лапша куриная",
    category: "Супы",
    description: "Легкий согревающий суп на прозрачном курином бульоне с домашней яичной лапшой, нежным филе и свежей зеленью",
    price: 300,
    weight: "450 г",
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1588566565463-180a5b2090f2?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 69,
    name: "Грибной суп-пюре",
    category: "Супы",
    description: "Нежнейший крем-суп из отборных лесных грибов и шампиньонов со сливочным вкусом, подается с хрустящими крутонами",
    price: 500,
    weight: "370 г",
    badge: "Нежный",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88",
  },

  // Салаты
  {
    id: 57,
    name: "Цезарь с курицей",
    category: "Салаты",
    description: "Хрустящие листья салата, сочное куриное филе, томаты черри, золотистые крутоны, сыр пармезан и соус Цезарь",
    price: 650,
    weight: "200 г",
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 58,
    name: "Цезарь с лангустинами",
    category: "Салаты",
    description: "Обжаренные лангустины, листья салата, томаты черри, хрустящие крутоны, сыр пармезан и фирменный соус Цезарь",
    price: 740,
    weight: "200 г",
    badge: "Изысканно",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 59,
    name: "Цезарь с лососем",
    category: "Салаты",
    description: "Нежнейший слабосоленый лосось, хрустящие листья салата, томаты черри, крутоны, сыр пармезан и авторский соус Цезарь",
    price: 740,
    weight: "200 г",
    badge: "Хит",
    image: "/images/salad-caesar-salmon.jpg",
  },
  {
    id: 60,
    name: "Греческий",
    category: "Салаты",
    description: "Свежие огурцы, спелые томаты, сладкий болгарский перец, красный лук, маслины, сыр фета и оливковое масло с орегано",
    price: 520,
    weight: "200 г",
    badge: "Свежее",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 61,
    name: "Салат с говядиной",
    category: "Салаты",
    description: "Нежная говядина, свежие огурцы, томаты, болгарский перец, обжаренные грибы, микс листьев салата и масляная заправка",
    price: 620,
    weight: "160 г",
    badge: "Сытно",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 62,
    name: "Салат с кальмарами",
    category: "Салаты",
    description: "Нежный кальмар, спелые томаты, сладкий болгарский перец, свежие листья салата и ароматная масляная заправка",
    price: 540,
    weight: "240 г",
    badge: "Морепродукты",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 63,
    name: "Марго",
    category: "Салаты",
    description: "Копченая куриная грудка, сладкий болгарский перец, консервированные ананасы, пекинская капуста, голландский сыр и маслины",
    price: 540,
    weight: "200 г",
    badge: "Фирменный",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 64,
    name: "Поке с лососем",
    category: "Салаты",
    description: "Свежий лосось, рис, бобы эдамаме, спелый томат, свежий огурец, яйцо и фирменная заправка",
    price: 740,
    weight: "330 г",
    badge: "Тренд",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 65,
    name: "Поке с цыпленком",
    category: "Салаты",
    description: "Нежное куриное филе, рис, свежий огурец, бобы эдамаме, томаты, яйцо и авторский соус",
    price: 560,
    weight: "350 г",
    badge: "Популярное",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=88",
  },

  // Закуски
  {
    id: 50,
    name: "Овощная тарелка",
    category: "Закуски",
    description: "Хрустящие огурчики, болгарский перец, томаты, свежий редис, красный лук, свежая зелень и нежный фирменный соус",
    price: 540,
    weight: "180 г",
    badge: "Свежее",
    image: "/images/appetizer-vegetables.jpg",
  },
  {
    id: 51,
    name: "Мясная тарелка",
    category: "Закуски",
    description: "Ассорти благородных мясных деликатесов и сыровяленых колбас, подается с дижонской горчицей и зеленью",
    price: 860,
    weight: "260 г",
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 52,
    name: "Закуска по-русски",
    category: "Закуски",
    description: "Традиционная русская закуска: маринованные огурцы, грибы, квашеная капуста, пряное сало и отварной картофель",
    price: 400,
    weight: "230 г",
    badge: "Традиция",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 53,
    name: "Сырная тарелка",
    category: "Закуски",
    description: "Изысканное плато отборных благородных сыров с цветочным медом, грецкими орехами и свежим виноградом",
    price: 1130,
    weight: "250/50/10 г",
    badge: "Изысканно",
    image: "https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 54,
    name: "Рыбное плато",
    category: "Закуски",
    description: "Лосось слабосоленый собственного посола, обжаренные сочные лангустины, дольки лимона и маслины",
    price: 1160,
    weight: "80/80/30 г",
    badge: "Деликатес",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 55,
    name: "Лосось собственного посола",
    category: "Закуски",
    description: "Нежные ломтики атлантического лосося шеф-посола с сочным лимоном и хрустящими тостами",
    price: 790,
    weight: "80/30 г",
    badge: "Шеф-посол",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 56,
    name: "Оливки / маслины",
    category: "Закуски",
    description: "Отборные крупные греческие оливки и маслины с прованскими травами и оливковым маслом",
    price: 240,
    weight: "90 г",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=88",
  },
  // Кофе
  {
    id: 41,
    name: "Американо",
    category: "Кофе",
    description: "Классический бодрящий эспрессо с добавлением горячей воды для идеального сбалансированного вкуса",
    price: 150,
    weight: "200 г",
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 42,
    name: "Капучино",
    category: "Кофе",
    description: "Идеальный баланс насыщенного эспрессо, горячего молока и густой шелковистой молочной пенки",
    price: 260,
    weight: "300 г",
    badge: "Хит",
    image: "/images/coffee-cappuccino.jpg",
  },
  {
    id: 43,
    name: "Раф",
    category: "Кофе",
    description: "Нежнейший сливочно-кофейный напиток на основе эспрессо, взбитого со сливками и ванильным сахаром",
    price: 270,
    weight: "300 г",
    badge: "Нежный",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 44,
    name: "Латте",
    category: "Кофе",
    description: "Мягкий кофейный напиток с большим количеством вспененного молока и деликатной пенкой",
    price: 270,
    weight: "250 г",
    badge: "Популярное",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 45,
    name: "Латте малина",
    category: "Кофе",
    description: "Бархатистый латте с яркими нотками спелой лесной малины и ароматной молочной пенкой",
    price: 290,
    weight: "300 г",
    badge: "Авторский",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 46,
    name: "Латте яблочный пирог",
    category: "Кофе",
    description: "Уютный согревающий латте с ароматом запеченного домашнего яблочного пирога и пряной корицы",
    price: 290,
    weight: "300 г",
    badge: "Сезонный",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 47,
    name: "Латте слив / кокос",
    category: "Кофе",
    description: "Экзотический мягкий латте с кокосовым вкусом и нежной сливочной текстурой",
    price: 290,
    weight: "300 г",
    image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 48,
    name: "Кофе + десерт",
    category: "Кофе",
    description: "Специальный выгодный сет: чашка нежного капучино и сливочный чизкейк на выбор",
    price: 470,
    weight: "300 г",
    badge: "Сет дня",
    image: "/images/coffee-cappuccino.jpg",
  },
  {
    id: 49,
    name: "Сиропы в ассортименте",
    category: "Кофе",
    description: "Яблочный пирог, соленая карамель, корица, имбирный пряник, карамель, шоколадное печенье, попкорн, миндаль, кокос, малина",
    price: 60,
    badge: "Топпинг",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=88",
  },
  // Коктейли и Овершейки
  {
    id: 38,
    name: "Овершейк «Змейка»",
    category: "Коктейли и Овершейки",
    description: "Праздничный милкшейк с шапкой взбитых сливок, мармеладными змейками, нежным маршмеллоу и сладкой посыпкой",
    price: 450,
    weight: "400 г",
    badge: "Хит",
    image: "/images/overshakes.jpg",
  },
  {
    id: 39,
    name: "Овершейк «Радужный»",
    category: "Коктейли и Овершейки",
    description: "Яркий овершейк с взбитыми сливками, разноцветными драже, маршмеллоу, мармеладом и сладким декором",
    price: 490,
    weight: "450 г",
    badge: "Праздник",
    image: "/images/overshakes.jpg",
  },
  {
    id: 40,
    name: "Молочный коктейль в ассортименте",
    category: "Коктейли и Овершейки",
    description: "На натуральном пломбире: ванильный, клубничный, малиновый, кокосовый, миндальный, дыня, карамель, банан, бабл гам, арбуз, шоколад",
    price: 290,
    weight: "300 г",
    badge: "Любимое",
    image: "/images/overshakes.jpg",
  },

  // Классический чай
  {
    id: 33,
    name: "Черный / зеленый / улун",
    category: "Классический чай",
    description: "Крупнолистовой чай в стеклянном чайнике на выбор: насыщенный черный, нежный зеленый или молочный улун",
    price: 320,
    weight: "600 мл",
    badge: "Классика",
    image: "/images/tea-classic.jpg",
  },
  {
    id: 34,
    name: "Гречишный чай",
    category: "Классический чай",
    description: "Натуральный гречишный чай Ку Цяо с мягким ароматом свежего овсяного печенья и сдобной выпечки",
    price: 350,
    weight: "600 мл",
    badge: "Популярное",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 35,
    name: "Черный «Брызги шампанского»",
    category: "Классический чай",
    description: "Премиальный купаж черного чая с лепестками василька, ягодами клубники и легким ароматом игристого",
    price: 320,
    weight: "600 мл",
    badge: "Хит",
    image: "/images/tea-classic.jpg",
  },
  {
    id: 36,
    name: "Черный / зеленый с мятой",
    category: "Классический чай",
    description: "Освежающий листовой черный или зеленый чай с листьями отборной душистой мяты",
    price: 350,
    weight: "600 мл",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 37,
    name: "Травяной сбор",
    category: "Классический чай",
    description: "Успокаивающий купаж полезных трав: чабрец, ромашка, мята, душица и цветы липы",
    price: 350,
    weight: "600 мл",
    badge: "Без кофеина",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=88",
  },

  // Авторский чай
  {
    id: 28,
    name: "Облепиха-апельсин",
    category: "Авторский чай",
    description: "Яркий витаминный чай с алтайской облепихой, дольками свежего апельсина и легкими цитрусовыми нотками",
    price: 170,
    badge: "Хит",
    image: "/images/tea-seabuckthorn.jpg",
    sizes: [
      { label: "250 мл", price: 170 },
      { label: "600 мл", price: 370 },
    ],
  },
  {
    id: 29,
    name: "Облепиха-груша",
    category: "Авторский чай",
    description: "Согревающий натуральный чай с ягодами облепихи, сладкой десертной грушей и пряностями",
    price: 170,
    badge: "Выбор гостей",
    image: "/images/tea-seabuckthorn.jpg",
    sizes: [
      { label: "250 мл", price: 170 },
      { label: "600 мл", price: 370 },
    ],
  },
  {
    id: 30,
    name: "Облепиха-смородина",
    category: "Авторский чай",
    description: "Насыщенный чай с облепихой и черной смородиной, дарящий глубокий рубиново-золотой цвет и ягодный аромат",
    price: 170,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "250 мл", price: 170 },
      { label: "600 мл", price: 370 },
    ],
  },
  {
    id: 31,
    name: "Малина-облепиха",
    category: "Авторский чай",
    description: "Нежное сочетание сладкой спелой малины и целебной облепихи для уюта и тепла в любой день",
    price: 170,
    badge: "Уютный",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "250 мл", price: 170 },
      { label: "600 мл", price: 370 },
    ],
  },
  {
    id: 32,
    name: "Лесные ягоды",
    category: "Авторский чай",
    description: "Ароматный сбор спелых лесных ягод: черника, брусника, клюква и малина с душистыми травами",
    price: 170,
    badge: "Ароматный",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=88",
    sizes: [
      { label: "250 мл", price: 170 },
      { label: "600 мл", price: 370 },
    ],
  },

  // Горячее
  {
    id: 18,
    name: "Стейк из лосося на овощной подушке",
    category: "Горячее",
    description: "Нежный стейк из лосося (на гриле или на пару) на подушке из цукини с гранатовым соусом наршараб и лимоном",
    price: 1370,
    weight: "200/30/10 г",
    badge: "Шеф рекомендует",
    image: "/images/salmon-steak.jpg",
  },
  {
    id: 19,
    name: "Цыпленок по-тирольски",
    category: "Горячее",
    description: "Сочный цыпленок с хрустящей аппетитной корочкой, запеченный по альпийскому рецепту с фирменным соусом",
    price: 750,
    weight: "400/30/30 г",
    badge: "Хит",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 20,
    name: "Оджахури со свининой",
    category: "Горячее",
    description: "Традиционное сытное блюдо: обжаренная свинина, дольки молодого картофеля, томаты, лук, чеснок и зелень",
    price: 750,
    weight: "450 г",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 21,
    name: "Оджахури с курицей",
    category: "Горячее",
    description: "Нежное куриное филе, запеченное с румяным картофелем, спелыми томатами, чесноком и свежей зеленью",
    price: 750,
    weight: "450 г",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 22,
    name: "Скоблянка с говядиной",
    category: "Горячее",
    description: "Тонкие ломтики говядины, обжаренные с лесными грибами, картофелем и луком в нежном соусе",
    price: 820,
    weight: "400 г",
    badge: "Сытно",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 23,
    name: "Говядина в кисло-сладком соусе с овощами",
    category: "Горячее",
    description: "Сочная говядина с хрустящим болгарским перцем, морковью и луком в пряном кисло-сладком соусе",
    price: 820,
    weight: "400 г",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 24,
    name: "Язык запеченный с картофелем",
    category: "Горячее",
    description: "Нежный деликатесный говяжий язык, запеченный под золотистой сырной корочкой с картофелем",
    price: 790,
    weight: "350 г",
    badge: "Деликатес",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 25,
    name: "Рыбка запеченная с картофелем",
    category: "Горячее",
    description: "Филе белой рыбы, томленое в духовой печи с тонкими дольками картофеля, луком и травами",
    price: 700,
    weight: "350 г",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 26,
    name: "Судак Орли",
    category: "Горячее",
    description: "Филе судака в пышном золотистом пивном кляре, подается с соусом тар-тар и свежим лимоном",
    price: 740,
    weight: "350 г",
    badge: "Классика",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 27,
    name: "Соусы в ассортименте",
    category: "Горячее",
    description: "Кетчуп, барбекю, кисло-сладкий, чесночный, наршараб, домашняя сметана на выбор",
    price: 65,
    weight: "30 г",
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1000&q=88",
  },

  // Паста
  {
    id: 13,
    name: "Карбонара",
    category: "Паста",
    description: "Классическая паста с обжаренным беконом, нежным сливочным соусом, тертым пармезаном и микрозеленью",
    price: 590,
    weight: "350 г",
    badge: "Хит",
    image: "/images/pasta-carbonara.jpg",
  },
  {
    id: 14,
    name: "Паста с курицей и грибами",
    category: "Паста",
    description: "Нежное филе цыпленка, обжаренные шампиньоны, сливочный соус и ароматные итальянские травы",
    price: 580,
    weight: "350 г",
    badge: "Любимое",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 15,
    name: "Паста с лангустинами (с черными спагетти)",
    category: "Паста",
    description: "Эффектные черные спагетти с чернилами каракатицы, сочные лангустины, черри и пикантный соус",
    price: 880,
    weight: "310 г",
    badge: "Премиум",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 16,
    name: "Паста с кальмарами (с черными спагетти)",
    category: "Паста",
    description: "Черные спагетти с нежным тихоокеанским кальмаром, чесночными нотками и сливочно-томатным соусом",
    price: 730,
    weight: "350 г",
    badge: "Выбор шефа",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 17,
    name: "Паста с говядиной",
    category: "Паста",
    description: "Томленая сочная говядина в насыщенном мясном соусе с прованскими травами и выдержанным пармезаном",
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
    description: "Микс лесных ягод, малина, черника, легкая цитрусовая кислинка и дробленый лед",
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
    description: "Тонкое хрустящее тесто, сочная фруктовая начинка с орехами и корицей. Подается с шариком мороженого",
    price: 420,
    weight: "200 г",
    badge: "Легендарный",
    image: "/images/strudel-classic.jpg",
  },
  {
    id: 9,
    name: "Легендарный штрудель с грушей и орехами",
    category: "Десерты",
    description: "Ароматный штрудель со спелой грушей, грецкими орехами и золотистой корочкой. Подается с мороженым",
    price: 420,
    weight: "200 г",
    badge: "Выбор гостей",
    image: "/images/strudel-classic.jpg",
  },
  {
    id: 10,
    name: "Венские вафли с мороженым",
    category: "Десерты",
    description: "Свежеиспеченные пышные венские вафли с хрустящей корочкой и шариком сливочного пломбира",
    price: 270,
    weight: "150 г",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1000&q=88",
  },
  {
    id: 11,
    name: "Венские вафли с банановым мороженым и шоколадным топингом",
    category: "Десерты",
    description: "Золотистые теплые вафли, нежное банановое мороженое и теплый шоколадный топинг",
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

const categories: Category[] = ["Все", "Пицца", "Закуски", "Салаты", "Супы", "Горячее", "Паста", "Кофе", "Коктейли и Овершейки", "Авторский чай", "Классический чай", "Лимонады", "Десерты"];

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
            <small>кафе · кофе · овершейки</small>
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
          <img src={asset("/images/restaurant-table-hero.png")} alt="Ужин в ресторане Семь вкусов" />
          <div className="hero-shade" />

          {/* Floating animated dishes */}
          <div className="hero-dish hero-dish-left" aria-hidden="true">
            <img src={asset("/images/hero-salad.png")} alt="Салат Цезарь с лососем" />
          </div>
          <div className="hero-dish hero-dish-right" aria-hidden="true">
            <img src={asset("/images/hero-pizza.png")} alt="Пицца Пепперони" />
          </div>

          <div className="hero-copy">
            <h1>
              Вкусные встречи<br />
              <em>начинаются здесь</em>
            </h1>
            <p>Грандиозные овершейки, ароматный кофе, классический и авторский чай, сочные горячие блюда, паста и десерты.</p>
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
                    <img src={asset(product.image)} alt={product.name} />
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
            <p>Открытая кухня, праздничные овершейки, сочные горячие блюда, паста и чайники согревающего чая. Приходите за яркими эмоциями или заказывайте любимое домой.</p>
            <a href="tel:+79639011818">
              Забронировать стол <Icon name="arrow" />
            </a>
          </div>
          <div className="photo-stack reveal">
            <figure>
              <img src={asset("/images/overshakes.jpg")} alt="Праздничные овершейки" />
            </figure>
            <figure>
              <img src={asset("/images/tea-classic.jpg")} alt="Классический чай" />
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
            <p>Каждый вечер складывается из деталей: ярких овершейков с мармеладом, сочных стейков и душевных встреч.</p>
          </div>
          <div className="gallery-window reveal">
            <div className="gallery-track">
              {[
                ["/images/overshakes.jpg", "Овершейки", "01"],
                ["/images/tea-classic.jpg", "Классический чай", "02"],
                ["/images/tea-seabuckthorn.jpg", "Авторский чай", "03"],
                ["/images/salmon-steak.jpg", "Стейк из лосося", "04"],
                ["/images/pasta-carbonara.jpg", "Паста Карбонара", "05"],
                ["/images/strudel-classic.jpg", "Горячий штрудель", "06"],
              ].map(([image, title, number], index) => (
                <figure className={`gallery-card gallery-card-${index + 1}`} key={title}>
                  <img src={asset(image)} alt={title} loading="lazy" />
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
              <span>Овершейки и коктейли</span><i>·</i>
              <span>Листовой чай</span><i>·</i>
              <span>Горячие блюда</span><i>·</i>
              <span>Свежая выпечка</span><i>·</i>
              <span>Овершейки и коктейли</span><i>·</i>
              <span>Листовой чай</span><i>·</i>
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
              ["01", "Настоящий праздник в стакане", "Овершейки и молочные коктейли на натуральном пломбире с горой сладостей и сливок."],
              ["02", "Готовим прямо под ваш заказ", "Свежие горячие блюда, сочные стейки, паста и напитки с пылу с жару."],
              ["03", "Бережная термодоставка", "Привезем десерты, напитки и горячие блюда от 45 минут по Белорецку."],
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
            <p>«Овершейк «Змейка» привел детей в полный восторг — огромный, красивый, столько сладостей сверху! И взрослые тоже попробовали с удовольствием».</p>
            <footer>
              <b>Светлана</b>
              <span>Ноябрь 2026</span>
            </footer>
          </blockquote>
          <div className="review-note reveal">
            <span>Более 500 отзывов</span>
            <p>Спасибо, что выбираете «7 вкусов» для семейных праздников и тёплых моментов.</p>
          </div>
        </section>

        <section
          className="delivery reveal"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(9,36,28,.88),rgba(9,36,28,.25)), url(${asset('/images/editorial-menu-table.png')})`,
          }}
        >
          <span>Доставка</span>
          <h2>Праздник и свежесть — к вашему столу</h2>
          <p>От 45 минут по Белорецку. Бесплатно при заказе от 1 500 ₽.</p>
          <button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>
            Собрать заказ <Icon name="arrow" />
          </button>
        </section>
      </main>

      <footer id="contacts">
        <div>
          <a className="footer-brand" href="#top">7 вкусов</a>
          <p>Кафе и доставка любимых блюд, овершейков, чая и десертов</p>
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
                <p>Добавьте овершейки, коктейли, блюда или напитки из меню.</p>
                <button className="primary" onClick={() => setCartOpen(false)}>
                  Выбрать позиции
                </button>
              </div>
            ) : (
              <>
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.key}>
                      <img src={asset(item.product.image)} alt={item.product.name} />
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
                <p>Мы получили ваш заказ и уже готовим овершейки и блюда.</p>
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
