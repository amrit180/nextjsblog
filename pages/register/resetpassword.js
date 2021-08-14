import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

import { toast } from "react-toastify";
import { Context } from "../../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
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
      url: process.env.NEXT_PUBLIC_URL_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");

        toast(`Email is sent to ${email} for password reset link`);
      })
      .catch((error) => toast("error", error.message, "Error"));
  };
  return (
    <>
      <h1>forgot password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default ForgotPassword;
