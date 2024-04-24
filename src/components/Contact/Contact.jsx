import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Handle success or error response as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Contact</h6>
          <h1>Contact For Any Query</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form bg-white" style={{ padding: '30px' }}>
              <div id="success"></div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="control-group col-sm-6">
                    <input type="text" className="form-control p-4" id="name" name="name" placeholder="Your Name"
                      value={formData.name} onChange={handleChange}
                      required data-validation-required-message="Please enter your name" />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group col-sm-6">
                    <input type="email" className="form-control p-4" id="email" name="email" placeholder="Your Email"
                      value={formData.email} onChange={handleChange}
                      required data-validation-required-message="Please enter your email" />
                    <p className="help-block text-danger"></p>
                  </div>
                </div>
                <div className="control-group">
                  <input type="text" className="form-control p-4" id="subject" name="subject" placeholder="Subject"
                    value={formData.subject} onChange={handleChange}
                    required data-validation-required-message="Please enter a subject" />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="control-group">
                  <textarea className="form-control py-3 px-4" rows="5" id="message" name="message" placeholder="Message"
                    value={formData.message} onChange={handleChange}
                    required data-validation-required-message="Please enter your message"></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary py-3 px-4" type="submit" id="sendMessageButton">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contact;
