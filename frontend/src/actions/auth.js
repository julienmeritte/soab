import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const profil =
  ({ googleId , name, email , password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ googleId , name, email , password});
    try {
      const res = await axios.put("/api/users/update", body, config);
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: UPDATE_FAIL,
      });
    }
    const bodylogin = JSON.stringify({ email, password });
        try {
          const res = await axios.post("/auth", bodylogin, config);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          });
          sessionStorage.setItem("id" , res.data.id);
          sessionStorage.setItem("name" , res.data.name);
          sessionStorage.setItem("email" , res.data.email);
          sessionStorage.setItem("token" , res.data.token);
          dispatch(loadUser());
        } catch (err) {
          const errors = err.response.data.errors;

          if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
          }
          dispatch({
            type: LOGIN_FAIL,
          });
        }
  };

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    sessionStorage.setItem("id" , res.data.id);
    sessionStorage.setItem("name" , res.data.name);
    sessionStorage.setItem("email" , res.data.email);
    sessionStorage.setItem("token" , res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.clear();
  dispatch({ type: LOGOUT });
};