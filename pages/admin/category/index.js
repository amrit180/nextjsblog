import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AdminRoute from "../../../components/routes/AdminRoute";
import { Context } from "../../../context";

const Category = (props) => {
  const [category, setCategory] = useState();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const authtoken = user && user.token;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await categoryCreate();
      toast(`${category} is created`);
    } catch (error) {
      toast(error.message);
    }
  };
  const categoryCreate = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/category`,
      {
        name: category,
      },
      {
        headers: {
          authtoken,
        },
      }
    );
    console.log(data);
  };
  return (
    <AdminRoute>
      <form onSubmit={handleSubmit}>
        <input name="category" onChange={(e) => setCategory(e.target.value)} />
        <button>Submit</button>
      </form>
    </AdminRoute>
  );
};
export default Category;
