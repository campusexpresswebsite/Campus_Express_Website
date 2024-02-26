import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import truckimg from './assests/truck.png';

function PickupPopup({ onClose, onSubmit }) {
  const [senderName, setSenderName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ senderName, phoneNumber, address, pincode, city, state });
    onClose();
  };

  return (
    <div className="popup-background">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Pickup Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="senderName">Sender Name:</label>
          <input type="text" id="senderName" value={senderName} onChange={(e) => setSenderName(e.target.value)} required/>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="number" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
          <label htmlFor="pincode">Pincode:</label>
          <input type="number" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required/>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required/>
          <label htmlFor="state">State:</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

function DeliveryPopup({ onClose, onSubmit }) {
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPincode, setDeliveryPincode] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryState, setDeliveryState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ receiverName, receiverPhoneNumber, deliveryAddress, deliveryPincode, deliveryCity, deliveryState });
    onClose();
  };

  return (
    <div className="popup-background">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Delivery Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="receiverName">Receiver Name:</label>
          <input type="text" id="receiverName" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required/>
          <label htmlFor="receiverPhoneNumber">Phone Number:</label>
          <input type="number" id="receiverPhoneNumber" value={receiverPhoneNumber} onChange={(e) => setReceiverPhoneNumber(e.target.value)} required/>
          <label htmlFor="deliveryAddress">Address:</label>
          <input type="text" id="deliveryAddress" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required/>
          <label htmlFor="deliveryPincode">Pincode:</label>
          <input type="number" id="deliveryPincode" value={deliveryPincode} onChange={(e) => setDeliveryPincode(e.target.value)} required/>
          <label htmlFor="deliveryCity">City:</label>
          <input type="text" id="deliveryCity" value={deliveryCity} onChange={(e) => setDeliveryCity(e.target.value)} required/>
          <label htmlFor="deliveryState">State:</label>
          <input type="text" id="deliveryState" value={deliveryState} onChange={(e) => setDeliveryState(e.target.value)} required/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

function Book() {
  const [showPickupPopup, setShowPickupPopup] = useState(false);
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [pickupDetails, setPickupDetails] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false); // Define bookingSuccess state
  const [adminMode, setAdminMode] = useState(false);
  const [bookings, setBookings] = useState([]); // Store previous bookings data

  useEffect(() => {
    if (adminMode) {
      fetch(
        "https://script.google.com/macros/s/AKfycbypv8NJDfeFczgWV67x-BmsBEJhADGOyhKgssHnXz9NLAVYzp93ZSt_jDG3uYB-d_KJ/exec",
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setBookings(data); // Set previous bookings data
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [adminMode]);

  const handlePickupSubmit = (data) => {
    setPickupDetails(data);
  };

  const handleDeliverySubmit = (data) => {
    setDeliveryDetails(data);
  };
  const handleAdminClick = () => {
    const enteredPassword = prompt("Please enter the password:");
    if (enteredPassword === "CAMPUSEXPRESS") {
      setAdminMode(true);
    } else {
      alert("Incorrect password. Access denied.");
    }
  };
  const handleBooking = () => {
    const formData = {
      ...pickupDetails,
      ...deliveryDetails,
      weight: document.getElementById('weight').value,
      quantity: document.getElementById('quantity').value,
      height: document.getElementById('height').value,
      length: document.getElementById('length').value,
      width: document.getElementById('width').value,
      insurance: document.querySelector('input[name="insurance"]:checked').value
    };
    
    const formDatab = new FormData();
    for (const key in formData) {
      formDatab.append(key, formData[key]);
    }

    fetch(
      "https://script.google.com/macros/s/AKfycbzupORGz4PkY6MZKVuzh-7gaELmZukmToj17lATCkwMMxEY1JlVnWDt6yVy6j_iRFYI1w/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

      setBookingSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      
  };

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <h1 className="title">
            Place <span style={{ color: '#b64c41' }}>New</span> Order
          </h1>
          <img src={truckimg} alt="Image 1" className="image" />
        </div>
        <form className="form">
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input type="text" id="pickupLocation" name="pickupLocation" value={pickupDetails.pincode} onClick={() => setShowPickupPopup(true)} readOnly />
          <label htmlFor="deliverTo">Deliver To:</label>
          <input type="text" id="deliverTo" name="deliverTo" value={deliveryDetails.deliveryPincode} onClick={() => setShowDeliveryPopup(true)} readOnly />
          <label htmlFor="weight">Weight:</label>
          <input type="number" id="weight" name="weight" required />
          <label htmlFor="quantity">Quantity:</label>
          <input type="text" id="quantity" name="quantity" required/>
          <label htmlFor="length">Length:</label>
          <input type="text" id="length" name="length" required/>
          <label htmlFor="height">Height:</label>
          <input type="text" id="height" name="height" required/>
          <label htmlFor="width">Width:</label>
          <input type="text" id="width" name="width"  required/>
          <div className="insurance">
            <label htmlFor="insurance">Insurance:</label>
            <div className="radio-group">
              <label>
                Yes
                <input type="radio" id="insuranceYes" name="insurance" value="yes" />
              </label>
              <label>
                No
                <input type="radio" id="insuranceNo" name="insurance" value="no" />
              </label>
            </div>
          </div>
        </form>
        <button className="book-now" onClick={handleBooking}>Book Now</button>
        <button className="admin-button" onClick={handleAdminClick}>Admin</button>
      </div>

      {showPickupPopup && (
        <PickupPopup
          onClose={() => setShowPickupPopup(false)}
          onSubmit={handlePickupSubmit}
        />
      )}

      {showDeliveryPopup && (
        <DeliveryPopup
          onClose={() => setShowDeliveryPopup(false)}
          onSubmit={handleDeliverySubmit}
        />
      )}
      {bookingSuccess && (
        <div className="popup-background">
          <div className="popup">
            <button className="close-btn" onClick={() => setBookingSuccess(false)}>X</button>
            <h2>Booking Successful!</h2>
            {/* Optionally, you can display additional information here */}
          </div>
        </div>
      )}
      {adminMode && (
        <div className="admin-data">
          <h2>Previous Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>City</th>
                <th>State</th>
                <th>Receiver Name</th>
                <th>Receiver Phone Number</th>
                <th>Delivery Address</th>
                <th>Delivery Pincode</th>
                <th>Delivery City</th>
                <th>Delivery State</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Height</th>
                <th>Length</th>
                <th>Width</th>
                <th>Insurance</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.senderName}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.address}</td>
                  <td>{booking.pincode}</td>
                  <td>{booking.city}</td>
                  <td>{booking.state}</td>
                  <td>{booking.receiverName}</td>
                  <td>{booking.receiverPhoneNumber}</td>
                  <td>{booking.deliveryAddress}</td>
                  <td>{booking.deliveryPincode}</td>
                  <td>{booking.deliveryCity}</td>
                  <td>{booking.deliveryState}</td>
                  <td>{booking.weight}</td>
                  <td>{booking.quantity}</td>
                  <td>{booking.height}</td>
                  <td>{booking.length}</td>
                  <td>{booking.width}</td>
                  <td>{booking.insurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Book;

