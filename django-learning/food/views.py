from django.http import HttpResponse
from django.shortcuts import render,redirect
from .models import Item
from django.template import loader
from .forms import ItemForm

# View to list all items
def foodView(request):
    item_list = Item.objects.all()  # Get all items from the database
    # template = loader.get_template('food/index.html')  # Load the template
    print(item_list)
    context = {
        'item_list': item_list  # Pass item list to the template
    }
    # return HttpResponse(template.render(context, request))  # Render the template with context

    return render(request,"food/index.html",context)

# Simple test view
def item(request):
    return HttpResponse("<h1>this is an item view</h1>")


def details(request,item_id):
    item=Item.objects.get(pk=item_id)
    print(item)
    context={
        "item":item
    }
    return render(request,"food/details.html",context)


def create_item(request):
    form=ItemForm(request.POST or None)

    if form.is_valid():
        form.save()
        return redirect("food:index")


    return render(request,"food/item_form.html",{'form':form})


def update_item(request,item_id):
    item=Item.objects.get(id=item_id)

    form = ItemForm(request.POST or None,instance=item)

    if form.is_valid():
        form.save()
        return redirect("food:index")
    

    return render(request,"food/item_form.html",{"form":form,"data":item})