import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"

export default async (markdown: string) => {
    const result = await unified()
        .use(remarkParse)
        .use(remarkEmoji)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypeHighlight)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(markdown)
    return result.toString()
}