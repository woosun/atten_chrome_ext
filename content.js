
// 1초마다 실행하는 작업 수행
function executeBackgroundTask() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // 콘텐츠 스크립트에 메시지를 보내어 Gather.Town에서 사용자 목록을 가져오도록 지시
    chrome.tabs.sendMessage(tabs[0].id, { action: 'executeContentScriptTask' });
  });
}

// Content script에서 메시지를 받으면 Gather.Town에서 사용자 목록을 가져와서 서버로 전송
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'executeContentScriptTask') {
    const user_list = gatherTownTask(); // gatherTownTask는 content.js에 정의되어야 함
    sendResponse({ user_list });
  }
});

// Background에서 실행될 때 초기화 작업 수행
chrome.runtime.onInstalled.addListener(() => {
  // 초기화 및 설정
  executePeriodicTask();
});

// Gather.Town에서 사용자 목록 가져오는 작업
function gatherTownTask() {
  const lis = document.querySelectorAll(".css-71796n");
  const user_list = Array.from(lis).map(li => li.innerText);
  return user_list;
}
