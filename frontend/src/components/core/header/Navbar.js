import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="/">
          Déconnexion
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Inscription</Link>
      </li>
      <li>
        <Link to="/login">Connexion</Link>
      </li>
    </ul>
  );
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateProps, { logout })(Navbar);
