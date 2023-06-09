function Signup()
{
    
    const xhttp = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    //  Lấy giá trị trong element input với id là password:
    var password = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    if(password!=password2){
        var a = document.getElementById('Error')
        var a1 = '<p>'+'Nhập lại mật khẩu'+'</p>';
        a.innerHTML = a1;

    }else{
        xhttp.onload = function()
            {
               
                var ResponseJson=xhttp.responseText
                //chuyển về dữ liệU javascript
                var Response= JSON.parse(ResponseJson)
                
                if(xhttp.status==201)
                {
                    //vứi status =201 thành công
                    
                    localStorage.setItem('token',Response['access']);
                    window.location = "/Home";
                    //alert("Đăng nhập thành công");
                }
                else{
                    var s = document.getElementById('Error')
                    
                    var s1 = '<p>'+Object.keys(Response)[0]+': '+Response[Object.keys(Response)[0]]+'</p>';
                    s.innerHTML = s1;
                }
            }     
            const userInfo={
                UserName:username,
                FullName:fullname,
                Email:email,
                Password:password
              
            }
            postUser=JSON.stringify(userInfo);
            //khai báo phương thức và đường dẫn để request
            xhttp.open("POST","/Apiv1/Signup",false);
            //định dạng gửi đi787
            xhttp.setRequestHeader("Content-type","application/json")
            //gửi
            xhttp.send(postUser);  
        }  
}