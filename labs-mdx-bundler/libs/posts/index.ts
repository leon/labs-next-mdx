import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX, bundleMDXFile } from 'mdx-bundler'

export const POSTS_PATH = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
}

export interface Mdx {
  mdx: string
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
  const { code, frontmatter } = await bundleMDXFile(path.join(POSTS_PATH, `${slug}.mdx`), {
    cwd: POSTS_PATH,
  })

  return {
    slug,
    ...frontmatter,
    mdx: code,
  } as Post & Mdx
}
