old();
function old(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            
            var s1 = document.getElementById('me');
           // console.log(Response.Password)
            var s ='<h1>Đổi mật khẩu</h1><div id="Error"><p></p></div><form ><label for="name">Mật khẩu cũ:</label><input type="password" id="oldpass" name="" required value="'+ Response.Password +'"><label for="email">Nhập lại mật khẩu cũ:</label>	<input type="password" id="pass1" name="email" required value=""><label for="phone">Mật khẩu mới:</label><input type="password" id="newpass" name="phone" required value=""><label for="phone">Nhập lại mật khẩu mới:</label><input type="password" id="pass2" name="phone" required value=""><input type="submit"  value="Lưu thông tin" onclick="Pass()"> '
            s1.innerHTML = s
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/Account", false);
    xhttp.setRequestHeader("Content-type","application/json")
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}


function Pass()
{
   
    const xhttp = new XMLHttpRequest();
    
    var oldpass = document.getElementById('oldpass').value;
    var pass1 = document.getElementById('pass1').value;
    var newpass =  document.getElementById('newpass').value;
    var pass2 = document.getElementById('pass2').value;
    if( oldpass!=pass1 || newpass!=pass2){
        alert("Mật khẩu không khớp!")

    }else{
        
    
        xhttp.onload = function()
            {
                //lấy dữ liệu dạng json
                var ResponseJson=xhttp.responseText
                //chuyển về dữ liệU javascript
                var Response= JSON.parse(ResponseJson)
                
                if(xhttp.status==200)
                {
                   
                   
                    alert("thanh cong")
                    window.location = "/Home";
                }
                else{
                    var s = document.getElementById('Error')
                    var s1 = '<p>'+Response["Vui lòng nhập lại"]+'</p>';
                    s.innerHTML = s1;
                }
            }     
            const userInfo={
                password : pass2

            }
            putUser=JSON.stringify(userInfo);
            //khai báo phương thức và đường dẫn để request
            xhttp.open("PUT","/Apiv1/Password",false);
            //định dạng gửi đi787
            xhttp.setRequestHeader("Content-type","application/json")
            //gửi
            var jwtToken = localStorage.getItem("token")
            //định dạng gửi đi787
            xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
            xhttp.send(putUser);  
        }
        
}

