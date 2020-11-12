const vehicleHandler = require('../handlers/vehicles.handler');

exports.vehicleList = (req, res) => {
    vehicleHandler.generateList(req.body.url).then(list => {
        res.end(JSON.stringify({list}))
    })
};

exports.vehicleSingle = (req, res) => {
    vehicleHandler.generateObject(req.body.url).then(object => {
        res.end(JSON.stringify({object}))
    })
};
