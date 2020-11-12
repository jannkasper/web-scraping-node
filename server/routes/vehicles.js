const router = require('express').Router();
const vehicles = require('../controllers/vehicles.controller');

router.get('/', vehicles.vehicleList);

router.get('/object', vehicles.vehicleSingle);

module.exports = router;
