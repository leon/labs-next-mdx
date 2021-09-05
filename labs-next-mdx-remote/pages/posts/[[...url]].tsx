import { MDXRemote } from 'next-mdx-remote'
import { Post, getAllPosts, getSinglePost, Mdx } from 'libs/posts'
import { GetStaticProps } from 'next'
import { elements } from 'components'

export interface PostPageProps {
  post: Post & Mdx
}
const PostPage = ({ post }: PostPageProps) => {
  return (
    <div className="wrapper">
      <h1>{post.title}</h1>
      <MDXRemote
        {...post.mdx} // pass compiled mdx and scope
        components={elements}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getSinglePost(params?.url as string)
  return {
    props: { post },
  }
}

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { url: slug.split('/') } }))
  return {
    paths,
    fallback: false,
  }
}

export default PostPage
