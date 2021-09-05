import React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Post, getAllPosts, getSinglePost, Mdx } from 'libs/posts'
import { GetStaticProps } from 'next'
import { elements } from 'components'

export interface PostPageProps {
  post: Post & Mdx
}
const PostPage = ({ post }: PostPageProps) => {
  const MdxContent = React.useMemo(() => getMDXComponent(post.mdx), [post.mdx])
  return (
    <div className="wrapper">
      <h1>{post.title}</h1>
      <MdxContent components={elements} />
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
