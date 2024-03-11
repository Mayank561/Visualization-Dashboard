import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

// import from files
import reportRouter from './routes/index.js'
import { mongoDB } from './database/index.js'

// Create a new instance of an Express application
const app = express();

// Setting up config.env file so that we can use content of it
config({
    path: "./config.env"
});

// Connecting server and database
mongoDB();

// Middleware setup

// We'll be sending data in JSON format
app.use(express.json());

// We'll be using dynamic routes
app.use(express.urlencoded({ extended: true }));

// Set 'credentials: true' to pass headers, cookies, etc. to browser/frontend
app.use(cors());

// Route splitting
app.use("/api/data", reportRouter);

// Test route to check if the server is working
app.get("/", (req, res) => {
    return res.send(`<div style="background:magenta;padding:100px;"><h2>Welcome to Data Virtualization Server</h2>
    <p>Below are some examples of supported routes...</p>
        <div><ul>
            <li>GET all data from the database - /api/data</li>
            <li>GET data filtered by year - /api/data/year/:year</li>
            <li>GET data filtered by region - /api/data/region/:region</li>
            <li>Much more...</li>
        </ul></div>
    </div>`);
});

// Bind and listen to the connections on the specified host and port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is active on Port ${PORT}`);
});
