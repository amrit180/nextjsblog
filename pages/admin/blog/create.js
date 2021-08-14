import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AdminRoute from "../../../components/routes/AdminRoute";
import { Context } from "../../../context";
import slugify from "slugify";
const BlogCreate = (props) => {
  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    image: "",
    postedBy: "",
  });

  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  blog.slug = slugify(blog.title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g,
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  const userId = user && user._id;
  const authtoken = user && user.token;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await blogCreate();
      toast(`${blog.title} is created`);
    } catch (error) {
      toast(error.message);
    }
  };
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const blogCreate = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/blog`,
      blog,
      {
        headers: {
          authtoken,
        },
      }
    );
    console.log(data);
  };
  const { title, slug, description, category, image } = blog;
  blog.postedBy = userId;
  return (
    <AdminRoute>
      <form onSubmit={handleSubmit} className="form" style={{ width: "300px" }}>
        <input
          className="form-control mb-2"
          placeholder="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="slug"
          name="slug"
          disabled
          value={slug}
        />
        <input
          className="form-control mb-2"
          placeholder="image"
          name="image"
          value={image}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          placeholder="category"
          name="category"
          value={category}
          onChange={handleChange}
        />

        <button className="btn btn-success">Submit</button>
      </form>
      <h2>{blog.slug}</h2>
    </AdminRoute>
  );
};
export default BlogCreate;
