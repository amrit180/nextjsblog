import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  };

  return <>{children}</>;
};

export default AdminRoute;
