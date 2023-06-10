cart();
update()
function cart() {
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if (xhttp.status = 200) {
            
            var serverListElement = document.getElementById('cart');
            //khai báo biến String(dùng để thay đổi html trong thẻ bên trên)
            var serverListHTML = '';
            for (var i = 0; i < Response.length; i++) {
                
                serverListHTML += '<tr> <th class = "hide">' + Response[i].BookID + '</th> <th>' + (i + 1)
                serverListHTML += '</th> <th>' +   Response[i].BookName
                serverListHTML += '</th><th>' + Response[i].Price + '</th><th><input type="number" id = "amount" value="'
                serverListHTML += Response[i].Amount + '" min="1" class="quantity" id = "quantity" onchange="updateTotalPrice(this)"></th><th class="total-price" onchange="update()"></th><td class="setupproduct"><input type="checkbox" onclick="update()" name="example-checkbox" checked></div> </td></tr>';
            }
            serverListElement.innerHTML = serverListHTML;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Cart", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    var jwtToken = localStorage.getItem("token")
    //định dạ   ng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send();
}


function updateTotalPrice(input) {
    var row = input.parentNode.parentNode;
    var unitPrice = parseFloat(row.getElementsByTagName('th')[3].textContent);
    var quantity = parseInt(input.value);
    var totalPrice = unitPrice * quantity;
    row.getElementsByClassName('total-price')[0].textContent = totalPrice;
    update()
}
function update(){
    var total = 0;
    var checkboxes = document.querySelectorAll('input[type=checkbox][name=example-checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        var row = checkboxes[i].closest('tr');
        var unitPrice = parseFloat(row.getElementsByTagName('th')[3].textContent);
        var quantity = parseInt(row.querySelector('input[type=number].quantity').value);
        total += (unitPrice*quantity)
    }
    document.getElementById('total').value = total;
}
function order() {
    // Get the list of selected products
    var bookList = [];
    
    var checkboxes = document.querySelectorAll('input[type=checkbox][name=example-checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        var row = checkboxes[i].closest('tr');
        
        var book = {
            book_id: parseInt(row.querySelector('th:nth-child(1)').textContent.trim()),
            amount: row.querySelector('input[type=number].quantity').value.trim(),
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
            
        };
        bookList.push(book);
    }
    console.log(bookList)
 
    var url = "/Apiv1/Order";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            alert("Error: " + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        alert("Network error");
    };
    xhr.send(JSON.stringify({ bookList: bookList }));
}