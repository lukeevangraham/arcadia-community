import { fetchAPI } from "./api";

const qs = require("qs");

export async function search(keyword) {
  const eventQuery = qs.stringify({
    filters: {
      $or: [
        {
          title: {
            $containsi: keyword,
          },
        },
        {
          description: {
            $containsi: keyword,
          },
        },
      ],
    },
    populate: "deep",
  });

  const articleQuery = qs.stringify({
    filters: {
      $or: [
        {
          title: {
            $containsi: keyword,
          },
        },
        {
          author: {
            $containsi: keyword,
          },
        },
        {
          body: {
            $containsi: keyword,
          },
        },
      ],
    },
    populate: "deep",
  });
  const ministryQuery = qs.stringify({
    filters: {
      $or: [
        {
          ministryName: {
            $containsi: keyword,
          },
        },
        {
          description: {
            $containsi: keyword,
          },
        },
      ],
    },
    populate: "deep",
  });

  const [eventData, articleData, ministryData] = await Promise.all([
    fetchAPI(`/events?${eventQuery}`),
    fetchAPI(`/articles?${articleQuery}`),
    fetchAPI(`/ministries?${ministryQuery}`),
  ]);

  return {
    eventData,
    articleData,
    ministryData,
  };
}
