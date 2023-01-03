import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");

  const navigate = useNavigate();

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      //console.log("proceed");
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (Object.keys(res).length === 0) {
            toast.warning("please enter valid username");
          } else {
            if (res.password === password) {
              toast.success("success");
              sessionStorage.setItem("username", username);

              navigate("/");
            } else {
              toast.warning("please enter valid credentials");
            }
          }
        })
        .catch((error) => {
          toast.warning("Login failed due to:" + error.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === null || username === "") {
      result = false;
      toast.warning("please enter username");
    }
    if (password === null || password === "") {
      result = false;
      toast.warning("please enter password");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h1>Login form</h1>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameUpdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  password <span className="errmsg">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => passwordUpdate(e.target.value)}
                  type="password"
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              |
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
