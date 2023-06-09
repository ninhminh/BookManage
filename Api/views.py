from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from Entity.models.User import User
from  core.settings import BASE_DIR, MEDIA_ROOT, SECRET_KEY
import jwt

from PIL import Image
from django.conf import settings
import os
from datetime import datetime,timedelta,timezone
from rest_framework.decorators import APIView
from Entity.models.Role import Role
from Entity.models.UserRole import UserRole
from Entity.models.Category import Category
from Entity.models.Book import Book
from Entity.models.Bought import Bought
from Entity.models.Bill import Bill
from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
from Entity.serializers.CategorySerializer import CategorySerializer
from Entity.serializers.BookSerializer import BookSerializer
from Entity.serializers.UserSerializer import UserSerializer
from Entity.serializers.UserRoleSerializer import UserRoleSerializer
from Entity.serializers.BoughtSerializer import BoughtSerializer
class Token(APIView):
    def post(self,request):
        exp=datetime.now(tz=timezone.utc) + timedelta(minutes=50)
        userRequestToken =request.data     
        if 'Username' not in userRequestToken or not userRequestToken['Username']:
            return Response({"message":"Vui lòng nhập Username"},status=status.HTTP_400_BAD_REQUEST)
        if 'Password' not in userRequestToken or not userRequestToken['Password']:
            return Response({"message":"Vui lòng nhập Password"},status=status.HTTP_400_BAD_REQUEST)
        try:
            user= User.objects.get(UserName=userRequestToken['Username'],Password=userRequestToken['Password'])

        except:    
            return Response({"message":"User này không tồn tại"},status=status.HTTP_404_NOT_FOUND)
        roles=[]
        userRoles=UserRole.objects.filter(User=user)
        for userRole in userRoles:
            roles.append(userRole.Role.RoleName)
        payLoad = {'UserID':user.pk,"Username":user.UserName,"Roles":roles,"exp":exp}
        jwtData = jwt.encode(payLoad,SECRET_KEY,) 
        jwtUser={"access":jwtData}
        return Response(jwtUser,status=status.HTTP_201_CREATED)
class ListCategory(APIView):
    def get(self, request):
        category = Category.objects.all()
        categoryList = []
        for i in category:
            categoryList.append({"id": i.pk, "CategoryName": i.CategoryName})
        return Response(categoryList, status=200)
    
class AddCategory(APIView):
    # @method_decorator(RoleRequest(allowedRoles=['Admin']))
    # def post(self, request):
        
    #     name = request.data['name']
    #     new_category = Category(CategoryName = name)
    #     new_category.save()
    #     return Response({'message': 'thanh cong'}, status=200)
    def post(self,request):
        categorySerializer = CategorySerializer(data=request.data)
        if categorySerializer.is_valid():
            categorySerializer.save()
            return Response(categorySerializer.data, status=201)
        return Response(categorySerializer.errors, status=400)
class CategoryDetail(APIView):
    def get(self, request, id):
        category = Category.objects.get(pk=id)
        categorySerializer= CategorySerializer(category)
        return Response(categorySerializer.data, status=200)
    def put(self, request, id):
        category = Category.objects.get(pk=id)
        name = request.data['name']
        category.CategoryName = name
        category.save()
        return Response({"message":"đã sửa"}, status=200)
class DeleteCategory(APIView):
    def delete(self, request, id):
        category = Category.objects.get(pk=id)
        category.delete()
        return Response ({"message":"đã xóa"}, status=200)
