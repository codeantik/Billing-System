import React from 'react';
import Button from '@material-ui/core/Button';
import './Homepage.css';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <>
      <div className="homepage_section">
        <div className="homepage_info">
          <pre>Invoice/Bill Generator</pre>
        </div>
        <div className="homepage_button">
          <Link to="/invoice">
            <Button variant="contained" color="primary">
              New Invoice
            </Button>
          </Link>
        </div>
      </div> 
    </>
  );
}
