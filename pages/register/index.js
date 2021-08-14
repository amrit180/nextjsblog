import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

import { toast } from "react-toastify";
import { Context } from "../../context";
import { useRouter } from "next/router";
const Register = () => {
  const [email, setEmail] = useState();
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    if (user && user.token) {
      router.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };
  const registerForm = () => {
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
        <button type="submit"> submit</button>
      </form>
    );
  };

  return (
    <div>
      <h4>Register Now</h4>
      {registerForm()}
    </div>
  );
};
export default Register;
