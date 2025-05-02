// backend/test-db.ts
import pool from "./db/index";


(async () => {
  try {
    const result = await pool.query("SELECT NOW();");
    console.log("Database connected ✅", result.rows);
    process.exit();
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();

