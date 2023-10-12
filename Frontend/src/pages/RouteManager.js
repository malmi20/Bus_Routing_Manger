import { Col, Row, Card, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { RouteMgrSchema } from "../schemas/RouteMgrSchema";
import { useState } from "react";
import { Formik } from "formik";
import { notify } from "../components/custom/ToastMessage";
import { BsSearch } from "react-icons/bs";
import DateTimePicker from "react-datetime-picker";
import Table from "../components/custom/CustomTable";
import { useSort } from "@table-library/react-table-library/sort";
import tableData from "../constants/tableData.json";
import moment from "moment/moment";
import { debounce } from "../utils/index";

function RouteManager() {
  console.log(`tableData`, tableData);
  const initialData = {
    routeId: "",
    driverId: "",
    startDateTime: "",
    busNo: "",
    from: "",
    to: "",
  };
  const defaultState = "Add";
  const [initialValues, setValues] = useState(initialData);
  const [routeData, setRouteData] = useState(tableData);
  const [currentState, setCurrentState] = useState(defaultState);
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      console.log(`values`, values);

      // const authData = await signInWithEmailAndPassword(
      //   database,
      //   values.email,
      //   values.password
      // );
      // console.log(`authData`, authData);
      setSubmitting(false);
      resetForm();
      setValues(initialData);
      setCurrentState(defaultState);
      notify("success", "Successfully updated!");
    } catch (error) {
      console.error(`error`, error);
      let errorMessage = "";
      if (error.title) {
        errorMessage = error.title;
      } else {
        errorMessage = "Something went wrong";
      }
      setSubmitting(false);
      notify("error", errorMessage);
    }
  };

  const onSearchHandler = (e) => {
    debounce(
      setRouteData(
        e.target.value
          ? tableData.filter(
              (item) =>
                item.routeId.includes(e.target.value) ||
                item.busNo.includes(e.target.value)
            )
          : tableData
      ),
      500
    );
  };

  const onEditHandler = (item) => {
    console.log(`item`, item);
    setValues({
      ...item,
      startDateTime: new Date(item.dateTime),
      from: item.fromId,
      to: item.toId,
    });
    setCurrentState("Update");
  };

  const onDeleteHandler = (item) => {
    console.log(`item`, item);
  };

  const sort = useSort(
    routeData,
    {},
    {
      sortFns: {
        ROUTE_ID: (array) => array.sort((a, b) => a.routeId - b.routeId),
        BUS_NO: (array) => array.sort((a, b) => a.busNo - b.busNo),
        DATE_TIME: (array) =>
          array.sort((a, b) => Date(a.dateTime) - Date(b.dateTime)),
        FROM: (array) => array.sort((a, b) => a.from - b.from),
        TO: (array) => array.sort((a, b) => a.to - b.to),
      },
    }
  );

  const COLUMNS = [
    {
      label: "Route ID",
      renderCell: (item) => item.routeId,
      sort: { sortKey: "ROUTE_ID" },
    },
    {
      label: "Bus No",
      renderCell: (item) => item.busNo,
      sort: { sortKey: "BUS_NO" },
    },
    {
      label: "DATE & TIME",
      renderCell: (item) =>
        moment(item.dateTime).format("DD/MM/YYYY - hh:mm A"),
      sort: { sortKey: "DATE_TIME" },
    },
    {
      label: "From",
      renderCell: (item) => item.from,
      sort: { sortKey: "FROM" },
    },
    {
      label: "To",
      renderCell: (item) => item.to,
      sort: { sortKey: "TO" },
    },
    {
      label: "Action",
      renderCell: (item) => (
        <>
          <Button
            variant="primary"
            className="me-2"
            size="sm"
            onClick={() => onEditHandler(item)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDeleteHandler(item)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <Row className="px-5 pt-4">
      <Card body className="shadow p-3 mb-3 bg-white rounded">
      <Card.Title><u>Routing Management</u></Card.Title>
        <Col md={12}>
          <Formik
            validationSchema={RouteMgrSchema}
            onSubmit={submitHandler}
            initialValues={initialValues}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              handleBlur,
              setFieldValue,
              resetForm,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="routeId">
                      <Form.Label>Route Id</Form.Label>
                      <Form.Control
                        type="text"
                        name="routeId"
                        value={values.routeId}
                        onChange={handleChange}
                        isValid={touched.routeId && !errors.routeId}
                        isInvalid={touched.routeId && errors.routeId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.routeId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="busNo">
                      <Form.Label>Bus No</Form.Label>
                      <Form.Control
                        type="text"
                        name="busNo"
                        value={values.busNo}
                        onChange={handleChange}
                        isValid={touched.busNo && !errors.busNo}
                        isInvalid={touched.busNo && errors.busNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.busNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="startDateTime">
                      <Form.Label>Start Date Time</Form.Label>
                      <DateTimePicker
                        name="startDateTime"
                        id="startDateTime"
                        className={`form-control ${
                          errors.startDateTime && `is-invalid`
                        }`}
                        showTimeSelect
                        value={values.startDateTime}
                        onChange={(e) => {
                          setFieldValue("startDateTime", e);
                        }}
                      />
                      {errors.startDateTime && (
                        <div className="invalid-feedback">{errors.startDateTime}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="from">
                      <Form.Label>From</Form.Label>
                      <Form.Select
                        name="from"
                        value={values.from}
                        onChange={handleChange}
                        isInvalid={touched.from && errors.from}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="1">Colombo</option>
                        <option value="2">Negombo</option>
                        <option value="3">Malabe</option>
                        <option value="4">Ragama</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.from}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="to">
                      <Form.Label>To</Form.Label>
                      <Form.Select
                        name="to"
                        value={values.to}
                        onChange={handleChange}
                        isInvalid={touched.to && errors.to}
                        onBlur={handleBlur}
                      >
                        <option value="">Select</option>
                        <option value="1">Colombo</option>
                        <option value="2">Negombo</option>
                        <option value="3">Malabe</option>
                        <option value="4">Ragama</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.to}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="d-flex justify-content-start">
                    <Button
                      variant="secondary"
                      type="reset"
                      onClick={() => {
                        setValues(initialData);
                        resetForm();
                        setCurrentState(defaultState);
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">
                      {currentState}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
        <hr />
        <Col md={12}>
          <Row className="mt-4">
            <Col md={2}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search by Route Id/Bus no"
                  onChange={onSearchHandler}
                />
              </InputGroup>
            </Col>
          </Row>
          <Table nodes={routeData} columns={COLUMNS} sort={sort} />
        </Col>
      </Card>
    </Row>
  );
}

export default RouteManager;
