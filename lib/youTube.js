export const sermonYouTubeOptions = async (playlistId) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&maxResults=3&key=${process.env.GOOGLE_KEY}`,
    requestOptions
  );

  const data = await response.json();

  let parsedData = data.items.map((sermon) => {
    sermon.parsedDate = new Date(
      sermon.snippet.description
        .split("Arcadia Community Church\n")[1]
        .split("\n")[0]
    ).toLocaleDateString("en-US");
    sermon.speaker = sermon.snippet.description
      .split("Speaker: ")[1]
      .split("\n")[0];
    sermon.title = sermon.snippet.title.split(": ")[1];

    return sermon;
  });

  return parsedData;
};

export const streamYouTubeOptions = async (playlistId) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&maxResults=10&key=${process.env.GOOGLE_KEY}`,
    requestOptions
  );

  const data = await response.json();

  let mostRecentVideo = pickYouTubeVideoToDisplay(data);

  return mostRecentVideo;
};

const pickYouTubeVideoToDisplay = (data) => {
  let mostRecentStream = null;

  // Filter out deleted videos
  const trimmedData = data.items.filter(
    (video) => video.snippet.title !== "Deleted video"
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
      `${initialDateParse.year}-${initialDateParse.month}-${initialDateParse.day}`
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
