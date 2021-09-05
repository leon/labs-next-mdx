import fs, { readFileSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export const POSTS_PATH = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
}

export interface Mdx {
  mdx: MDXRemoteSerializeResult
}

export const getSourceOfFile = (fileName: string): Buffer => {
  return fs.readFileSync(path.join(POSTS_PATH, fileName))
}

export const getAllPosts = (): Post[] => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName)
      const slug = fileName.replace(/\.mdx?$/, '')
      const { data } = matter(source)

      return {
        slug: slug,
        ...data,
      } as Post
    })
}

export const getSinglePost = async (slug: string): Promise<Post & Mdx> => {
  const source = getSourceOfFile(`${slug}.mdx`)
  const { content, data } = matter(source)
  const mdxResult = await serialize(content, { scope: data })

  return {
    slug,
    ...data,
    mdx: mdxResult,
  } as Post & Mdx
}
