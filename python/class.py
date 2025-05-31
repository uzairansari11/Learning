""" 


🧩 Exercise 1: Create Your Own Class
Write a Python class called Book with:

Attributes: title, author

Method: describe() → prints "Title: <title>, Author: <author>"

Try writing it yourself first, then compare with this:

<details> <summary>Show Solution</summary>
"""

class Book:
      # This is class variable
      publisher="American papers"
      def  __init__(self,title,author):
      # these are instance variable  
        self.title=title
        self.author=author

      def describe(self):
          print(f"Title: {self.title}, Author: {self.author}")
          



# Class variables vs instance variables

# ➕ Instance Variables:
#Defined in __init__ using self.

#      

"""
🧩 Exercise 2: Use Class and Instance Variables
Write a class Student with:

Instance variables: name, grade

Class variable: school_name set to "Green High"

Method info() that prints:
"Student <name>, Grade: <grade>, School: <school_name>"

"""


class School:
      school_name="Green High"

      def __init__(self,name,grade):
        self.name=name
        self.grade=grade

      def info(self):
          print(f"Student {self.name}, Grade: {self.grade}, School: {self.school_name}")
       


