const API_URL = 'https://6afc6902892984c4494b8fb7.mockapi.io/products';

let allProducts = [];
let cart = [];
let currentCategory = 'all';

const productsGrid = document.getElementById('products-grid');
const categoriesList = document.getElementById('categories-list');
const searchInput = document.getElementById('search-input');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Реальные фото товаров (DummyJSON CDN) по ID
const PRODUCT_PHOTOS = {
  '1': 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magic-mouse/thumbnail.webp',
  '2': 'https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/thumbnail.webp',
  '3': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp',
  '4': 'https://cdn.dummyjson.com/product-images/mens-bags/blue-women\'s-handbag/thumbnail.webp',
  '5': 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp',
  '6': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-grinder/thumbnail.webp',
  '7': 'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-13-pro/thumbnail.webp',
  '8': 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp',
  '9': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp',
  '10': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp',
  '11': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  '12': 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp',
  '13': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp',
  '14': 'https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp',
  '15': 'https://cdn.dummyjson.com/product-images/home-decoration/wall-art/thumbnail.webp',
  '16': 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp',
  '17': 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp',
  '18': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp',
  '19': 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp',
  '20': 'https://cdn.dummyjson.com/product-images/sunglasses/classic-ray-ban-sunglasses/thumbnail.webp',
  '21': 'https://cdn.dummyjson.com/product-images/mobile-accessories/samsung-galaxy-s10/thumbnail.webp',
  '22': 'https://cdn.dummyjson.com/product-images/furniture/bedside-table-mahogany/thumbnail.webp',
  '23': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/coffee-mug/thumbnail.webp',
  '24': 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp',
  '25': 'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-simili-wood/thumbnail.webp',
  '26': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp',
  '27': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-lid/thumbnail.webp',
  '28': 'https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/thumbnail.webp',
  '29': 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp',
  '30': 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp',
  '31': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-grinder/thumbnail.webp',
  '32': 'https://cdn.dummyjson.com/product-images/mobile-accessories/powerbank/thumbnail.webp',
  '33': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp',
  '34': 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-cream/thumbnail.webp',
  '35': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  '36': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp',
  '37': 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp',
  '38': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-sieve/thumbnail.webp',
  '39': 'https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp',
  '40': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp',
  '41': 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp',
  '42': 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magic-mouse/thumbnail.webp',
  '43': 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp',
  '44': 'https://cdn.dummyjson.com/product-images/mens-bags/blue-women\'s-handbag/thumbnail.webp',
  '45': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fry-pan/thumbnail.webp',
  '46': 'https://cdn.dummyjson.com/product-images/mens-bags/leather-backpack/thumbnail.webp',
  '47': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  '48': 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp',
  '49': 'https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp',
  '50': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fry-pan/thumbnail.webp'
};

// Запасные фото по категории, если ID не совпал или фото не загрузилось
const CATEGORY_FALLBACK_PHOTOS = {
  'Electronics': 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp',
  'Sports & Outdoors': 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp',
  'Bags & Luggage': 'https://cdn.dummyjson.com/product-images/mens-bags/leather-backpack/thumbnail.webp',
  'Wearables': 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp',
  'Home & Kitchen': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fry-pan/thumbnail.webp',
  'Accessories': 'https://cdn.dummyjson.com/product-images/sunglasses/classic-ray-ban-sunglasses/thumbnail.webp',
  'Audio': 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp',
  'Home & Office': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  'Apparel': 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp',
  'Home Appliances': 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-grinder/thumbnail.webp',
  'Books & Media': 'https://cdn.dummyjson.com/product-images/home-decoration/wall-art/thumbnail.webp',
  'Home & Living': 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp',
  'Footwear': 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp',
  'Stationery': 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp',
  'Personal Care': 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-cream/thumbnail.webp',
  'Smart Home': 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp',
  'Health & Wellness': 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp'
};

