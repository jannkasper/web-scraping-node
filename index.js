const axios = require('axios');
const cheerio = require('cheerio');

const getContent = async () => {
    try {
        const {data} = await axios.get('https://suchen.mobile.de/fahrzeuge/details.html?id=311219834&damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&pageNumber=1&scopeId=C&sfmr=false&action=eyeCatcher&fnai=prev&searchId=c243f89d-f004-4f5c-5690-1afa9a106935&lang=en');
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


const getSingleElement = async () => {
    const {data} = await axios.get('https://suchen.mobile.de/fahrzeuge/details.html?id=310711740&damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&makeModelVariant1.makeId=3500&pageNumber=2&scopeId=C&sfmr=false&searchId=8b7aa788-479d-e66f-286b-734d69814795&lang=en');
    const $ = await cheerio.load(data);


    // let result = $('body > .viewport > div > div:nth-child(2)').children().each((index,elem) => {console.log($(elem).get(0).tagName)});

    // <div class="g-col-8">
    let mainBox = $('body > .viewport > div > div ').not('.adv, .sky08').children().last().children().first();

    console.log('------------------------------------------------');
    if (mainBox.children().hasClass('cBox--vehicle-details')) {
        // let next = $('.cBox--vehicle-details', mainBox).each((index, elem) => {console.log($(elem).get(0).tagName, ' ', $(elem).attr())});

        // let title = $('.cBox--vehicle-details > .cBox-body--title-area > div > div > #rbt-ad-title', mainBox).text();
        // console.log(title);
        //
        // let images = [];
        // let imageGallery = $('.cBox--vehicle-details > .cBox-body > div > div > .data-area-image-gallery > .slick-image-gallery-wrapper > .image-gallery-wrapper > .image-gallery > .gallery', mainBox).children().first();
        // let getImages = $('div', imageGallery).children().filter((index, elem) => $(elem).get(0).tagName == 'img').each((index,elem) => images.push($(elem).attr('data-lazy')));
        // console.log(images);
        //
        // let technicalData = [];
        // let technicalSource = $('.cBox--content > .cBox-body--technical-data', mainBox);
        // let getPrice = $('.u-margin-bottom-9', technicalSource).first()
        //         .each((index, elem) => {
        //             let key = $('div:nth-child(1)', elem).text();
        //             let value = $('div:nth-child(2) > span', elem).text();
        //             key && value ? technicalData.push([key, value]) : null;
        //         });
        // let getData = $('.u-margin-bottom-9', technicalSource)
        //     .filter((index,elem) => $('div:nth-child(2)', elem).children().length === 0)
        //     .each((index, elem) => {
        //         let key = $('div:nth-child(1)', elem).text();
        //         let value = $('div:nth-child(2)', elem).text();
        //         key && value ? technicalData.push([key, value]) : null;
        //     });
        // console.log(technicalData);
        //
        // let featuresData = [];
        // let featuresSource = $('.cBox--content > #rbt-features > div > div > div', mainBox).each((index,elem) => featuresData.push($(elem).text()));
        // console.log(featuresData);
        //
        //
        // let descriptionSource = $('.cBox--content > .cBox-body--vehicledescription > div > .description', mainBox);
        // let vehicleDescription = descriptionSource.html().replace(/<br ?\/?>/g, "\n");
        // console.log(vehicleDescription);

        // let mainBox = $('head > script ').each((index, elem) => {console.log($(elem).get(0).tagName, ' ', $(elem).text())});

        let scriptText = $('head > script')
            .filter((index, elem) => $(elem).get()[0].children[0] && ($(elem).get()[0].children[0].data).includes('setAdData'))
            .map((index, elem) => $(elem).get()[0].children[0].data).get(0);

        let scriptString = scriptText.split('({')[1].split('})')[0];
        var obj = JSON.parse('{' +  scriptString + '}');
        console.log(obj);

    } else {
        getSingleElement();
    }
}

getSingleElement();
