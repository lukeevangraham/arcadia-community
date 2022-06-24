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
