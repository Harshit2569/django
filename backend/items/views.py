from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer

class ItemListCreateAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all().order_by('-created_at')
    serializer_class = ItemSerializer
