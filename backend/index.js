require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const JWT_SECRET =
  process.env.JWT_SECRET || "your_super_secret_jwt_key";

const app = express();

// ==================== MIDDLEWARE ====================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://zerodha-clone-3ygc.onrender.com",
      "https://zerodha-dashboard-4iiq.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ==================== JWT FUNCTION ====================
const createSecretToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "3d",
  });
};

// Cookie options for cross-domain support on Render
const cookieConfig = {
  httpOnly: false,
  secure: true,      // Must be true when sameSite is "none"
  sameSite: "none",  // Required for cross-subdomain cookies
};

// ======================================================
//                    AUTH ROUTES
// ======================================================

// ==================== SIGNUP ====================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, cookieConfig);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
});

// ==================== LOGIN ====================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, cookieConfig);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

// ==================== LOGOUT ====================
app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", cookieConfig);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

// ======================================================
//                    DATA ROUTES
// ======================================================

// Root sanity test route
app.get("/", (req, res) => {
  res.send("Backend server is running smoothly!");
});

// ==================== ALL HOLDINGS ====================
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Holdings error:", error);
    res.status(500).json({
      error: "Failed to fetch holdings",
    });
  }
});

// ==================== ALL POSITIONS ====================
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Positions error:", error);
    res.status(500).json({
      error: "Failed to fetch positions",
    });
  }
});

// ==================== NEW ORDER ====================
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order saved!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      success: false,
      message: "Error saving order",
      error: error.message,
    });
  }
});

// ======================================================
//                    SEED ROUTES
// ======================================================

app.get("/addHoldings", async (req, res) => {
  try {
    const tempHoldings = [
      { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
      { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
      { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
      { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
      { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
      { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
      { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
      { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
      { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
      { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
      { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
    ];

    await HoldingsModel.insertMany(tempHoldings);
    res.send("Holdings seeded successfully!");
  } catch (error) {
    console.error("Holdings seed error:", error);
    res.status(500).send("Error seeding holdings: " + error.message);
  }
});

app.get("/addPositions", async (req, res) => {
  try {
    const tempPositions = [
      { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
      { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
    ];

    await PositionsModel.insertMany(tempPositions);
    res.send("Positions seeded successfully!");
  } catch (error) {
    console.error("Positions seed error:", error);
    res.status(500).send("Error seeding positions: " + error.message);
  }
});

// ======================================================
//                    START SERVER
// ======================================================
const startServer = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_URL environment variable is missing!");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit so Render flags the restart clearly in logs
  }
};

startServer();