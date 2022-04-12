import { NextApiHandler } from "next"
import { createTextImage } from "../../../lib/image"

const handler: NextApiHandler = (req, res) => {
    const { q } = req.query as { q: string }
    if (!q?.trim()?.length) {
        res.status(400).end("Content Not Specified")
        return
    }

    const image = createTextImage(q)

    res.setHeader("content-type", "image/png")
    res.end(image)
}

export default handler