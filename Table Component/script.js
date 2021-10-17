//create some global variables
//test case:1
const url = "http://dummy.restapiexample.com/api/v1/employees";
const arr = [];

// // test case:2
// const url = false;
// const arr = [
//   {
//     id: 1,
//     employee_name: "Tiger Nixon",
//     employee_salary: 320800,
//     employee_age: 61,
//     profile_image: "",
//   },
//   {
//     id: 2,
//     employee_name: "Garrett Winters",
//     employee_salary: 170750,
//     employee_age: 63,
//     profile_image: "",
//   },
//   {
//     id: 3,
//     employee_name: "Ashton Cox",
//     employee_salary: 86000,
//     employee_age: 66,
//     profile_image: "",
//   },
//   {
//     id: 4,
//     employee_name: "Cedric Kelly",
//     employee_salary: 433060,
//     employee_age: 22,
//     profile_image: "",
//   },
//   {
//     id: 5,
//     employee_name: "Airi Satou",
//     employee_salary: 162700,
//     employee_age: 33,
//     profile_image: "",
//   },
// ]; //to store table data

/*create global variables for table Data input*/

const headerItem = ["Id", "Employee_Name", "Employee_Salary", "Employee_Age"]; //to set number of columns

let headCount = headerItem.length;

/*table component Functions*/

function generate_table() {
  tableData(url, arr, headCount, headerItem);
}

function tableData(url, arr, headCount, headerItem) {
  let body = document.querySelector(".table-wrapper");

  let tbl = document.createElement("table");

  if (url) {
    let blob = fetchData(url);
    blob.then((data) => {
      arr.push(...data.data);

      if (!arr.length) {
        alert("error detacted");
      } else if (arr.length) {
        //head function
        let headFunc = tableHeader(headCount, headerItem);
        tbl.appendChild(headFunc);

        //body function
        let bodyFunc = tableBody(arr);
        tbl.appendChild(bodyFunc);

        body.appendChild(tbl);
        console.log(tbl);
        tbl.setAttribute("contenteditable", "true");
        tbl.setAttribute("class", "table");
        tbl.setAttribute("id", "resizeMe");
        body.appendChild(tbl);
        reiser();
      }
    });
  } else if (!url && arr) {
  /* To get print data from an array without fetching Api data*/
    if (!arr.length) {
      alert("error detacted no data to show");
    } else if (arr.length) {
      //head function
      let headFunc = tableHeader(headCount, headerItem);
      tbl.appendChild(headFunc);

      //body function
      let bodyFunc = tableBody(arr);
      tbl.appendChild(bodyFunc);

      body.appendChild(tbl);
      tbl.setAttribute("contenteditable", "true");
      tbl.setAttribute("class", "table");
      tbl.setAttribute("id", "resizeMe");
      reiser();
    }
  }
}
///////////////////////////////////////////////////////////////////////////

//function to fetch data through api

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    alert(`Status: "${response.status}"
StatusText: "${response.statusText}"`);
  }
  const result = await response.json();
  //console.log("result resolved");

  return result;
}

////////////////////////////////////
// table header function

function tableHeader(headCount, headerItem) {
  // Creating header
  let tblHead = document.createElement("thead");

  // creates a head row
  let headRow = document.createElement("tr");

  for (let j = 0; j < headCount; j++) {
    // Create a <th> element and a text node, make the text
    // node the contents of the <th>
    let headCell = document.createElement("th");
    let headCellText = document.createTextNode(headerItem[j]);
    headCell.appendChild(headCellText);
    headCell.setAttribute("class", "th");

    headRow.appendChild(headCell);
    headRow.setAttribute("class", "th-row");
  }

  tblHead.appendChild(headRow);
  tblHead.setAttribute("class", "th-head");

  return tblHead;
}

/////////////////////////////////////
//table body function

function tableBody(arr) {
  let tblBody = document.createElement("tbody");

  //creating table data
  //create a row
  arr.forEach((itemData) => {
    let row = document.createElement("tr");
    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at at end.

    for (const keys in itemData) {
      if (itemData[keys]) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(itemData[keys]);
        cell.appendChild(cellText);
        cell.setAttribute("class", "td");
        row.appendChild(cell);
        row.setAttribute("class", "tr");
      }
    }
    tblBody.appendChild(row);
    tblBody.setAttribute("class", "tb");
  });
  return tblBody;
}

//////////////////////////////////////
/*Resizer Function for table column*/

function reiser() {
  console.log("insidethe function");
  // Query the table
  const table = document.querySelector(".table");

  // Query all headers
  const cols = table.querySelectorAll("th");

  // Loop over them
  [].forEach.call(cols, function (col) {
    // Create a resizer element
    const resizer = document.createElement("div");
    resizer.classList.add("resizer");

    // Set the height
    resizer.style.height = `${table.offsetHeight}px`;

    // Add a resizer element to the column
    col.appendChild(resizer);

    // Will be implemented in the next section
    createResizableColumn(col, resizer);
  });

  function createResizableColumn(col, resizer) {
    // Track the current position of mouse
    let x = 0;
    let w = 0;

    const mouseDownHandler = function (e) {
      // Get the current mouse position
      x = e.clientX;

      // Calculate the current width of column
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      // Attach listeners for document's events
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // Determine how far the mouse has been moved
      const dx = e.clientX - x;

      // Update the width of column
      col.style.width = `${w + dx}px`;
    };

    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    resizer.addEventListener("mousedown", mouseDownHandler);
  }
  const mouseDownHandler = function (e) {
    resizer.classList.add("resizing");
  };

  const mouseUpHandler = function () {
    resizer.classList.remove("resizing");
  };
}
