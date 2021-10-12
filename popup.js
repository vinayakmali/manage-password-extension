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
    var data = JSON.stringify({
    "email": email,
    "login_url": url
    });




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

    }else{
      document.getElementById("error").innerHTML = obj.result;
    }

  }
});

xhr.open("POST", "http://127.0.0.1:8000/getpassword");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cookie", "XSRF-TOKEN=eyJpdiI6IkFEYnhFQnZic0Z1NWNZQnNQSnZrWUE9PSIsInZhbHVlIjoia2JxVWxiSDE4K1RjdXVUd1J3Z0ZxVEd6R0ZzeGZsNkh0L05yV2ZWVzV0MTBSUlNqQkM2Ryt0ZVg4TklPb0cwZU9WOFI3T1h4NWVqZTBCSi9YdVp5UU41b0xmbnRLQmZNN1J0b3V2WEhHZFZZUTc5bGhFaWtnWTdUV3F5bzJ5Q3AiLCJtYWMiOiJiODhiMTE5YjliZGI5YWIxOTZhNDI2ZDY1MzY2Y2YwYmQ4MDY5MDVjYjU2MGVhOTViMDJhZDFhMGExZWFhODMxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjErYldpelg3VEQ4RCtzZk8zYkhEdmc9PSIsInZhbHVlIjoiWEFCVUsxTlFmSFZwQ3NFSm14K3ViS2s5U0ZvRWFjOHducGEzUzA4UFNZcGNCRnVWVUpHSDA0MDRvMlRhRlZRQ1JZbytnTXcyd3oralQvS1p6QjZ0aXNKOVZLTjNyTVRYRjNycHZEaVdUN2FlWG9sU0g5R2MyLzRURmRjQ0pMMHkiLCJtYWMiOiIwZDIxZTYwMDE5OWFlMjdhYjJlMWY4MDExMjQ5YmEzN2JkZTFmNmRiYjQ3ZjgwODc5ODBkMTZhZDJlOWE3MjYzIiwidGFnIjoiIn0%3D");

xhr.send(data);


});

 
} 
