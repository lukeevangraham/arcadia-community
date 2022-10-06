export function keepEventsCurrent(eventsData) {

  // ITERATING OVER RECURRING EVENTS TO KEEP THEM CURRENT
  eventsData.forEach((event) => {

    if (event.attributes.repeatsEveryXDays > 0) {
      if (new Date(event.attributes.startDate) < new Date()) {
        // console.log("startDate: ", event.attributes.startDate);
        // console.log("startDateJS: ", new Date(event.attributes.startDate));

        let start = new Date(event.attributes.startDate);
        // console.log("[event.attributessFIRST]: ", start)
        // console.log("[event.attributessSECOND]: ", start.toISOString())

        // MAKING SURE THE END DATE HONORS THE TIMEZONE
        let end = new Date(new Date().toISOString());

        // console.log("END: ", end);

        while (start < end) {
          start.setDate(start.getDate() + event.attributes.repeatsEveryXDays);
        }

        // start.setTime(start.getTime() + (-1 * 60 * 60 * 1000));

        event.attributes.startDate = start.toISOString();
        // console.log("[eventsTHIRD]: ", start.toISOString());
        // console.log("NEW Start date: ", event.startDate);
      }
    }
  });
  return eventsData;
}

// SORT EVENTS BY DATE FIELD
export function compareAndSortDates(a, b) {
  const dateA = new Date(a.attributes.startDate);
  const dateB = new Date(b.attributes.startDate);

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
}
