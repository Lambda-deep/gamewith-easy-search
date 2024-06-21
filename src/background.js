chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "searchGameWith",
        title: "サイト内検索: %s",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchGameWith") {
        const query = encodeURIComponent(info.selectionText);
        chrome.storage.sync.get({ resultCount: 10 }, (items) => {
            const url = `https://gamewith.jp/kuronekowiz/search/results?query=${query}&count=${items.resultCount}`;
            chrome.tabs.create({ url });
        });
    }
});
