import { NextApiHandler } from "next"
import { createPostImage } from "../../../../lib/image"
import { getPostSlugs } from "../../../../lib/posts"

const handler: NextApiHandler = (req, res) => {
    const { post } = req.query as { post: string }
    const slug = post.replace(".png", "") + ".md"

    const postExists = getPostSlugs().includes(slug)

    if (!postExists) {
        res.status(404).end("Not Found")
        return
    }

    const image = createPostImage(slug)

    res.setHeader("content-type", "image/png")
    res.end(image)
}

export default handler