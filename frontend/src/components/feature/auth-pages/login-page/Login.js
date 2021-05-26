import React, { Fragment, useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordBis: "",
  });

  const { email, password, passwordBis } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordBis) {
      console.log("Mots de passe différents");
    } else {
      console.log("Succès.");
    }
  };

  return (
    <Fragment>
      <h3>Connexion</h3>
      <form onSubmit={(e) => onSubmit(e)}>
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
        <input type="submit" value="Login" />
      </form>
    </Fragment>
  );
};

export default Login;
