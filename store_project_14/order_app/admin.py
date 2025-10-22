from django.contrib import admin
from django.contrib.admin import TabularInline

from .models import OrderItem, Order


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ['id', 'product', 'quantity', 'total_price']
    readonly_fields = ['id', 'total_price']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('product')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user__phone_number', 'created_at', 'status', 'total', 'updated_at']
    list_display_links = ['id', 'user__phone_number', 'created_at', 'status', 'updated_at']
    search_fields = ['id', 'user__phone_number', 'status']
    inlines = [OrderItemInline]
    readonly_fields = ['id',
                       'total',
                       'user_phone_number',
                       'user_first_name',
                       'user_last_name',
                       'user_city',
                       'user_address']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user').prefetch_related('order_items__product')

    @admin.display()
    def user_first_name(self, obj):
        return obj.user.first_name

    @admin.display()
    def user_last_name(self, obj):
        return obj.user.last_name

    @admin.display()
    def user_phone_number(self, obj):
        return obj.user.phone_number

    @admin.display()
    def user_city(self, obj):
        return obj.user.city

    @admin.display()
    def user_address(self, obj):
        return obj.user.address
