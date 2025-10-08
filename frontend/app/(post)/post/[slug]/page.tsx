// app/posts/[slug]/page.tsx
import Image from "next/image";
import BlocksRenderer from "@/components/blockRenderer";
import { getPostBySlug, STRAPI_URL } from "@/lib/strapi";
import { draftMode } from "next/headers";

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
        category: postData.category.name,
        date: postData.createdAt,
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
            <p className="text-sm text-blue-600 font-semibold mb-2">{post.category}</p>

            {/* Title */}
            <h1 className="text-5xl font-bold mb-4 text-gray-800">{post.title}</h1>

            {/* Author & Date */}
            <div className="flex items-center gap-3 mb-8">
                {post.author.image && (
                    // Using Next's Image for the author avatar provides
                    // automatic optimization and better layout shifting.
                    <Image
                        src={`${STRAPI_URL}${post.author.image}`}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                )}
                <div className="text-sm text-gray-600">
                    <p>{post.author.name}</p>
                    <p>{post.date}</p>
                </div>
            </div>

            {/* Main Image */}
            {post.image && (
                <div className="mb-8">
                    {/*
                        This `<img>` is intentionally simple, but Next recommends
                        using `next/image` for performance. If you switch to
                        `Image`, be sure to update allowed domains in next.config.
                    */}
                    <img
                        src={`${STRAPI_URL}${post.image}`}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full h-auto rounded-2xl"
                    />
                </div>
            )}

            {/* Content: the BlocksRenderer handles different structured blocks
                (rich text, media, tables, charts, code blocks, etc.) */}
            <div className="prose prose-lg max-w-none text-gray-800
                      prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl
                      prose-p:text-gray-700 prose-li:ml-6 prose-li:mb-2
                      prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
                <BlocksRenderer blocks={post.content} />
            </div>
        </div>
    );
}