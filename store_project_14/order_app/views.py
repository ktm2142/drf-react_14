from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from order_app.serializers import OrderSerializer, OrderItemSerializer


class OrderRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    """
    Retrieve the current user's draft order with related items and products.  
    We return the order only if it has items,
    raise NotFound to indicate no active order
    even if there's empty order exists.
    """

    def get_object(self):
        return get_object_or_404(
            Order.objects.prefetch_related('order_items__product').distinct(),
            user=self.request.user,
            status='draft',
            order_items__isnull=False
        )


class OrderSubmitAPIVIew(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    """
    Submitting order is basically
    finding order belong to current user,
    and only changing status to pending
    """

    def get_object(self):
        return get_object_or_404(
            Order,
            user=self.request.user,
            status='draft'
        )

    def perform_update(self, serializer):
        serializer.save(status='pending')


class OrderDeleteAPIVIew(generics.DestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    # deleting order of current user

    def get_object(self):
        return get_object_or_404(
            Order,
            user=self.request.user,
            status='draft'
        )


class OrderHistoryAPIVIew(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related('order_items__product').exclude(status='draft')


class OrderItemCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    """
    Ensure the user has a draft order; create one if it doesn't exist. 
    If the product is already in the draft order, increase its quantity 
    instead of creating a duplicate OrderItem.
    """

    def perform_create(self, serializer):
        order, _ = Order.objects.get_or_create(
            user=self.request.user,
            status='draft'
        )

        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        order_item, created = OrderItem.objects.get_or_create(
            order=order,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            order_item.quantity += quantity
            order_item.save()


class OrderItemUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    """
    To update or delete order item we get queryset of order items
    we can work with. That belong to current user with draft order  
    """

    def get_queryset(self):
        return OrderItem.objects.filter(
            order__user=self.request.user,
            order__status='draft'
        )
