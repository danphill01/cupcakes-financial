


const handleFiles = (input) => {
  const setupReader = (file) => {
    let weeklyRevenueTotal = {};
    let monthlyRevenueTotal = {};
    let yearlyRevenueTotal = {};
    const reader = new FileReader();
    reader.onload = (event) => {
      text = event.target.result;
      let unitPrice;
      switch (file.name) {
        case "Basic.txt":
          unitPrice = 5;
          break;
        case "Delux.txt":
          unitPrice = 6;
          break;
        case "Total.txt":
          unitPrice = 1;
          break;
        default:
      };
        const allLines = text.split(/\r?\n/);
      // Reading line by line
      // TODO - check first line of file matches expected filename
      // TODO - check totals against total file.
      allLines.slice(1).forEach((line, index) => {
        const date = moment().subtract(allLines.length - (index + 2), 'days');
        const dailyRevenue = unitPrice * parseFloat(line);
        const weekDateString = 'w' + date.format('Y-WW');
        const monthDateString = 'm' + date.format('Y-MM');
        const yearDateString = 'y' + date.format('Y');
        // handle weekly revenue
        if (weeklyRevenueTotal.hasOwnProperty(weekDateString)) {
          weeklyRevenueTotal[weekDateString] += dailyRevenue;
        } else {
          weeklyRevenueTotal[weekDateString] = dailyRevenue;
        }
        // handle monthly revenue
        if (monthlyRevenueTotal.hasOwnProperty(monthDateString)) {
          monthlyRevenueTotal[monthDateString] += dailyRevenue;
        } else {
          monthlyRevenueTotal[monthDateString] = dailyRevenue;
        }
        // handle yearly revenue
        if (yearlyRevenueTotal.hasOwnProperty(yearDateString)) {
          yearlyRevenueTotal[yearDateString] += dailyRevenue;
        } else {
          yearlyRevenueTotal[yearDateString] = dailyRevenue;
        }
      });
      console.log(file.name, JSON.stringify(weeklyRevenueTotal), JSON.stringify(monthlyRevenueTotal), JSON.stringify(yearlyRevenueTotal));
      switch (file.name) {
        case "Basic.txt":
          basicWeeklyRevenueTotal = { ...weeklyRevenueTotal };
          basicMonthlyRevenueTotal = { ...monthlyRevenueTotal };
          basicYearlyRevenueTotal = { ...yearlyRevenueTotal };
          break;
        case "Delux.txt":
          deluxWeeklyRevenueTotal = { ...weeklyRevenueTotal };
          deluxMonthlyRevenueTotal = { ...monthlyRevenueTotal };
          deluxYearlyRevenueTotal = { ...yearlyRevenueTotal };
          break;
        case "Total.txt":
          totalWeeklyRevenueTotal = { ...weeklyRevenueTotal };
          totalMonthlyRevenueTotal = { ...monthlyRevenueTotal };
          totalYearlyRevenueTotal = { ...yearlyRevenueTotal };
          break;
        default:
      };
    };

    reader.onerror = (event) => {
      alert(event.target.error.name);
    };

    reader.readAsText(file);

  };

  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  moment.defaultFormat = "YYYY-MM-DD";
  let basicWeeklyRevenueTotal = {};
  let basicMonthlyRevenueTotal = {};
  let basicYearlyRevenueTotal = {};
  let deluxWeeklyRevenueTotal = {};
  let deluxMonthlyRevenueTotal = {};
  let deluxYearlyRevenueTotal = {};
  let totalWeeklyRevenueTotal = {};
  let totalMonthlyRevenueTotal = {};
  let totalYearlyRevenueTotal = {};
  for (let i = 0; i < input.length; i++) {
    let result;
    switch (input[i].name) {
      case "Basic.txt":
        setupReader(input[i]);
        setTimeout(() => {
          Object.keys(basicWeeklyRevenueTotal).reverse().forEach(week => {
            attachTimePeriodElement('timePeriod', 'weekly', week);
            attachRevenueElement('basic', 'weekly', basicWeeklyRevenueTotal[week]);
          });
          Object.keys(basicMonthlyRevenueTotal).reverse().forEach(month => {
            attachTimePeriodElement('timePeriod', 'monthly', month);
            attachRevenueElement('basic', 'monthly', basicMonthlyRevenueTotal[month]);
          });
          Object.keys(basicYearlyRevenueTotal).reverse().forEach(year => {
            attachTimePeriodElement('timePeriod', 'yearly', year);
            attachRevenueElement('basic', 'yearly', basicYearlyRevenueTotal[year]);
          });
        }, 1000)
        break;
      case "Delux.txt":
        setupReader(input[i]);
        setTimeout(() => {
          Object.keys(deluxWeeklyRevenueTotal).reverse().forEach(week => {
            attachRevenueElement('delux', 'weekly', deluxWeeklyRevenueTotal[week]);
          });
          Object.keys(deluxMonthlyRevenueTotal).reverse().forEach(month => {
            attachRevenueElement('delux', 'monthly', deluxMonthlyRevenueTotal[month]);
          });
          Object.keys(deluxYearlyRevenueTotal).reverse().forEach(year => {
            attachRevenueElement('delux', 'yearly', deluxYearlyRevenueTotal[year]);
          });
        }, 1000)
        break;
      case "Total.txt":
        setupReader(input[i]);
        setTimeout(() => {
          Object.keys(totalWeeklyRevenueTotal).reverse().forEach(week => {
            attachRevenueElement('total', 'weekly', totalWeeklyRevenueTotal[week]);
          });
          Object.keys(totalMonthlyRevenueTotal).reverse().forEach(month => {
            attachRevenueElement('total', 'monthly', totalMonthlyRevenueTotal[month]);
          });
          Object.keys(totalYearlyRevenueTotal).reverse().forEach(year => {
            attachRevenueElement('total', 'yearly', totalYearlyRevenueTotal[year]);
          });
        }, 1000)
        break;
    };
  }

  const attachTimePeriodElement = (type, timeUnit, timePeriod) => {
    let node = document.createElement('P')
    let textnode = document.createTextNode(`${timePeriod}`);
    node.appendChild(textnode);
    document.getElementById(timeUnit).getElementsByClassName(type)[0].appendChild(node);
  }

  const attachRevenueElement = (type, timeUnit, amount) => {
    let node = document.createElement('P')
    let textnode = document.createTextNode(`${accounting.formatMoney(amount)}`);
    node.appendChild(textnode);
    document.getElementById(timeUnit).getElementsByClassName(type)[0].appendChild(node);
  }


}
    // console.log(`
    //   today is ${moment().format()}
    //   this is week ${moment().format('Y-WW')}
    //   today's data is in line ${allLines.length-1} and the data is ${allLines[allLines.length-1]}
    //   yesterday's data is in line ${allLines.length-2} and the data is ${allLines[allLines.length-2]}
    //   yesterday's date was ${moment().subtract(1, 'days').format()}
    //   This week started on ${moment().week(moment().week()).weekday(0).format()}
    //   that was ${moment.duration(moment().diff(moment().week(moment().week()).weekday(0))).days()} days ago.
    //   Last week started on ${moment().week(moment().week()-1).weekday(0).format()}
    //   Line 1 contains data for ${moment().subtract(allLines.length-2, 'days').format()} and the data is ${allLines[allLines.length-(allLines.length-1)]}
    //   `);
