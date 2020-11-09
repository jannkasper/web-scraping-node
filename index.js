const axios = require('axios');
const cheerio = require('cheerio');

const getContent = async () => {
    try {
        const {data} = await axios.get('https://suchen.mobile.de/fahrzeuge/search.html?dam=1&isSearchRequest=true&lang=en&ms=1100%3B%3B%3B%3B&s=Car&sfmr=false&vc=Car');
        const $ = await cheerio.load(data);

        let resultList = $('body > .viewport > div > div > .g-row > .g-col-9 > .cBox--resultList > .cBox-body--resultitem');
        // debugger;
        resultList.each((index, elem) => {
            let url = $('.result-item', elem).attr('href');

            let imageBlock = $('.result-item > div > .result-item--image-col > .image-block > img', elem);
            let imageUrl = imageBlock.attr('src') || imageBlock.attr('data-src');
            imageUrl = imageUrl.substring(2);
            // let title = imageBlock.attr('alt');
            // console.log(imageUrl);

            let textBlock = $('.result-item > div > div', elem);
            let title = $('div > div > .headline-block > span', textBlock).text();
            let price = $('div > div > .price-block > span[class="h3 u-block"]', textBlock).text();
            let priceBeforeDiscount = $('div > div > .price-block > span[class="h2 u-block u-text-red u-text-line-through"]', textBlock).text();
            // console.log(title, " ", price, " ", priceBeforeDiscount);

            let descriptionBlock = $('div > div > .vehicle-data--ad-with-price-rating-label', textBlock);
            let [firstRegistration, kilometer, power] = $('.rbt-regMilPow', descriptionBlock).text().split(",");
            // console.log(firstRegistration, kilometer, power);

            let damaged = $('div:nth-child(2) > b', descriptionBlock).contents().get().map(x => x.data).join(', ');
            // console.log(damaged)

            let authorBlock = $('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)', textBlock);
            let author = $('div:nth-child(3)', authorBlock).text() || $('div:nth-child(2)', authorBlock).text() || $('div:nth-child(1) > div:nth-child(1)', authorBlock).text();
            let [address, seller] = author.split(',');
            seller = seller.trim();
            let postalCode = address.match(/[A-Z0-9]+(?![A-Za-zäöüßÄÖÜ])/g).join(" ");
            let city = address.substring(postalCode.length).trim();
            console.log(seller);
            });


        const ss = 'NL-6229 VK Maastricht';
        // console.log(ss.match(/[A-Z0-9]+(?![A-Za-z])/g).join(" "))

        //-------------------


        // const {data} = await axios.get('http://localhost:8000');
        // const $ = await cheerio.load(data);
        //
        // let title = $('main').each((index, elem) => {
        //     let ww = $('div > ul > li', elem);
        //     ww.each((index, elem) => {console.log($(elem).text())});
        // });

        //-------------------

        // let fpEl = $('p');
        // debugger;
        // let attrs = fpEl.attr();
        // console.log(attrs);

        //-------------------

        // let ulEl = $('ul');
        //
        // ulEl.append('<li>Travel</li>');
        //
        // let lis = $('ul').html();
        // let items = lis.split('\n');
        //
        // items.forEach((e) => {
        //     if (e) {
        //         console.log(e.replace(/(\s+)/g, ''));
        //     }
        // });

        //-------------------

        // $('main').after('<footer>This is a footer</footer>')
        //
        // console.log($.html());

        // ------------------

        // // let title = $('ul > li').each((index, elem) => {console.log($(elem).text())});
        // let last = $('ul');
        // let last2 = last.children().last().get(0).tagName;
        //
        // console.log(last2);
        //
        // // let ww = title[0];
        // // debugger;
        // //
        // // let yy = cheerio(ww).text();
        //
        // console.log("HUJ");


    } catch (e) {
        throw e;
    }
};
getContent();
