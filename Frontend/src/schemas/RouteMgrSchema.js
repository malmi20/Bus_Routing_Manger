import * as Yup from "yup";

export const RouteMgrSchema = Yup.object().shape({
  routeId: Yup.string().required("Route ID is required"),
  driverId: Yup.string().required("Driver ID is required"),
  startDateTime: Yup.string().required("Start Date Time is required"),
  busNo: Yup.string().required("Bus No is required"),
  from: Yup.string().required("From is required"),
  to: Yup.string().required("To is required"),
});
