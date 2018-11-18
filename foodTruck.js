const prompt = require('prompt');
const axios = require('axios');
const table = require('easy-table');

let dayOfWeek;
let time;
let start = 0;
let limit = 10;



function getDate() {
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"
  ];

  const date = () => {
    let today = new Date();
    let day = today.getDay();
    let hr = today.getHours();
    let min = today.getMinutes();

    dayOfWeek = daysOfWeek[day];
    time = `${hr}:${min}`;

  }
  return date();
}

// GET request for all food trucks
function getAllFoodTrucks() {
  const URL = 'https://data.sfgov.org/resource/bbb8-hzi6.json?';

  axios.get(URL, {
    params: {
      $order: 'applicant ASC',
      $offset: 1000,
      $select: 'applicant, location, dayofweekstr, start24, end24',
    }
  })

  .then((response) => {
    const results = response.data;

    isOpen(results);

    return results;
  })
  .catch((error) => {
    console.log('Error:', error.message);
  });
}

// helper to determine which food trucks are open
// filter response to only return open trucks based on day of week and time
function isOpen(results) {
  const openTrucks = results.filter(result => result.dayofweekstr === dayOfWeek && result.start24 < time && result.end24 > time);

  if (openTrucks.length) {
    console.log(`There are ${openTrucks.length} food trucks open right now`);

    createTable(openTrucks.slice(start, limit));
    if (openTrucks.length < limit) {
      console.log(`Viewing all results`);
    } else {
      console.log(`Viewing results ${start + 1} to ${limit}`);
    }
  } else {
    console.log('There are no open food trucks right now');
  }


  if (openTrucks.length > limit ) {
    moreResults(openTrucks)
  }
  return openTrucks;
}

function createTable(openTrucks) {
  let data = openTrucks;

  const tableFormat = new table;

  data.forEach(function(foodTruck) {
    tableFormat.cell('NAME', foodTruck.applicant);
    tableFormat.cell('ADDRESS', foodTruck.location);
    tableFormat.newRow();
  })
  console.log(tableFormat.toString());
}


function moreResults(openTrucks) {
  let resLength = openTrucks.length;

  resLength -= limit;
  let property = {
    name: 'yesno',
    message: 'Want more results?',
    validator: /y[es]*|n[o]?/,
    warning: 'Must respond yes or no',
    // default: 'no'
  };

  prompt.get(property, function(error, result) {
    while (result.yesno === 'yes') {
      start = limit;
      limit = limit += 10;

      createTable(openTrucks.slice(start,limit));
      console.log(`Viewing results ${start + 1} to ${limit}`);

      resLength -= limit;

      if (resLength > 0) {
        moreResults(openTrucks);
      }
      return openTrucks.slice(start, limit);
    }
  });
}


  async function foodTrucksOpenNow() {
    getDate();
    getAllFoodTrucks();
    console.log(dayOfWeek);
    console.log(time);
    prompt.start();
  }

  foodTrucksOpenNow();
