const CategoriesList = ({ categories }) => {
  return (
    <div>
      {categories.map((v, i) => {
        return (
          <div key={i}>
            <h1>{v.name}</h1>
          </div>
        );
      })}
    </div>
  );
};
export default CategoriesList;

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/categories`, {
    method: "GET",
  });
  const data = await response.json();

  return {
    props: {
      categories: data,
    },
  };
};
