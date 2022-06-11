export const getStrapiURL = (path = "") => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://arcadiaadmin.grahamwebworks.com/api"}${path}`;   
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }