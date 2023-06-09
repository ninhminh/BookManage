from django.urls import path 
from .views import Token, AddCategory, AddBook, CategoryDetail, DeleteCategory, EditBook, DeleteBook, ListCategory, ListBook, BookDetail,ListUser,Signup
from .views import Update, AddCart,Order,Cart,ListRoleByUserLogin, Account, Password
urlpatterns = [
    
    path('Login', Token.as_view()),
    path('Signup', Signup.as_view()),
    path('AddCategory', AddCategory.as_view()),
    path('AddBook', AddBook.as_view()),
    path('CategoryDetail/<int:id>', CategoryDetail.as_view()),
    path('DeleteCategory/<int:id>', DeleteCategory.as_view()),
    path('EditBook/<int:id>', EditBook.as_view()),
    path('DeleteBook/<int:id>', DeleteBook.as_view()),
    path('ListCategory', ListCategory.as_view()),
    path('ListBook', ListBook.as_view()),
    path('BookDetail/<int:id>', BookDetail.as_view()),
    path('ListUser',ListUser.as_view()),
    path('Update',Update.as_view()),
    path('AddToCart/<int:id>',AddCart.as_view()),
    path('Cart',Cart.as_view()),
    path('Order',Order.as_view()),
    path('ListRoleByUserLogin',ListRoleByUserLogin.as_view()),
    path('Account',Account.as_view()),
    path('Password',Password.as_view()),
]
