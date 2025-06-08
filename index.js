const express = require('express');
const kuromoji = require('kuromoji');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Required to parse JSON body

let tokenizer = null;

// 🔧 DO NOT call app.listen() here!

// Build the tokenizer FIRST
kuromoji.builder({ dicPath: 'node_modules/kuromoji/dict' }).build((err, builtTokenizer) => {
    if (err) {
        console.error('Tokenizer build error:', err);
        process.exit(1);
    }

    tokenizer = builtTokenizer;
    console.log('Tokenizer is ready');

    // ✅ Now define the route
    app.post('/tokenize', (req, res) => {
        const texts = req.body.texts;
        if (!Array.isArray(texts)) return res.status(400).json({ error: "Missing 'texts' array" });
        const result = texts.map(text => tokenizer.tokenize(text));
        res.json(result);
    });

    // ✅ Only start the server once tokenizer is built
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
