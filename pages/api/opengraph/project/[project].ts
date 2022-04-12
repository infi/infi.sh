import { NextApiHandler } from "next"
import { createProjectImage } from "../../../../lib/image"
import { getProjectSlugs } from "../../../../lib/projects"

const handler: NextApiHandler = (req, res) => {
    const { project } = req.query as { project: string }
    const slug = project.replace(".png", "") + ".md"

    const projectExists = getProjectSlugs().includes(slug)

    if (!projectExists) {
        res.status(404).end("Not Found")
        return
    }

    const image = createProjectImage(slug)

    res.setHeader("content-type", "image/png")
    res.end(image)
}

export default handler