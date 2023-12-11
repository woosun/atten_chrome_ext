function executePeriodicTask() {
  // 주기적으로 실행
  setInterval(() => {
    // 백그라운드 스크립트에 메시지를 보내어 Gather.Town에서 사용자 목록을 가져오도록 지시
    chrome.runtime.sendMessage({ action: 'executeBackgroundTask' });
  }, 1000);
}

// Background에서 실행될 때 초기화 작업 수행
chrome.runtime.onInstalled.addListener(() => {
  // 초기화 및 설정
  executePeriodicTask();
});