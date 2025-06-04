from django.shortcuts import render
from django.http import JsonResponse
from firstapp.models import Student
from firstapp.serializers import StudentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.view import ApiView
# Create your views here.
# @api_view(['GET','POST'])
# def student_list(request):
#       if request.method=='GET':
#             student=Student.objects.all()
#             serializer=StudentSerializer(student,many=True)
#             return Response(serializer.data)
      
#       elif request.method=="POST":
#             serializer=StudentSerializer(data=request.data)
#             if serializer.is_valid():
#                   serializer.save()
#                   return Response(serializer.data,status.HTTP_201_CREATED)
            
#             return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
      
# @api_view(['GET','PUT','DELETE'])
# def student_detail(request,pk):
#       try:
#             student = Student.objects.get(pk=pk)
#       except  Student.DoesNotExist:
#                   return Response(status=status.HTTP_404_NOT_FOUND)
      

#       if request.method=='GET':
#              serializer=StudentSerializer(student)
#              return Response(serializer.data)
      
#       elif request.method=="PUT":
#             serializer=StudentSerializer(student,data=request.data)
#             if serializer.is_valid():
#                   serializer.save()
#                   return Response(serializer.data)
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#       elif request.method=="DELETE":
#              student.delete()
#              return Response(status=status.HTTP_204_NO_CONTENT)


class StudentList(ApiView):
      def get(self,request):
            students=Student.objects.all()
            serializer=StudentSerializer(students,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
      

      def post(self,request):
            student = request.data
            serializer= StudentSerializer(data=student)
            if serializer.is_valid():
                  serializer.save()
                  return Response(serializer.data,status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
      

class StudentDetails(ApiView):
