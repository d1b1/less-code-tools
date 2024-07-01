import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaInfoCircle } from 'react-icons/fa';

const PopoverExample = () => {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Popover Title</Popover.Header>
        <Popover.Body>
          And here's some amazing content. It's very engaging. Right?
        </Popover.Body>
      </Popover>
    );
  
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <FaInfoCircle size={30} style={{ cursor: 'pointer' }} />
        </OverlayTrigger>
      </div>
    );
  };
  
  export default PopoverExample;
  