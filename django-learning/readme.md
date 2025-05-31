# 🐍 Django Learning Guide for Beginners

Welcome to Django! This guide is made for beginners to help you understand Django concepts in a step-by-step and practical way.

---

## 🚀 Prerequisites

Before jumping into Django, make sure you:

* Know Python basics: variables, functions, conditionals, loops, classes
* Have Python (3.8 or higher) installed
* Have `pip` installed to manage packages
* Understand basic terminal/command-line usage
* (Optional but recommended) Know how to use virtual environments to isolate project dependencies

---

## 🧱 Setting Up Django (Step-by-Step)

### 1. ✅ Install Django

Install Django globally or in a virtual environment:

```bash
pip install django
```

Verify installation:

```bash
django-admin --version
```

### 2. 🛠️ Create a Django Project

```bash
django-admin startproject myproject
cd myproject
```

This creates a new folder `myproject` containing configuration files and the base setup for Django.

### 3. 📦 Create a Django App

```bash
python manage.py startapp myapp
```

In Django, a **project** is the full site, and an **app** is a component/module within that site (e.g., blog, shop, accounts).

---

## 📁 Understanding Django Project Structure

```
myproject/
├── manage.py             # CLI tool to interact with project
├── myproject/            # Project settings/configuration folder
│   ├── __init__.py
│   ├── settings.py       # Configuration for your project
│   ├── urls.py           # URL declarations
│   └── wsgi.py           # For deployment (web server interface)
├── myapp/                # Your app logic: models, views, urls, templates
│   ├── models.py         # Database models
│   ├── views.py          # Application logic
│   ├── urls.py           # App-specific URL routing (you create this)
│   ├── admin.py          # Admin panel registration
│   └── templates/        # HTML files for rendering
```

---

## 🔍 Core Django Concepts

### 🔹 Models (Database Tables)

Models define the structure of your data using Python classes:

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    published_date = models.DateField()
```

Each class = 1 table, and each attribute = 1 column.

---

### 🔹 Migrations (Database Syncing)

Migrations are Django’s way of propagating changes you make to your models into the database.

| Command               | What it does                                    |
| --------------------- | ----------------------------------------------- |
| `makemigrations`      | Creates a migration file from changes in models |
| `migrate`             | Applies those migrations to the database        |
| `sqlmigrate app 0001` | Shows raw SQL that will be executed             |

#### Workflow:

```bash
python manage.py makemigrations    # Generate migration files
python manage.py migrate           # Apply to the database
python manage.py sqlmigrate app 0001  # Preview SQL
python manage.py migrate --plan # Will show planned migration

```

---

### 🔹 Admin Panel (Auto-generated Backend)

The Django admin is a powerful, ready-made interface for managing models.

* Register models in `myapp/admin.py`:

  ```python
  from django.contrib import admin
  from .models import Book

  admin.site.register(Book)
  ```

* Create a superuser:

  ```bash
  python manage.py createsuperuser
  ```

  Then follow prompts to create username/password.

* Run development server:

  ```bash
  python manage.py runserver
  ```

  Visit: `http://127.0.0.1:8000/admin/`

---

### 🔹 Views (Logic Controllers)

Views receive web requests and return web responses. They can render HTML or return plain data.

```python
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello Django!")
```

For rendering templates:

```python
from django.shortcuts import render

def home(request):
    return render(request, 'home.html', {'name': 'Django'})
```

---

### 🔹 URLs (Routing)

Django maps URL paths to views using the `urls.py` file.

**myapp/urls.py**:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
]
```

**myproject/urls.py**:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
]
```

---

### 🔹 Templates (HTML Rendering)

Templates are HTML files that support variables and logic using Django Template Language (DTL).

**home.html**:

```html
<h1>Hello, {{ name }}!</h1>
```

Django automatically looks in `myapp/templates/`

View:

```python
return render(request, 'home.html', {'name': 'Django'})
```

---

### 🔹 Forms (Handling User Input)

Forms allow you to collect and validate user data.

```python
from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=50)
    email = forms.EmailField()
```

They can be used in views to validate and render forms in templates.

---

### 🔹 Django ORM (Querying Database)

ORM allows you to interact with the database using Python:

```python
# Create
Book.objects.create(title="Django", author="John")

# Read
Book.objects.all()
Book.objects.get(id=1)
Book.objects.filter(author="John")

# Update
book = Book.objects.get(id=1)
book.title = "New Title"
book.save()

# Delete
book.delete()
```

---

## 🧪 Useful Commands

| Command                                | Description               |
| -------------------------------------- | ------------------------- |
| `python manage.py runserver`           | Start development server  |
| `python manage.py createsuperuser`     | Create admin user         |
| `python manage.py makemigrations`      | Create migration files    |
| `python manage.py migrate`             | Apply DB changes          |
| `python manage.py shell`               | Interactive Django shell  |
| `python manage.py sqlmigrate app 0001` | Preview SQL for migration |

---

## 📌 Best Practice Tips

* Use virtual environments for project isolation
* Keep apps focused (one responsibility per app)
* Write and commit model changes before migrating
* Separate settings for dev and production (use `.env`)
* Always test your models with the Django shell
* Use Django's `get_object_or_404()` to avoid 500 errors
* Use built-in features before reinventing the wheel

---

## 📘 Recommended Resources

* [Django Official Docs](https://docs.djangoproject.com/en/stable/)
* [Django Girls Tutorial](https://tutorial.djangogirls.org/)
* [MDN Django Guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django)
* [RealPython Django Series](https://realpython.com/tutorials/django/)

---

## ✅ What’s Next

* Learn about:

  * Static files & media
  * Class-Based Views (CBVs)
  * Django Rest Framework (for APIs)
  * PostgreSQL/MySQL with Django
  * Authentication & Permissions
  * Deployment (Heroku, Render, Railway)

---

Happy coding with Django! 🚀
