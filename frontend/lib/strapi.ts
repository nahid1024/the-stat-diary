// lib/strapi.ts
export const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";



export async function getPosts(filterBy: string, filterString: string) {
    let finalUrl = "";
    if (filterBy === "all") {
        finalUrl = `${STRAPI_URL}/api/articles?populate[author][populate]=avatar&populate[category]=true&populate[cover]=true`;
    } else if (filterBy === "category") {
        finalUrl = `${STRAPI_URL}/api/articles?filters[category][slug][$eq]=${filterString}&populate[author][populate]=avatar&populate[category]=true&populate[cover]=true`;
    } else {
        return null
    }
    console.log(finalUrl)
    const res = await fetch(finalUrl, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.data; // Strapi returns { data, meta }
}

export async function getPostBySlug(slug: string, status: "draft" | "published") {
    const finalUrl = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate[author][populate]=avatar&populate[cover]=true&populate[category]=true&populate[blocks][on][shared.rich-text][populate]=true&populate[blocks][on][shared.media][populate]=file&populate[blocks][on][shared.code-block][populate]=true&populate[blocks][on][shared.table][populate]=true&populate[blocks][on][shared.charts][populate]=true&pagination[pageSize]=10&pagination[page]=1&status=${status}&locale[0]=en`;
    const res = await fetch(finalUrl, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.data[0]; // first match
}

export async function getCategories() {
    const finalUrl = `${STRAPI_URL}/api/categories`;
    const res = await fetch(finalUrl, { next: { revalidate: 60 } });
    const data = await res.json();
    return data.data; // Strapi returns { data, meta }
}
