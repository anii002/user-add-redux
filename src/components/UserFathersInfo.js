/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setFatherInfo } from '../Reducer/Index';

function UserFathersInfo({ handlePrevious, handleNext }) {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({
    name: false,
    email: false,
    gender: false,
  });

  const [fatherDetails, setFatherDetails] = useState({
    name: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    setFatherDetails(data.fatherInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFatherDetails({
      ...fatherDetails,
      [name]: value,
    });
    setFormError({
      ...formError,
      [name]: false,
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!fatherDetails.name.trim()) {
      errors.name = true;
      isValid = false;
    }
    if (
      !fatherDetails.email.trim() ||
      !/\S+@\S+\.\S+/.test(fatherDetails.email)
    ) {
      errors.email = true;
      isValid = false;
    }
    if (!fatherDetails.gender) {
      errors.gender = true;
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(setFatherInfo(fatherDetails));
      handleNext();
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Father Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='fatherName'>
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              type='text'
              placeholder="Enter Father's Name"
              name='name'
              value={fatherDetails.name}
              onChange={handleChange}
              isInvalid={formError.name}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter father's name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='fatherEmail'>
            <Form.Label>Father's Email</Form.Label>
            <Form.Control
              type='email'
              placeholder="Enter Father's Email"
              name='email'
              value={fatherDetails.email}
              onChange={handleChange}
              isInvalid={formError.email}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='fatherGender'>
            <Form.Label>Father's Gender</Form.Label>
            <Form.Control
              as='select'
              name='gender'
              value={fatherDetails.gender}
              onChange={handleChange}
              isInvalid={formError.gender}
            >
              <option value=''>Select gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Please select father's gender
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant='secondary' onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant='primary' type='submit'>
              Proceed
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </>
  );
}

export default UserFathersInfo;
