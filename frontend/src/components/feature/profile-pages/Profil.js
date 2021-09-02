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
            <div class="Profil">

                <div className="info">
                    <h1 className="Username">Nom d'utilisateur:</h1>
                    <h2>{username}</h2>
                    <h1 className="mail">Adresse mail:</h1>
                    <h2>{mail}</h2>
                </div>
                <div className="profile">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <form className="requires-validation" onSubmit={(e) => onSubmit(e)}>
                                    <div className="col-md-12">
                                        <input className="form-control" type="text" name="name" placeholder="Name"
                                               value={name} onChange={(e) => onChange(e)} required/>
                                        <div className="valid-feedback">Name field is valid!</div>
                                        <div className="invalid-feedback">Name field cannot be blank!</div>
                                    </div>
                                    <div className="col-md-12">
                                        <input className="form-control" type="email" name="email"
                                               placeholder="E-mail Address" value={email} onChange={(e) => onChange(e)}
                                               required/>
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>
                                    <div className="col-md-12">
                                        <input className="form-control" type="password" name="password" value={password}
                                               placeholder="Password" onChange={(e) => onChange(e)} required/>
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>

                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
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
