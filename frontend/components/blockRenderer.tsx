import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type {
	ChartProps,
	CodeBlockProps,
	MediaProps,
	RichTextProps,
	TableProps,
} from "@/lib/types";
import Charts from "./Charts";
import CodeBlock from "./CodeBlock";
import TableBlock from "./TableBlock";

/**
 * Block union type
 *
 * The page/post content coming from Strapi may include a sequence of
 * heterogeneous blocks (rich text, media, tables, charts, code blocks).
 * We compose the potential shapes into a single union-like type for ease
 * of usage in the renderer. Each block must include a `__component`
 * discriminator that indicates how it should be rendered.
 */
type Block = ChartProps &
	MediaProps &
	TableProps &
	RichTextProps &
	CodeBlockProps & {
        id: number;
		__component: string;
	};

// Base URL for media assets served by Strapi. For production use an
// environment variable (e.g. process.env.STRAPI_URL) instead of a
// hard-coded value.
const strapiUrl = "http://localhost:1337";


/**
 * BlocksRenderer
 *
 * Maps an array of CMS blocks to React elements. Each supported block type
 * should have a corresponding case in the switch below.
 *
 * Notes and suggestions:
 * - We currently use the array index (`i`) as the React `key`. This is
 *   acceptable for static content but if blocks can be reordered or
 *   updated independently, prefer a stable unique id from the CMS.
 * - Images are rendered with `<img>` and a full URL built from `strapiUrl`.
 *   Consider switching to `next/image` for automatic optimization and
 *   improved LCP if your deployment supports it.
 * - The renderer is intentionally simple; more complex blocks can be
 *   extracted into their own components (already done for Table, Charts,
 *   and CodeBlock).
 */
export default function BlocksRenderer({ blocks }: { blocks: Block[] }) {
	return (
		<div>
			{blocks.map((block) => {
				switch (block.__component) {
					// Rich text: render Markdown/HTML-like content. We pass an
					// empty string as a fallback when `block.body` is undefined.
					case "shared.rich-text":
						return (
							<div key={`richtext-${block.id}`}>
							<ReactMarkdown
								remarkPlugins={[remarkGfm, remarkMath]}
								rehypePlugins={[rehypeKatex]}
							>
								{block.body || ""}
							</ReactMarkdown></div>
						);

					// Media block: image with optional caption. We use the
					// 'medium' format provided by Strapi; ensure the path
					// exists before attempting to read it in production data.
					case "shared.media":
						return (
							<div key={`media-${block.id}`} className="flex flex-col items-center">
								<Image
									src={`${strapiUrl}${block.file.formats.medium.url}`}
									alt={block.file.formats.medium.alt || "image"}
									className="rounded-md"
                                    width={block.file.formats.medium.width}
                                    height={block.file.formats.medium.height}
                                    loading="lazy"
								/>
								<h5 className="text-sm text-gray-600">{block.caption}</h5>
							</div>
						);

					// Table block: delegates rendering to the TableBlock component.
					case "shared.table":
						return (
							<div
								key={`table-${block.id}`}
								className="border border-gray-300 rounded-lg mt-5 px-8 py-2"
							>
								<TableBlock
									headers={block.tableData.headers}
									rows={block.tableData.rows}
									caption={block.caption}
								/>
							</div>
						);

					// Charts: delegates to Charts component which handles
					// rendering different chart types based on `chartType`.
					case "shared.charts":
						return (
							<div key={`chart-${block.id}`} className="my-6">
								<Charts
									id={block.id}
									chartType={block.chartType}
									chartData={block.chartData}
								/>
							</div>
						);

					// Code block: uses the CodeBlock component which provides
					// syntax highlighting and a copy-to-clipboard button.
					case "shared.code-block":
						return (
							<div key={block.id} className="my-6">
								<CodeBlock
									language={block.language}
									code={block.code}
									darkMode={true} // consider making theme configurable
								/>
							</div>
						);

					// Fallback for unknown block types: helpful for debugging.
					default:
						return (
							<div key={`unknown-${block.id}`}>
								<p>Unknown block type: {block.__component}</p>
							</div>
						);
				}
			})}
		</div>
	);
}
