import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

import { toast } from "../../components/notifications/Notification";
import { createOrUpdateUser } from "../../functions/auth";

import { Context } from "../../context";
import { useRouter } from "next/router";
const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("error", "Email and Password is required", "Authentication Failed");
      return;
    }
    if (password.length < 6) {
      toast(
        "error",
        "Password must be at least 6 characters",
        "Authentication Failed"
      );
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = await auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token).then((res) => {
          console.log(res);
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
      }
    } catch (error) {
      console.log(error);
      //   toast("error", `${error.message}`, "Error");
    }
  };
  const CompleteRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          disabled
          style={{ width: "300px", height: "50px" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Enter your password"
          style={{ width: "300px", height: "50px" }}
        />
        <button type="submit"> Complete Registration</button>
      </form>
    );
  };

  return (
    <div>
      <h4>Register Complete</h4>
      {CompleteRegisterForm()}
    </div>
  );
};
export default RegisterComplete;
