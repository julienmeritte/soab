import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../../../actions/alert";
import { register } from "../../../../actions/auth";
import PropTypes from "prop-types";

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
    <Fragment>
      <h3>Inscription</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
          minLength="6"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          name="passwordBis"
          value={passwordBis}
          onChange={(e) => onChange(e)}
          required
          minLength="6"
        />
        <input type="submit" value="Register" />
      </form>
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
