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
            <div className={'Login'}>
                <div className={'display'}>
                    <h3 className={'formulaire'}>Connexion</h3>
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
                        <input className={'btn'} type="submit" value="Login"/>
                    </form>
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
