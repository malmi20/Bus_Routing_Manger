import { Col, Row, Card, InputGroup, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { database } from "../components/util/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Table from "../components/CustomTable";
import { useSort } from "@table-library/react-table-library/sort";
import tableData from "../constants/ticketingData.json";
import { debounce } from "../components/util";

function TicketingManger() {
  console.log(`tableData`, tableData);
  const [routeData, setRouteData] = useState(tableData);

  const onSearchHandler = (e) => {
    debounce(
      setRouteData(
        e.target.value
          ? tableData.filter(
              (item) =>
                item.date.includes(e.target.value) ||
                item.busNo.includes(e.target.value) ||
                item.noOfTrips.includes(e.target.value)
            )
          : tableData
      ),
      500
    );
  };

  const sort = useSort(
    routeData,
    {},
    {
      sortFns: {
        DATE: (array) => array.sort((a, b) => Date(a.date) - Date(b.date)),
        BUS_NO: (array) => array.sort((a, b) => a.busNo - b.busNo),
        NO_OF_TRIPS: (array) => array.sort((a, b) => a.noOfTrips - b.noOfTrips),
      },
    }
  );

  const COLUMNS = [
    {
      label: "Date",
      renderCell: (item) => item.date,
      sort: { sortKey: "DATE" },
    },
    {
      label: "Bus No",
      renderCell: (item) => item.busNo,
      sort: { sortKey: "BUS_NO" },
    },
    {
      label: "No Of Trips",
      renderCell: (item) => item.noOfTrips,
      sort: { sortKey: "NO_OF_TRIPS" },
    },
  ];
  return (
    <Row className="px-5 pt-4">
      <Card body className="shadow p-3 mb-3 bg-white rounded">
        <Card.Title className="position-relative">
          <u>Ticketing Management</u>
        </Card.Title>
        <div className="d-flex justify-content-end report">
          <Button variant="warning"> Report </Button>
        </div>
        <Col md={12}>
          <Row className="mt-4">
            <Col md={3}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search by Bus No/Date/No of Trips/Earning"
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

export default TicketingManger;
