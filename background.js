// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    // 현재 탭의 URL을 가져옴
    const currentUrl = tab.url;
  
    // 작동을 허용한 도메인인지 확인
    if (isAllowedDomain(currentUrl)) {
      // 도메인이 허용된 경우 작업 수행
      fetchData(tab);
    } else {
      console.log("This site is not allowed.");
    }
  });
  
  function isAllowedDomain(url) {
    // 여기에서 도메인을 확인하는 로직을 작성
    // 예를 들어, "https://specific-site.com"인지 확인
    return url.startsWith("https://specific-site.com");
  }
  
  function fetchData(tab) {
    // 허용된 도메인에서만 데이터를 가져오고 작업을 수행하는 로직 작성
    console.log("Fetching data from the allowed domain:", tab.url);
  
    // Ajax 또는 다른 작업 수행
  }
  