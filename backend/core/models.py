
from django.db import models


class InterviewSession(models.Model):
    class ExperienceLevel(models.TextChoices):
        ENTRY = "entry", "Entry-level"
        MID = "mid", "Mid-level"
        SENIOR = "senior", "Senior"
        LEAD = "lead", "Lead / Architect"

    class InterviewType(models.TextChoices):
        TECHNICAL = "technical", "Technical"
        BEHAVIORAL = "behavioral", "Behavioral"
        MIXED = "mixed", "Mixed"

    job_role = models.CharField(max_length=150)
    experience_level = models.CharField(
        max_length=20,
        choices=ExperienceLevel.choices,
    )
    interview_type = models.CharField(
        max_length=20,
        choices=InterviewType.choices,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_role} - {self.get_interview_type_display()}"
