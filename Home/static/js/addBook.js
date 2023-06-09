getAllCategory();
function getAllCategory(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status==200){
            
            var s1 = document.getElementById('Category');
          
            var s = '  <option value= null"> ---- Vui lòng chọn category----</option>';
            for(var i=0;i<Response.length;i++){
                
                s+='<option value="'+Response[i].id+'" > '+Response[i].CategoryName+' </option>';
            }
    
            console.log(s)
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/ListCategory", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}
function postBook(){
    const xhttp = new XMLHttpRequest();
    var fromData = new FormData();
    fromData.append('name', document.getElementById('bookName').value);

    fromData.append('author', document.getElementById('authorName').value);

    fromData.append('price', document.getElementById('bookPrice').value);
    fromData.append('pageNumber', document.getElementById('pageNumber').value);
    fromData.append('date', document.getElementById('date').value);
    fromData.append('content',document.getElementById('Description').value);
    fromData.append('Image', document.getElementById('Image').files[0]);
    fromData.append('category',document.getElementById('Category').value)
    xhttp.onload = function () {
            //lấy dữ liệu dạng json
            var ResponseJson = xhttp.responseText
            //chuyển về dữ liệU javascript
            var Response = JSON.parse(ResponseJson)

            if (xhttp.status == 201) {
                window.location = "/ListProduct";
            }
            else {

            }
        }

 
        //khai báo phương thức và đường dẫn để request
        xhttp.open("POST", "/Apiv1/AddBook", false);
        var jwtToken = localStorage.getItem("token")
        //định dạng gửi đi787
        xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)

        //gửi
        xhttp.send(fromData);

}

var inputFiles=document.querySelectorAll('.input-file');
        
inputFiles.forEach(function(inputFile, index) {
  
    inputFile.onchange = function(event) {
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    inputFile.previousElementSibling.src = blobURL;
};
});