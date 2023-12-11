chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");

  // 1초마다 작업을 수행하는 함수 호출
  setInterval(doPeriodicTask, 1000);
});

function doPeriodicTask() {
  // 1초마다 실행되는 작업
  console.log("Periodic task executed.");
}

chrome.action && chrome.action.onClicked.addListener((tab) => {
  const currentUrl = tab.url;
  if (isAllowedDomain(currentUrl)) {
    fetchData(tab);
  } else {
    console.log("This site is not allowed.");
  }
});

function isAllowedDomain(url) {
  return url.startsWith("https://app.gather.town/");
}

function fetchData(tab) {
  console.log("Fetching data from the allowed domain:", tab.url);
}
