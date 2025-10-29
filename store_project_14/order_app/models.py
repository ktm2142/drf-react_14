from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from config_app import settings
from shop_app.models import Product


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending'),
        ('completed', 'Completed')
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Orders'


    def __str__(self):
        return f'Order ID: {self.id} of {self.user}'

    @property
    def total(self):
        return sum(order_item.total_price for order_item in self.order_items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(50)
        ]
    )

    class Meta:
        verbose_name_plural = 'Order Items'

    def __str__(self):
        return f'{self.product.name}: {self.quantity}pcs'

    @property
    def total_price(self):
        return self.product.price * self.quantity
