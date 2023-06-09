getAllUser();
function getAllUser(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            var s1 = document.getElementById('add');
            var s = '';
            for(var i=0; i<Response.length;i++){
                s+= '<tr><td>'+(i+1)+'</td><td><a href="#">'+Response[i].UserName+'</a></td><td>'+Response[i].FullName+'</td><td>'+Response[i].Email+'</td><td class="setupproduct"><div class="editproduct" onclick="sua('+Response[i].id+')">Sửa </div><div class="deleteproduct" onclick="xoa('+Response[i].id+')">Xóa</div><div class="clear"></div></td></tr>'
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/ListUser", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}