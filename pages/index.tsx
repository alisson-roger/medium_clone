import Head from 'next/head';
import { Header, Hero, Posts } from '../components';
import { client } from '../utils/client';
import { Post } from '../typing';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Posts posts={posts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]`;
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
