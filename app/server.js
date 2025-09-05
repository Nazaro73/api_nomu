// app/server.js
import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import { sequelize } from "./models/index.js"; // OK

dotenv.config();
const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

const start = async () => {
  try {
    let connected = false;
    let attempts = 0;

    // ❌ tu utilisais db.sequelize au lieu de sequelize directement
    while (!connected && attempts < 10) {
      try {
        await sequelize.authenticate(); // ✅ corriger ici
        connected = true;
      } catch (err) {
        attempts++;
        console.log(
          `❌ DB connection failed (attempt ${attempts}/10): ${err.message}`
        );
        await new Promise((res) => setTimeout(res, 3000));
      }
    }

    await sequelize.sync({ alter: true }); // ✅ toujours bon ici
    console.log("✅ DB synced");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Fatal error:", err);
  }
};

start();
