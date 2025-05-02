import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config()

const pool= new Pool ({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
});


export default pool;


