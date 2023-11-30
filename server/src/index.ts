import express, {Request, Response} from "express";
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import pool from "./db";

const app = express();
app.use(cors());
app.use(express.json());

// SIGNUP
app.post("/register", async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        // Hash the password
        const saltRounds: number = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Check if username or email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

        // Store user information in the database
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.status(201).json({message: 'User registered successfully'});

    } catch (e: any) {
        console.log("error below")
        console.error(e.message)
    }

});

// LOGGING
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const hashedPassword = user.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate and return authentication token upon successful login
    const token = jwt.sign({ username: user.rows[0].username }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: 'Successfully Logging !! Welcome'  });

  } catch (error: any) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// RATE LIMITING
// Create a rate limiter middleware to limit incoming requests
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 100, // Max X requests per minute
    message: 'Too many requests, please try again later.',
});

// Define a GET endpoint '/secureEndpoint' that uses the rate limiter middleware
app.get('/secureEndpoint', limiter, (req: Request, res: Response) => {
    // Ensure authentication before accessing this endpoint
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the Authorization header
    // Return an error if the token is missing
    if (!token) {
        return res.status(401).json({message: 'Authorization token is missing'});
    }

    try {
        // Verify the JWT token with the provided secret key
        const decoded : {username: string} = jwt.verify(token, 'your_secret_key') as {
            username: string
        };

        // If token verification is successful, perform operations for the secure endpoint
        res.json({message: `Welcome to the secure endpoint, ${decoded.username}!`}); // Respond with a welcome message
    } catch (error) {
        console.error('Error during token verification:', error); // Log an error if token verification fails
        res.status(401).json({message: 'Invalid token'}); // Return an error for an invalid token
    }
});

// checking the server is ready or not
app.get("/", (req: Request, res: Response) => {
    res.send("server is running on port 5000")
});

app.listen(5000, () => {
    console.log("running on port 5000")
});
