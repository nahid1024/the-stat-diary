import Link from "next/link";
import { getRandomColor } from "@/lib/randomBadgeColor";
import { AllPostProps } from "@/lib/types";
import { STRAPI_URL } from "@/lib/strapi";
import Image from "next/image";


interface CardsProps {
  // `OtherPosts` is an array of post objects returned from Strapi.
  OtherPosts: AllPostProps[];
}

/**
 * Cards
 *
 * Server component that renders a responsive grid/list of post cards.
 *
 * Inputs:
 * - OtherPosts: an array of posts with nested author, category and cover
 *
 * Behavior/notes:
 * - This component is async (Next.js server component) which allows
 *   awaiting data if needed in the future.
 * - Uses `getRandomColor()` to pick a Tailwind badge color class for
 *   each post category. That function should return a valid class name
 *   such as `bg-red-200` or similar.
 * - Images are rendered with an absolute URL built from `strapiUrl` +
 *   the path stored in the post object. Ensure the Strapi media URLs
 *   are available from the configured host.
 */
export default async function Cards({ OtherPosts }: CardsProps) {

  // Defensive check: if there are no posts, render an informative message.
  // This avoids rendering an empty list and makes the UI explicit.
  if (!OtherPosts || OtherPosts.length === 0) {
    return <div className="text-gray-800">No posts available.</div>;
  }


  // Render the list of cards. Each card links to the post's page using
  // Next.js `Link` which enables client-side navigation.
  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Container for the other posts */}
      <div className="flex flex-wrap gap-6">
        {OtherPosts.map((post: AllPostProps) => (

          // Each card is a Link to the post detail page. `key` should be
          // unique — post.id is used here.
          <Link
            href={`/post/${post.slug}`}
            key={post.id}
            className="flex-1 min-w-[280px] max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
          >
            <div>
              {/* Post cover image. We use the 'medium' format provided by Strapi */}
              <Image
                src={post.cover.formats.medium.url.startsWith("http") ? post.cover.formats.medium.url : `${STRAPI_URL}${post.cover.formats.medium.url}`}
                alt={post.title}
                className="w-full h-48 object-cover"
                width={400}
                height={350}
              />

              {/* Card body: category badge, title, description, and author */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  {/* Category badge. `getRandomColor()` returns a Tailwind color class */}
                  {(post.category) && (
                    <span
                      className={`inline-block ${getRandomColor()} text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3`}
                    >
                      {post.category.name}
                    </span>
                  )}

                  {/* Post title */}
                  <h3 className="text-lg font-semibold mt-1 text-[#214E4E]">
                    {post.title}
                  </h3>

                  {/* Short description/excerpt */}
                  <p className="text-gray-600 mt-2 text-sm">{post.description}</p>
                </div>

                {/* Author section: avatar + name */}
                <div className="flex items-center gap-3 mt-6">
                  <Image
                    src={post.author.avatar.formats.small.url.startsWith("http") ? post.author.avatar.formats.small.url : `${STRAPI_URL}${post.author.avatar.formats.small.url}`}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                    width={32}
                    height={32}
                  />
                  <span className="text-sm text-gray-700">By {post.author.name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}