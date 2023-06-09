history()
function history() {
    const xhttp = new XMLHttpRequest();
    var userID = localStorage.getItem('userID');
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if (xhttp.status = 200) {
            // alert('ok');
            var serverListElement = document.getElementById('history');
            //khai báo biến String(dùng để thay đổi html trong thẻ bên trên)
            var serverListHTML = '';
            for (var i = 0; i < Response.length; i++) {

                serverListHTML += '<tr><th>' + (i + 1) + '</th>'
                serverListHTML += '<th><img src="' + Response[i].img + '" alt=""></th>'
                serverListHTML += '<th hidden id="product_id">' + Response[i].ProductId + '</th>'
                serverListHTML += '<th>' + Response[i].ProductName + '</th>'
                serverListHTML += '<th>' + (Response[i].Amount * Response[i].Price) + '</th>'
                var originalDateTime = Response[i].Date
                var dateObject = new Date(originalDateTime);

                // Lấy thông tin ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
                var year = dateObject.getFullYear();
                var month = String(dateObject.getMonth() + 1).padStart(2, "0");
                var day = String(dateObject.getDate()).padStart(2, "0");
                var hours = String(dateObject.getHours()).padStart(2, "0");
                var minutes = String(dateObject.getMinutes()).padStart(2, "0");
                var seconds = String(dateObject.getSeconds()).padStart(2, "0");

                // Tạo chuỗi thời gian mới với định dạng mong muốn
                var formattedDateTime = day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

                console.log(formattedDateTime);
                serverListHTML += '<th onchange="formatDate(this)" id = "dateTime">' + formattedDateTime + '</th>';
                if ( Response[i].Status == 'Chờ Xác Nhận'){
                    
                    serverListHTML += '<th><input type="submit"  value="Hủy hàng" onclick="deleteOrder('+ Response[i].id +')"> </th><tr>'

                }else{
                    
                    serverListHTML += '<th><input type="submit"  value="Đang Giao Hàng" > </th><tr>'

                }
            }
            serverListElement.innerHTML = serverListHTML;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Order", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.setRequestHeader("userID", userID);
    xhttp.send();
}

function deleteOrder(id){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var ResponseJson =  xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if(xhttp.status=200){
            alert("Xóa thành công")
            window.location = "/History";
        }else{

        }
    }
    xhttp.open("DELETE", "/Apiv1/Order/" + id, false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send();
}

