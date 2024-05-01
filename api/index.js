const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello from Render!');
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
