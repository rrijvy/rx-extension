(function (chrome) {
  const storageKeys = {
    clipboards: "clipboards",
  };

  const tableBody = document.getElementById("table-body");
  const resetBtn = document.getElementById("reset-btn");

  const getTableRowElement = (data) => {
    const tableRow = document.createElement("tr");
    const textColumn = document.createElement("td");
    const actionColumn = document.createElement("td");

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "copy";
    buttonElement.onclick = (event) => {
      console.log(data);
      navigator.clipboard.writeText(data);
    };

    textColumn.innerText = data;
    actionColumn.appendChild(buttonElement);

    tableRow.appendChild(textColumn);
    tableRow.appendChild(actionColumn);

    return tableRow;
  };

  resetBtn.addEventListener("click", (event) => {
    chrome.storage.local.clear();
  });

  chrome.storage.local.get(storageKeys.clipboards, function (res) {
    if (res && res.clipboard) {
      res.clipboards.forEach((clipboard) => {
        tableBody.appendChild(getTableRowElement(clipboard));
      });
    }
  });
})(chrome);
