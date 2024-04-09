import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [value, setValue] = useState({ mail: '', password: '' });
  const navigate=useNavigate();

  const notifySuccessed = () => {
    toast.success("Login successful!", {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const notifyWarn = (message) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${value.mail}`);

      if (response.ok) {
        const userData = await response.json();

        if (userData.data) {
          if (value.password === userData.data.pass) {
            
            notifySuccessed();
            console.log('Login successful');
            navigate('/');
          } else {
            notifyWarn("Login failed. Please check your credentials.");
            setValue({ ...value, password: '' });
            console.log('Login unsuccessful');
          }
        } else {
          notifyWarn("User not found. Please check your email.");
          console.log('User not found');
        }
      } else {
        notifyWarn(`Error: ${response.status} - ${response.statusText}`);
        console.log(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      notifyWarn("Error fetching user data. Please try again later.");
      console.error('Error fetching user data:', error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="container-fluid bg-registration py-5" style={{ margin: '90px 0' }}>
        <div className="container py-5">
          <div className="row align-items-center">
          <div className="col-lg-7 mb-5 mb-lg-0">
              <p className="text-white">Create An Account now !!!</p>
              <ul className="list-inline text-white m-0">
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3" />Free
                </li>
                <li className="py-2">
                  <i className="fa fa-check text-primary mr-3" />Secured
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header bg-primary text-center p-4">
                  <h1 className="text-white m-0">Login Now</h1>
                </div>
                <div className="card-body rounded-bottom bg-white p-5">
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control p-4"
                        placeholder="Your email"
                        required="required"
                        value={value.mail}
                        onChange={(e) => setValue({ mail: e.target.value, password: '' })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control p-4"
                        placeholder="Password"
                        required="required"
                        value={value.password}
                        onChange={(e) => setValue({ ...value, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-block py-3"
                        type="button"
                        onClick={handleLogin}
                      >
                        Login Now
                      </button>
                    </div>
                    <div className="form-group">
                      You don't have an account, <Link to="/Reg"> Click Here</Link>
                    </div>
                  </form>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
