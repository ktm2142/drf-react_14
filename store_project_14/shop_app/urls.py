from django.urls import path

from shop_app.views import CategoryListAPIView, CategoryDetailAPIView, ProductDetailAPIView, ProductSearchFilterAPIVIew

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='categories'),
    path('category/<int:pk>/', CategoryDetailAPIView.as_view(), name='category_detail'),
    path('product/<int:pk>/', ProductDetailAPIView.as_view(), name='product'),
    path('search_filter/', ProductSearchFilterAPIVIew.as_view(), name='search_filter'),
]