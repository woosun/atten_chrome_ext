const getTitle = () => {
  var lis = document.getElementsByClassName("css-eeatfk")
  if(!lis.length){
    const element = document.querySelector('[aria-label="Participants"]');
    element.click();
    
  }else{
    var name =[]
    for(i=0;i<lis.length;i++){
      name[i] = lis[i].innerHTML;
    }
    return name;
  }
}
const regex = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi;
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: getTitle
  }, function(result){
    
    var user_list = result[0]['result']
    var title = document.getElementById("title");
    title.innerText = title.innerText+'('+year + '-' + month + '-' + date+')';
    for(let username of user_list){
      var Target_user = username.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,'')
      var lis = document.getElementsByTagName("li");
      for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        var liValue = li.textContent || li.innerText;
        if (liValue === Target_user) {
          li.classList.add('on_line');
        }
      }
    }
    $("#status").text("초기화완료")
  });
});


function fnc_usercolor(){
  console.log('load fnc_usercolor')
  const getTitle = () => {
    var lis = document.getElementsByClassName("css-eeatfk")
    var name =[]
    for(i=0;i<lis.length;i++){
      name[i] = lis[i].innerHTML;
    }
    return name;
  }
  const regex = /^[가-힣]+$/;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: getTitle
    }, function(result){
      var user_list = result[0]['result']
      for(let username of user_list){
        var Target_user = username.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,'')
        var lis = document.getElementsByTagName("li");
        for (var i = 0; i < lis.length; i++) {
          var li = lis[i];
          var liValue = li.textContent || li.innerText;
          if (liValue === Target_user) {
            li.classList.add('on_line');
          }
        }
      }
    });
  });
}

$(document).ready(function() {
  $('#user_list li').click(function() {
    $(this).toggleClass('active');
  });
});


document.addEventListener('DOMContentLoaded', function(){
  var link = document.getElementById('reLoad');
  var link2 = document.getElementById('fnc_user_in');
  var link3 = document.getElementById('fnc_user_out');
  
  link.addEventListener('click', function(){
    fnc_reset()
    fnc_usercolor()
    $("#status").text("리셋완료")
  });
  link2.addEventListener('click', function(){
    fnc_reset()
    fnc_usercolor()
    fnc_user_in()
  });
  link3.addEventListener('click', function(){
    fnc_reset()
    fnc_usercolor()
    fnc_user_out()
  });
});

function fnc_reset(){
  console.log('load fnc_reset')
  var lis = document.getElementsByTagName("li");
  for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    var liValue = li.textContent || li.innerText;
    li.innerText = liValue.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,'')
    li.classList.add('off_line');
  }
}


function fnc_user_in() {
  $.ajax({
          type: "POST",
          url: "http://localhost:5000/get_user_in",
          success: function (response) {
              let test = JSON.parse(response)  // Json 문자열을 객체로 변환
              for (let i = 0; i < test.length; i++) {
                var lis = document.getElementsByTagName("li");
                for (var j = 0; j < lis.length; j++) {
                  var li = lis[j];
                  var liValue = li.textContent || li.innerText;
                  if (liValue === test[i]['name']) {
                    if(test[i]['attend_time']){
                      times = test[i]['attend_time'].split(' ');
                      li.innerHTML = li.innerHTML+"<span class='ws_blue'>"+times[1]+"</span>";
                    }else{
                      li.innerHTML = li.innerHTML+"<span class='ws_red'>no_log</span>";
                    }              
                    
                  }
                }
              }
              $("#status").text("출석호출완료")
          },
          error: function () {
            $("#status").text("출석호출실패")
          },
      }
  )
}


function fnc_user_out() {
  $.ajax({
          type: "POST",
          url: "http://localhost:5000/get_user_out",
          success: function (response) {
              let test2 = JSON.parse(response)  // Json 문자열을 객체로 변환
              for (let i = 0; i < test2.length; i++) {
                var lis = document.getElementsByTagName("li");
                for (var j = 0; j < lis.length; j++) {
                  var li = lis[j];
                  var liValue = li.textContent || li.innerText;
                  if (liValue === test2[i]['name']) {
                    if(test2[i]['leaving_time']){
                      times1 = test2[i]['leaving_time'].split(' ');
                      li.innerHTML = li.innerHTML+"<span class='ws_blue'>"+times[1]+"</span>";
                    }else{
                      li.innerHTML = li.innerHTML+"<span class='ws_red'>no_log</span>";
                    }            
                  }
                }
              }
              $("#status").text("퇴실호출완료")
          },
          error: function () {
            $("#status").text("퇴실호출실패")
          },
      }
  )
}