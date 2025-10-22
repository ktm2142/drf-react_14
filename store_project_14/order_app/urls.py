from django.urls import path
from .views import (OrderRetrieveAPIView, OrderSubmitAPIVIew, OrderDeleteAPIVIew, OrderItemCreateAPIView,
                    OrderItemUpdateDeleteAPIView)

urlpatterns = [
    path('retrieve/', OrderRetrieveAPIView.as_view(), name='retrieve_order'),
    path('submit/', OrderSubmitAPIVIew.as_view(), name='submit_order'),
    path('delete/', OrderDeleteAPIVIew.as_view(), name='delete_order'),
    path('add_item/', OrderItemCreateAPIView.as_view(), name='add_item'),
    path('update_delete/<int:pk>/', OrderItemUpdateDeleteAPIView.as_view(), name='update_delete'),
]
