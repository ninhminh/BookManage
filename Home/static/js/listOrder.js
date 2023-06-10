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
                if( Response[i].Status != 'Giỏ Hàng'){
                    s+= '<tr><td>' + (i+1) +'</td><td>'+ Response[i].Book +'</td><td>'+ Response[i].User+'</td><td>'+ Response[i].PhoneNumber +'</td><td>'+Response[i].Address +'</td><td>'+ Response[i].Amount*Response[i].Price +'</td><td class="setupproduct"><div class="editproduct" onclick="changeStatus(' + Response[i].id + ')">'+ Response[i].Status +'</div></td><td >pending</td><td class="setupproduct"><div class="editproduct"><a href="/EditOrder/'+ Response[i].id +'" >Sửa </a></div>  <div class="deleteproduct" onclick="xoa('+ Response[i].id+')">  Xóa </div> <div class="dowloadproduct"> Tải xuống</div><div class="clear"></div> </td> </tr>'
                }
            }
            s1.innerHTML =s;
        }else{

        }
        console.log(Response);
    }
    xhttp.open("GET", "/Apiv1/ListOrder", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}


function changeStatus(id) {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (xhttp.status = 200) {
            alert("đã xác nhận")
            add()
            
        } else {
            
        }
    };
    xhttp.open('PUT', '/Apiv1/UpdateStatus/' + id, false);
    xhttp.setRequestHeader('Content-type', 'application/json');
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
    xhttp.open("DELETE", "/Apiv1/DeleteOrder/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}
function sua(id){
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            add()
            
        }else{

        }
    }
    xhttp.open("PUT", "/Apiv1/EditOrder/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();

}