from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=150)
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL, related_name='products')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

