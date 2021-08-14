import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context";

const BlogSlug = ({ blog }) => {
  const {
    state: { user },
  } = useContext(Context);
  const authtoken = user && user.token;
  const EditBlog = async () => {
    const { data } = await axios.put(
      `/blog/${id}`,
      {},
      { headers: { authtoken } }
    );
  };
  return (
    <div>
      <img
        src={blog.image}
        alt=""
        className="img-fluid"
        style={{
          height: "500px",
          width: "100%",
          objectFit: "cover",
          objectPosition: "right",
        }}
      />
      <div className="container">
        {user && user._id === blog.postedBy._id ? (
          <div className="d-flex my-3">
            <button className="btn btn-info text-white mx-2">Edit</button>
            <button className="btn btn-danger text-white">Delete</button>
          </div>
        ) : null}
        <div className="d-flex justify-content-between">
          <p className="text-muted">By: {blog.postedBy.name}</p>
          <p className="text-muted">Category: {blog.category.name}</p>
        </div>
        <h1 className="h1 display-1">{blog.title}</h1>
        <p className="lead letFirst">{blog.description}</p>
      </div>
    </div>
  );
};
export default BlogSlug;
export const getServerSideProps = async (context) => {
  const { params, query } = context;
  const { slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog/${slug}`);
  const data = await response.json();

  return {
    props: {
      blog: data,
    },
  };
};
