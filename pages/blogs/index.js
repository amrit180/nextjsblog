import { Card } from "antd";
import Link from "next/link";

const { Meta } = Card;
const BlogList = ({ blogs }) => {
  console.log(blogs);
  return (
    <div>
      {blogs.map((v, i) => {
        return (
          <div key={i}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={v.image} />}
            >
              <Link href={`/blogs/${v.slug}`}>
                <a>
                  <Meta
                    title={v.title}
                    description={v.description.substring(0, 150)}
                  />
                </a>
              </Link>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
export default BlogList;

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/blog`);
  const data = await response.json();

  return {
    props: {
      blogs: data,
    },
  };
};
