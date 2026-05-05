from django.urls import path
from . import views

urlpatterns = [
    path('api/items/', views.ItemListCreateAPIView.as_view(), name='item-list-create'),
]
