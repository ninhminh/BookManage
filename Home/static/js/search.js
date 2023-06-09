listsearch();
function listsearch(){
const xhttp = new XMLHttpRequest();
    // nhận dữ liệu về (http response)
    xhttp.onload = function(){
        // nhận dữ liệu dạng json
        var ResponseJson = xhttp.responseText
        // chuyển về dữ liệu javascript
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            //alert('hiiiiiiiii')
            var s1 = document.getElementById('update');
            var s1Html='';
            for (var i=0;i<Response.length;i++){
                s1Html+= '<div class="container__listproduct__product"><div class="product__img"><a href="/html/DetailProduct/'+ Response[i].id +'"><img src="'+ Response[i].Imgage +'" alt=""></a></div><div class="product__inforproduct"><h1>'+ Response[i].ProductName +'  </h1><p> '+ Response[i].Price +'  </p><div class="addtocart"><a href="/Pay"> <i class="fas fa-cart-plus"></i> Thêm vào giỏi hàng </a></div> </div> </div>'
             }
            s1.innerHTML = s1Html;
        }
        else{

        }
    }
    // khai báo phương thức và đường dẫn để request
    xhttp.open("GET", "/Apiv1/Search/"+window.location.pathname.substring(8), false);
    // định dạng gửi đi 
    xhttp.setRequestHeader("Content-type", "application/json")
    // gửi
    xhttp.send();
}

