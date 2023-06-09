function Login()
{
    //alert("tuan cho");
    const xhttp = new XMLHttpRequest();
    var username = document.getElementById('username').value;
    //  Lấy giá trị trong element input với id là password:
    var password = document.getElementById('password').value;
    xhttp.onload = function()
        {
            //lấy dữ liệu dạng json
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
                var s1 = '<p>'+Response["Vui lòng nhập lại"]+'</p>';
                s.innerHTML = s1;
            }
        }     
        const userInfo={
            Username:username,
            Password:password
        }
        postUser=JSON.stringify(userInfo);
        //khai báo phương thức và đường dẫn để request
        xhttp.open("POST","/Apiv1/Login",false);
        //định dạng gửi đi787
        xhttp.setRequestHeader("Content-type","application/json")
        //gửi
        xhttp.send(postUser);    
}