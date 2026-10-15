
from rest_framework import serializers

from .models import InterviewSession


class InterviewSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewSession
        fields = [
            "id",
            "job_role",
            "experience_level",
            "interview_type",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
