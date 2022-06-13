import fs from "fs"
import { join } from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const postsDirectory = join(process.cwd(), "_posts")

export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug: string, fields: string[] = []) => {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    type Items = {
        [key: string]: string
    }

    const items: Items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug
        }
        if (field === "content") {
            items[field] = content
        }
        if (field === "readingTime") {
            items[field] = readingTime(content).text
        }

        if (field === "ogImage") {
            if (data[field]) {
                items[field] = data[field]
            } else {
                items[field] = `https://infi.sh/api/opengraph/post/${realSlug}.png`
            }
        }

        if (typeof data[field] !== "undefined") {
            items[field] = data[field]
        }
    })

    return items
}

export const getAllPosts = (fields: string[] = []) => {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, ["date", ...fields]))
        // sort posts by date in descending order
        .sort((post1, post2) => (new Date(post1.date) < new Date(post2.date) ? 1 : -1))
    return posts
}