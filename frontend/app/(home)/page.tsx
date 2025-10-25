import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import Cards from "@/components/cards";
import { getRandomColor } from "@/lib/randomBadgeColor";
import { getPosts, STRAPI_URL } from "@/lib/strapi";
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

	// NOTE: we assume at least one post exists. If your dataset may be
	// empty, add a defensive check here and render a friendly message.
	// e.g. if (!posts || posts.length === 0) return <p>No posts yet</p>;

	return (
		<main className="min-h-screen text-gray-900">
			{/* Blog Section */}
			<section className="max-w-6xl mx-auto px-6 py-12">
				<h1 className="text-4xl font-bold mb-6">Blog</h1>

				{/* Categories */}
				<CategoryFilter />

				{/* Cards */}
				<div className="flex flex-col gap-6">
					{/* Featured card (first post) - uses posts[0]. This block assumes
              posts[0] exists and contains nested fields like category,
              author.avatar.formats.small.url and cover.formats.medium.url. */}
					<Link href={`/post/${posts[0].slug}`}>
						<div className="flex flex-col-reverse md:flex-row rounded-2xl overflow-hidden shadow-lg bg-white md:bg-[#214E4E]">
							{/* Text Section */}
							<div className="p-6 flex flex-col justify-center lg:w-1/2">
								{/* Category badge with a random color class */}
								<span
									className={`inline-block ${getRandomColor()} text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3`}
								>
									{posts[0].category.name}
								</span>
								<h2 className="text-lg md:text-2xl font-bold mt-2 text-[#214E4E] md:text-[#ededed]">
									{posts[0].title}
								</h2>
								<p className="text-gray-600 md:text-gray-300 mt-2">
									{posts[0].description}
								</p>

								{/* Author */}
								<div className="flex items-center gap-3 mt-6">
									{/*
                    Avatar: uses the small format from Strapi. Consider using
                    `next/image` for avatars as well, or add optional chaining
                    if `author.avatar.formats.small.url` may be missing.
                  */}
									<Image
										src={`${STRAPI_URL}${posts[0].author.avatar.formats.small.url}`}
										alt={posts[0].author.name}
										className="w-10 h-10 rounded-full object-cover"
										width={posts[0].author.avatar.formats.small.width}
										height={posts[0].author.avatar.formats.small.height}
										loading="lazy"
									/>
									<span className="text-sm text-gray-700 md:text-gray-300">
										By {posts[0].author.name}
									</span>
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
									src={`${STRAPI_URL}${posts[0].cover.formats.medium.url}`}
									alt={posts[0].title}
									className="w-full h-48 md:h-100 object-cover"
									width={posts[0].cover.formats.medium.width}
									height={posts[0].cover.formats.medium.height}
									loading="lazy"
								/>
							</div>
						</div>
					</Link>
				</div>
				{/* Other Cards */}
				<Cards OtherPosts={posts.slice(1)} />
			</section>
		</main>
	);
}
