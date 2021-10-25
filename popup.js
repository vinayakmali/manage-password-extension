'use strict';  
let GetURL = document.getElementById('GetURL');  
GetURL.onclick = function(element) {  
  getCurrentTabUrl();  
}; 



function modifyDOM() {  
        //You can play with your DOM here or check URL against your regex  
        console.log('Tab script:');  
        console.log(document.body);  
        document.body.style.background = "blue"  
        return true;  
    }



function getCurrentTabUrl() {  


var email = '';
chrome.identity.getProfileUserInfo(function(userInfo) {

let userData = JSON.stringify(userInfo);
    const data = JSON.parse(userData);
    email = data.email;
});


var queryInfo = {  
    active: true,  
    currentWindow: true  
  };    
  chrome.tabs.query(queryInfo, (tabs) => {  
    var tab = tabs[0];  
    var url = tab.url;
    let domain = (new URL(url));
    domain = domain.hostname;
    var data = JSON.stringify({
    "email": email,
    "login_url": domain
    });
if (email == '') {
       document.getElementById("error").innerHTML = "Please Logged in with Registered Email Id in your chrome browser";
       return false;
}




var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  
  if(this.readyState === 4) {

    var res = this.responseText;
    const obj = JSON.parse(res);
    let count = obj.count;
    
    if (count > 0) {

      let username = obj.result[0].username;
      let password = obj.result[0].password;
      chrome.tabs.executeScript(null,{code:"document.querySelector('input[type=password]').value = '"+password+"'"});
      chrome.tabs.executeScript(null,{code:"var form = document.querySelector('input[type=password]').parentNode.parentElement;form.querySelector('input[type=text]').value = '"+username+"'"});
      chrome.tabs.executeScript(null,{code:"var form = document.querySelector('input[type=password]').parentNode.parentElement;form.querySelector('input[type=email]').value = '"+username+"'"});
      chrome.tabs.executeScript(null,{code:"var form = document.querySelector('input[type=password]').parentNode.parentElement.parentElement;form.querySelector('input[type=email]').value = '"+username+"'"});
      chrome.tabs.executeScript(null,{code:"var form = document.querySelector('input[type=password]').parentNode.parentElement.parentElement;form.querySelector('input[type=text]').value = '"+username+"'"});
      document.getElementById("success").innerHTML = 'Success';

    }else{
      document.getElementById("error").innerHTML = obj.result;
    }

  }
});
xhr.open("GET", "http://127.0.0.1:8000/api/getpassword?email="+ email +"&login_url="+ url);
xhr.setRequestHeader("Authorization", "Basic " + btoa(email+":1Externaluser@23"));
xhr.send();


});

 
} 
