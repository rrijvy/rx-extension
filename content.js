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
        if (existingClipboards) {
          if (Array.isArray(existingClipboards) && !existingClipboards.find((x) => x === selectedText)) {
            const newClipboards = [...existingClipboards, selectedText];
            chrome.storage.local.set({ [storageKeys.clipboards]: newClipboards });
          }
        } else {
          chrome.storage.local.set({ [storageKeys.clipboards]: [selectedText] });
        }
      });
    } catch (error) {
      console.log(error);
      chrome.storage.local.set({ [storageKeys.clipboards]: [selectedText] });
    }
  });

  
  
})(chrome);
