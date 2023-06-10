from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from Entity.models.User import User
from  core.settings import BASE_DIR, MEDIA_ROOT, SECRET_KEY
import jwt
import json
from django.db.models import Q,F, Count

from PIL import Image
from django.conf import settings
import os
from datetime import datetime,timedelta,timezone
from rest_framework.decorators import APIView
from Entity.models.Role import Role
from Entity.models.UserRole import UserRole
from Entity.models.Category import Category
from Entity.models.Book import Book
from Entity.models.Order import Order
from Entity.models.Comment import Comment
from Entity.models.Rate import Rate

from core.roleLoginDecorater import RoleRequest
from django.utils.decorators import method_decorator
from Entity.serializers.CategorySerializer import CategorySerializer
from Entity.serializers.BookSerializer import BookSerializer
from Entity.serializers.UserSerializer import UserSerializer
from Entity.serializers.UserRoleSerializer import UserRoleSerializer
from Entity.serializers.OrderSerializer import OrderSerializer

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
class AddCart(APIView):
    def post(self,request,id):
        userid = request.userID
        amount = request.data['Amount']
        book = Book.objects.get(pk=id)
        user = User.objects.get(pk=userid)
        print(userid,amount,id)
        if not userid:
            return Response({"message": "Bạn chưa đăng nhập"}, status=401)
        try:
            order = Order.objects.get(User_id=user.pk, Book_id=book.pk, Status = "Giỏ Hàng")
            order.Amount += int(amount)
            order.save()
        except:
            order = Order(User=user, Book=book,Amount=amount,Date= datetime.now(), Status = "Giỏ Hàng")
            print(order)
            print("thao")
            order.save()
        return Response({"message": "Đã thêm vào giỏ hàng"}, status=200)  
class Cart(APIView):
    def get(self, request):
        userid = request.userID
        user = User.objects.get(pk=userid)
        orders = Order.objects.all()
        print("CartGet")
        cartList = []
        for order in orders:
            if order.User == user and order.Status == "Giỏ Hàng":
                cartList.append({"id" : order.pk, "BookID": order.Book.pk,  "BookName":order.Book.BookName, "Author":order.Book.Author, "Price":order.Book.Price, "Category":order.Book.Category.CategoryName, "Status":order.Status, "Amount":order.Amount})
        return Response(cartList, status=200)  
class OrderProduct(APIView):
    def get(self,request):
        
        userid = request.userID
        user = User.objects.get(pk=userid)
        orders = Order.objects.all()
        # Lọc các đơn hàng của user có status là 1
        user_orders = [order for order in orders if order.User == user and (order.Status == "Chờ Xác Nhận" or order.Status == "Đã Xác Nhận")]

        # Sắp xếp theo ngày đặt hàng (ngày gần nhất đến xa nhất)
        sorted_orders = sorted(user_orders, key=lambda x: x.Date, reverse=True)

        # Tạo danh sách đơn hàng đã sắp xếp để trả về
        cartList = []
        for order in sorted_orders:
            cartList.append({
                "id": order.pk,
                "BookID": order.Book.pk,
                "BookName": order.Book.BookName,
                'img': order.Book.BookImage,
                "author": order.Book.Author,
                "Price": order.Book.Price,
                "category": order.Book.Category.CategoryName,
                "Date" : order.Date,
                "Status": order.Status,
                "Amount": order.Amount
            })

        # Trả về danh sách đã sắp xếp
        return Response(cartList, status=200)
    def post(self, request):
        userid = request.userID
        books = request.data['bookList']
    
        user = User.objects.get(pk=userid)
        for book in books:
            book_id = book['book_id']
            amount = book['amount']
            phone = book['phone']
            print("phone=", phone)
            address = book['address']
            try:
                order = Order.objects.get(User=user, Book__pk=book_id, Status='Giỏ Hàng')
                order.Status = "Chờ Xác Nhận"
                order.Amount = amount
                order.PhoneNumber = phone
                order.Date=datetime.now()
                order.Address = address
                order.save()
            except:
                try:
                    book_obj = Book.objects.get(pk=book_id)
                except Book.DoesNotExist:
                    return Response("Sản phẩm không tồn tại", status=400)
                order = Order(User=user, Book=book_obj, Amount=amount, Date=datetime.now(), Status='Chờ Xác Nhận', PhoneNumber = phone, Address = address)
                order.save()
        return Response("Đặt hàng thành công", status=200)
    
    def delete(self, request, id):
        order = Order.objects.get(pk=id)
        order.delete()
        return Response({"message": "đã xóa"}, status=200)
class Search(APIView):
    def get(self, request , key):
        bookQuery = Book.objects.filter(Q(BookName__icontains=key)|Q(Author__icontains=key))
        book = []
        for i in bookQuery:
            book.append({"id":i.pk, "BookName": i.BookName, "Author": i.Author, "Price": i.Price, "PageNumber": i.PageNumber, "Imgage": i.BookImage, "Releasedate": i.Releasedate})
        return Response(book, status=200)
class ListOrder(APIView):
    def get(self, request):
        
        orders = Order.objects.all()
        order_list = []
        for order in orders:
            order_list.append({
                "id": order.id,
                "User": order.User.UserName,
                "Book": order.Book.BookName,
                "Date": order.Date,
                "Status": order.Status,
                "Amount": order.Amount,
                "Address": order.Address,
                "PhoneNumber": order.PhoneNumber,
                "Price": order.Book.Price
            })
        return Response(order_list, status=200)
class UpdateStatus(APIView):
    def put(self, request, id):
        
        order = Order.objects.get(pk=id)
            
        order.Status = 'Đã Xác Nhận'  # Thay đổi trạng thái thành 3
        order.save()
        return Response({"message":"ok"},status=200)
class DeleteOrder(APIView):
    def delete(self, request, id):
        order = Order.objects.get(pk=id)
        order.delete()
        return Response({"message": "đã xóa"}, status=200)
class EditOrder(APIView):
    def put(self, request, id):
        order = Order.objects.get(pk=id)
        Phone = request.data['Phone']
        Address = request.data['Address']
        order.PhoneNumber = Phone
        order.Address = Address
        order.save()
        return Response({"message": "đã sửa"}, status=200)
class Comments(APIView):
    def get(self, request, id):
        comments = Comment.objects.filter(Book__pk=id)
        commentList = []
        for com in comments:
            a=Rate.objects.filter(User = com.User, Book__pk=id)[0]
            commentList.append({"name":com.User.UserName, "comment":com.Comment, "rate":a.Rate})
        return Response(commentList, status=200)
class PostRatingAndComment(APIView):
    def post(self,request,id):
        user = User.objects.get(pk=request.userID)
        order= Order.objects.filter(User=user,Status='Đã nhận được hàng')
        if len(order)==0:
            return Response({"massage":"Bạn chưa mua sản phẩm"},status=400)
        rate = request.data['Rate']
        comment = request.data['Comment']
        book =Book.objects.get(pk=id)
        newRate = Rate(Book=book,User=user,Rate=rate)
        newComment = Comment(Comment=comment,User=user,Book=book)
        newRate.save()
        newComment.save()
        return Response({"message":"thành công"},status=201)
