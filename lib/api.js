import { keepEventsCurrent, compareAndSortDates } from "./events";

const qs = require("qs");

export const getStrapiURL = (path = "") => {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    "https://arcadiaadmin.grahamwebworks.com/api"
  }${path}`;
};

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getSortedEventsData() {
  const eventQuery = qs.stringify({
    filters: {
      endDate: {
        $gte: new Date().toISOString(),
      },
    },
    populate: "deep",
  });

  const wrappedEventsData = await fetchAPI(`/events?${eventQuery}`);

  const eventsData = wrappedEventsData.data;

  keepEventsCurrent(eventsData);
  eventsData.sort(compareAndSortDates);

  if (eventsData == null || eventsData.length === 0) {
    return null;
  }

  return eventsData;
}

export async function getAllEventsSlugs() {
  const response = await fetchAPI(
    `/events?endDate_gte=${new Date().toISOString()}`
  );

  return response.data.map((event) => {
    return {
      params: {
        slug: event.attributes.Slug,
      },
    };
  });
}

export async function getEventData(slug) {
  const query = qs.stringify({
    filters: {
      Slug: {
        $eq: slug,
      },
    },
    populate: "deep",
  });

  const eventData = await fetchAPI(`/events?${query}`);

  // make sure we found something, otherwise return null
  if (eventData == null || eventData.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return eventData.data[0];
}

export async function getAllNewsSlugs() {
  const response = await fetchAPI(`/articles`);

  return response.data.map((article) => {
    return {
      params: {
        slug: article.attributes.slug,
      },
    };
  });
}

export async function getNewsData(slug) {
  const query = qs.stringify({
    filters: {
      Slug: {
        $eq: slug,
      },
    },
    populate: "deep",
  });

  const newsData = await fetchAPI(`/articles?${query}`);

  // make sure we found something, otherwise return null
  if (newsData == null || newsData.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return newsData.data[0];
}
