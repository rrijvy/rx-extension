(function (chrome) {
  const storageKeys = {
    clipboards: "clipboards",
  };

  document.addEventListener("copy", function (e) {
    let existingClipboards = [];
    const selection = document.getSelection();
    const selectedText = selection.toString();

    try {
      const getClipboards = chrome.storage.local.get(storageKeys.clipboards);

      getClipboards.then((res) => {
        existingClipboards = res.clipboards;
        if (existingClipboards && Array.isArray(existingClipboards) && !existingClipboards.find((x) => x === selectedText)) {
          const newClipboards = [...existingClipboards, selectedText];
          console.log(newClipboards);
          chrome.storage.local.set({ [storageKeys.clipboards]: newClipboards });
        }
      });
    } catch (error) {
      console.log(selectedText);
      chrome.storage.local.set({ [storageKeys.clipboards]: [selectedText] });
    }

    e.preventDefault();
  });
})(chrome);
