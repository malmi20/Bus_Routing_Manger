import { post, get , deleteReq } from "../utils/apiHelper";

/**
 * fetchBusDetails
 * @returns  {Promise<object>} response
 */
export const fetchBusDetails = async () => {
  try {
    const response = await get("/buses/busDetails");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * fetchBusRoutes
 * @returns  {Promise<object>} response
 */
export const fetchBusRoutes = async () => {
  try {
    const response = await get("/buses/busRoutes");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * fetchAssignedBusRouteDetails
 * @returns  {Promise<object>} response
 */
export const fetchAssignedBusRouteDetails = async () => {
  try {
    const response = await get("/buses/getAssignedBusRouteDetails");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * saveAssignedBusRouteDetails
 * @param {object} assignedBusRouteDetails
 * @returns  {Promise<object>} response
 */
export const saveAssignedBusRouteDetails = async (assignedBusRouteDetails) => {
  try {
    const response = await post(
      "/buses/saveAssignedBusRouteDetails",
      assignedBusRouteDetails,
      true
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * updateBusRouteDetails
 * @param {object} updateBusRouteDetails
 * @returns  {Promise<object>} response
 */
export const updateBusRouteDetails = async (updatedBusRouteDetails) => {
  try {
    const response = await post(
      "/buses/updateBusRouteDetails",
      updatedBusRouteDetails,
      true
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * deleteBusRouteDetails
 * @param {string} id
 * @returns  {Promise<object>} response
 */
export const deleteBusRouteDetails = async (id) => {
  try {
    const response = await deleteReq("/buses/deleteBusRouteDetails", { id }, true);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
