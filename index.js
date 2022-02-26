const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const PORT = 8000;

const app = express();

const url = "https://www.theguardian.com/international";
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];

        $('.fc-item__title', html).each(function() {
            const title = $(this).text();
            const link = $(this).find('a').attr('href');
            articles.push({
                title,
                link
            })
        })
        console.log(articles);
    }).catch(err => console.log(err));


// const url = "https://en.wikipedia.org/wiki/List_of_waterfalls_by_height";
// axios(url)
//     .then(response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         // const articles = [];
//         let count = 0;
//         // console.log($('tr', html).text());
//         $('tr', html).each(function() {
//             const title = $('a', 'td').text();
//             // const link = $('td .image').find('a').attr('href');
//             // // articles.push({
//             // //     title,
//             // //     link
//             // // })
//             console.log(title, count);count++;
//             // if(count === 10)return;
//         })
//     }).catch(err => console.log(err));



app.listen(PORT, () => {
    console.log('server running on PORT ' + `${PORT}`);
} )