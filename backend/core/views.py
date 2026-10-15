
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import InterviewSessionSerializer


@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "success",
        "message": "InterviewAI backend is running",
    })


@api_view(["POST"])
def create_interview(request):
    serializer = InterviewSessionSerializer(data=request.data)

    if serializer.is_valid():
        interview = serializer.save()

        return Response(
            InterviewSessionSerializer(interview).data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )
