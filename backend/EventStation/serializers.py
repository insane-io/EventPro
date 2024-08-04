from rest_framework import serializers
from .models import EventDetails, Registration
from UserprofileStation.serializers import Base64ImageField

class EventSerializers(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    banner = Base64ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        depth = 1
        model = EventDetails
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'