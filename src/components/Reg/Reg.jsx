import React from 'react';
import { Link } from 'react-router-dom';

function Reg() 
{
  const initialFormState ={
    name: '',
    phone: '',
    cin: '',
    email: '',
    pass: '',
    married: false,
    single: false,
  };
  const [value, setValue] = React.useState(initialFormState);
  console.log(value);

  const CreateAcc = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log(responseText);
        window.alert('Registration successful');
        
        setValue(initialFormState);
      } else if (response.status === 400) {
        const errorData = await response.json();
        window.alert(errorData.error);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error submitting registration:', error.message);
    }
 
  };

  return (
    <div>
      {/* Registration Start */}
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
                  <h1 className="text-white m-0">Sign Up Now</h1>
                </div>
                <div className="card-body rounded-bottom bg-white p-5">
                  <form onSubmit={CreateAcc}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        placeholder="Full name"
                        required
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control p-4"
                        placeholder="Phone Number"
                        required
                        value={value.phone}
                        onChange={(e) => setValue({ ...value, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control p-4"
                        placeholder="Cin"
                        required
                        value={value.cin}
                        onChange={(e) => setValue({ ...value, cin: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control p-4"
                        placeholder="Your email"
                        required
                        value={value.email}
                        onChange={(e) => setValue({ ...value, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control p-4"
                        placeholder="Password"
                        required
                        value={value.pass}
                        onChange={(e) => setValue({ ...value, pass: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      Married
                      <input
                        type="checkbox"
                        checked={value.married}
                        className="form-control p-4"
                        onChange={() => setValue({ ...value, married: !value.married })}
                      />
                      Single
                      <input
                        type="checkbox"
                        checked={value.single}
                        className="form-control p-4"
                        onChange={() => setValue({ ...value, single: !value.single })}
                      />
                    </div>
                    <div className="form-group">
                      You already have an account, <Link to="/Login"> Click Here</Link>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-block py-3" type="submit">
                        Sign Up Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* Registration End */}
    </div>
  );
}

export default Reg;
