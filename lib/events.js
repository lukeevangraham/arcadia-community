export function keepEventsCurrent(eventsData) {
    // ITERATING OVER RECURRING EVENTS TO KEEP THEM CURRENT
    eventsData.forEach((event) => {
      if (event.repeatsEveryDays > 0) {
        if (new Date(event.startDate) < new Date()) {
          // console.log("startDate: ", event.startDate);
          // console.log("startDateJS: ", new Date(event.startDate));
  
          let start = new Date(event.startDate);
          // console.log("[eventsFIRST]: ", start)
          // console.log("[eventsSECOND]: ", start.toISOString())
          
          // MAKING SURE THE END DATE HONORS THE TIMEZONE
          let end = new Date(new Date().toISOString());
          
          // console.log("END: ", end);
          
          while (start < end) {
            start.setDate(start.getDate() + event.repeatsEveryDays);
          }
          
          // start.setTime(start.getTime() + (-1 * 60 * 60 * 1000));
          
          event.startDate = start.toISOString();
          console.log("[eventsTHIRD]: ", start.toISOString())
          // console.log("NEW Start date: ", event.startDate);
        }
      }
    });
    return eventsData;
  }
  
  // SORT EVENTS BY DATE FIELD
  export function compareAndSortDates(a, b) {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
  
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }
  