class AddBook(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin']))
    def post(self, request):
        Image = request.FILES.get('Image')     
        
        if Image:
            image_path = os.path.join(MEDIA_ROOT,'Image',Image.name)[:-4]+'(0).png'
            check=0
            while  os.path.isfile(image_path) :
                check+=1
                image_path = os.path.join(MEDIA_ROOT,'Image', Image.name)[:-4]+'('+str(check)+').png'
                
            with open(image_path, 'wb') as f:
                for chunk in Image.chunks():
                    f.write(chunk)
            Image=image_path[len(os.path.join(BASE_DIR)):] 
        else:
            Image=''
       
        name = request.data['name']
        date = request.data['date']
        content = request.data['content']
        pageNumber = request.data['pageNumber']
        price = request.data['price']
        author = request.data['author']
        category = request.data['category']
        #print(name, img, tt, price, code, quatily)
        new_book = Book(BookName= name, Releasedate = date, ContentBook = content, PageNumber = pageNumber, Price = price, BookImage = Image, Author = author, Category = Category.objects.get(pk= category))       
        new_book.save()      
        return Response({'message':'thành công'}, status=201)
class EditBook (APIView):
    def put(self, request, id):
        book = Book.objects.get(pk=id)
        Image = request.FILES.get('Image')     
        
        if Image:
            image_path = os.path.join(MEDIA_ROOT,'Image',Image.name)[:-4]+'(0).png'
            check=0
            while  os.path.isfile(image_path) :
                check+=1
                image_path = os.path.join(MEDIA_ROOT,'Image', Image.name)[:-4]+'('+str(check)+').png'
                
            with open(image_path, 'wb') as f:
                for chunk in Image.chunks():
                    f.write(chunk)
            Image=image_path[len(os.path.join(BASE_DIR)):] 
            book.BookImage = Image
        else:
            Image=''
        name = request.data['name']
        date = request.data['date']
        content = request.data['content']
        pageNumber = request.data['pageNumber']
        price = request.data['price']
        author = request.data['author']
       
        category = request.data['category']
        book.BookName = name
        book.Releasedate = date
        book.ContentBook = content
        book.PageNumber = pageNumber
        book.Price = price
        book.Author = author
        book.Category = Category.objects.get(pk= category)
        
        book.save()
        return Response({"message":"thành công"}, status=200)
class DeleteBook(APIView):
    def delete(self, request, id):
        book = Book.objects.get(pk=id)
        book.delete()
        return Response({"message":"đã xóa"}, status=200)
class ListBook(APIView):
    # def get(self, request):
    #     book = Book.objects.all()
    #     bookList = []
    #     for i in book:
    #         bookList.append({"id": i.pk, "BookName": i.BookName, "Releasedate":i.Releasedate, "Content": i.ContentBook, "pageNumber": i.PageNumber, "Price":i.Price, "Author":i.Author, "Category": i.Category})
    #     return Response(bookList, status=200)
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)  # Chuyển đổi danh sách đối tượng Book thành JSON

        return Response(serializer.data, status=200)
class BookDetail(APIView):
    def get(self, request, id):
        try:
            book = Book.objects.get(pk=id)
        except:
            return Response({"massage":"không timff thaasy cc gì ca"}, status=404)
        serializer = BookSerializer(book)

        return Response(serializer.data, status=200)
class ListUser(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=200 )
class Signup(APIView):
    def post(self, request):
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid():
            user=userSerializer.save()
            role=Role.objects.get(pk=2)
            userrole =UserRole(Role=role,User=user)
            userrole.save()
            exp=datetime.now(tz=timezone.utc) + timedelta(minutes=50)
            roles=[]
            roles.append(userrole.Role.RoleName)
            payLoad = {'UserID':user.pk,"Username":user.UserName,"Roles":roles,"exp":exp}
            jwtData = jwt.encode(payLoad,SECRET_KEY,) 
            jwtUser={"access":jwtData}
            return Response(jwtUser,status=status.HTTP_201_CREATED)
        return Response(userSerializer.errors,status=400)
class Update(APIView):
    def get(self, request):
        books = Book.objects.all().order_by('-pk')
        serializer = BookSerializer(books, many=True)  # Chuyển đổi danh sách đối tượng Book thành JSON

        return Response(serializer.data, status=200)
class AddCart(APIView):
    def post(self,request,id):
        if not request.userID:
            return Response({"message": "Bạn chưa đăng nhập"}, status=401)
      
        userid = request.userID
        quantity = request.data['Quantity']
        book = Book.objects.get(pk=id)
        user = User.objects.get(pk=userid)
        boughted=Bought.objects.filter(Book=book,User=user,StatusBuy='InOrder')
        if(len(boughted)!=0):
            boughted[0].Quantity+=int(quantity)
            boughted[0].save()
        else:
            bought = Bought(Book=book,Quantity=quantity,User=user,StatusBuy='InOrder')
            bought.save()
        return Response({"message": "Đã thêm vào giỏ hàng"}, status=201)
    def patch(self,request,id):
        userid = request.userID
        quantity = request.data['Quantity']
        book = Book.objects.get(pk=id)
        user = User.objects.get(pk=userid)
        boughted=Bought.objects.filter(Book=book,User=user,StatusBuy='InOrder')
        if(len(boughted)!=0):
            boughted[0].Quantity=int(quantity)
            boughted[0].save()
            return Response({"message": "Thành công"}, status=200)
        else:
            return Response({"message": "Hàng không trong giỏ hàng"}, status=400)
