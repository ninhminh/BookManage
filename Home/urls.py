"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from .views import  Home, Account, Contact, Login, Pay, Payment, Product, ProductDetail, Shop,ListCatalog, ListOrder, ListProduct,ListType, ListUser, AddProduct, EditProduct, EditUser,Search,Me, Pay, Cart, ChangePassword, History, Statics,AddCategory,EditCategory, EditOrder
from django.urls import path
from .views import image_view

urlpatterns = [
   
    path('Account', Account.as_view()),
    path('Contact', Contact.as_view()),
    path('Home', Home.as_view()),
    path('Login', Login.as_view()),
    path('Payment', Payment.as_view()),
    path('Product', Product.as_view()),
    path('ProductDetail/<int:id>', ProductDetail.as_view()),
    path('Shop', Shop.as_view()),
    path('ListCatalog', ListCatalog.as_view()),
    path('ListOrder', ListOrder.as_view()),
    path('ListProduct', ListProduct.as_view()),
    path('ListType', ListType.as_view()),
    path('ListUser', ListUser.as_view()),
    path('AddProduct', AddProduct.as_view()),
    path('EditProduct/<int:id>', EditProduct.as_view()), 
    path('EditUser/<int:id>', EditUser.as_view()),
    path('Search/<str:key>',Search.as_view()),
    path('Pay/<int:id>', Pay.as_view()),
    path('Me', Me.as_view()),
    path('Cart',Cart.as_view()),
    path('ChangePassword', ChangePassword.as_view()),
    path('History', History.as_view()),
    path('Statics', Statics.as_view()),
    path('AddCategory',AddCategory.as_view()),
    path('EditCategory/<str:idCategory>',EditCategory.as_view()),
    path('Home/Media/Image/<str:image_name>',image_view),
    path('EditOrder/<int:id>', EditOrder.as_view()),
]
