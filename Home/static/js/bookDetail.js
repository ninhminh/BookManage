BookDetail();
function BookDetail(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status==200){

            var s1 = document.getElementById('detail');
            var s='<div class="container__product__img"><img src="'+Response.BookImage+'" alt=""></div><div class="container__product__main"><div class="container__product__main__infor"><h1>'+Response.BookName+'</h1><p>Mã Sản Phẩm: <span>'+Response.id+'</span></p><h2>'+Response.Price+'đ</h2></div><div class="container__product__main__buy"><div class="product__buy__quantily"><label for="">Số lượng: </label><input type="number" name="" id="amount"></div><div class="product__buy__button"><div onclick="orderToCart()"><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</div></div></div></div>';
            
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/BookDetail/"+window.location.pathname.substring(15), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}
function orderToCart(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        
       
        if (xhttp.status == 201) {
          window.location="/Cart"
        } else {
  
        }
  
    }
    const dataCategory ={
      Quantity:document.getElementById("amount").value
    }
    var  dataCategoryJson =JSON.stringify(dataCategory);
    xhttp.open("POST", "/Apiv1/AddToCart/"+window.location.pathname.substring(15), false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send(dataCategoryJson);
}