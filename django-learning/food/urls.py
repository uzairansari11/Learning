from django.urls import path
from . import views
app_name="food"
urlpatterns = [
   path("",views.foodView,name="index"),
   path('<int:item_id>/',views.details,name='details'),
   path("item/",views.item),
   path("add/",views.create_item,name="create_item"),
   path("update/<int:item_id>/",views.update_item,name="update_item")
]
