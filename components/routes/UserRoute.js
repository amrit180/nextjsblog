import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState("");
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (user && user.role !== "subscriber") {
      router.push("/");
    }
  };
  return <>{children}</>;
};

export default UserRoute;
