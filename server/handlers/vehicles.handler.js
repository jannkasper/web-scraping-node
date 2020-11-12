const axios = require('axios');
const cheerio = require('cheerio');

exports.generateList = async (url) => {
    try {
        const {data} = await axios.get(url);
        const $ = await cheerio.load(data);

        let objectList = [];

        let resultList = $('body > .viewport > div > div > .g-row > .g-col-9 > .cBox--resultList > .cBox-body--resultitem');
        resultList.each((index, elem) => {
            const object = {};

            let url = $('.result-item', elem).attr('href');
            Object.assign(object, {url: url});

            let imageSource = $('.result-item > div > .result-item--image-col > .image-block > img', elem);
            let imageUrl = imageSource.attr('src') || imageSource.attr('data-src');
            // let title = imageSource.attr('alt');
            Object.assign(object, {imageUrl: 'https:' + imageUrl});

            let textBlock = $('.result-item > div > div', elem);
            let title = $('div > div > .headline-block > span', textBlock).text();
            let price = $('div > div > .price-block > span[class="h3 u-block"]', textBlock).text();
            let priceBeforeDiscount = $('div > div > .price-block > span[class="h2 u-block u-text-red u-text-line-through"]', textBlock).text();
            Object.assign(object, {'title': title,'price': price,'priceBeforeDiscount': priceBeforeDiscount});

            let descriptionBlock = $('div > div > .vehicle-data--ad-with-price-rating-label', textBlock);
            let [firstRegistration, kilometer, power] = $('.rbt-regMilPow', descriptionBlock).text().split(",");
            Object.assign(object, {'firstRegistration': firstRegistration,'kilometer': kilometer,'power': power});

            let damaged = $('div:nth-child(2) > b', descriptionBlock).contents().get().map(x => x.data).join(', ');
            Object.assign(object, {'damaged': damaged});

            let authorBlock = $('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)', textBlock);
            let author = $('div:nth-child(3)', authorBlock).text() || $('div:nth-child(2)', authorBlock).text() || $('div:nth-child(1) > div:nth-child(1)', authorBlock).text();
            let [address, seller] = author.split(',');
            seller = seller.trim();
            let postalCode = address.match(/[A-Z0-9]+(?![A-Za-zäöüßÄÖÜ])/g).join(" ");
            let city = address.substring(postalCode.length).trim();
            Object.assign(object, {'address': address, 'seller': seller, 'postalCode': postalCode, 'city': city});

            objectList.push(object)
            });

        return objectList;

    } catch (e) {
        throw e;
    }
};


exports.generateObject = async (url, object) => {
    object = object == null ? {} : object;

    const {data} = await axios.get(url);
    // const {data} = await axios.get('https://suchen.mobile.de/fahrzeuge/details.html?id=310711740&damageUnrepaired=NO_DAMAGE_UNREPAIRED&isSearchRequest=true&makeModelVariant1.makeId=3500&pageNumber=2&scopeId=C&sfmr=false&searchId=8b7aa788-479d-e66f-286b-734d69814795&lang=en');
    const $ = await cheerio.load(data);


    // let result = $('body > .viewport > div > div:nth-child(2)').children().each((index,elem) => {console.log($(elem).get(0).tagName)});

    // <div class="g-col-8">
    let mainBox = $('body > .viewport > div > div ').not('.adv, .sky08').children().last().children().first();

    // console.log('------------------------------------------------');
    if (mainBox.children().hasClass('cBox--vehicle-details')) {
        // let next = $('.cBox--vehicle-details', mainBox).each((index, elem) => {console.log($(elem).get(0).tagName, ' ', $(elem).attr())});

        let title = $('.cBox--vehicle-details > .cBox-body--title-area > div > div > #rbt-ad-title', mainBox).text();
        object['title'] = title;


        let images = [];
        let imageGallery = $('.cBox--vehicle-details > .cBox-body > div > div > .data-area-image-gallery > .slick-image-gallery-wrapper > .image-gallery-wrapper > .image-gallery > .gallery', mainBox).children().first();
        let getImages = $('div', imageGallery).children().filter((index, elem) => $(elem).get(0).tagName == 'img').each((index,elem) => images.push('https:' + $(elem).attr('data-lazy')));
        object['images'] = images;


        let technicalData = [];
        let technicalSource = $('.cBox--content > .cBox-body--technical-data', mainBox);
        // let getPrice = $('.u-margin-bottom-9', technicalSource).first()
        //         .each((index, elem) => {
        //             let key = $('div:nth-child(1)', elem).text();
        //             let value = $('div:nth-child(2) > span', elem).text();
        //             key && value ? technicalData.push([key, value]) : null;
        //         });
        let getData = $('.u-margin-bottom-9', technicalSource)
            .filter((index,elem) => $('div:nth-child(2)', elem).children().length === 0)
            .each((index, elem) => {
                let key = $('div:nth-child(1)', elem).text();
                let value = $('div:nth-child(2)', elem).text();
                key && value ? technicalData.push([key, value]) : null;
            });
        object['technicalData'] = technicalData;


        let featuresData = [];
        let featuresSource = $('.cBox--content > #rbt-features > div > div > div', mainBox).each((index,elem) => featuresData.push($(elem).text()));
        object['featuresData'] = featuresData;


        let descriptionSource = $('.cBox--content > .cBox-body--vehicledescription > div > .description', mainBox);
        let vehicleDescription = descriptionSource.html().replace(/<br ?\/?>/g, "\n");
        object['description'] = vehicleDescription;


        let scriptText = $('head > script')
            .filter((index, elem) => $(elem).get()[0].children[0] && ($(elem).get()[0].children[0].data).includes('setAdData'))
            .map((index, elem) => $(elem).get()[0].children[0].data).get(0);

        let scriptString = scriptText.split('({')[1].split('})')[0];
        let scriptObject = JSON.parse('{' +  scriptString + '}');
        Object.assign(object, scriptObject.ad);


        return object
    } else {
        return await generateObject(url, object);
    }
}
