BookDetail();
function BookDetail(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status==200){

            var s1 = document.getElementById('detail');
            var s='<div class="container__product__img"><img src="'+Response.BookImage+'" alt=""></div><div class="container__product__main"><div class="container__product__main__infor"><h1>'+Response.BookName+'</h1><p>Mã Sản Phẩm: <span>'+Response.id+'</span></p><h2>'+Response.Price+'đ</h2></div><div class="container__product__main__buy"><div class="product__buy__quantily"><label for="">Số lượng: </label><input type="number" name="" id="amount"></div><div class="product__buy__button"><div onclick="addcart('+Response.id+')"><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</div></div></div></div>';
            
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
function addcart(id) {

    var amount;
    var amountElement = document.getElementById("amount");
    
    if (amountElement === null || amountElement.value === "") {
      amount = 1;
    } else {
      amount = amountElement.value;
    }
    
      const xhttp = new XMLHttpRequest();
     
  
      xhttp.onload = function() {
        // lấy dữ liệu dạng json
        var ResponseJson = xhttp.responseText;
        // chuyển về dữ liệu javascript
        var Response = JSON.parse(ResponseJson);
        if (xhttp.status == 200) {
          alert("Đã thêm vào giỏ hàng");
          window.location="/Cart";
        } else {
          alert("Sai");
        }
      };
      const order = {
        Amount: amount
      };
      postOrder = JSON.stringify(order);
      // khai báo phương thức và đường dẫn để request
      xhttp.open("POST", "/Apiv1/AddCart/"+id, false);
      // định dạng gửi đi
      xhttp.setRequestHeader("Content-type", "application/json");
      var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
      xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
      // gửi
      xhttp.send(postOrder);
    }
    function postRatingAndComment(id) {
        var rate = document.getElementById('rate').value;
        var comment = document.getElementById('comment').value;
    
        var url = "/Apiv1/PostComment/" + id;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        var jwtToken = localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (xhr.status === 201) {
                alert("Thành công");
                // Refresh the page or perform any other action
            } else if (xhr.status === 400) {
                alert("Bạn chưa mua sản phẩm");
            } else {
                alert("Error: " + xhr.statusText);
            }
        };
        xhr.onerror = function () {
            alert("Network error");
        };
        var data = {
            Rate: rate,
            Comment: comment
        };
        xhr.send(JSON.stringify(data));
    }
    
    function getComments(id) {
        var url = "/Apiv1/Comments/" + id;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        var jwtToken = localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (xhr.status === 200) {
                var comments = JSON.parse(xhr.responseText);
                var s1 = document.getElementById('comment');
                var s = '';
                for (var i = 0; i < comments.length; i++) {
                    s += '<div class="tour__reviews mt-4" id="comment">';
                    s += '<h4>Reviews</h4><form><div class="rating__group">';
                    s += '<span>1 <i class="fas fa-star rating__start"></i></span>';
                    s += '<span>2 <i class="fas fa-star rating__start"></i></span>';
                    s += '<span>3 <i class="fas fa-star rating__start"></i></span>';
                    s += '<span>4 <i class="fas fa-star rating__start"></i></span>';
                    s += '<span>5 <i class="fas fa-star rating__start"></i></span></div>';
                    s += '<div class="review__input">';
                    s += '<input type="text" placeholder="share your thoughts" required />';
                    s += '<button class="primary__btn" type="submit" onclick="postRatingAndComment(\'' + comments[i].name + '\')">Submit</button>';
                    s += '</div></form><div class="user__reviews">';
                    s += '<div class="review__item">';
                    s += '<img src="https://cdn.pixabay.com/photo/2013/07/12/15/52/chat-150496_960_720.png" alt="" />';
                    s += '<div class="w-100">';
                    s += '<div class="review__item-user">';
                    s += '<div><h5>' + comments[i].name + '</h5><p>Ngày bình luận<!-- new Date("01-18-2023").toLocaleDateString("en-US", options) --></p></div>';
                    s += '<span class="d-flex align-items-center">' + comments[i].rate + ' <i class="fas fa-star"></i></span>';
                    s += '</div>';
                    s += '<h6>' + comments[i].comment + '</h6>';
                    s += '</div>';
                    s += '</div>';
                    s += '</div>';
                    s += '</div>';
                }
                s1.innerHTML = s;
                console.log(s1);
            } else {
                alert("Error: " + xhr.statusText);
            }
        };
        xhr.onerror = function () {
            alert("Network error");
        };
        xhr.send();
    }
    