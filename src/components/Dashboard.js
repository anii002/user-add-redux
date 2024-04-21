import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

function Dashboard() {
  const userDetails = useSelector((state) => state.user.userData);
  const fatherDetails = useSelector((state) => state.user.fatherInfo);
  const formData = useSelector((state) => state.user.address);

  return (
    <div className="col-lg-6 mx-auto d-flex justify-content-center p-5">
      <Container className="shadow p-2">
        <Row className="mb-2">
          <Col>
            <Card>
              <Card.Body>
                <h3>User Details</h3>
                <p>
                  <strong>Name:</strong> {userDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Gender:</strong> {userDetails.gender}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Card>
              <Card.Body>
                <h3>Father Details</h3>
                <p>
                  <strong>Name:</strong> {fatherDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {fatherDetails.email}
                </p>
                <p>
                  <strong>Gender:</strong> {fatherDetails.gender}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Card>
              <Card.Body>
                <h3>Residential Address</h3>
                <p>
                  <strong>Address:</strong> {formData.residentialAddress}
                </p>
                <p>
                  <strong>District:</strong> {formData.residentialDistrict}
                </p>
                <p>
                  <strong>State:</strong> {formData.residentialState}
                </p>
                <p>
                  <strong>Pincode:</strong> {formData.residentialPincode}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <Card>
              <Card.Body>
                <h3>Permanent Address</h3>
                <p>
                  <strong>Address:</strong> {formData.permanentAddress}
                </p>
                <p>
                  <strong>District:</strong> {formData.permanentDistrict}
                </p>
                <p>
                  <strong>State:</strong> {formData.permanentState}
                </p>
                <p>
                  <strong>Pincode:</strong> {formData.permanentPincode}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
