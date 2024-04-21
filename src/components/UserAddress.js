/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAddress } from '../Reducer/Index';

function UserAddress({ handlePrevious, handleNext, handleClose }) {
  const data = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    residentialAddress: '',
    residentialDistrict: '',
    residentialState: '',
    residentialPincode: '',
    permanentAddress: '',
    permanentDistrict: '',
    permanentState: '',
    permanentPincode: '',
    copyResidential: false,
  });

  const [formErrors, setFormErrors] = useState({
    residentialAddress: false,
    residentialDistrict: false,
    residentialState: false,
    residentialPincode: false,
    permanentAddress: false,
    permanentDistrict: false,
    permanentState: false,
    permanentPincode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
      ...(checked &&
        name === 'copyResidential' && {
          permanentAddress: prevFormData.residentialAddress,
          permanentDistrict: prevFormData.residentialDistrict,
          permanentState: prevFormData.residentialState,
          permanentPincode: prevFormData.residentialPincode,
        }),
      ...(name === 'copyResidential' &&
        !checked && {
          permanentAddress: '',
          permanentDistrict: '',
          permanentState: '',
          permanentPincode: '',
        }),
    }));
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  useEffect(() => {
    setFormData(data.address);
  }, []);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    ['residential', 'permanent'].forEach((type) => {
      if (!formData[`${type}Address`].trim()) {
        errors[`${type}Address`] = true;
        isValid = false;
      }
      if (!formData[`${type}District`].trim()) {
        errors[`${type}District`] = true;
        isValid = false;
      }
      if (!formData[`${type}State`].trim()) {
        errors[`${type}State`] = true;
        isValid = false;
      }
      if (
        !formData[`${type}Pincode`].trim() ||
        !/^\d{6}$/.test(formData[`${type}Pincode`])
      ) {
        errors[`${type}Pincode`] = true;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(setAddress(formData));
      handleClose();
      handleNext();
      navigate('/Dashboard')
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>User Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group controlId='residentialAddress'>
                <Form.Label>Residential Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Residential Address'
                  name='residentialAddress'
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  isInvalid={formErrors.residentialAddress}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter residential address
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='residentialDistrict'>
                <Form.Label>Residential District</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Residential District'
                  name='residentialDistrict'
                  value={formData.residentialDistrict}
                  onChange={handleChange}
                  isInvalid={formErrors.residentialDistrict}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter residential district
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='residentialState'>
                <Form.Label>Residential State</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Residential State'
                  name='residentialState'
                  value={formData.residentialState}
                  onChange={handleChange}
                  isInvalid={formErrors.residentialState}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter residential state
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='residentialPincode'>
                <Form.Label>Residential Pincode</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Residential Pincode'
                  name='residentialPincode'
                  value={formData.residentialPincode}
                  onChange={handleChange}
                  isInvalid={formErrors.residentialPincode}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a valid 6-digit pincode
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <br />
            <Col md={12}>
              <Form.Group controlId='permanentAddress'>
                <Form.Label>Permanent Address</Form.Label>
                <Form.Group controlId='copyResidential'>
                  <Form.Check
                    type='checkbox'
                    label='Copy Residential Address to Permanent Address'
                    name='copyResidential'
                    checked={formData.copyResidential}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Control
                  type='text'
                  placeholder='Enter Permanent Address'
                  name='permanentAddress'
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  isInvalid={formErrors.permanentAddress}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter permanent address
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='permanentDistrict'>
                <Form.Label>Permanent District</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Permanent District'
                  name='permanentDistrict'
                  value={formData.permanentDistrict}
                  onChange={handleChange}
                  isInvalid={formErrors.permanentDistrict}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter permanent district
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='permanentState'>
                <Form.Label>Permanent State</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Permanent State'
                  name='permanentState'
                  value={formData.permanentState}
                  onChange={handleChange}
                  isInvalid={formErrors.permanentState}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter permanent state
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId='permanentPincode'>
                <Form.Label>Permanent Pincode</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Permanent Pincode'
                  name='permanentPincode'
                  value={formData.permanentPincode}
                  onChange={handleChange}
                  isInvalid={formErrors.permanentPincode}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a valid 6-digit pincode
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />

          <Modal.Footer>
            <Button variant='secondary' onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant='primary' type='submit'>
              Final Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}

export default UserAddress;
