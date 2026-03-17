// ═══════════════════════════════════════════════
// FOOD DATABASE — 200+ items
// Indian cuisine, global foods, beverages, alcohol
// ═══════════════════════════════════════════════
const foodDatabase = [
    // ── Indian Breads & Rice ──
    { name: 'Chapati / Roti', calories: 71, protein: 3, carbs: 15, fat: 0.4, serving: '1 roti', category: 'indian' },
    { name: 'Paratha (plain)', calories: 230, protein: 5, carbs: 28, fat: 11, serving: '1 paratha', category: 'indian' },
    { name: 'Aloo Paratha', calories: 290, protein: 6, carbs: 36, fat: 13, serving: '1 paratha', category: 'indian' },
    { name: 'Gobi Paratha', calories: 260, protein: 5, carbs: 32, fat: 12, serving: '1 paratha', category: 'indian' },
    { name: 'Naan', calories: 262, protein: 9, carbs: 45, fat: 5, serving: '1 naan', category: 'indian' },
    { name: 'Garlic Naan', calories: 300, protein: 9, carbs: 48, fat: 8, serving: '1 naan', category: 'indian' },
    { name: 'Butter Naan', calories: 320, protein: 9, carbs: 45, fat: 12, serving: '1 naan', category: 'indian' },
    { name: 'Puri', calories: 101, protein: 2, carbs: 10, fat: 6, serving: '1 puri', category: 'indian' },
    { name: 'Bhatura', calories: 330, protein: 6, carbs: 40, fat: 16, serving: '1 bhatura', category: 'indian' },
    { name: 'Kulcha', calories: 290, protein: 8, carbs: 42, fat: 10, serving: '1 kulcha', category: 'indian' },
    { name: 'Appam', calories: 120, protein: 3, carbs: 22, fat: 2, serving: '1 appam', category: 'indian' },
    { name: 'Rice (steamed)', calories: 206, protein: 4, carbs: 45, fat: 0.4, serving: '1 cup', category: 'indian' },
    { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup', category: 'grains' },
    { name: 'Jeera Rice', calories: 230, protein: 5, carbs: 46, fat: 3, serving: '1 cup', category: 'indian' },
    { name: 'Lemon Rice', calories: 250, protein: 5, carbs: 48, fat: 4, serving: '1 cup', category: 'indian' },
    { name: 'Curd Rice', calories: 200, protein: 7, carbs: 40, fat: 3, serving: '1 cup', category: 'indian' },
    { name: 'Pulao', calories: 260, protein: 6, carbs: 42, fat: 7, serving: '1 cup', category: 'indian' },
    { name: 'Biryani (Chicken)', calories: 360, protein: 18, carbs: 45, fat: 12, serving: '1 cup', category: 'indian' },
    { name: 'Biryani (Mutton)', calories: 400, protein: 20, carbs: 44, fat: 16, serving: '1 cup', category: 'indian' },
    { name: 'Biryani (Veg)', calories: 290, protein: 8, carbs: 48, fat: 8, serving: '1 cup', category: 'indian' },
    { name: 'Hyderabadi Biryani', calories: 420, protein: 22, carbs: 46, fat: 18, serving: '1 cup', category: 'indian' },

    // ── Indian Curries & Sabzi ──
    { name: 'Chicken Curry', calories: 180, protein: 25, carbs: 8, fat: 6, serving: '1 cup', category: 'indian' },
    { name: 'Butter Chicken', calories: 240, protein: 22, carbs: 10, fat: 13, serving: '1 cup', category: 'indian' },
    { name: 'Chicken Tikka Masala', calories: 260, protein: 24, carbs: 12, fat: 14, serving: '1 cup', category: 'indian' },
    { name: 'Tandoori Chicken', calories: 195, protein: 28, carbs: 4, fat: 8, serving: '1 piece', category: 'indian' },
    { name: 'Chicken 65', calories: 220, protein: 20, carbs: 14, fat: 10, serving: '100g', category: 'indian' },
    { name: 'Kadhai Chicken', calories: 210, protein: 24, carbs: 8, fat: 10, serving: '1 cup', category: 'indian' },
    { name: 'Fish Curry', calories: 150, protein: 22, carbs: 5, fat: 5, serving: '1 cup', category: 'indian' },
    { name: 'Fish Fry (Kerala)', calories: 200, protein: 20, carbs: 8, fat: 10, serving: '1 piece', category: 'indian' },
    { name: 'Prawn Masala', calories: 175, protein: 20, carbs: 8, fat: 7, serving: '1 cup', category: 'indian' },
    { name: 'Mutton Rogan Josh', calories: 250, protein: 22, carbs: 8, fat: 15, serving: '1 cup', category: 'indian' },
    { name: 'Keema', calories: 230, protein: 20, carbs: 6, fat: 14, serving: '1 cup', category: 'indian' },
    { name: 'Egg Curry', calories: 170, protein: 14, carbs: 10, fat: 8, serving: '1 cup', category: 'indian' },
    { name: 'Dal Tadka', calories: 125, protein: 9, carbs: 20, fat: 2, serving: '1 cup', category: 'indian' },
    { name: 'Dal Makhani', calories: 190, protein: 10, carbs: 22, fat: 8, serving: '1 cup', category: 'indian' },
    { name: 'Rajma', calories: 160, protein: 10, carbs: 26, fat: 2, serving: '1 cup', category: 'indian' },
    { name: 'Chole / Chana Masala', calories: 180, protein: 10, carbs: 28, fat: 4, serving: '1 cup', category: 'indian' },
    { name: 'Paneer Butter Masala', calories: 320, protein: 16, carbs: 14, fat: 22, serving: '1 cup', category: 'indian' },
    { name: 'Paneer Tikka', calories: 260, protein: 18, carbs: 8, fat: 18, serving: '100g', category: 'indian' },
    { name: 'Shahi Paneer', calories: 310, protein: 15, carbs: 12, fat: 24, serving: '1 cup', category: 'indian' },
    { name: 'Palak Paneer', calories: 270, protein: 16, carbs: 10, fat: 18, serving: '1 cup', category: 'indian' },
    { name: 'Kadhai Paneer', calories: 280, protein: 16, carbs: 12, fat: 20, serving: '1 cup', category: 'indian' },
    { name: 'Paneer (raw)', calories: 265, protein: 18, carbs: 3, fat: 20, serving: '100g', category: 'indian' },
    { name: 'Aloo Gobi', calories: 140, protein: 4, carbs: 22, fat: 5, serving: '1 cup', category: 'indian' },
    { name: 'Baingan Bharta', calories: 120, protein: 3, carbs: 14, fat: 6, serving: '1 cup', category: 'indian' },
    { name: 'Bhindi Masala', calories: 90, protein: 3, carbs: 12, fat: 4, serving: '1 cup', category: 'indian' },
    { name: 'Malai Kofta', calories: 350, protein: 12, carbs: 20, fat: 26, serving: '1 cup', category: 'indian' },
    { name: 'Navratan Korma', calories: 280, protein: 8, carbs: 22, fat: 18, serving: '1 cup', category: 'indian' },
    { name: 'Mixed Veg Curry', calories: 120, protein: 4, carbs: 16, fat: 5, serving: '1 cup', category: 'indian' },
    { name: 'Sambhar', calories: 85, protein: 5, carbs: 14, fat: 1.5, serving: '1 cup', category: 'indian' },
    { name: 'Rasam', calories: 45, protein: 2, carbs: 8, fat: 0.5, serving: '1 cup', category: 'indian' },

    // ── South Indian ──
    { name: 'Dosa (plain)', calories: 168, protein: 4, carbs: 28, fat: 4, serving: '1 dosa', category: 'indian' },
    { name: 'Masala Dosa', calories: 280, protein: 6, carbs: 38, fat: 12, serving: '1 dosa', category: 'indian' },
    { name: 'Rava Dosa', calories: 220, protein: 5, carbs: 30, fat: 9, serving: '1 dosa', category: 'indian' },
    { name: 'Idli', calories: 39, protein: 2, carbs: 8, fat: 0.2, serving: '1 idli', category: 'indian' },
    { name: 'Vada (Medu)', calories: 133, protein: 3, carbs: 16, fat: 7, serving: '1 vada', category: 'indian' },
    { name: 'Uttapam', calories: 200, protein: 5, carbs: 32, fat: 5, serving: '1 uttapam', category: 'indian' },
    { name: 'Upma', calories: 160, protein: 4, carbs: 30, fat: 3, serving: '1 cup', category: 'indian' },
    { name: 'Pongal', calories: 190, protein: 6, carbs: 32, fat: 5, serving: '1 cup', category: 'indian' },
    { name: 'Pesarattu', calories: 150, protein: 8, carbs: 22, fat: 3, serving: '1 pesarattu', category: 'indian' },
    { name: 'Coconut Chutney', calories: 60, protein: 1, carbs: 4, fat: 4, serving: '2 tbsp', category: 'indian' },
    { name: 'Tomato Chutney', calories: 40, protein: 1, carbs: 8, fat: 1, serving: '2 tbsp', category: 'indian' },
    { name: 'Raita', calories: 50, protein: 3, carbs: 5, fat: 2, serving: '½ cup', category: 'indian' },

    // ── Indian Street Food ──
    { name: 'Pani Puri / Golgappa', calories: 36, protein: 1, carbs: 7, fat: 0.5, serving: '1 piece', category: 'indian' },
    { name: 'Samosa', calories: 262, protein: 4, carbs: 25, fat: 17, serving: '1 samosa', category: 'indian' },
    { name: 'Kachori', calories: 280, protein: 5, carbs: 28, fat: 16, serving: '1 kachori', category: 'indian' },
    { name: 'Pav Bhaji', calories: 350, protein: 10, carbs: 48, fat: 14, serving: '1 plate', category: 'indian' },
    { name: 'Vada Pav', calories: 290, protein: 6, carbs: 32, fat: 15, serving: '1 piece', category: 'indian' },
    { name: 'Bhel Puri', calories: 200, protein: 5, carbs: 30, fat: 7, serving: '1 plate', category: 'indian' },
    { name: 'Sev Puri', calories: 220, protein: 4, carbs: 28, fat: 10, serving: '1 plate', category: 'indian' },
    { name: 'Dabeli', calories: 250, protein: 5, carbs: 35, fat: 10, serving: '1 piece', category: 'indian' },
    { name: 'Aloo Tikki', calories: 180, protein: 4, carbs: 22, fat: 9, serving: '1 piece', category: 'indian' },
    { name: 'Poha', calories: 180, protein: 5, carbs: 35, fat: 2, serving: '1 cup', category: 'indian' },
    { name: 'Misal Pav', calories: 380, protein: 14, carbs: 48, fat: 14, serving: '1 plate', category: 'indian' },
    { name: 'Dhokla', calories: 160, protein: 6, carbs: 26, fat: 4, serving: '4 pieces', category: 'indian' },
    { name: 'Khandvi', calories: 120, protein: 4, carbs: 18, fat: 4, serving: '4 pieces', category: 'indian' },
    { name: 'Pakora / Bhajiya', calories: 175, protein: 4, carbs: 18, fat: 10, serving: '4 pieces', category: 'indian' },
    { name: 'Momos (steamed)', calories: 200, protein: 10, carbs: 24, fat: 7, serving: '6 pieces', category: 'indian' },
    { name: 'Momos (fried)', calories: 320, protein: 10, carbs: 28, fat: 18, serving: '6 pieces', category: 'indian' },

    // ── Indian Sweets ──
    { name: 'Gulab Jamun', calories: 175, protein: 2, carbs: 26, fat: 7, serving: '1 piece', category: 'indian' },
    { name: 'Rasgulla', calories: 120, protein: 3, carbs: 22, fat: 2, serving: '1 piece', category: 'indian' },
    { name: 'Jalebi', calories: 150, protein: 1, carbs: 30, fat: 4, serving: '1 piece', category: 'indian' },
    { name: 'Ladoo (besan)', calories: 180, protein: 3, carbs: 22, fat: 10, serving: '1 piece', category: 'indian' },
    { name: 'Barfi', calories: 140, protein: 3, carbs: 18, fat: 6, serving: '1 piece', category: 'indian' },
    { name: 'Kheer / Payasam', calories: 180, protein: 5, carbs: 30, fat: 5, serving: '1 cup', category: 'indian' },
    { name: 'Halwa (sooji)', calories: 220, protein: 3, carbs: 32, fat: 10, serving: '1 cup', category: 'indian' },
    { name: 'Gajar Halwa', calories: 250, protein: 4, carbs: 34, fat: 12, serving: '1 cup', category: 'indian' },
    { name: 'Rasmalai', calories: 190, protein: 5, carbs: 24, fat: 8, serving: '1 piece', category: 'indian' },
    { name: 'Kulfi', calories: 160, protein: 4, carbs: 20, fat: 7, serving: '1 piece', category: 'indian' },

    // ── Protein Sources ──
    { name: 'Egg White', calories: 17, protein: 4, carbs: 0.2, fat: 0.1, serving: '1 large', category: 'protein' },
    { name: 'Whole Egg', calories: 72, protein: 6, carbs: 0.4, fat: 5, serving: '1 large', category: 'protein' },
    { name: 'Boiled Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5, serving: '1 large', category: 'protein' },
    { name: 'Omelette (2 eggs)', calories: 190, protein: 14, carbs: 1, fat: 14, serving: '1 omelette', category: 'protein' },
    { name: 'Chicken Breast (grilled)', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g', category: 'protein' },
    { name: 'Chicken Thigh', calories: 209, protein: 26, carbs: 0, fat: 11, serving: '100g', category: 'protein' },
    { name: 'Fish (Tilapia)', calories: 96, protein: 20, carbs: 0, fat: 1.7, serving: '100g', category: 'protein' },
    { name: 'Fish (Salmon)', calories: 206, protein: 22, carbs: 0, fat: 13, serving: '100g', category: 'protein' },
    { name: 'Fish Sticks (air-fried)', calories: 80, protein: 10, carbs: 8, fat: 2, serving: '1 stick', category: 'protein' },
    { name: 'Tuna (canned)', calories: 128, protein: 28, carbs: 0, fat: 1, serving: '100g', category: 'protein' },
    { name: 'Prawns / Shrimp', calories: 85, protein: 18, carbs: 0, fat: 1, serving: '100g', category: 'protein' },
    { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.4, serving: '170g', category: 'protein' },
    { name: 'Cottage Cheese', calories: 98, protein: 11, carbs: 3, fat: 4.3, serving: '100g', category: 'protein' },
    { name: 'Protein Shake (whey)', calories: 120, protein: 24, carbs: 3, fat: 1.5, serving: '1 scoop', category: 'protein' },
    { name: 'Tofu', calories: 76, protein: 8, carbs: 2, fat: 4.8, serving: '100g', category: 'protein' },
    { name: 'Soya Chunks', calories: 336, protein: 52, carbs: 33, fat: 0.5, serving: '100g dry', category: 'protein' },
    { name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fat: 1, serving: '100g', category: 'protein' },

    // ── Grains & Carbs ──
    { name: 'White Rice', calories: 206, protein: 4.3, carbs: 45, fat: 0.4, serving: '1 cup', category: 'grains' },
    { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, serving: '½ cup dry', category: 'grains' },
    { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6, serving: '1 cup', category: 'grains' },
    { name: 'Sweet Potato', calories: 112, protein: 2, carbs: 26, fat: 0.1, serving: '1 medium', category: 'grains' },
    { name: 'Potato', calories: 163, protein: 4, carbs: 37, fat: 0.2, serving: '1 medium', category: 'grains' },
    { name: 'Bread (whole wheat)', calories: 80, protein: 4, carbs: 14, fat: 1, serving: '1 slice', category: 'grains' },
    { name: 'Bread (white)', calories: 70, protein: 3, carbs: 13, fat: 1, serving: '1 slice', category: 'grains' },
    { name: 'Pasta (cooked)', calories: 158, protein: 6, carbs: 31, fat: 0.9, serving: '1 cup', category: 'grains' },
    { name: 'Cornflakes', calories: 100, protein: 2, carbs: 24, fat: 0.2, serving: '1 cup', category: 'grains' },
    { name: 'Muesli', calories: 289, protein: 8, carbs: 56, fat: 5, serving: '100g', category: 'grains' },

    // ── Fruits ──
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium', category: 'fruit' },
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium', category: 'fruit' },
    { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, serving: '1 medium', category: 'fruit' },
    { name: 'Mango', calories: 202, protein: 3, carbs: 50, fat: 1.3, serving: '1 cup', category: 'fruit' },
    { name: 'Grapes', calories: 104, protein: 1, carbs: 27, fat: 0.2, serving: '1 cup', category: 'fruit' },
    { name: 'Watermelon', calories: 46, protein: 0.9, carbs: 12, fat: 0.2, serving: '1 cup', category: 'fruit' },
    { name: 'Papaya', calories: 62, protein: 0.7, carbs: 16, fat: 0.4, serving: '1 cup', category: 'fruit' },
    { name: 'Strawberries', calories: 49, protein: 1, carbs: 12, fat: 0.5, serving: '1 cup', category: 'fruit' },
    { name: 'Pineapple', calories: 82, protein: 0.9, carbs: 22, fat: 0.2, serving: '1 cup', category: 'fruit' },
    { name: 'Guava', calories: 68, protein: 2.5, carbs: 14, fat: 1, serving: '1 medium', category: 'fruit' },
    { name: 'Chikoo (Sapota)', calories: 83, protein: 0.4, carbs: 20, fat: 1.1, serving: '1 medium', category: 'fruit' },
    { name: 'Pomegranate', calories: 83, protein: 1.7, carbs: 19, fat: 1.2, serving: '½ cup', category: 'fruit' },
    { name: 'Lychee', calories: 66, protein: 0.8, carbs: 17, fat: 0.4, serving: '1 cup', category: 'fruit' },
    { name: 'Jackfruit', calories: 95, protein: 1.7, carbs: 23, fat: 0.6, serving: '1 cup', category: 'fruit' },
    { name: 'Custard Apple (Sitaphal)', calories: 100, protein: 1.7, carbs: 25, fat: 0.6, serving: '1 medium', category: 'fruit' },
    { name: 'Blueberries', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, serving: '1 cup', category: 'fruit' },
    { name: 'Kiwi', calories: 42, protein: 0.8, carbs: 10, fat: 0.4, serving: '1 medium', category: 'fruit' },
    { name: 'Avocado', calories: 240, protein: 3, carbs: 13, fat: 22, serving: '1 medium', category: 'fruit' },

    // ── Vegetables ──
    { name: 'Broccoli', calories: 55, protein: 4, carbs: 11, fat: 0.6, serving: '1 cup', category: 'veg' },
    { name: 'Spinach', calories: 7, protein: 0.9, carbs: 1, fat: 0.1, serving: '1 cup raw', category: 'veg' },
    { name: 'Cucumber', calories: 16, protein: 0.8, carbs: 4, fat: 0.2, serving: '1 cup', category: 'veg' },
    { name: 'Tomato', calories: 32, protein: 1.6, carbs: 7, fat: 0.4, serving: '1 cup', category: 'veg' },
    { name: 'Carrot', calories: 52, protein: 1.2, carbs: 12, fat: 0.3, serving: '1 cup', category: 'veg' },
    { name: 'Bell Pepper', calories: 39, protein: 1.5, carbs: 9, fat: 0.5, serving: '1 cup', category: 'veg' },
    { name: 'Cauliflower', calories: 25, protein: 2, carbs: 5, fat: 0.1, serving: '1 cup', category: 'veg' },
    { name: 'Cabbage', calories: 22, protein: 1.3, carbs: 5, fat: 0.1, serving: '1 cup', category: 'veg' },
    { name: 'Onion', calories: 44, protein: 1.2, carbs: 10, fat: 0.1, serving: '1 medium', category: 'veg' },
    { name: 'Green Beans', calories: 31, protein: 1.8, carbs: 7, fat: 0.1, serving: '1 cup', category: 'veg' },
    { name: 'Mushrooms', calories: 22, protein: 3, carbs: 3, fat: 0.3, serving: '1 cup', category: 'veg' },
    { name: 'Corn', calories: 132, protein: 5, carbs: 29, fat: 1.8, serving: '1 cup', category: 'veg' },
    { name: 'Beetroot', calories: 58, protein: 2.2, carbs: 13, fat: 0.2, serving: '1 cup', category: 'veg' },

    // ── Indian Beverages ──
    { name: 'Chai (with milk & sugar)', calories: 80, protein: 3, carbs: 12, fat: 2.5, serving: '1 cup', category: 'beverage' },
    { name: 'Masala Chai', calories: 90, protein: 3, carbs: 14, fat: 3, serving: '1 cup', category: 'beverage' },
    { name: 'Cutting Chai', calories: 50, protein: 2, carbs: 8, fat: 1.5, serving: '1 glass', category: 'beverage' },
    { name: 'Filter Coffee (South Indian)', calories: 95, protein: 3, carbs: 10, fat: 4, serving: '1 cup', category: 'beverage' },
    { name: 'Lassi (sweet)', calories: 180, protein: 6, carbs: 28, fat: 5, serving: '1 glass', category: 'beverage' },
    { name: 'Lassi (salted)', calories: 100, protein: 5, carbs: 12, fat: 4, serving: '1 glass', category: 'beverage' },
    { name: 'Mango Lassi', calories: 210, protein: 6, carbs: 32, fat: 6, serving: '1 glass', category: 'beverage' },
    { name: 'Chaas / Buttermilk', calories: 40, protein: 3, carbs: 5, fat: 1, serving: '1 glass', category: 'beverage' },
    { name: 'Nimbu Pani (Lemonade)', calories: 60, protein: 0, carbs: 16, fat: 0, serving: '1 glass', category: 'beverage' },
    { name: 'Jaljeera', calories: 30, protein: 0, carbs: 7, fat: 0, serving: '1 glass', category: 'beverage' },
    { name: 'Aam Panna', calories: 80, protein: 0.5, carbs: 20, fat: 0, serving: '1 glass', category: 'beverage' },
    { name: 'Sugarcane Juice', calories: 180, protein: 0, carbs: 45, fat: 0, serving: '1 glass', category: 'beverage' },
    { name: 'Coconut Water', calories: 45, protein: 2, carbs: 9, fat: 0.5, serving: '1 cup', category: 'beverage' },
    { name: 'Thandai', calories: 200, protein: 5, carbs: 30, fat: 7, serving: '1 glass', category: 'beverage' },
    { name: 'Badam Milk', calories: 170, protein: 6, carbs: 22, fat: 7, serving: '1 glass', category: 'beverage' },
    { name: 'Rooh Afza (sharbat)', calories: 100, protein: 0, carbs: 25, fat: 0, serving: '1 glass', category: 'beverage' },
    { name: 'Sol Kadhi', calories: 60, protein: 1, carbs: 8, fat: 3, serving: '1 glass', category: 'beverage' },

    // ── General Beverages ──
    { name: 'Orange Juice', calories: 112, protein: 2, carbs: 26, fat: 0.5, serving: '240ml', category: 'beverage' },
    { name: 'Apple Juice', calories: 114, protein: 0.2, carbs: 28, fat: 0.3, serving: '240ml', category: 'beverage' },
    { name: 'Milk (whole)', calories: 149, protein: 8, carbs: 12, fat: 8, serving: '240ml', category: 'beverage' },
    { name: 'Milk (skim)', calories: 83, protein: 8, carbs: 12, fat: 0.2, serving: '240ml', category: 'beverage' },
    { name: 'Almond Milk', calories: 30, protein: 1, carbs: 1, fat: 2.5, serving: '240ml', category: 'beverage' },
    { name: 'Coffee (black)', calories: 2, protein: 0.3, carbs: 0, fat: 0, serving: '240ml', category: 'beverage' },
    { name: 'Coffee (with milk)', calories: 60, protein: 3, carbs: 6, fat: 3, serving: '240ml', category: 'beverage' },
    { name: 'Cappuccino', calories: 120, protein: 6, carbs: 10, fat: 6, serving: '240ml', category: 'beverage' },
    { name: 'Latte', calories: 150, protein: 8, carbs: 12, fat: 8, serving: '360ml', category: 'beverage' },
    { name: 'Espresso', calories: 3, protein: 0.1, carbs: 0.5, fat: 0, serving: '30ml', category: 'beverage' },
    { name: 'Green Tea', calories: 0, protein: 0, carbs: 0, fat: 0, serving: '240ml', category: 'beverage' },
    { name: 'Tea (unsweetened)', calories: 2, protein: 0, carbs: 0.5, fat: 0, serving: '240ml', category: 'beverage' },
    { name: 'Hot Chocolate', calories: 190, protein: 5, carbs: 30, fat: 6, serving: '240ml', category: 'beverage' },
    { name: 'Smoothie (mixed fruit)', calories: 200, protein: 4, carbs: 40, fat: 2, serving: '1 glass', category: 'beverage' },
    { name: 'Protein Smoothie', calories: 250, protein: 28, carbs: 22, fat: 5, serving: '1 glass', category: 'beverage' },

    // ── Soft Drinks & Sodas ──
    { name: 'Coca-Cola', calories: 140, protein: 0, carbs: 39, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Pepsi', calories: 150, protein: 0, carbs: 41, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Sprite / 7UP', calories: 140, protein: 0, carbs: 38, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Mountain Dew', calories: 170, protein: 0, carbs: 46, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Fanta', calories: 160, protein: 0, carbs: 44, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Thumbs Up', calories: 140, protein: 0, carbs: 39, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Limca', calories: 120, protein: 0, carbs: 33, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Red Bull', calories: 110, protein: 0, carbs: 28, fat: 0, serving: '250ml', category: 'beverage' },
    { name: 'Diet Coke / Coke Zero', calories: 0, protein: 0, carbs: 0, fat: 0, serving: '330ml', category: 'beverage' },
    { name: 'Maaza / Frooti (mango)', calories: 140, protein: 0, carbs: 35, fat: 0, serving: '250ml', category: 'beverage' },
    { name: 'Appy Fizz', calories: 120, protein: 0, carbs: 30, fat: 0, serving: '250ml', category: 'beverage' },

    // ── Alcohol ──
    { name: 'Beer (regular)', calories: 150, protein: 1.6, carbs: 13, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Beer (strong)', calories: 200, protein: 1.5, carbs: 16, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Beer (light)', calories: 100, protein: 0.8, carbs: 5, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Kingfisher Premium', calories: 148, protein: 1.5, carbs: 12, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Bira White', calories: 165, protein: 1.5, carbs: 18, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Budweiser', calories: 145, protein: 1.3, carbs: 11, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Heineken', calories: 142, protein: 1.2, carbs: 11, fat: 0, serving: '330ml', category: 'alcohol' },
    { name: 'Red Wine', calories: 125, protein: 0.1, carbs: 4, fat: 0, serving: '150ml', category: 'alcohol' },
    { name: 'White Wine', calories: 121, protein: 0.1, carbs: 4, fat: 0, serving: '150ml', category: 'alcohol' },
    { name: 'Rosé Wine', calories: 125, protein: 0.1, carbs: 4, fat: 0, serving: '150ml', category: 'alcohol' },
    { name: 'Champagne / Prosecco', calories: 85, protein: 0.2, carbs: 1, fat: 0, serving: '120ml', category: 'alcohol' },
    { name: 'Whiskey (neat)', calories: 70, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Whiskey (peg 60ml)', calories: 140, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'Vodka (neat)', calories: 64, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Vodka (peg 60ml)', calories: 128, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'Rum (neat)', calories: 65, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Old Monk Rum (peg)', calories: 130, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'Gin (neat)', calories: 73, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Gin & Tonic', calories: 170, protein: 0, carbs: 14, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Tequila Shot', calories: 64, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Brandy (peg)', calories: 130, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'Scotch Whisky (peg)', calories: 140, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'IMFL Whisky (peg)', calories: 135, protein: 0, carbs: 0, fat: 0, serving: '60ml', category: 'alcohol' },
    { name: 'Feni (Goa)', calories: 80, protein: 0, carbs: 0, fat: 0, serving: '30ml', category: 'alcohol' },
    { name: 'Toddy / Palm Wine', calories: 40, protein: 0.3, carbs: 4, fat: 0, serving: '100ml', category: 'alcohol' },
    { name: 'Cocktail — Mojito', calories: 220, protein: 0, carbs: 26, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Margarita', calories: 275, protein: 0, carbs: 20, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Piña Colada', calories: 490, protein: 1, carbs: 64, fat: 6, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Long Island', calories: 290, protein: 0, carbs: 18, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Cosmopolitan', calories: 146, protein: 0, carbs: 8, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Old Fashioned', calories: 154, protein: 0, carbs: 4, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Cocktail — Whiskey Sour', calories: 165, protein: 0, carbs: 10, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Jagerbomb', calories: 210, protein: 0, carbs: 24, fat: 0, serving: '1 glass', category: 'alcohol' },
    { name: 'Sangria', calories: 130, protein: 0.2, carbs: 14, fat: 0, serving: '1 glass', category: 'alcohol' },

    // ── Nuts & Healthy Fats ──
    { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '1 oz (23 nuts)', category: 'snack' },
    { name: 'Peanuts', calories: 161, protein: 7, carbs: 5, fat: 14, serving: '1 oz', category: 'snack' },
    { name: 'Cashews', calories: 157, protein: 5, carbs: 9, fat: 12, serving: '1 oz', category: 'snack' },
    { name: 'Walnuts', calories: 185, protein: 4, carbs: 4, fat: 18, serving: '1 oz', category: 'snack' },
    { name: 'Pistachios', calories: 159, protein: 6, carbs: 8, fat: 13, serving: '1 oz', category: 'snack' },
    { name: 'Peanut Butter', calories: 188, protein: 8, carbs: 7, fat: 16, serving: '2 tbsp', category: 'snack' },
    { name: 'Honey', calories: 64, protein: 0.1, carbs: 17, fat: 0, serving: '1 tbsp', category: 'snack' },
    { name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 14, serving: '1 tbsp', category: 'snack' },
    { name: 'Ghee', calories: 112, protein: 0, carbs: 0, fat: 13, serving: '1 tbsp', category: 'snack' },
    { name: 'Butter', calories: 102, protein: 0.1, carbs: 0, fat: 12, serving: '1 tbsp', category: 'snack' },
    { name: 'Dark Chocolate (70%)', calories: 170, protein: 2, carbs: 13, fat: 12, serving: '30g', category: 'snack' },
    { name: 'Trail Mix', calories: 175, protein: 5, carbs: 15, fat: 11, serving: '1 oz', category: 'snack' },

    // ── Fast Food ──
    { name: 'Pizza (1 slice)', calories: 285, protein: 12, carbs: 36, fat: 10, serving: '1 slice', category: 'fastfood' },
    { name: 'Burger (veg)', calories: 280, protein: 10, carbs: 36, fat: 12, serving: '1 burger', category: 'fastfood' },
    { name: 'Burger (chicken)', calories: 360, protein: 22, carbs: 34, fat: 16, serving: '1 burger', category: 'fastfood' },
    { name: 'French Fries', calories: 365, protein: 4, carbs: 48, fat: 17, serving: 'medium', category: 'fastfood' },
    { name: 'Fried Chicken (1 piece)', calories: 260, protein: 18, carbs: 10, fat: 16, serving: '1 piece', category: 'fastfood' },
    { name: 'Wrap / Roll (chicken)', calories: 340, protein: 20, carbs: 32, fat: 14, serving: '1 wrap', category: 'fastfood' },
    { name: 'Maggi Noodles', calories: 320, protein: 8, carbs: 46, fat: 12, serving: '1 pack', category: 'fastfood' },
    { name: 'Sandwich (veg)', calories: 220, protein: 6, carbs: 30, fat: 8, serving: '1 sandwich', category: 'fastfood' },
];

// ═══════════════════════════════════════════════
// Meal combinations (quick add)
// ═══════════════════════════════════════════════
const combinations = {
    'rice-dal': [
        { name: 'Rice (steamed)', quantity: 1 },
        { name: 'Dal Tadka', quantity: 1 },
        { name: 'Raita', quantity: 1 }
    ],
    'roti-sabzi': [
        { name: 'Chapati / Roti', quantity: 3 },
        { name: 'Aloo Gobi', quantity: 1 }
    ],
    'dosa-sambar': [
        { name: 'Masala Dosa', quantity: 1 },
        { name: 'Sambhar', quantity: 1 },
        { name: 'Coconut Chutney', quantity: 1 }
    ],
    'idli-sambar': [
        { name: 'Idli', quantity: 3 },
        { name: 'Sambhar', quantity: 1 },
        { name: 'Coconut Chutney', quantity: 1 }
    ],
    'chicken-rice': [
        { name: 'Chicken Breast (grilled)', quantity: 1 },
        { name: 'Brown Rice', quantity: 1 },
        { name: 'Broccoli', quantity: 0.5 }
    ],
    'protein-shake': [
        { name: 'Protein Shake (whey)', quantity: 1 },
        { name: 'Banana', quantity: 1 },
        { name: 'Oatmeal', quantity: 0.5 }
    ],
    'eggs-toast': [
        { name: 'Omelette (2 eggs)', quantity: 1 },
        { name: 'Bread (whole wheat)', quantity: 2 },
        { name: 'Orange Juice', quantity: 1 }
    ],
    'butter-chicken': [
        { name: 'Butter Chicken', quantity: 1 },
        { name: 'Butter Naan', quantity: 2 },
        { name: 'Lassi (sweet)', quantity: 1 }
    ]
};

// ═══════════════════════════════════════════════
// Initialize diet page
// ═══════════════════════════════════════════════
let dateStripOffset = 0; // weeks offset from current week

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('diet.html') || window.location.href.includes('diet.html')) {
        checkAuth();
        updateUserDisplay();

        const now = new Date();
        const timeInput = document.getElementById('mealTime');
        if (timeInput) timeInput.value = now.toTimeString().slice(0, 5);
        const dateInput = document.getElementById('dietDate');
        if (dateInput) dateInput.value = getSelectedDate();

        renderDateStrip();
        loadTodaysMeals();
        loadWaterIntake();
    }
});

// ── Search ──
function searchFood() {
    const term = document.getElementById('foodSearch').value.toLowerCase();
    const suggestions = document.getElementById('foodSuggestions');
    if (term.length < 2) { suggestions.classList.remove('active'); return; }

    const matches = foodDatabase.filter(f => f.name.toLowerCase().includes(term)).slice(0, 10);
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(f => `
            <div class="suggestion-item" onclick="selectFood('${f.name.replace(/'/g, "\\'")}')">
                <strong>${f.name}</strong>
                <span>${f.calories} cal · ${f.protein}g P · ${f.serving} ${f.category === 'alcohol' ? '🍺' : f.category === 'indian' ? '🇮🇳' : ''}</span>
            </div>
        `).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function selectFood(name) {
    document.getElementById('foodSearch').value = name;
    document.getElementById('foodSuggestions').classList.remove('active');
}

// ── Add food ──
function addFood() {
    const foodName = document.getElementById('foodSearch').value;
    const mealType = document.getElementById('mealType').value;
    const quantity = parseFloat(document.getElementById('foodQuantity').value);
    const time = document.getElementById('mealTime').value;
    const date = document.getElementById('dietDate').value || getTodayDate();

    if (!foodName || !quantity) { showNotification('Select a food and enter quantity', 'error'); return; }

    const food = foodDatabase.find(f => f.name.toLowerCase() === foodName.toLowerCase());
    if (!food) { showNotification('Food not found — use custom food', 'error'); return; }

    const meal = {
        id: Date.now(),
        date, mealType,
        foodName: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        serving: food.serving,
        quantity, time,
        timestamp: new Date().toISOString()
    };

    const meals = loadUserData('meals');
    meals.push(meal);
    saveUserData('meals', meals);

    document.getElementById('foodSearch').value = '';
    document.getElementById('foodQuantity').value = 1;
    loadTodaysMeals();
    showNotification(`Added ${food.name} to ${mealType}!`);
}

// ── Custom food ──
function toggleCustomFood() {
    document.getElementById('customFoodForm').classList.toggle('hidden');
}

function addCustomFood() {
    const name     = document.getElementById('customFoodName').value;
    const serving  = document.getElementById('customServingSize').value;
    const calories = parseFloat(document.getElementById('customCalories').value);
    const protein  = parseFloat(document.getElementById('customProtein').value) || 0;
    const carbs    = parseFloat(document.getElementById('customCarbs').value) || 0;
    const fat      = parseFloat(document.getElementById('customFat').value) || 0;
    const mealType = document.getElementById('mealType').value;
    const quantity = parseFloat(document.getElementById('foodQuantity').value);
    const time     = document.getElementById('mealTime').value;
    const date     = document.getElementById('dietDate').value || getTodayDate();

    if (!name || !calories) { showNotification('Enter food name and calories', 'error'); return; }

    const meal = {
        id: Date.now(), date, mealType,
        foodName: name, calories, protein, carbs, fat,
        serving: serving || '1 serving',
        quantity, time,
        timestamp: new Date().toISOString(),
        custom: true
    };

    const meals = loadUserData('meals');
    meals.push(meal);
    saveUserData('meals', meals);

    ['customFoodName','customServingSize','customCalories','customProtein','customCarbs','customFat']
        .forEach(id => document.getElementById(id).value = '');
    toggleCustomFood();
    loadTodaysMeals();
    showNotification(`Custom food "${name}" added!`);
}

// ── Display meals ──
function loadTodaysMeals() {
    const date = document.getElementById('dietDate')?.value || getTodayDate();
    const meals = getDataForDate('meals', date);

    let tCal = 0, tPro = 0, tCarb = 0, tFat = 0;
    const byType = { breakfast: [], lunch: [], dinner: [], snack: [] };

    meals.forEach(m => {
        tCal  += m.calories * m.quantity;
        tPro  += m.protein * m.quantity;
        tCarb += m.carbs * m.quantity;
        tFat  += m.fat * m.quantity;
        byType[m.mealType]?.push(m);
    });

    document.getElementById('totalCaloriesToday').textContent = Math.round(tCal);
    document.getElementById('totalProteinToday').textContent  = Math.round(tPro) + 'g';
    document.getElementById('totalCarbsToday').textContent    = Math.round(tCarb) + 'g';
    document.getElementById('totalFatToday').textContent      = Math.round(tFat) + 'g';

    ['breakfast','lunch','dinner','snack'].forEach(t => displayMealSection(t, byType[t]));
}

function displayMealSection(type, meals) {
    const el = document.getElementById(`${type}Meals`);
    if (!el) return;
    if (meals.length === 0) { el.innerHTML = '<p class="empty-message">No meals logged yet</p>'; return; }

    el.innerHTML = meals.map(m => `
        <div class="meal-item">
            <div class="meal-info">
                <h4>${m.foodName}</h4>
                <p>${m.quantity} × ${m.serving} ${m.time ? '· ' + formatTime(m.time) : ''}</p>
                <p>P: ${Math.round(m.protein*m.quantity)}g | C: ${Math.round(m.carbs*m.quantity)}g | F: ${Math.round(m.fat*m.quantity)}g</p>
            </div>
            <span class="meal-calories">${Math.round(m.calories*m.quantity)} cal</span>
            <button class="btn-edit" onclick="editMeal(${m.id})">Edit</button>
            <button class="btn-delete" onclick="deleteMeal(${m.id})">Delete</button>
        </div>
    `).join('');
}

function deleteMeal(id) {
    if (!confirm('Delete this meal entry?')) return;
    let meals = loadUserData('meals');
    meals = meals.filter(m => m.id !== id);
    saveUserData('meals', meals);
    loadTodaysMeals();
    showNotification('Meal deleted');
}

// ── Edit Meal Feature ──
function editMeal(id) {
    const meals = loadUserData('meals');
    const meal = meals.find(m => m.id === id);
    if (!meal) return;
    document.getElementById('editMealId').value = id;
    document.getElementById('editFoodName').value = meal.foodName;
    document.getElementById('editQuantity').value = meal.quantity;
    document.getElementById('editMealType').value = meal.mealType;
    document.getElementById('editCalories').value = meal.calories;
    document.getElementById('editProtein').value = meal.protein;
    document.getElementById('editCarbs').value = meal.carbs;
    document.getElementById('editFat').value = meal.fat;
    document.getElementById('editTime').value = meal.time || '';
    document.getElementById('editMealModal').classList.remove('hidden');
}

function closeEditMeal() {
    document.getElementById('editMealModal').classList.add('hidden');
}

function saveEditedMeal() {
    const id = parseInt(document.getElementById('editMealId').value);
    const meals = loadUserData('meals');
    const idx = meals.findIndex(m => m.id === id);
    if (idx === -1) return;

    meals[idx].quantity = parseFloat(document.getElementById('editQuantity').value) || 1;
    meals[idx].mealType = document.getElementById('editMealType').value;
    meals[idx].calories = parseFloat(document.getElementById('editCalories').value) || meals[idx].calories;
    meals[idx].protein = parseFloat(document.getElementById('editProtein').value) || 0;
    meals[idx].carbs = parseFloat(document.getElementById('editCarbs').value) || 0;
    meals[idx].fat = parseFloat(document.getElementById('editFat').value) || 0;
    meals[idx].time = document.getElementById('editTime').value;

    saveUserData('meals', meals);
    closeEditMeal();
    loadTodaysMeals();
    showNotification('Meal updated!');
}

function loadDietForDate() {
    const dateInput = document.getElementById('dietDate');
    if (dateInput) setSelectedDate(dateInput.value);
    loadTodaysMeals();
    loadWaterIntake();
    renderDateStrip();
}

// Navigate date forward/back
function changeDate(offset) {
    const dateInput = document.getElementById('dietDate');
    const current = new Date(dateInput.value || getTodayDate());
    current.setDate(current.getDate() + offset);
    const newDate = current.toISOString().split('T')[0];
    dateInput.value = newDate;
    setSelectedDate(newDate);
    loadTodaysMeals();
    loadWaterIntake();
    renderDateStrip();
}

// ═══════════════════════════════════════════════
// DATE STRIP — visual week calendar
// ═══════════════════════════════════════════════
function shiftWeek(dir) {
    dateStripOffset += dir;
    renderDateStrip();
}

function renderDateStrip() {
    const container = document.getElementById('dateStripDays');
    const label = document.getElementById('dateStripLabel');
    const selectedDate = document.getElementById('dietDate')?.value || getTodayDate();
    if (!container) return;

    const today = new Date();
    today.setHours(0,0,0,0);

    // Calculate week start (Monday)
    const ref = new Date(today);
    ref.setDate(ref.getDate() + dateStripOffset * 7);
    const dayOfWeek = ref.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(ref);
    monday.setDate(ref.getDate() + mondayOffset);

    // Get all meal dates for dot indicators
    const allMeals = loadUserData('meals');
    const mealDates = new Set(allMeals.map(m => m.date));

    const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let html = '';
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const isToday = dateStr === getTodayDate();
        const isSelected = dateStr === selectedDate;
        const hasData = mealDates.has(dateStr);

        let cls = 'date-day';
        if (isSelected) cls += ' active';
        if (isToday) cls += ' today';
        if (hasData) cls += ' has-data';

        html += `<div class="${cls}" onclick="selectStripDate('${dateStr}')">
            <span class="date-day-name">${dayNames[i]}</span>
            <span class="date-day-num">${d.getDate()}</span>
            <span class="date-day-dot"></span>
        </div>`;
    }
    container.innerHTML = html;

    // Label
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const mStr = monthNames[monday.getMonth()];
    const sStr = monthNames[sunday.getMonth()];
    if (mStr === sStr) {
        label.textContent = `${monday.getDate()} – ${sunday.getDate()} ${mStr} ${monday.getFullYear()}`;
    } else {
        label.textContent = `${monday.getDate()} ${mStr} – ${sunday.getDate()} ${sStr} ${monday.getFullYear()}`;
    }

    // Update the heading
    const heading = document.getElementById('mealsDateHeading');
    if (heading) {
        const sel = new Date(selectedDate);
        const isToday2 = selectedDate === getTodayDate();
        heading.textContent = isToday2
            ? "📅 Today's Meals"
            : `📅 Meals — ${sel.getDate()} ${monthNames[sel.getMonth()]}`;
    }
}

function selectStripDate(dateStr) {
    const dateInput = document.getElementById('dietDate');
    if (dateInput) dateInput.value = dateStr;
    setSelectedDate(dateStr);
    loadTodaysMeals();
    loadWaterIntake();
    renderDateStrip();
}

// ── Water tracking ──
function addWater(amount) {
    const date = document.getElementById('dietDate')?.value || getTodayDate();
    const waterEntry = { id: Date.now(), date: date, amount, timestamp: new Date().toISOString() };
    const data = loadUserData('water');
    data.push(waterEntry);
    saveUserData('water', data);
    loadWaterIntake();
    showNotification(`+${amount}ml water 💧`);
}

function loadWaterIntake() {
    const date = document.getElementById('dietDate')?.value || getTodayDate();
    const waterData = getDataForDate('water', date);
    let total = 0;
    waterData.forEach(e => { total += e.amount; });
    const pct = Math.min((total / 3000) * 100, 100);
    document.getElementById('waterTotal').textContent = total + ' ml';
    document.getElementById('waterFill').style.width = pct + '%';
}

// ── Quick combos ──
function addCombo(comboId) {
    const combo = combinations[comboId];
    if (!combo) return;

    const mealType = document.getElementById('mealType').value;
    const time = document.getElementById('mealTime').value;
    const date = document.getElementById('dietDate').value || getTodayDate();

    const meals = loadUserData('meals');
    combo.forEach(item => {
        const food = foodDatabase.find(f => f.name === item.name);
        if (food) {
            meals.push({
                id: Date.now() + Math.random(),
                date, mealType,
                foodName: food.name, calories: food.calories,
                protein: food.protein, carbs: food.carbs, fat: food.fat,
                serving: food.serving, quantity: item.quantity,
                time, timestamp: new Date().toISOString()
            });
        }
    });

    saveUserData('meals', meals);
    loadTodaysMeals();
    showNotification('Combo meal added! 🍽️');
}
