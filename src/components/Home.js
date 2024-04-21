import React from 'react';
import Button from 'react-bootstrap/Button';
import UserDetails from './UserDetails';


function Home (){
    const [showModal, setShowModal] = React.useState(false);

    const openModal = () => {
      setShowModal(true);
    };
    return(
        <>
          <div className='d-flex justify-content-center p-4'>
      <Button variant='primary' onClick={openModal}>
        Add User details
      </Button>
      {showModal && <UserDetails />}
    </div>
        </>
    )
}

export default Home;