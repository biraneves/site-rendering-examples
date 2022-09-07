const path = require('path');
const axios = require('axios');

const express = require('express');
const app = express();
const port = 3001;

const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false';

app.get('/csr', (req, res) => res.sendFile(path.join(__dirname, '/csr.html')));

app.get('/ssr', (req, res) => {
    axios
        .get(url)
        .then((axioRes) => {
            res.send(`
                <ul>
                    ${axioRes.data
                        .map((item) => `<li>${item.id}</li>`)
                        .join('\n')}
                </ul>
            `);
        })
        .catch(() => {
            res.send(`
                <div>Error</div>
            `);
        });
});

app.get('/ssg', (req, res) => res.sendFile(path.join(__dirname, '/ssg.html')));

app.get('/spa', (req, res) => res.sendFile(path.join(__dirname, '/spa.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
