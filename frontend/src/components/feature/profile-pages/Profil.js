import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { profil } from "../../../actions/auth";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";
import './Profil.scss'

const Profil = ({ profil }) => {

    const [formData, setFormData] = useState({
        googleId: sessionStorage.getItem('id'),
        name: "",
        email: "",
        password: "",
      });
    
      const { googleId, name, email, password} = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async (e) => {
        e.preventDefault();
        await profil({googleId, name, email, password});
        window.location.reload();
      };
    

    if (sessionStorage.getItem("id") == null ) {
        return <Redirect to="/"></Redirect>;
    }
    let username = sessionStorage.getItem("name");
    let mail = sessionStorage.getItem("email");
    return (
        <div class="row">
            <h1 class="info">Nom d'utilisateur :{username}</h1>
            <h1 class="info">Adresse mail :{mail}</h1>
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <form class="requires-validation" onSubmit={(e) => onSubmit(e)}>
                        <div class="col-md-12">
                                <input class="form-control" type="text" name="name" placeholder="Name" value={name} onChange={(e) => onChange(e)} required/>
                                 <div class="valid-feedback">Name field is valid!</div>
                                 <div class="invalid-feedback">Name field cannot be blank!</div>
                          </div>
                          <div class="col-md-12">
                              <input class="form-control" type="email" name="email" placeholder="E-mail Address" value={email} onChange={(e) => onChange(e)} required/>
                                <div class="valid-feedback">Email field is valid!</div>
                                <div class="invalid-feedback">Email field cannot be blank!</div>
                          </div>       
                          <div class="col-md-12">
                              <input class="form-control" type="password" name="password"value={password} placeholder="Password" onChange={(e) => onChange(e)} required/>
                                <div class="valid-feedback">Email field is valid!</div>
                                <div class="invalid-feedback">Email field cannot be blank!</div>
                          </div>      

                            <div class="form-button mt-3">
                                <button id="submit" type="submit" class="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
        </div>
    )
    
};

Profil.propTypes = {
    profil: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  const mapStateProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
  export default connect(mapStateProps, { profil })(Profil);