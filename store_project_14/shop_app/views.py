from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductRefSerializer, ProductDetailSerializer


# Getting list of all categories
class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    pagination_class = None



# Getting list of products related to category.
# Using ProductRefSerializer for less info in response,
# and without nesting
class CategoryDetailAPIView(generics.ListAPIView):
    serializer_class = ProductRefSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('pk')
        return Product.objects.filter(category_id=category_id).order_by('name')


# Getting full info about product
class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.select_related('category')
