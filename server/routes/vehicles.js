const router = require('express').Router();
const vehicles = require('../controllers/vehicles.controller');

router.post('/', vehicles.vehicleList);

router.post('/object', vehicles.vehicleSingle);

module.exports = router;