function getProductImage(item) {
  const hasRealUrl =
    typeof item.image === 'string' &&
    item.image.startsWith('https://') &&
    !item.image.includes('example.com') &&
    !item.image.includes('placehold.co');

  if (hasRealUrl) {
    return item.image;
  }

  const byId = PRODUCT_PHOTOS[String(item.id)];
  if (byId) {
    return byId;
  }

  return (
    CATEGORY_FALLBACK_PHOTOS[item.category] ||
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp'
  );
}

// Форматирование цены в тенге
function formatPrice(price) {
  const numPrice = Number(price) || 0;
  if (numPrice === 0) return 'Бесплатно';
  return `${numPrice.toLocaleString('ru-KZ')} ₸`;
}

// Загрузка товаров из MockAPI
async function loadProducts() {
  productsGrid.innerHTML = '<p>Загрузка каталога...</p>';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

    allProducts = await response.json();
    renderCategories(allProducts);
    filterAndRender();
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    productsGrid.innerHTML = `
      <p style="color: red;">Не удалось загрузить товары (${error.message}). 
      Проверьте, не блокирует ли браузер (AdBlock/антивирус) запросы к mockapi.io.</p>
    `;
  }
}

// Автоматически создаем кнопки категорий из полученных данных
function renderCategories(products) {
  const uniqueCategories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  categoriesList.innerHTML = '';

  uniqueCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-btn ${cat === 'all' ? 'active' : ''}`;
    btn.textContent = cat === 'all' ? 'Все товары' : cat;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = cat;
      filterAndRender();
    });

    categoriesList.appendChild(btn);
  });
}

// Фильтрация по категории и поиску (по названию и бренду)
function filterAndRender() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = allProducts.filter(item => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      (item.brand && item.brand.toLowerCase().includes(query));

    return matchesCat && matchesSearch;
  });

  renderProducts(filtered);
}

// Отрисовка карточек
function renderProducts(products) {
  productsGrid.innerHTML = '';

  if (products.length === 0) {
    productsGrid.innerHTML = '<p>Товары не найдены.</p>';
    return;
  }

  products.forEach(item => {
    const imgSrc = getProductImage(item);
    const fallbackImg =
      CATEGORY_FALLBACK_PHOTOS[item.category] ||
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp';
    const isOutOfStock = Number(item.stock) <= 0;
    const priceText = formatPrice(item.price);

    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img 
        src="${imgSrc}" 
        onerror="this.onerror=null; this.src='${fallbackImg}';" 
        alt="${item.title}" 
        class="product-img"
      >
      <div class="product-meta">
        <span class="product-brand">${item.brand || 'Brand'}</span>
        <span>⭐ ${item.rating ?? 0} | ${item.category}</span>
      </div>
      <h3 class="product-title">${item.title}</h3>
      <p class="product-desc">${item.description}</p>
      <div class="product-stock ${isOutOfStock ? 'out' : ''}">
        ${isOutOfStock ? 'Нет в наличии' : `В наличии: ${item.stock} шт.`}
      </div>
      <div class="product-bottom">
        <span class="product-price">${priceText}</span>
        <button 
          class="add-btn" 
          onclick="addToCart('${item.id}')" 
          ${isOutOfStock ? 'disabled' : ''}
        >
          ${isOutOfStock ? 'Распродано' : 'В корзину'}
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// Корзина
function addToCart(id) {
  const product = allProducts.find(p => String(p.id) === String(id));
  if (!product) return;

  cart.push(product);
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartCountEl.textContent = cart.length;
  cartItemsContainer.innerHTML = '';

  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
  } else {
    cart.forEach((item, index) => {
      total += Number(item.price) || 0;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div>
          <strong>${item.title}</strong> (${item.brand})<br>
          <small>${formatPrice(item.price)}</small>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Удалить</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  cartTotalEl.textContent = `${total.toLocaleString('ru-KZ')} ₸`;
}

searchInput.addEventListener('input', filterAndRender);
cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert('Корзина пуста!');
  alert('Заказ успешно оформлен!');
  cart = [];
  updateCartUI();
  cartModal.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', loadProducts);