import { unified } from "unified"
import { h } from "hastscript"
import remarkParse from "remark-parse"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import remarkRehype from "remark-rehype"
import rehypeComponents from "rehype-components"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"

const Admonition = (properties: any, children: any) => h("aside.admonition", {
    class: `adm-type-${properties.type ?? "generic"}`
}, [
    h("h3.adm-heading", properties.title ?? "Note"),
    ...children
])

export default async (markdown: string) => {
    const result = await unified()
        .use(remarkParse)
        .use(remarkEmoji)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkDirective)
        .use(remarkDirectiveRehype)
        .use(remarkRehype)
        .use(rehypeComponents, {
            components: {
                "note": Admonition
            }
        })
        .use(rehypeRaw)
        .use(rehypeHighlight)
        .use(rehypeKatex)
        .use(rehypeStringify)
        .process(markdown)
    return result.toString()
}