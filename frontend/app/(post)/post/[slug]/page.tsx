// app/posts/[slug]/page.tsx
import Image from "next/image";
import BlocksRenderer from "@/components/blockRenderer";
import { getPostBySlug, STRAPI_URL } from "@/lib/strapi";
import { draftMode } from "next/headers";
import formatDateTime from "@/lib/formatDateTime";
import { getRandomColor } from "@/lib/randomBadgeColor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// NOTE: Use an environment variable for the Strapi URL in production
// (e.g. process.env.STRAPI_URL) so the host can vary by environment.


type Props = {
    // Next.js passes `params` as an object; here it's a promise that
    // resolves to the route params containing `slug`.
    params: Promise<{ slug: string }>;
}


/**
 * PostPage
 *
 * Server component that fetches a post by slug and renders the post page.
 * It supports Draft Mode by toggling the `status` passed to the
 * `getPostBySlug` helper. When Draft Mode is enabled in Next, the page
 * will request the 'draft' version; otherwise it requests 'published'.
 *
 * The function transforms the raw Strapi response (`postData`) into a
 * local `post` object used by the JSX below. The mapping assumes certain
 * fields exist (cover formats, author avatar, etc.) — production code
 * should guard against missing nested fields where appropriate.
 */
export default async function PostPage({ params }: Props) {
    // Resolve the incoming params promise to read the slug.
    const resolvedParams = await params;

    // Draft mode: `draftMode()` reads the Next.js draft cookie. We use
    // the boolean to decide which status to request from the CMS.
    const { isEnabled: isDraftMode } = await draftMode();
    const status = isDraftMode ? "draft" : "published";

    // Fetch the post from Strapi by slug and requested status.
    // getPostBySlug should return `null`/`undefined` when not found.
    const postData = await getPostBySlug(resolvedParams.slug, status);
    if (!postData) return <p className="text-center mt-10">Post not found</p>;

    // Map the CMS response into a smaller `post` shape used by this page.
    // Be careful: nested properties like `cover.formats.medium.url` assume
    // the format exists; if Strapi is configured differently this may throw.
    const post = {
        title: postData.title,
        description: postData.description,
        content: postData.blocks,
        image: postData.cover.formats.medium.url || "",
        category: postData.category?.name || null,
        date: postData.updatedAt,
        keytakes: postData.keytakes,
        author: {
            name: postData.author.name || "Unknown",
            image: postData.author.avatar.url || "",
        },
    };
    // Tip: uncomment to inspect block structure during development
    // console.log(post.content);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 lg:px-0">
            {/* Category */}
            {post.category && (
                <p className={`inline-block px-3 py-1 rounded-full text-sm ${getRandomColor()} font-semibold mb-2`}>{post.category}</p>
            )}

            {/* Title */}
            <h1 className="text-5xl font-bold my-5 text-foreground">{post.title.toLowerCase().split(/\s+/).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>

            {/* Author & Date */}
            <div className="flex items-center gap-3 my-8">
                {post.author.image && (
                    // Using Next's Image for the author avatar provides
                    // automatic optimization and better layout shifting.
                    <Image
                        src={`${STRAPI_URL}${post.author.image}`}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="rounded-full"
                    />
                )}
                <div className="text-sm text-muted-foreground">
                    <p>{post.author.name}</p>
                    <p>{formatDateTime(post.date)}</p>
                </div>
            </div>

            {/* Key takeways */}

            {post.keytakes && post.keytakes.length > 0 && (
                <div className="my-10 p-4">
                    <h1 className="font-semibold mb-8 text-xl">Key Takeaways</h1>
                    <div className="list-disc prose prose-neutral text-foreground text-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.keytakes || ""}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {/* Main Image */}
            {post.image && (
                <div className="mb-8">
                    {/*
                        Cover image: using Next's Image component for automatic
                        optimization and better performance. Ensure the domain
                        is allowed in next.config.js.
                    */}
                    <Image
                        src={`${STRAPI_URL}${post.image}`}
                        alt={post.title}
                        width={800}
                        height={400}
                        loading="lazy"
                        className="w-full h-auto rounded-2xl"
                    />
                </div>
            )}

            {/* Content: the BlocksRenderer handles different structured blocks
                (rich text, media, tables, charts, code blocks, etc.) */}
            <div className="prose prose-lg max-w-none text-foreground
                prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl
                prose-p:text-foreground/80 prose-p:leading-loose prose-p:text-lg prose-li:ml-6 prose-li:mb-2
                prose-code:bg-muted prose-code:px-1 prose-code:rounded">
                <BlocksRenderer blocks={post.content} />
            </div>
        </div>
    );
}