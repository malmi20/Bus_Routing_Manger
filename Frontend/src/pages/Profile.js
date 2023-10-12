import React from "react";
import {
  Row,
  Col,
  CardText,
  CardTitle,
  CardBody,
  CardHeader,
  Card,
  Button,
} from "react-bootstrap";

function Profile() {
  // const { name, email } = props;
  const name = "Gemba";
  const email = "gemba@gmail.com";

  return (
    <Row>
      <Col md={4}>
      <Card>
        <CardHeader>Route Manager profile</CardHeader>
        <CardBody>
          <CardTitle>Name: {name}</CardTitle>
          <CardText>Email: {email}</CardText>
          <Button>Reset Password</Button>
        </CardBody>
      </Card>
      </Col>
    </Row>
  );
}

export default Profile;
