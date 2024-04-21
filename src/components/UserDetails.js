/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FatherDetails from './UserFathersInfo';
import Address from './UserAddress';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Reducer/Index';

function UserDetails() {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(1);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    setUserDetails(data.userData);
  }, []);

  const [formError, setFormError] = useState({
    name: false,
    email: false,
    gender: false,
  });

  const handleClose = () => setShow(false);
  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };
  const handlePrevious = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
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

    if (!userDetails.name.trim()) {
      errors.name = true;
      isValid = false;
    }

    if (!userDetails.email.trim() || !/\S+@\S+\.\S+/.test(userDetails.email)) {
      errors.email = true;
      isValid = false;
    }

    if (!userDetails.gender) {
      errors.gender = true;
      isValid = false;
    }
    setFormError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(setUser(userDetails));
      handleNext();
    }
  };

  let currentModel;
  switch (step) {
    case 1:
      currentModel = (
        <>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='nameInput'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={userDetails.name}
                  onChange={handleChange}
                  isInvalid={formError.name}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter your name
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='emailInput'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='name@example.com'
                  name='email'
                  value={userDetails.email}
                  onChange={handleChange}
                  isInvalid={formError.email}
                />
                <Form.Control.Feedback type='invalid'>
                  Please enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId='genderSelect'>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as='select'
                  name='gender'
                  value={userDetails.gender}
                  onChange={handleChange}
                  isInvalid={formError.gender}
                >
                  <option value=''>Select gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  Please select your gender
                </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' type='submit'>
                Proceed
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </>
      );
      break;
    case 2:
      currentModel = (
        <FatherDetails
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      );
      break;
    case 3:
      currentModel = (
        <Address
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleClose={handleClose}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      {currentModel}
    </Modal>
  );
}

export default UserDetails;
