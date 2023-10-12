const express = require('express')
const router = express.Router()

//get all buses
router.get('/', (req, res) => {
    res.json({mssg: 'get all buses'})
})

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