add();
function add(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            var s1 = document.getElementById('add');
            var s = '';
            for(var i=0; i<Response.length;i++){
                s+= '<tr ><td>'+(i+1)+'</td><td>'+ Response[i].BookName +'</td><td> '+ Response[i].Author +'</td><td> '+ Response[i].Category.CategoryName +'</td><td>'+ Response[i].Releasedate +'</td><td>'+ Response[i].PageNumber +'</td><td>100</td><td class="setupproduct"><div class="editproduct"><a href="/EditProduct/'+Response[i].id+'"> Sửa</a></div><div class="deleteproduct" onclick="xoa('+Response[i].id+')"> Xóa</div><div class="clear"></div></td></tr>'
            }
            s1.innerHTML =s;
        }else{

        }
    }
    xhttp.open("GET", "/Apiv1/ListBook", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();

}

function xoa(id){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            add()
            
        }else{

        }
    }
    xhttp.open("DELETE", "/Apiv1/DeleteBook/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();

}
