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

    const copyBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    copyBtn.innerText = "copy";
    deleteBtn.innerText = "delete";
    copyBtn.onclick = (event) => {
      navigator.clipboard.writeText(data);
    };
    deleteBtn.onclick = (event) => {};

    textColumn.innerText = data;
    actionColumn.appendChild(copyBtn);

    tableRow.appendChild(textColumn);
    tableRow.appendChild(actionColumn);

    return tableRow;
  };

  resetBtn.addEventListener("click", (event) => {
    chrome.storage.local.clear();
  });

  chrome.storage.local.get(storageKeys.clipboards, function (res) {
    if (res && res.clipboards) {
      res.clipboards.forEach((clipboard) => {
        tableBody.appendChild(getTableRowElement(clipboard));
      });
    }
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log(changes, namespace);
  });
})(chrome);
