import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import { remarkTruncateLinks } from "remark-truncate-links"
import rehypeStringify from "rehype-stringify"

export default async (markdown: string) => {
    const result = await unified()
        .use(remarkParse)
        .use(remarkEmoji)
        .use(remarkGfm)
        .use(remarkTruncateLinks)
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(markdown)
    return result.toString()
}