
getCategory();
function getCategory(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        
       
        if (xhttp.status == 200) {
            var ResponseJson =  xhttp.responseText
            var Response = JSON.parse(ResponseJson)
            document.getElementById("CategoryName").value=Response.CategoryName;
        } else {
  
        }
  
    }
    
    
    xhttp.open("GET", "/Apiv1/CategoryDetail/"+window.location.pathname.substring(14), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}
function THAO(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        
       console.log(xhttp.responseText)
        if (xhttp.status == 200) {
          window.location="/ListType"
        } else {
  
        }
  
    }
    const dataCategory ={
      name:document.getElementById("CategoryName").value
    }
    var  dataCategoryJson =JSON.stringify(dataCategory);
    xhttp.open("PUT", "/Apiv1/CategoryDetail/"+window.location.pathname.substring(14), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send(dataCategoryJson);
}
