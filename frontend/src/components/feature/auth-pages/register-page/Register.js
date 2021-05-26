import React, { Fragment, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
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
      console.log("Succès.");
    }
  };

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
};

export default connect(null, { setAlert })(Register);
