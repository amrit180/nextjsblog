import { useContext } from "react";
import { Context } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";

const AdminIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <AdminRoute>
      <div className="jumbotron text-center square">
        <h1>User Dashboard</h1>
        {user && (
          <>
            <img
              src={user.image}
              style={{ width: 250, height: 250 }}
              className="img-thumbnail round"
            />
            <h1 className="h1">{user.name}</h1>
            <h1 className="h1">{user.email}</h1>
            <h1 className="h1">Total Post : </h1>
          </>
        )}
      </div>
    </AdminRoute>
  );
};

export default AdminIndex;
