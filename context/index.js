import axios from "axios";
import { useRouter } from "next/router";
import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);
  const router = useRouter();
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config.__isRetryRequest) {
        return new Promise((reslove, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get("/api/csrf/token");
  //     console.log(data);
  //     axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  //   };
  //   getCsrfToken();
  // }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
