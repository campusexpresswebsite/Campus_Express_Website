import React, { useState } from 'react';

function Popup({ title, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for sender/receiver details */}
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} />

          {/* Other input fields for sender/receiver details */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
