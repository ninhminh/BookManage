from django.urls import path 
from .views import Token, AddCategory, AddBook, CategoryDetail, DeleteCategory, EditBook, DeleteBook, ListCategory, ListBook, BookDetail,ListUser,Signup
from .views import Update,ListRoleByUserLogin, Account, Password, Cart, AddCart, OrderProduct, Search, ListOrder, UpdateStatus, DeleteOrder, EditOrder, Comments, PostRatingAndComment
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
    path('Cart', Cart.as_view()),
    path('AddCart/<int:id>', AddCart.as_view()),
    path('Order', OrderProduct.as_view()),
    path('Order/<int:id>', OrderProduct.as_view()),
    path('ListRoleByUserLogin',ListRoleByUserLogin.as_view()),
    path('Account',Account.as_view()),
    path('Password',Password.as_view()),
    path('Search/<str:key>', Search.as_view()),
    path('ListOrder',ListOrder.as_view()),
    path('UpdateStatus/<int:id>', UpdateStatus.as_view()),
    path('DeleteOrder/<int:id>', DeleteOrder.as_view()),
    path('EditOrder/<int:id>', EditOrder.as_view()),
    path('Comments/<int:id>', Comments.as_view()),
    path('PostComment/<int:id>', PostRatingAndComment.as_view()),

]
