const express = require('express');
const router = express.Router();
// import all controllers
const busDetailsController = require('../../controllers/busDetailsController');

//get all buses
router.get('/busDetails', busDetailsController.getBusDetails);

//get all bus routes
router.get('/busRoutes', busDetailsController.getBusRouteDetails);

//get all assigned bus route details
router.get('/getAssignedBusRouteDetails', busDetailsController.getAssignedBusRouteDetails);


//save assigned bus route details
router.post('/saveAssignedBusRouteDetails', busDetailsController.saveAssignedBusRouteDetails);

//update assigned bus route details
router.post('/updateBusRouteDetails', busDetailsController.updateBusRouteDetails);

//delete assigned bus route details
router.delete('/deleteBusRouteDetails', busDetailsController.deleteBusRouteDetails);

//get a single bus
router.get('/:id', (req, res) => {
    res.json({mssg: 'get one bus'})
})

//post a new bus
router.post('/', (req, res) => {
    res.json({mssg: 'create new bus'})
})

//delete a single bus
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a bus'})
})

//update a single bus
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update one bus'})
})


module.exports = router