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

export async function getAllMinistriesSlugs() {
  const response = await fetchAPI(`/ministries`);

  return response.data.map((ministry) => {
    return {
      params: {
        slug: ministry.attributes.Slug,
      },
    };
  });
}

export async function getMinistryData(slug) {
  const query = qs.stringify({
    filters: {
      Slug: {
        $eq: slug,
      },
    },
    // populate: "deep",
    populate: {
      articles: {
        sort: ["dateline:desc"],
        populate: { image: "*" },
      },
      events: {
        sort: ["endDate:desc"],
        populate: { image: "*" },
      },
      leaderPhoto: "*",
      contentSections: {
        populate: "*",
      },
      primaryPhoto: "*",
    },
  });

  const ministryData = await fetchAPI(`/ministries?${query}`);

  // make sure we found something, otherwise return null
  if (ministryData == null || ministryData.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return ministryData.data[0];
}

export async function getAllPageSlugs() {
  const response = await fetchAPI("/pages");

  return response.data.map((page) => {
    return {
      params: {
        slug: page.attributes.slug,
      },
    };
  });
}

export async function getPageData(slug) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "deep",
  });

  const pageData = await fetchAPI(`/pages?${query}`);

  if (pageData.data == null || pageData.data.length === 0) {
    return null;
  }

  return pageData.data[0];
}

export async function getAllJobSlugs() {
  const response = await fetchAPI("/job-openings");

  return response.data.map((job) => {
    return {
      params: {
        slug: job.attributes.slug,
      },
    };
  });
}

export async function getJobData(slug) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: "deep",
  });

  const jobData = await fetchAPI(`/job-openings?${query}`);

  if (jobData.data == null || jobData.data.length === 0) {
    return null;
  }

  return jobData.data[0];
}
