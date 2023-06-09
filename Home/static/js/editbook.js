var selectedCategory;
THAO();
getAllCategory();
function THAO(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status==200){
            selectedCategory=Response.Category.id;
            console.log(selectedCategory)
            var s1 = document.getElementById('add-product-form');
            
            var s = '<div class="Film__infor" ><div class="Film__infor__content" ><div class="Film__input__Text"> <div className="addbook__flex"><div class="content__Film__input"><label for="bookName">Tên sách</label><input type="text"  id="bookName"  value="'+Response.BookName+'"/> </div><div class="content__Film__input"><label for="authorName">Tác giả</label><input type="text"  id="authorName" value="'+Response.Author+'" /></div></div><div class="content__Film__input"><label for="Description">Mô tả</label><textarea name="" id="Description"  value="">'+Response.ContentBook+'</textarea></div><div className="addbook__flex"><div class="content__Film__input"><label for="FilmName">Ngày phát hành</label><input type="text"  id="date"  value="'+Response.Releasedate+'"/></div><div class="content__Film__input"><label for="pageNumber">Số trang</label><input type="text"  id="pageNumber" value="'+Response.PageNumber+'" /></div></div><div class="content__Film__input"><label for="bookPrice">Giá</label><input type="text"  id="bookPrice" value="'+Response.Price+'" /></div><div class="content__Film__input"> <label for="Category">Category</label><select id="Category"></select></div> </div><div class="Film__input__file"><div class="input__file"><label for="">Image</label><div class="Change__inputFile"><img src="'+Response.BookImage+'" alt="" /><input type="file"  class="input-file" accept="image/*" id="Image"/></div></div> </div></div></div><div class="Save__Change"><div id="save__button" onclick="EditProduct()"> Save</div></div>'
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/BookDetail/"+window.location.pathname.substring(13), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}
function getAllCategory(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status==200){
            
            var s1 = document.getElementById('Category');
          
            var s=''
            for(var i=0;i<Response.length;i++){
                
                
                s+='<option value="'+Response[i].id+'"';
                if(Response[i].id==selectedCategory)s+='selected ';
                s+='> '+Response[i].CategoryName+' </option>';
            }
    
            console.log(s)
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/ListCategory", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}

function EditProduct()
{
   
    var xhr = new XMLHttpRequest();
    var fromData = new FormData();
    fromData.append('name', document.getElementById('bookName').value);

    fromData.append('author', document.getElementById('authorName').value);

    fromData.append('price', document.getElementById('bookPrice').value);
    fromData.append('pageNumber', document.getElementById('pageNumber').value);
    fromData.append('date', document.getElementById('date').value);
    fromData.append('content',document.getElementById('Description').value);
    fromData.append('Image', document.getElementById('Image').files[0]);
    fromData.append('category',document.getElementById('Category').value)
    xhr.onload = function () {
            //lấy dữ liệu dạng json
            var ResponseJson = xhr.responseText
            //chuyển về dữ liệU javascript
            var Response = JSON.parse(ResponseJson)
            console.log('ff')
            if (xhr.status == 200) {
                window.location = "/ListProduct";
            }
            else {

            }
        }

 
        //khai báo phương thức và đường dẫn để request
        xhr.open("PUT", "/Apiv1/EditBook/"+window.location.pathname.substring(13), false);
        var jwtToken = localStorage.getItem("token")
        //định dạng gửi đi787
        xhr.setRequestHeader("Authorization", "Bearer " + jwtToken)

        //gửi
        xhr.send(fromData);
 
        
}

var inputFiles=document.querySelectorAll('.input-file');
        
inputFiles.forEach(function(inputFile, index) {
  
    inputFile.onchange = function(event) {
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    inputFile.previousElementSibling.src = blobURL;
};
});