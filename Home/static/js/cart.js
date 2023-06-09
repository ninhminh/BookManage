cart();
update()
function cart() {
    const xhttp = new XMLHttpRequest();
    var userID = localStorage.getItem('userID');
    xhttp.onload = function () {
        var ResponseJson = xhttp.responseText
        var Response = JSON.parse(ResponseJson)
        if (xhttp.status = 200) {
            
            var serverListElement = document.getElementById('cart');
            //khai báo biến String(dùng để thay đổi html trong thẻ bên trên)
            var serverListHTML = '';
            for (var i = 0; i < Response.length; i++) {

                serverListHTML += '<tr> <th class = "hide">' + Response[i].Book.id + '</th> <th>' + (i + 1)
                serverListHTML += '</th> <th>' +   Response[i].Book.BookName
                serverListHTML += '</th><th>' + Response[i].Book.Price + '</th><th><input type="number" id = "amount" value="'
                serverListHTML += Response[i].Quantity + '" min="1" class="quantity" id = "quantity" onchange="updateTotalPrice(this)"></th><th class="total-price" onchange="update()">'+ Response[i].Book.Price * Response[i].Quantity +'</th><td class="setupproduct"><input type="checkbox" name="example-checkbox" onclick="update()" checked></div> </td> <th class = "hide">' + Response[i].id + '</th></tr>';
            }
            serverListElement.innerHTML = serverListHTML;
        } else {

        }

    }
    xhttp.open("GET", "/Apiv1/Cart", false);
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.setRequestHeader("userID", userID);
    xhttp.send();
}


function updateTotalPrice(input) {
    var row = input.parentNode.parentNode;
    var unitPrice = parseFloat(row.getElementsByTagName('th')[3].textContent);
    var quantity = parseInt(input.value);
    var totalPrice = unitPrice * quantity;
    row.getElementsByClassName('total-price')[0].textContent = totalPrice;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        
       
        if (xhttp.status == 200) {
            update();
        } else {
  
        }
  
    }
    const dataCategory ={
      Quantity: parseInt(input.value)
    }
    var  dataCategoryJson =JSON.stringify(dataCategory);
    xhttp.open("PATCH", "/Apiv1/AddToCart/"+row.getElementsByTagName('th')[0].textContent, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhttp.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhttp.send(dataCategoryJson);
    
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
    var productList = [];
    var userID = localStorage.getItem('userID');
    var checkboxes = document.querySelectorAll('input[type=checkbox][name=example-checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        var row = checkboxes[i].closest('tr');
        
        var product = {
            id: row.querySelector('th:nth-child(8)').textContent.trim(),
            Quantity: row.querySelector('input[type=number].quantity').value.trim(),
          
            
        };
        productList.push(product);
    }
    var Bill={
        Phone: document.getElementById('phone').value,
        Address: document.getElementById('address').value,
        productList:productList
    }

 
    var url = "/Apiv1/Order";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    var jwtToken = localStorage.getItem("token")
    //định dạng gửi đi787
    xhr.setRequestHeader("Authorization", "Bearer " + jwtToken)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 201) {
            cart();
        } else {
            alert("Error: " + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        alert("Network error");
    };
    xhr.send(JSON.stringify(Bill));
}