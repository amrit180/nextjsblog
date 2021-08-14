import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import firebase from "firebase";
import { Context } from "../context";

const TopNav = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();
  const logout = async () => {
    await firebase.auth().signOut();
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");

    toast("Logged Out");
    router.push("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/blogs">
                  <a className="nav-link" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item ml-auto">
                    <Link href={user.role === "admin" ? "/admin" : "/user"}>
                      <a className="nav-link">Dashboard</a>
                    </Link>
                  </li>
                  <li className="nav-item ml-auto">
                    <Link
                      href={
                        user.role === "admin"
                          ? "/admin/blog/create"
                          : "/user/blog/create"
                      }
                    >
                      <a className="nav-link">Create Blog</a>
                    </Link>
                  </li>
                  <li className="nav-item ml-auto">
                    <a onClick={logout} className="nav-link">
                      {user.name}
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/register">
                      <a className="nav-link">Register</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
