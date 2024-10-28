import mysql from 'mysql2/promise';
import express from 'express'; 

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'valvinna2908',
    database: 'week5tsc'
});

try {
    await connection.connect();
    console.log("Connected to MySQL!");
} catch (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
}

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM mentee');
        res.json(result);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/users', async (req, res) => {
    const { name, nim } = req.body;
    try {
        const [result] = await connection.query('INSERT INTO mentee (name, nim) VALUES (?, ?)', [name, nim]);
        res.json({
            "message": "User created successfully",
            "nama": name,
            "nim": nim
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
