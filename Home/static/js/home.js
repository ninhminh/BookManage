hot();
function hot(){
const xhttp = new XMLHttpRequest();
    // nhận dữ liệu về (http response)
    xhttp.onload = function(){
        // nhận dữ liệu dạng json
        var ResponseJson = xhttp.responseText
        // chuyển về dữ liệu javascript
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            console.log(Response[0])
            var s1 = document.getElementById('listHot');
            var s1Html='';
            for (var i=0;i<Response.length;i++){
                s1Html+= '<li class="hi">  <div class="list__top__test"><a href="/ProductDetail/'+Response[i].id+'"><img src="'+ Response[i].img +'" alt=""></a></div> <div class="hai"> <h3 class="ba">'+Response[i].ProductName+'</h3></div></li>';
            }
            s1.innerHTML = s1Html;
        }
        else{

        }
    }
    // khai báo phương thức và đường dẫn để request
    xhttp.open("GET", "Apiv1/FlowerHot", false);
    // định dạng gửi đi 
    xhttp.setRequestHeader("Content-type", "application/json")
    // gửi
    xhttp.send();
}
