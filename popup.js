// const clipboard = new ClipboardTable();

(function (chrome) {
  console.log(chrome);

  const storageKeys = {
    clipboards: "clipboards",
  };

  const tableBody = document.getElementById("table-body");
  const resetBtn = document.getElementById("reset-btn");

  const getTableRowElement = (data) => {
    const tableRow = document.createElement("tr");
    const textColumn = document.createElement("td");
    const actionColumn = document.createElement("td");
    actionColumn.classList.add("flex-row");

    const copyBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    copyBtn.innerText = "copy";
    deleteBtn.innerText = "delete";
    copyBtn.classList.add("m-5");
    deleteBtn.classList.add("m-5");

    copyBtn.onclick = (event) => {
      navigator.clipboard.writeText(data);
    };

    deleteBtn.onclick = (event) => {
      chrome.storage.local.get(storageKeys.clipboards, function (res) {
        if (res && res.clipboards) {
          var newClipboards = res.clipboards.filter((x) => x !== data);
          chrome.storage.local.set({ [storageKeys.clipboards]: [...newClipboards] });
        }
      });
    };

    textColumn.innerText = data;
    actionColumn.appendChild(copyBtn);
    actionColumn.appendChild(deleteBtn);

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
