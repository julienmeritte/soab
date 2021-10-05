import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../../actions/alert";
import { register } from "../../../../actions/auth";
import PropTypes from "prop-types";
import './Register.scss'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordBis: "",
  });

  const { name, email, password, passwordBis } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordBis) {
      setAlert("Mots de passe différents", "danger", 3000);
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  return (
      /*<div class="row">
                <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Loging in </h3>
                        <p>Fill in the data below.</p>
                        <form class="requires-validation" onSubmit={(e) => onSubmit(e)}>
                        <div class="col-md-12">
                                <input class="form-control" type="text" name="name" placeholder="name" value={name} onChange={(e) => onChange(e)} required/>
                                 <div class="valid-feedback">Email field is valid!</div>
                                 <div class="invalid-feedback">Email field cannot be blank!</div>
                          </div>
                            <div class="col-md-12">
                                <input class="form-control" type="email" name="email" placeholder="E-mail Address" value={email} onChange={(e) => onChange(e)} required/>
                                 <div class="valid-feedback">Email field is valid!</div>
                                 <div class="invalid-feedback">Email field cannot be blank!</div>
                            </div>


                           <div class="col-md-12">
                              <input class="form-control" type="password" name="password" placeholder="Password" value={password} onChange={(e) => onChange(e)} minLength="6" required/>
                               <div class="valid-feedback">Password field is valid!</div>
                               <div class="invalid-feedback">Password field cannot be blank!</div>
                           </div>

                           <div class="col-md-12">
                              <input class="form-control" type="password" name="passwordBis" placeholder="Confirmed Password" value={passwordBis} onChange={(e) => onChange(e)} minLength="6" required/>
                               <div class="valid-feedback">Password field is valid!</div>
                               <div class="invalid-feedback">Password field cannot be blank!</div>
                           </div>                     

                            <div class="form-button mt-3">
                                <button id="submit" type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>*/
    <Fragment>
      <div class="container-fluid w-50 h-25 shadow-lg rounded">
					<div class="row p-3">
						<form control="" class="form-group" onSubmit={(e) => onSubmit(e)}>
							<div class="row">
								<input class="form__input" type="text" name="name" placeholder="name" value={name} onChange={(e) => onChange(e)} required/>
							</div>
							<div class="row">
								<input class="form__input" type="email" name="email" placeholder="E-mail Address" value={email} onChange={(e) => onChange(e)} required/>
              </div>
              <div class="row">
								<input class="form__input" type="password" name="password" placeholder="Password" value={password} onChange={(e) => onChange(e)} minLength="6" required/>
              </div>
              <div class="row">
								<input class="form__input" type="password" name="passwordBis" placeholder="Confirmed Password" value={passwordBis} onChange={(e) => onChange(e)} minLength="6" required/>
              </div>
							<div class="row">
								<input type="submit" value="Submit" class="btn"/>
              </div>
						</form>
	
					<div class="row">
						<p>Tu as déjà un compte ? <a href="/login">Connecte toi</a></p>
                    </div>
                </div>
          </div>	
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { setAlert, register })(Register);
