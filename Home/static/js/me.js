old();
function old(){
   
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            
            var s1 = document.getElementById('me');
            
            var s ='<h1>Hello ' + Response.UserName +'</h1><form ><label for="name">Họ tên:</label><input type="text" id="name" name="name" required value="'+ Response.FullName +'"><label for="email">Email:</label><input type="email" id="email" name="email" required value="'+ Response.Email +'"><input type="submit" value="Lưu thông tin" onclick="EditUser()"></form>';
            s1.innerHTML = s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/Account", false);
    
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}

function EditUser()
{
    
    const xhttp = new XMLHttpRequest();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    
    
        xhttp.onload = function()
            {
                //lấy dữ liệu dạng json
                var ResponseJson=xhttp.responseText
                //chuyển về dữ liệU javascript
                var Response= JSON.parse(ResponseJson)
                alert("ok")
                if(xhttp.status==200)
                {
                    alert("thanh cong")
                }
                else{
                    
                }
            }     
            const userInfo={
                name : name,
                email : email,

            }
            putUser=JSON.stringify(userInfo);
            //khai báo phương thức và đường dẫn để request
            xhttp.open("PUT","/Apiv1/Account",false);
            xhttp.setRequestHeader("Content-type","application/json")
            var jwtToken = localStorage.getItem("token")
            //định dạng gửi đi787
            xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
            //gửi
            xhttp.send(putUser);  
        
}

