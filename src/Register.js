import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [country, countrychange] = useState("india");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");
  const navigate = useNavigate();

  const Isvalidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = {
      id,
      name,
      password,
      email,
      phone,
      country,
      address,
      gender,
    };
    // console.log(regobj);
    if (Isvalidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registration</h1>
            </div>
            <div className="card-body"></div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Username <span className="errmsg">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    password <span className="errmsg">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Full name <span className="errmsg">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    email <span className="errmsg">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    country <span className="errmsg">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                    className="form-control"
                  >
                    <option value="india">india</option>
                    <option value="usa">usa</option>
                    <option value="uk">uk</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    Address <span className="errmsg">*</span>
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>
                    phone<span className="errmsg">*</span>
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <br></br>
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="Gender"
                    value="male"
                  ></input>
                  <label>Male</label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="Gender"
                    value="male"
                  ></input>
                  <label>female</label>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
