from django.shortcuts import render
from django.views import View
from core.settings import MEDIA_ROOT
from django.http import HttpResponse
import os

class Home(View):
    def get(self, request):
        return render(request, 'Home.html')
class Account(View):
    def get(self, request):
        return render(request, 'Account.html')
class Contact(View):
    def get(self, request):
        return render(request, 'Contact.html')
class Login(View):
    def get(self, request):
        return render(request, 'Login.html')
class Pay(View):
    def get(self, request,id):
        return render(request, 'Pay.html')
class Payment(View):
    def get(self, request):
        return render(request, 'payment.html')
class Product(View):
    def get(self, request):
        return render(request, 'Product.html')
class ProductDetail(View):
    def get(self, request,id):
        return render(request, 'ProductDetail.html')
class Shop(View):
    def get(self, request):
        return render(request, 'Shop.html')
class ListCatalog(View):
    def get(self, request):
        return render(request, 'ListCatalog.html')
class ListOrder(View):
    def get(self, request):
        return render(request, 'ListOrder.html')
class ListProduct(View):
    def get(self, request):
        return render(request, 'ListProduct.html')
class ListType(View):
    def get(self, request):
        return render(request, 'ListType.html')
class ListUser(View):
    def get(self, request):
        return render(request, 'ListUser.html')
class AddProduct(View):
    def get(self, request):
        return render(request, 'AddProduct.html')
class EditProduct(View):
    def get(self, request,id):
        return render(request, 'EditProduct.html')
class EditUser(View):
    def get(self, request, id):
        return render(request, 'EditUser.html')
class Search(View):
    def get(self,request,key):
        return render(request,'Search.html')
class Me(View):
    def get(self, request):
        return render(request, 'Me.html') 
class Cart(View):
    def get(self,request):
        return render(request,'Cart.html')
class ChangePassword(View):
    def get(self, request):
        return render(request, 'ChangePassword.html')
class History(View):
    def get(self,request):
        return render(request, "History.html")
class Statics(View):
    def get(self,request):
        return render(request, "Statics.html")
class AddCategory(View):
    def get(self,request):
        return render(request,'AddCategory.html')
class EditCategory(View):
    def get(self,request,idCategory):
        return render(request,'EditCategory.html')
class EditOrder(View):
    def get(self, request, id):
        return render(request, 'EditOrder.html')
def image_view(request, image_name):
    print("ahihi")
    # Lấy đường dẫn tới thư mục chứa các tệp hình ảnh
    image_dir = MEDIA_ROOT
    
    # Tạo đường dẫn tới tệp hình ảnh cần trả về
    image_path = os.path.join(image_dir,'Image', image_name)
    print(image_path)
    # Đọc nội dung của tệp hình ảnh
    with open(image_path, 'rb') as f:
        image_data = f.read()
    
    # Trả về nội dung của hình ảnh dưới dạng phản hồi HTTP
    response = HttpResponse(content_type='image/png')
    response.write(image_data)
    
    return response