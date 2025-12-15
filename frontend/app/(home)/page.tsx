import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import Cards from "@/components/cards";
import { getPosts, STRAPI_URL } from "@/lib/strapi";
import formatDateTime from "@/lib/formatDateTime";
/**
 * Home
 *
 * Server component for the home page. It requests posts from the CMS
 * and renders a featured post (first one) followed by other cards.
 *
 * Notes:
 * - `getPosts('all', '')` is called to fetch all posts; the helper
 *   controls how the API is queried. The returned `posts` array is
 *   expected to contain at least one item for the featured card.
 * - This file currently uses raw `<img>` tags for images. Next.js
 *   recommends using `next/image` for automatic optimization.
 * - The code assumes nested fields (author avatar formats, cover
 *   formats) exist — consider adding guards or optional chaining
 *   if the CMS data may omit those fields.
 */
export default async function Home() {
	// Fetch posts from Strapi (or the helper). This runs on the server.
	const posts = await getPosts("all", "");
	const cover_url = posts[0].cover.formats.medium.url.startsWith("http") ? posts[0].cover.formats.medium.url : `${STRAPI_URL}${posts[0].cover.formats.medium.url}`;


	// NOTE: we assume at least one post exists. If your dataset may be
	// empty, add a defensive check here and render a friendly message.
	// e.g. if (!posts || posts.length === 0) return <p>No posts yet</p>;

	return (
		<>

			<main className="min-h-screen text-foreground">
				{/* Blog Section */}
				<section className="max-w-6xl mx-auto px-6 py-12">

					{/* Cards */}
					<div className="flex flex-col gap-6 mb-15 mt-5">
						{/* Featured card (first post) - uses posts[0]. This block assumes
              posts[0] exists and contains nested fields like category,
              author.avatar.formats.small.url and cover.formats.medium.url. */}
						<Link href={`/post/${posts[0].slug}`}>
							<div className="flex flex-col-reverse md:flex-row overflow-hidden bg-card md:bg-background">
								{/* Text Section */}
								<div className="pr-20 flex flex-col justify-center lg:w-1/2">
									{/* Post date */}
									<div className="text-sm text-muted-foreground">
										<p>{formatDateTime(posts[0].updatedAt)}</p>
									</div>
									{/* Post title */}
									<h2 className="text-lg md:text-[40px] font-semibold mt-2 text-primary">
										{posts[0].title.split(/\s+/).map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
									</h2>
									{/* Read more Button */}
									<div>
										<button type="button" className="outline-none border-none px-7 py-3 mt-10 bg-primary text-primary-foreground rounded-full">Read More</button>
									</div>

								</div>

								{/* Image Section */}
								<div className="lg:w-1/2">
									{/*
                  Cover image: the `medium` format is used here. For better
                  performance and automatic optimization replace this with
                  `next/image` and configure allowed domains in next.config.
                */}
									<Image
										src={cover_url}
										alt={posts[0].title}
										className="w-full h-48 md:h-100 object-cover rounded-4xl"
										width={posts[0].cover.formats.medium.width}
										height={posts[0].cover.formats.medium.height}
										loading="lazy"
									/>
								</div>
							</div>
						</Link>
					</div>
					<h1 className="text-2xl font-semibold text-primary mb-6">Read By Topic</h1>
					{/* Categories */}
					<CategoryFilter />
					{/* Other Cards */}
					<Cards OtherPosts={posts.slice(1)} />
				</section>
			</main>
		</>
	);
}
