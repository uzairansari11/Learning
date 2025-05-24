print("hello world in python")
x,y,z=9,'hello',1

print(x,y,z)

f=c=e="orange"
f="hello"
print(c)
print(f)

b="new world"
b1=b

b="33"

print(b1)


fruits = ["apple", "banana", "cherry"]

f1,f2,f3=fruits
print(f1,f2,f3)


v=v1=2
v1=1
print(v1,v)


greet="hello dear"
message="how are you"

print(f"{greet} {message}")


someGlobalVariable="new global"

def checkingGlobal():
      global someGlobalVariable
      someGlobalVariable="hey i am changed"
      print(someGlobalVariable,"<-inside function")


checkingGlobal()
print(someGlobalVariable,"<-outside function")


rabbit="this is my rabbit"

def changingRabbitName ():
      global rabbit
      rabbit="hey rabbit is changed inside function please check"
      print(rabbit)


changingRabbitName()

# Python Numbers types & example
# int float complex

x = 1 #int
y= 3.2 #float
z=3j #complex

print(type(x))
print(type(y))
print(type(z))

x=complex(x)
print(x,"after converting into complex x value")
y=int(y)
print(y,"after converting y into int")


import random

c=random.randrange(2,9)

print(c,"this is random values each time")


# There may be times when you want to specify a type on to a variable. This can be done with casting. Python is an object-orientated language, and as such it uses classes to define data types, including its primitive types.


c=4.8
d="4.8"

print(int(c))
print(int(float(d)))

# String related function and example
x=""" hello how are you doing
please let me know
   how it is
       going 
           today
 """


print(x)


str="LiMiT"

print(str[-5:-4])

print(str.upper())

print(str.lower())

str1 = "hello i am going to work"
print(str1.strip())

print(str1.replace("l","c"))

print(str1.strip().split(' '))



print(bool("hello"))
print(bool(""))
print(bool([]))
print(bool({}))
print(bool(0))
print("--------------\n")

print('hello'  in str1)
print("--------------\n")

myList = ["apple", "banana", "cherry"]

print(myList)

print(type(myList))

myNewListUsingConstructor=list(("apple","banana","tea","pineapple"))

print(myNewListUsingConstructor)


newListForMethod= [1,2,3,4,5,6]

newListForMethod.append(9)

print(newListForMethod)


x,y,z,v=1,3,4,5
my_tuple = (x,y,z,v)
x,y,z,v=1,3,4,9
# my_tuple[0]=9
print(my_tuple)


newSetShowDuplicate={1,2,3}

newSetShowDuplicate.add(7)

print(newSetShowDuplicate)