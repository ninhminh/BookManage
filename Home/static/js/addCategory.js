function postCategory(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        
       console.log(xhttp.responseText)
        if (xhttp.status == 201) {
          window.location="/ListType"
        } else {
  
        }
  
    }
    const dataCategory ={
      CategoryName:document.getElementById("CategoryName").value
    }
    var  dataCategoryJson =JSON.stringify(dataCategory);
    xhttp.open("POST", "/Apiv1/AddCategory", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send(dataCategoryJson);
  }
  