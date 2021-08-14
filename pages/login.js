import { useContext, useEffect, useState } from "react";
import { auth, googleAuthProvider } from ".././firebase";

import { createOrUpdateUser } from "../functions/auth";
import { Context } from "../context";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    if (user && user.token) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token).then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            image: res.data.image,
            role: res.data.role,
            _id: res.data._id,
          },
        });
      });

      router.push("/");
    } catch (error) {
      toast(error.message);
    }
  };
  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          style={{ width: "300px", height: "50px" }}
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{ width: "300px", height: "50px" }}
        />
        <button type="submit">Login</button>
      </form>
    );
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token).then((res) => {
          console.log(res);
          dispatch({
            type: "LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              picture: res.data.picture,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        });
        router.push("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <div>
      <h4>Login Now</h4>
      {loginForm()}
      <button onClick={googleLogin}>Google Login</button>

      <Link href="/forgot/password">
        <a>Forgot Password</a>
      </Link>
    </div>
  );
};
export default Login;
