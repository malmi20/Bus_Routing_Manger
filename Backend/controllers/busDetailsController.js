const busDetailsModel = require("../models/BusDetailsModel");
const busRoutesModel = require("../models/BusRoutesModel");
const assignedBusRouteDetailsModel = require("../models/AssignedBusRouteDetailsModel");

const getBusDetails = async (_req, res, next) => {
  try {
    const busInfo = await busDetailsModel.find();
    return res.status(200).send({
      details: busInfo,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getBusRouteDetails = async (_req, res, next) => {
  try {
    const busRoutes = await busRoutesModel.find();
    return res.status(200).send({
      details: busRoutes,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAssignedBusRouteDetails = async (_req, res, next) => {
  try {
    const assignedBusRouteDetails = await assignedBusRouteDetailsModel
      .find()
      .populate("bus_no", "bus_no") // populate bus_no field with bus_no and bus_name fields from busDetailsModel
      .populate("route_id", "route_id from to") // populate route_id field with route_id and route_name fields from busRoutesModel
      .exec();

    const details = assignedBusRouteDetails.map((detail) => ({
      id: detail._id,
      busNo: detail.bus_no.bus_no,
      routeId: detail.route_id.route_id,
      from: detail.route_id.from,
      to: detail.route_id.to,
      start_date_time: detail.start_date_time,
      bus_no: detail._doc.bus_no,
      route_id: detail._doc.route_id,
    }));

    return res.status(200).send({
      details: details,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const saveAssignedBusRouteDetails = async (req, res, next) => {
  const { bus_no, route_id, start_date_time } = req.body;
  try {
    console.log("saveAssignedBusRouteDetails", JSON.stringify(req.body));
    if (!bus_no || !route_id || !start_date_time) {
      const error = new Error("Please provide all the details.");
      error.status = 404;
      throw error;
    }

    const busInfo = await busDetailsModel.findOne({ _id: bus_no });
    const routeInfo = await busRoutesModel.findOne({ _id: route_id });
    if (!busInfo) {
      return res.status(400).send({
        message: "Bus No. not found.",
      });
    }
    if (!routeInfo) {
      return res.status(400).send({
        message: "Route Id not found.",
      });
    }
    const assignedBusRouteDetails = new assignedBusRouteDetailsModel({
      bus_no: busInfo._id,
      route_id: routeInfo._id,
      start_date_time: start_date_time,
    });
    const result = await assignedBusRouteDetails.save();
    return res.status(200).send({
      message: "Bus Route Details Assigned Successfully.",
      details: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateBusRouteDetails = async (req, res, next) => {
  const { bus_no, route_id, start_date_time, id } = req.body;
  try {
    console.log("updateBusRouteDetails", JSON.stringify(req.body));
    if (!bus_no || !route_id || !start_date_time || !id) {
      const error = new Error("Please provide all the details.");
      error.status = 404;
      throw error;
    }

    const busInfo = await busDetailsModel.findOne({ _id: bus_no });
    const routeInfo = await busRoutesModel.findOne({ _id: route_id });
    if (!busInfo) {
      return res.status(400).send({
        message: "Bus No. not found.",
      });
    }
    if (!routeInfo) {
      return res.status(400).send({
        message: "Route Id not found.",
      });
    }

    const updatedAssignedBusRouteDetails = {
      bus_no: busInfo._id,
      route_id: routeInfo._id,
      start_date_time: start_date_time,
    };

    const result = await assignedBusRouteDetailsModel.findByIdAndUpdate(
      id,
      updatedAssignedBusRouteDetails,
      { new: true }
    );

    return res.status(200).send({
      message: "Bus Route Details Updated Successfully.",
      details: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteBusRouteDetails = async (req, res, next) => {
  const { id } = req.body;
  try {
    console.log("deleteBusRouteDetails", JSON.stringify(req.body));
    if (!id) {
      const error = new Error("Please provide all the details.");
      error.status = 404;
      throw error;
    }

    const result = await assignedBusRouteDetailsModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Bus Route Details Deleted Successfully.",
      details: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getBusDetails,
  getBusRouteDetails,
  saveAssignedBusRouteDetails,
  getAssignedBusRouteDetails,
  updateBusRouteDetails,
  deleteBusRouteDetails,
};
