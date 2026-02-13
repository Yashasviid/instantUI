import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let versions = [];

// ========== PERFECT RESEARCH - NO CRASHES ==========
async function researchTopic(intent) {
  console.log('🔍 RESEARCHING:', intent);
  const lowerIntent = intent.toLowerCase();
  
  // CAR BOOKING / UBER
  if (lowerIntent.includes('car') || lowerIntent.includes('booking') || lowerIntent.includes('uber') || lowerIntent.includes('ride')) {
    return {
      navbarTitle: 'Car Booking',
      tableTitle: '🚗 Available Cars',
      columns: ['Car Model', 'Year', 'Price/Day', 'Rating'],
      data: [['Toyota Camry', '2023', '$45', '⭐4.8'], ['Honda Civic', '2024', '$38', '⭐4.7'], ['BMW X5', '2022', '$89', '⭐4.9']],
      cards: ['Book Car', 'My Trips', 'Payment']
    };
  }
  
  // RESTAURANT / MENU
  if (lowerIntent.includes('restaurant') || lowerIntent.includes('menu') || lowerIntent.includes('coffee') || lowerIntent.includes('starbucks')) {
    return {
      navbarTitle: 'Menu',
      tableTitle: '🍽️ Menu Items',
      columns: ['Dish', 'Price', 'Calories'],
      data: [['Margherita Pizza', '$12', '850'], ['Grilled Salmon', '$18', '420'], ['Tiramisu', '$6', '320']],
      cards: ['Order Now', 'Favorites', 'Cart']
    };
  }
  
  // CRYPTO
  if (lowerIntent.includes('crypto') || lowerIntent.includes('bitcoin')) {
    return {
      navbarTitle: 'Crypto',
      tableTitle: '₿ Prices',
      columns: ['Coin', 'Price', '24h Change'],
      data: [['BTC', '$48,234', '+2.3%'], ['ETH', '$3,245', '+1.5%'], ['SOL', '$145', '+5.8%']],
      cards: ['Portfolio', 'Watchlist', 'Trade']
    };
  }
  
  // SHOP
  if (lowerIntent.includes('shop') || lowerIntent.includes('store') || lowerIntent.includes('product')) {
    return {
      navbarTitle: 'Shop',
      tableTitle: '🛍️ Products',
      columns: ['Item', 'Price', 'Stock'],
      data: [['T-Shirt', '$19', '47'], ['Jeans', '$49', '23'], ['Sneakers', '$89', '12']],
      cards: ['Cart', 'Wishlist', 'Orders']
    };
  }
  
  // PINK / BARBIE
  if (lowerIntent.includes('pink') || lowerIntent.includes('barbie')) {
    return {
      navbarTitle: 'Pink',
      tableTitle: '🌸 Collection',
      columns: ['Item', 'Size', 'Price'],
      data: [['Pink Dress', 'XS', '$89'], ['Blush Top', 'M', '$45'], ['Pink Heels', '7', '$120']],
      cards: ['New Arrivals', 'Best Sellers', 'Outfits']
    };
  }
  
  // FALLBACK 
  const firstWord = intent.split(' ')[0].charAt(0).toUpperCase() + intent.split(' ')[0].slice(1);
  return {
    navbarTitle: firstWord,
    tableTitle: `${firstWord} Data`,
    columns: ['Name', 'Status', 'Details'],
    data: [[intent, 'Active', 'Ready']],
    cards: ['Overview', 'Details', 'Settings']
  };
}

// ========== PLANNER ==========
async function planner(intent) {
  const research = await researchTopic(intent);
  
  return {
    layout: 'dashboard',
    components: [
      { type: 'Navbar', props: { title: `${research.navbarTitle} 🚀` } },
      ...research.cards.map(title => ({
        type: 'Card',
        props: { title },
        children: [{ type: 'Button', props: { label: 'Action' } }]
      })),
      { type: 'Table', props: { tableTitle: research.tableTitle, columns: research.columns, data: research.data } }
    ]
  };
}

// ========== GENERATOR ==========
function generator(plan, intent) {
  const navbar = plan.components.find(c => c.type === 'Navbar');
  const navbarTitle = navbar ? navbar.props.title : 'Dashboard';
  
  const code = `// ✨ Generated UI for "${intent}"
import React from 'react';

function ${navbarTitle.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <div style={{padding: '20px', background: '#020617'}}>
      <h1>${navbarTitle}</h1>
      <p>Generated UI with ${plan.components.length} components</p>
    </div>
  );
}

export default ${navbarTitle.replace(/[^a-zA-Z0-9]/g, '')};`;

  return { code };
}

// ========== API ==========
app.post('/api/generate', async (req, res) => {
  try {
    const { intent } = req.body;
    if (!intent) return res.status(400).json({ success: false, error: 'No intent' });
    
    console.log('🎨 Generating:', intent);
    const plan = await planner(intent);
    const { code } = generator(plan, intent);
    
    res.json({
      success: true,
      code,
      explanation: `✨ ${plan.components.find(c => c.type === 'Navbar')?.props?.title || 'UI'} ready!`,
      plan
    });
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      plan: null 
    });
  }
});

// TEST ENDPOINT
app.get('/', (req, res) => res.json({ status: 'Backend OK', port: 3001 }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\\running Backend: http://localhost:${PORT} :)`);
  console.log('✅ Test: "car booking", "uber clone", "pink website"');
});