class Cart(APIView):
    def get(self,request):
        book = Bought.objects.filter(StatusBuy='InOrder')
        serializer = BoughtSerializer(book, many=True)
        return Response(serializer.data, status=200)
class Order(APIView):
    def post(self,request):
        print(request.data)
        newBill= Bill(StatusBill='Đang Giao Hàng',DeliveryTime=datetime.now(),DeliveryDestination=datetime.now()+timedelta(days=2),Address=request.data['Address'],PhoneNumber=request.data['Phone'])
        newBill.save()
        for productid in request.data['productList']:
            product= Bought.objects.get(pk=productid['id'])
            product.Bill=newBill
            product.StatusBuy='InBill'
            product.Quantity=0
            product.save()
        return Response({"message": "Thành Công"}, status=201)
class ListRoleByUserLogin(APIView):
    @method_decorator(RoleRequest(allowedRoles=['Admin','User']))
    def get(self, request):
       
        return Response({"roles":request.roles}, status=200)
class Account(APIView):
    def get(self, request):
        userid = request.userID
        user = User.objects.get(pk=userid)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
    
    def put(self, request):
        userid = request.userID
        user = User.objects.get(pk=userid)
        name = request.data['name']
        email = request.data['email']

        user.FullName = name
        user.Email = email
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
class Password(APIView):
    def put(self, request):
        userid = request.userID
        user = User.objects.get(pk=userid)
        password = request.data['password']
        user.Password = password
        user.save()
        return Response({"message": "đã sửa mật khẩu"}, status=200)
# class OrderProduct(APIView):
#     def get(self,request):
        
#         userid = request.userID
#         user = User.objects.get(pk=userid)
#         orders = Bill.objects.all()
#         # Lọc các đơn hàng của user có status là 1
#         user_orders = [bill for bill in orders if bill.User == user and (bill.Status == "Chờ Xác Nhận" or bill.Status == "Đang gia hàng")]

#         # Sắp xếp theo ngày đặt hàng (ngày gần nhất đến xa nhất)
#         sorted_orders = sorted(user_orders, key=lambda x: x.Date, reverse=True)

#         # Tạo danh sách đơn hàng đã sắp xếp để trả về
#         cartList = []
#         for order in sorted_orders:
#             cartList.append({
#                 "id": order.pk,
#                 "ProductId": order.Product.pk,
#                 "ProductName": order.Product.ProductName,
#                 'img': order.Product.Imgage,
#                 "ProductCode": order.Product.ProductCode,
#                 "Price": order.Product.Price,
#                 "Quatily": order.Product.Quatily,
#                 "Date" : order.Date,
#                 "Status": order.Status,
#                 "Amount": order.Amount
#             })

#         # Trả về danh sách đã sắp xếp
#         return Response(cartList, status=200)
#     def post(self, request):
#         userid = request.userID
#         products = json.loads(request.body)['productList']
#         user = User.objects.get(pk=userid)
#         for product in products:
#             product_id = product['product_id']
#             amount = product['amount']
#             phone = product['phone']
#             print("phone=", phone)
#             address = product['address']
#             try:
#                 order = Bill.objects.get(User=user, Book__pk=product_id, Status='Giỏ Hàng')
#                 order.StatusBill = "Chờ Xác Nhận"
#                 order.Amount = amount
#                 order.PhoneNumber = phone
#                 order.DeliveryTime=datetime.now()
#                 order.Address = address
#                 order.save()
#             except:
#                 try:
#                     product_obj = Product.objects.get(pk=product_id)
#                 except Product.DoesNotExist:
#                     return Response("Sản phẩm không tồn tại", status=400)
#                 order = Order(User=user, Product=product_obj, Amount=amount, Date=datetime.now(), Status='Chờ Xác Nhận', PhoneNumber = phone, Address = address)
#                 order.save()
#         return Response("Đặt hàng thành công", status=200)
    
#     def delete(self, request, id):
#         order = Order.objects.get(pk=id)
#         order.delete()
#         return Response({"message": "đã xóa"}, status=200)