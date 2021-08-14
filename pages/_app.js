import "../styles/globals.css";

import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout";
import { Context, Provider } from "../context";
import { currentUser } from "../functions/auth";
import { useContext, useEffect } from "react";
import { auth } from "../firebase";
function MyApp({ Component, pageProps }) {
  const MainApp = () => {
    const { dispatch } = useContext(Context);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          currentUser(idTokenResult.token)
            .then((res) => {
              console.log(res);
              dispatch({
                type: "LOGIN",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  image: res.data.image,

                  _id: res.data._id,
                },
              });
            })
            .catch((error) => console.log(error));
        }
      });
      return () => unsubscribe();
    }, [dispatch]);
    return (
      <Layout>
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
      </Layout>
    );
  };
  return (
    <Provider>
      <MainApp />
    </Provider>
  );
}

export default MyApp;
