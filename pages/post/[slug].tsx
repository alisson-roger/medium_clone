import { GetStaticProps } from 'next';
import { Header } from '../../components';
import { Post } from '../../typing';
import { client, urlFor } from '../../utils/client';

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post);

  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']`;
  const posts = await client.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
    mainImage,
    slug,
    body
  }`;

  const post = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
