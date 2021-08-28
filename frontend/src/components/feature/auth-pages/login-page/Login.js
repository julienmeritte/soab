import React, {Fragment, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../../../../actions/auth";
import './Login.scss';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <Fragment>
            <img className={'bg-img'} src="./back.webp"/>
            <div class="test">
                <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3>Loging in </h3>
                        <p>Fill in the data below.</p>
                        <div class="">
                            <a class="text-center" href="/auth/google">
                                <img src="./google_icon.png" width="25" height="25"/>
                                <p>Connect With Google</p>
                            </a>
                        </div>
                        <form class="requires-validation" onSubmit={(e) => onSubmit(e)}>
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

                            <div class="form-button mt-3">
                                <button id="submit" type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, {login})(Login);
