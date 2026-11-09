export const sermonYouTubeOptions = async (playlistId) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&maxResults=10&key=${process.env.GOOGLE_KEY}`,
      requestOptions,
    );

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.error("YouTube API Error or empty payload:", data);
      return [];
    }

    return data.items
      .filter((sermon) => {
        const title = sermon.snippet?.title || "";
        // Exclude deleted, private, or unavailable videos
        return (
          title !== "Deleted video" &&
          title !== "Private video" &&
          sermon.snippet?.description !== "This video is unavailable."
        );
      })
      .map((sermon) => {
        const description = sermon.snippet?.description || "";
        const rawTitle = sermon.snippet?.title || "Untitled Sermon";

        // 1. Safely parse date from description or fallback to publishedAt
        let parsedDate = sermon.snippet?.publishedAt;
        if (description.includes("Journey Community Church\n")) {
          const dateStr = description
            .split("Journey Community Church\n")[1]
            ?.split("\n")[0]
            ?.trim();
          const dateObj = new Date(dateStr);
          if (!isNaN(dateObj.getTime())) {
            parsedDate = dateObj.toLocaleDateString("en-US");
          }
        }

        // 2. Safely parse speaker or fallback
        let speaker = "Rev. John M. Scholte";
        if (description.includes("Speaker: ")) {
          const extractedSpeaker = description
            .split("Speaker: ")[1]
            ?.split("\n")[0]
            ?.trim();
          if (extractedSpeaker) {
            speaker = extractedSpeaker;
          }
        }

        // 3. Fallback to full title if ": " delimiter isn't present
        const titleParts = rawTitle.split(": ");
        const title =
          titleParts.length > 1 ? titleParts.slice(1).join(": ") : rawTitle;

        return {
          ...sermon,
          parsedDate,
          speaker,
          title,
        };
      });
  } catch (error) {
    console.error("Failed to fetch sermon YouTube options:", error);
    return [];
  }
};

export const streamYouTubeOptions = async (playlistId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&maxResults=10&key=${process.env.GOOGLE_KEY}`,
    requestOptions,
  );

  const data = await response.json();

  let mostRecentVideo = pickYouTubeVideoToDisplay(data);

  return mostRecentVideo;
};

const pickYouTubeVideoToDisplay = (data) => {
  let mostRecentStream = null;

  // Filter out deleted videos
  const trimmedData = data.items.filter(
    (video) => video.snippet.title !== "Deleted video",
  );

  // go through 10 most recent livestreams

  trimmedData.forEach((video) => {
    const startToGetDateInfoFromDescription = video.snippet.title.split("/");

    let initialDateParse = {
      month: startToGetDateInfoFromDescription[0].slice(-2),
      day: startToGetDateInfoFromDescription[1],
      year: startToGetDateInfoFromDescription[2]
        ? startToGetDateInfoFromDescription[2].substring(0, 4)
        : null,
    };
    video.parsedDate = new Date(
      `${initialDateParse.year}-${initialDateParse.month}-${initialDateParse.day}`,
    );

    // console.log("PD: ", video.parsedDate)
  });

  // SORT YOUTUBE RESULTS TO NEWEST IS FIRST
  trimmedData.sort((a, b) => {
    return new Date(b.parsedDate) - new Date(a.parsedDate);
  });

  trimmedData.forEach((video) => {
    // DOES THE STREAM HAPPEN TODAY??
    if (
      new Date(video.parsedDate).setHours(0, 0, 0, 0) ==
      new Date().setHours(0, 0, 0, 0)
    ) {
      mostRecentStream = video;
      return;
    }

    // IF THE STREAM HAPPENS BEFORE TODAY
    if (
      new Date(video.parsedDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    ) {
      if (mostRecentStream) {
        return;
      } else {
        mostRecentStream = video;
      }
    }
  });

  mostRecentStream.parsedDate = mostRecentStream.parsedDate.toString();

  return mostRecentStream;
};
