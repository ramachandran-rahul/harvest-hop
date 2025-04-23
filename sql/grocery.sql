-- Create products table with category + subcategory
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(6,2) NOT NULL,
  stock INT DEFAULT 0,
  image VARCHAR(100),
  category VARCHAR(50),
  subcategory VARCHAR(50)
);

-- Insert grocery items into products table
INSERT INTO products (name, description, price, stock, image, category, subcategory) VALUES
-- Fresh
('Apple Red Delicious', 'A sweet and juicy apple with red skin.', 1.50, 100, 'apple.jpg', 'Fresh', 'Fruits'),
('Banana Cavendish', 'Creamy bananas, perfect for snacks.', 1.20, 80, 'banana.jpg', 'Fresh', 'Fruits'),
('Baby Spinach 150g', 'Washed, tender spinach leaves.', 2.50, 2, 'spinach.jpg', 'Fresh', 'Greens'),
('Kale Bunch', 'Dark leafy green rich in nutrients.', 4.00, 50, 'kale.jpg', 'Fresh', 'Greens'),
('Roma Tomato 1kg', 'Firm, red Roma tomatoes.', 12.30, 20, 'tomato.jpg', 'Fresh', 'Vegetables'),
('Carrot Pack 250g', 'Crunchy and sweet, ready to eat.', 3.70, 15, 'carrot.jpg', 'Fresh', 'Vegetables'),

-- Dairy
('Full Cream Milk 2L', 'Pasteurised, homogenised milk.', 4.30, 60, 'milk.jpg', 'Dairy', 'Milk & Cream'),
('Lite Milk 2L', 'Low-fat milk, smooth and fresh.', 4.70, 2, 'milk_lite.jpg', 'Dairy', 'Milk & Cream'),
('Cheddar Cheese Block 500g', 'Sharp and crumbly cheddar block.', 8.00, 30, 'cheese.jpg', 'Dairy', 'Cheese'),
('Tasty Cheese Slices', '15 slices of smooth tasty cheese.', 7.00, 35, 'cheese_slices.jpg', 'Dairy', 'Cheese'),
('Salted Butter 250g', 'Creamy salted butter.', 5.20, 50, 'butter.jpg', 'Dairy', 'Butter & Spreads'),
('Crunchy Peanut Butter 470g', 'Crunchy, never oily, never dry.', 6.50, 1, 'peanut_butter.jpg', 'Dairy', 'Butter & Spreads'),

-- Pantry
('Basmati Rice 1kg', 'Aromatic rice, ideal for curries.', 4.80, 4, 'rice.jpg', 'Pantry', 'Rice & Grains'),
('Brown Rice 750g', 'Wholegrain rice, high in fibre.', 7.00, 35, 'brown_rice.jpg', 'Pantry', 'Rice & Grains'),
('Penne Pasta 500g', 'Tubular pasta for thick sauces.', 2.50, 50, 'pasta.jpg', 'Pantry', 'Pasta & Noodles'),
('Spaghetti 500g', 'Long strands of durum wheat pasta.', 3.00, 45, 'spaghetti.jpg', 'Pantry', 'Pasta & Noodles'),
('Tomato Sauce 700ml', 'Rich, smooth tomato flavour.', 3.00, 45, 'sauce.jpg', 'Pantry', 'Sauces & Condiments'),
('Pesto Basil Sauce 190g', 'Basil-based pasta sauce.', 5.90, 35, 'pesto.jpg', 'Pantry', 'Sauces & Condiments'),

-- Frozen
('Frozen Cheese & Bacon Pizza', 'Classic crust with bacon & cheese.', 8.50, 25, 'pizza.jpg', 'Frozen', 'Frozen Meals'),
('Frozen Lasagna', 'Traditional beef lasagna frozen meal.', 6.50, 20, 'lasagna.jpg', 'Frozen', 'Frozen Meals'),
('Vanilla Ice Cream 1L', 'Smooth vanilla with real beans.', 12.50, 3, 'icecream.jpg', 'Frozen', 'Desserts & Ice Cream'),
('Mango Sorbet Tub 1L', 'Dairy-free fruity frozen dessert.', 10.00, 30, 'sorbet.jpg', 'Frozen', 'Desserts & Ice Cream'),

-- Household
('Dishwashing Liquid Lemon 900mL', 'Cuts grease with lemon scent.', 4.95, 2, 'dishsoap.jpg', 'Household', 'Cleaning'),
('Multi-Purpose Spray 750mL', 'Cleans kitchen and bathroom.', 4.20, 40, 'spray.jpg', 'Household', 'Cleaning'),
('Paper Towels 2 Pack', 'Strong, absorbent rolls.', 3.80, 40, 'papertowel.jpg', 'Household', 'Kitchen'),
('Bin Liners 25pk', 'Earth-friendly kitchen bin liners.', 6.80, 45, 'binliners.jpg', 'Household', 'Kitchen'),
('Laundry Detergent 2L', 'Cold wash liquid detergent.', 12.80, 1, 'detergent.jpg', 'Household', 'Laundry'),
('Fabric Softener 2L', 'Keeps clothes soft and fresh.', 4.50, 30, 'softener.jpg', 'Household', 'Laundry');


-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20),
  address TEXT,
  state VARCHAR(50),
  cart JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
