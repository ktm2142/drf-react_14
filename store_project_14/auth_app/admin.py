from django.contrib import admin

from auth_app.models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'phone_number']
    list_display_links = ['id', 'username', 'phone_number']
    search_fields = ['id', 'phone_number']
