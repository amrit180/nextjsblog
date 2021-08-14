import PrivateRoute from "../components/routes/PrivateRoute";

const PostList = ({ posts }) => {
  return (
    <PrivateRoute>
      <h1>hey posts</h1>
      {/* <h3>{posts[0].title}</h3>
      <h4>{posts[0].body}</h4> */}
    </PrivateRoute>
  );
};
export default PostList;

// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:8000/api/");
//   const data = await response.json();

//   return {
//     props: {
//       posts: data,
//     },
//   };
// };
