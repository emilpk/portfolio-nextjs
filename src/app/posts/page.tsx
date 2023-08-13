import type { FC } from "react";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "./components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/clja3thqp24oi01t87eiyf5ep/master"
);

const QUERY = gql`
  {
    posts {
      title
      id
      slug
      coverImage {
        url
      }
      datePublished
    }
  }
`;

async function getPosts() {
  let data = { posts: [] };

  try {
    data = await graphcms.request(QUERY);
    console.log(data);
  } catch {
    throw new Error(`Failed to fetch posts`);
  }

  return data;
}

interface PostItemType {
  title: string;
  id: string;
  slug: string;
  coverImage: {
    url: string;
  };
  datePublished: string;
}

interface pageProps {}

const page: FC<pageProps> = async () => {
  const { posts } = await getPosts();

  return (
    <main>
      <h1>Blog Posts</h1>
      {posts.map((post: any) => (
        <BlogCard
          title={post.title}
          date={post.datePublished}
          slug={post.slug}
          coverImage={post.coverImage.url}
          key={post.id}
        />
      ))}
    </main>
  );
};
export default page;
