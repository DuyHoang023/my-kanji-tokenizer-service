const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('API is working!');
});

// Example route for your extension
app.post('/log-action', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Action logged' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
