import { createCanvas, registerFont } from "canvas"
import path from "path"
import { getPostBySlug } from "./posts"
import { formatDistanceToNow } from "date-fns"
import { getProjectBySlug } from "./projects"

export const COLORS = {
    BACKGROUND: "#201a25",
    HEADING: "#c786ff",
    SUBHEADING: "#cab8fd"
}

export const CONSTS = {
    WIDTH: 1920,
    HEIGHT: 1080,
    TEXT_MARGINS_X: 1920 - (2 * 120),
}

registerFont(path.join(process.cwd(), "public", "fonts", "inter", "Inter-Regular.ttf"), {
    family: "Inter"
})

registerFont(path.join(process.cwd(), "public", "fonts", "inter", "Inter-Bold.ttf"), {
    family: "Inter",
    weight: "600"
})

export const createPostImage = (slug: string) => {
    const post = getPostBySlug(slug, ["title", "readingTime", "description", "date"])
    const ogImage = createCanvas(CONSTS.WIDTH, CONSTS.HEIGHT)

    const ctx = ogImage.getContext("2d")

    // Draw the background
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, CONSTS.WIDTH, CONSTS.HEIGHT)

    // Init text rendering
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Initial font for heading
    ctx.font = "normal 600 200pt Inter"

    // Shrink font if needed (almost always is)
    let headingFontSize = 100
    while (ctx.measureText(post.title).width > CONSTS.TEXT_MARGINS_X) {
        headingFontSize -= 1
        ctx.font = `normal 600 ${headingFontSize}pt Inter`
    }

    // Draw heading
    ctx.fillStyle = COLORS.HEADING
    ctx.fillText(post.title, CONSTS.WIDTH / 2, CONSTS.HEIGHT / 2)

    // Prepare drawing metadata
    ctx.textBaseline = "bottom"
    ctx.font = "normal 400 42pt Inter"

    const descriptionText = `${formatDistanceToNow(new Date(post.date))} ago · ${post.readingTime}`

    // Draw metadata
    ctx.fillStyle = COLORS.SUBHEADING
    ctx.fillText(descriptionText, CONSTS.WIDTH / 2, CONSTS.HEIGHT - 80)

    // Initialize and draw wordmark
    ctx.textBaseline = "top"
    ctx.fillStyle = "white"
    ctx.font = "normal 600 60pt Inter"
    ctx.fillText("Infi", CONSTS.WIDTH / 2, 80)

    // Return png buffer
    return ogImage.toBuffer()
}

export const createProjectImage = (slug: string) => {
    const post = getProjectBySlug(slug, ["title", "years", "categories"])
    const ogImage = createCanvas(CONSTS.WIDTH, CONSTS.HEIGHT)

    const ctx = ogImage.getContext("2d")

    // Draw the background
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, CONSTS.WIDTH, CONSTS.HEIGHT)

    // Init text rendering
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Initial font for heading
    ctx.font = "normal 600 200pt Inter"

    // Shrink font if needed (almost always is)
    let headingFontSize = 100
    while (ctx.measureText(post.title).width > CONSTS.TEXT_MARGINS_X) {
        headingFontSize -= 1
        ctx.font = `normal 600 ${headingFontSize}pt Inter`
    }

    // Draw heading
    ctx.fillStyle = COLORS.HEADING
    ctx.fillText(post.title, CONSTS.WIDTH / 2, CONSTS.HEIGHT / 2)

    // Prepare drawing metadata
    ctx.textBaseline = "bottom"
    ctx.font = "normal 400 42pt Inter"

    const years = post.years.length > 1
        ? `${Math.min(...post.years as unknown as number[])} - ${Math.max(...post.years as unknown as number[])}`
        : post.years[0]
    const metaText = `${years} · ${(post.categories as unknown as string[]).join(", ")}`

    // Draw metadata
    ctx.fillStyle = COLORS.SUBHEADING
    ctx.fillText(metaText, CONSTS.WIDTH / 2, CONSTS.HEIGHT - 80)

    // Initialize and draw wordmark
    ctx.textBaseline = "top"
    ctx.fillStyle = "white"
    ctx.font = "normal 600 60pt Inter"
    ctx.fillText("Infi", CONSTS.WIDTH / 2, 80)

    // Return png buffer
    return ogImage.toBuffer()
}

export const createTextImage = (text: string) => {
    const ogImage = createCanvas(CONSTS.WIDTH, CONSTS.HEIGHT)

    const ctx = ogImage.getContext("2d")

    // Draw the background
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, CONSTS.WIDTH, CONSTS.HEIGHT)

    // Init text rendering
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Initial font for text
    ctx.font = "normal 600 200pt Inter"

    // Shrink font if needed (almost always is)
    let textFontSize = 100
    while (ctx.measureText(text).width > CONSTS.TEXT_MARGINS_X) {
        textFontSize -= 1
        ctx.font = `normal 600 ${textFontSize}pt Inter`
    }

    // Draw heading
    ctx.fillStyle = COLORS.HEADING
    ctx.fillText(text, CONSTS.WIDTH / 2, CONSTS.HEIGHT / 2)

    // Initialize and draw wordmark
    ctx.textBaseline = "top"
    ctx.fillStyle = "white"
    ctx.font = "normal 600 60pt Inter"
    ctx.fillText("Infi", CONSTS.WIDTH / 2, 80)

    // Return png buffer
    return ogImage.toBuffer()
}