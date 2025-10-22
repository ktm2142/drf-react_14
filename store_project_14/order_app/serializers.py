from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from .models import OrderItem, Order
from shop_app.models import Product
from shop_app.serializers import ProductRefSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductRefSerializer(read_only=True)
    product_id = PrimaryKeyRelatedField(
        source='product',
        write_only=True,
        queryset=Product.objects.all()
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'order_items', 'status', 'total', 'created_at']


