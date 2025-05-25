from django.http import HttpResponse
from django.shortcuts import render
from .models import Item
from django.template import loader

# View to list all items
def foodView(request):
    item_list = Item.objects.all()  # Get all items from the database
    template = loader.get_template('food/index.html')  # Load the template
    context = {
        'item_list': item_list  # Pass item list to the template
    }
    return HttpResponse(template.render(context, request))  # Render the template with context

# Simple test view
def item(request):
    return HttpResponse("<h1>this is an item view</h1>")
