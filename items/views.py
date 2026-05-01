from django.shortcuts import render, redirect
from .models import Item


def index(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        if name:
            Item.objects.create(name=name)
        return redirect('index')
    items = Item.objects.order_by('-created_at')
    return render(request, 'items/index.html', {'items': items})
