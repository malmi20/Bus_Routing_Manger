const BusDetails = require('../models/BusDetailsModel')
const mongoose = require('mongoose')

//get all buses
const getbuses = async (req, res) => {
    const buses = await BusDetails.find({}).sort({createAt: -1})

    res.status(200).json(buses)
}

//get one bus
const getbus = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such bus'})
    }

    const bus = await BusDetails.findById(id)

    if(!bus){
        return res.status(404).json({error: 'no such bus'})
    }
    
    res.status(200).json(bus)

}

//create bus
const createBus = async (req, res) => {
    const {bus_no, driver_id, driver_name} = req.body

    //add doc to db
    try{
        const bus = await BusDetails.create({bus_no, driver_id, driver_name})
        res.status(200).json(bus)

    }catch(error)
    {
        res.status(400).json({error: error.message})
    }
}


//delete bus
const deleteBus = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such bus'})
    }

    const bus = await BusDetails.findByIdAndDelete({_id: id})

    if(!bus){
        return res.status(400).json({error: 'no such bus'})
    }

    res.status(200).json(bus)
}

//update bus
const updateBus = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such bus'})
    }

    const bus = await BusDetails.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!bus){
        return res.status(400).json({error: 'no such bus'})
    }

    res.status(200).json(bus)
}

module.exports = {
    getbuses,
    getbus,
    createBus,
    deleteBus,
    updateBus
}
