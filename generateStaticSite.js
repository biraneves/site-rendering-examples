const axios = require('axios');
const fs = require('fs');

const FILEPATH = './ssg.html';
const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false';

const generateHtml = (data) => {
    const dataString = `
        <ul>
            ${data.map((item) => `<li>${item.id}</li>`).join('\n')}
        </ul>
    `;

    const error = '<div>Error</div>';

    return `
        <html>
            <body>
                ${dataString ? dataString : error}
            </body>
        </html>
    `;
};

let html;

axios
    .get(url)
    .then((axioRes) => (html = generateHtml(axioRes.data)))
    .catch((e) => (html = generateHtml(null)))
    .finally(() => {
        fs.writeFile(FILEPATH, html, (error) => {
            if (error) console.error('Error generating file');
            else console.log('File generated');
        });
    });
