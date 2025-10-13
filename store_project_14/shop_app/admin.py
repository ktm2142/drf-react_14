from django.contrib import admin
from shop_app.models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']
    search_fields = ['id', 'name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'category']
    list_display_links = ['id', 'name', 'price', 'category']
    list_filter = ['category']
    search_fields = ['id', 'name']
