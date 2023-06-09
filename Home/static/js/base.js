function search(){
    //alert('kkk')
    if(event.keyCode==13){
        var key = document.getElementById('find').value;
        
        window.location='/Search/'+key;
    }
}
role();
function role(){
    const xhttp = new XMLHttpRequest();
        //nhận dự liệu về (http response)
        xhttp.onload = function(){
        var ResponseJson=xhttp.responseText;
        //chuyển về dữ liệU javascript
        var response= JSON.parse(ResponseJson);    
        if(xhttp.status==200){
            
            var s = document.getElementById('role');
            var s1= '';
            
            var a= document.getElementById('role1')
            var a1 = '';
            if (response['roles'].includes('Admin')){
                s1+='<a href="/Home"><li>Trang chủ</li> </a> <a href="/Shop"> <li>Shop</li> </a> <a href="/Contact"> <li>Liên Hệ</li> </a> <a href="/ListProduct"><li> Cài đặt</li></a>'
                a1+='<a href="/Account" onclick="Logout()"><li><i class="fas fa-user"></i> Đăng Xuất</li></a><a href="/Payment"><li><i class="fas fa-money-bill"></i> Thanh Toán</li></a><a href="/Cart"><li><i class="fas fa-cart-plus"></i> Giỏ Hàng</li> </a><a href="/Me"><li><i class="fas fa-user"></i> Tôi</li></a>'
            }
            else{
                s1+='<a href="/Home"><li>Trang chủ</li> </a> <a href="/Shop"> <li>Shop</li> </a> <a href="/Contact"> <li>Liên Hệ</li> </a>';
                a1+='<a href="/Payment"><li><i class="fas fa-money-bill"></i> Thanh Toán</li></a><a href="/Cart"> <li><i class="fas fa-cart-plus"></i> Giỏ Hàng</li></a><a href="/Account" onclick="Logout()"><li><i class="fas fa-lock"></i> Đăng Xuất</li></a><a href="/Me"><li><i class="fas fa-user"></i> Tôi</li></a>'
            }
            
            s.innerHTML=s1;
            a.innerHTML=a1;
            
        }
 }
     //khai báo phương thức và đường dẫn để request
     xhttp.open("GET", "/Apiv1/ListRoleByUserLogin",false);
     //định dạng gửi đi787
     xhttp.setRequestHeader("Content-type","application/json")
     var jwtToken = localStorage.getItem("token")
     //định dạng gửi đi787
     xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
     xhttp.send();
}
// getCategory();
// function getCategory(){
//     const xhr =new XMLHttpRequest();
//     xhr.onload=function(){
         
//         if(xhr.status==200){
//             var ResponseJson=xhr.responseText;
//             //chuyển về dữ liệU javascript
//             var response= JSON.parse(ResponseJson);   
//             var elementOptionproduct= document.getElementById("productCategory");
//             var optionproduct='';
//             for (var i=0;i<response.length;i++){
//                 optionproduct+='<div class="container__optionby"><div class="container__optionby__title"><h1>'+response[i].CategoryName+'</h1></div><ul>'
//                try{

//                    for(var j=0;j<response[i].parent.length;j++){
//                        optionproduct+='<div onclick="productByCategory('+response[i].parent[j].id+')"><li>'+response[i].parent[j].CategoryName+'</li></div>';
//                    }
//                }
//                catch{
                
//                }
//                 optionproduct+='</ul></div>';
//             }
//             elementOptionproduct.innerHTML=optionproduct;
//         }

//     }
//     xhr.open("GET", "/Apiv1/Category",false);
//     //định dạng gửi đi787
//     xhr.setRequestHeader("Content-type","application/json")
//     //
//     xhr.setRequestHeader('token',localStorage.getItem('access'));
//     xhr.send();
// }
function Logout(){
    window.localStorage.removeItem("token");
    window.location="/Login"
}