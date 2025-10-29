from django.urls import path
from .views import (OrderRetrieveAPIView, OrderSubmitAPIVIew, OrderDeleteAPIVIew, OrderItemCreateAPIView,
                    OrderItemUpdateDeleteAPIView, OrderHistoryAPIVIew)

urlpatterns = [
    path('retrieve/', OrderRetrieveAPIView.as_view(), name='order_retrieve'),
    path('submit/', OrderSubmitAPIVIew.as_view(), name='order_submit'),
    path('delete/', OrderDeleteAPIVIew.as_view(), name='order_delete'),
    path('history/', OrderHistoryAPIVIew.as_view(), name='order_history'),
    path('add_item/', OrderItemCreateAPIView.as_view(), name='add_item'),
    path('update_delete/<int:pk>/', OrderItemUpdateDeleteAPIView.as_view(), name='update_delete'),
]
