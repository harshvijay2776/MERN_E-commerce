import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Category from "./backend/models/categoryModel.js";
import Product from "./backend/models/productModel.js";
import User from "./backend/models/userModel.js";
import Order from "./backend/models/orderModel.js";

dotenv.config();

const categories = [
  { name: "Electronics" },
  { name: "Fashion" },
  { name: "Home & Kitchen" },
  { name: "Books" },
  { name: "Sports & Outdoors" },
  { name: "Beauty & Personal Care" },
  { name: "Toys & Games" },
  { name: "Automotive" },
];

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    brand: "SoundMax",
    quantity: 50,
    countInStock: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life.",
    price: 299.99,
    brand: "TechFit",
    quantity: 30,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
  },
  {
    name: "4K Ultra HD Camera",
    description: "Professional mirrorless camera with 24MP sensor, 4K video recording, and weather-sealed body.",
    price: 1299.99,
    brand: "PhotoPro",
    quantity: 15,
    countInStock: 15,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
  },
  {
    name: "Casual Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in various colors. Perfect for everyday wear.",
    price: 24.99,
    brand: "ComfortWear",
    quantity: 100,
    countInStock: 100,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
  },
  {
    name: "Designer Denim Jeans",
    description: "Premium quality denim jeans with modern fit and stylish design.",
    price: 79.99,
    brand: "DenimCo",
    quantity: 75,
    countInStock: 75,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
  },
  {
    name: "Running Sneakers",
    description: "Lightweight running shoes with superior cushioning and breathable mesh upper.",
    price: 89.99,
    brand: "SpeedFoot",
    quantity: 60,
    countInStock: 60,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  },
  {
    name: "Stainless Steel Cookware Set",
    description: "10-piece professional cookware set with non-stick coating and heat-resistant handles.",
    price: 249.99,
    brand: "ChefMaster",
    quantity: 25,
    countInStock: 25,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
  },
  {
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with thermal carafe and brew strength control.",
    price: 129.99,
    brand: "BrewPerfect",
    quantity: 40,
    countInStock: 40,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
  },
  {
    name: "LED Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness, USB charging port, and touch controls.",
    price: 45.99,
    brand: "LightUp",
    quantity: 80,
    countInStock: 80,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
  },
  {
    name: "Best Seller Novel Collection",
    description: "Set of 5 best-selling fiction novels from award-winning authors.",
    price: 59.99,
    brand: "BookWorld",
    quantity: 50,
    countInStock: 50,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with non-slip surface and carrying strap included.",
    price: 39.99,
    brand: "ZenFit",
    quantity: 70,
    countInStock: 70,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
  },
  {
    name: "Camping Tent 4-Person",
    description: "Waterproof camping tent with easy setup, fits 4 people comfortably.",
    price: 159.99,
    brand: "OutdoorMax",
    quantity: 20,
    countInStock: 20,
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=500&fit=crop",
  },
  {
    name: "Facial Cleanser Set",
    description: "Complete skincare set with cleanser, toner, and moisturizer for all skin types.",
    price: 49.99,
    brand: "PureGlow",
    quantity: 90,
    countInStock: 90,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop",
  },
  {
    name: "Hair Dryer Professional",
    description: "Ionic hair dryer with multiple heat settings and cool shot button.",
    price: 69.99,
    brand: "StylePro",
    quantity: 45,
    countInStock: 45,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop",
  },
  {
    name: "Building Blocks Set",
    description: "Creative building blocks set with 500+ pieces for kids ages 5+.",
    price: 34.99,
    brand: "KidsBuild",
    quantity: 65,
    countInStock: 65,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop",
  },
  {
    name: "Remote Control Car",
    description: "High-speed RC car with rechargeable battery and all-terrain wheels.",
    price: 79.99,
    brand: "SpeedyToys",
    quantity: 35,
    countInStock: 35,
    image: "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=500&h=500&fit=crop",
  },
  {
    name: "Car Phone Mount",
    description: "Universal car phone holder with 360-degree rotation and strong grip.",
    price: 19.99,
    brand: "DriveEasy",
    quantity: 100,
    countInStock: 100,
    image: "https://images.unsplash.com/photo-1591290619762-d2c9b9a0ffc6?w=500&h=500&fit=crop",
  },
  {
    name: "Leather Handbag",
    description: "Elegant genuine leather handbag with multiple compartments and adjustable strap.",
    price: 149.99,
    brand: "LuxeBags",
    quantity: 30,
    countInStock: 30,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360° sound and 12-hour battery life.",
    price: 79.99,
    brand: "SoundWave",
    quantity: 55,
    countInStock: 55,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
  },
  {
    name: "Gaming Mouse RGB",
    description: "Professional gaming mouse with programmable buttons and RGB lighting.",
    price: 59.99,
    brand: "GameMaster",
    quantity: 40,
    countInStock: 40,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data (except admin user)
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await User.deleteMany({ email: { $ne: "admin@example.com" } }); // Keep admin
    console.log("Cleared existing data");

    // Create sample users
    const salt = await bcrypt.genSalt(10);
    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", salt),
        isAdmin: false,
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: await bcrypt.hash("password123", salt),
        isAdmin: false,
      },
      {
        username: "mike_wilson",
        email: "mike@example.com",
        password: await bcrypt.hash("password123", salt),
        isAdmin: false,
      },
      {
        username: "sarah_johnson",
        email: "sarah@example.com",
        password: await bcrypt.hash("password123", salt),
        isAdmin: false,
      },
      {
        username: "david_brown",
        email: "david@example.com",
        password: await bcrypt.hash("password123", salt),
        isAdmin: false,
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} users created`);

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories created`);

    // Assign random categories to products
    const productsWithCategories = products.map((product, index) => {
      const categoryIndex = index % createdCategories.length;
      return {
        ...product,
        category: createdCategories[categoryIndex]._id,
        rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
        numReviews: Math.floor(Math.random() * 50), // Random reviews 0-49
      };
    });

    // Insert products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ ${createdProducts.length} products created`);

    // Create sample orders
    const orders = [
      {
        user: createdUsers[0]._id,
        orderItems: [
          {
            name: createdProducts[0].name,
            qty: 1,
            image: createdProducts[0].image,
            price: createdProducts[0].price,
            product: createdProducts[0]._id,
          },
          {
            name: createdProducts[5].name,
            qty: 2,
            image: createdProducts[5].image,
            price: createdProducts[5].price,
            product: createdProducts[5]._id,
          },
        ],
        shippingAddress: {
          address: "123 Main St",
          city: "New York",
          postalCode: "10001",
          country: "USA",
        },
        paymentMethod: "PayPal",
        itemsPrice: 379.97,
        taxPrice: 38.00,
        shippingPrice: 10.00,
        totalPrice: 427.97,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: true,
        deliveredAt: new Date(),
      },
      {
        user: createdUsers[1]._id,
        orderItems: [
          {
            name: createdProducts[2].name,
            qty: 1,
            image: createdProducts[2].image,
            price: createdProducts[2].price,
            product: createdProducts[2]._id,
          },
        ],
        shippingAddress: {
          address: "456 Oak Ave",
          city: "Los Angeles",
          postalCode: "90001",
          country: "USA",
        },
        paymentMethod: "PayPal",
        itemsPrice: 1299.99,
        taxPrice: 130.00,
        shippingPrice: 0.00,
        totalPrice: 1429.99,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
      },
      {
        user: createdUsers[2]._id,
        orderItems: [
          {
            name: createdProducts[3].name,
            qty: 3,
            image: createdProducts[3].image,
            price: createdProducts[3].price,
            product: createdProducts[3]._id,
          },
          {
            name: createdProducts[10].name,
            qty: 1,
            image: createdProducts[10].image,
            price: createdProducts[10].price,
            product: createdProducts[10]._id,
          },
        ],
        shippingAddress: {
          address: "789 Pine Rd",
          city: "Chicago",
          postalCode: "60601",
          country: "USA",
        },
        paymentMethod: "PayPal",
        itemsPrice: 114.96,
        taxPrice: 11.50,
        shippingPrice: 10.00,
        totalPrice: 136.46,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: true,
        deliveredAt: new Date(),
      },
      {
        user: createdUsers[3]._id,
        orderItems: [
          {
            name: createdProducts[1].name,
            qty: 1,
            image: createdProducts[1].image,
            price: createdProducts[1].price,
            product: createdProducts[1]._id,
          },
        ],
        shippingAddress: {
          address: "321 Elm St",
          city: "Houston",
          postalCode: "77001",
          country: "USA",
        },
        paymentMethod: "PayPal",
        itemsPrice: 299.99,
        taxPrice: 30.00,
        shippingPrice: 10.00,
        totalPrice: 339.99,
        isPaid: false,
        isDelivered: false,
      },
      {
        user: createdUsers[4]._id,
        orderItems: [
          {
            name: createdProducts[6].name,
            qty: 1,
            image: createdProducts[6].image,
            price: createdProducts[6].price,
            product: createdProducts[6]._id,
          },
          {
            name: createdProducts[7].name,
            qty: 1,
            image: createdProducts[7].image,
            price: createdProducts[7].price,
            product: createdProducts[7]._id,
          },
        ],
        shippingAddress: {
          address: "654 Maple Dr",
          city: "Phoenix",
          postalCode: "85001",
          country: "USA",
        },
        paymentMethod: "PayPal",
        itemsPrice: 379.98,
        taxPrice: 38.00,
        shippingPrice: 10.00,
        totalPrice: 427.98,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`✅ ${createdOrders.length} orders created`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("-----------------------------------");
    console.log("Users:");
    createdUsers.forEach((user) => console.log(`  - ${user.username} (${user.email})`));
    console.log("\nCategories:");
    createdCategories.forEach((cat) => console.log(`  - ${cat.name}`));
    console.log("\nSample Products:");
    createdProducts.slice(0, 5).forEach((prod) => 
      console.log(`  - ${prod.name} ($${prod.price})`)
    );
    console.log("\nOrders:");
    createdOrders.forEach((order, idx) => 
      console.log(`  - Order #${idx + 1}: $${order.totalPrice} (${order.isPaid ? 'Paid' : 'Unpaid'})`)
    );
    console.log("-----------------------------------");
    console.log("\n📝 Test User Credentials:");
    console.log("  Email: john@example.com");
    console.log("  Password: password123");
    console.log("-----------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
