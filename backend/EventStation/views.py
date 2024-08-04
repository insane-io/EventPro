###############Rest Framework Import###########################################
from rest_framework.decorators import api_view, permission_classes, authentication_classes
# from rest_framework.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
################Response###########################
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
################Email Import###########################
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.template.loader import render_to_string
################Model Import###########################
from datetime import datetime
from django.contrib.auth.models import User
from .models import EventDetails, Registration
from UserprofileStation.models import Committee, UserProfile
from django.db.models import Q,Count, Sum, Max, FloatField
################Serializers Import###########################
from .serializers import EventSerializers, RegistrationSerializer

@api_view(['GET'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def event_info(request):
    try:
        slug = request.GET.get('event_unique_id')
        if slug:
            slug = slug.replace("-", "")
            event_obj = get_object_or_404(EventDetails, unique_id=slug)
            event_serializer = EventSerializers(event_obj)
            response_data = {'event': event_serializer.data}
        else:
            event_objs = EventDetails.objects.filter(is_approved=True)
            if event_objs:
                event_serializer = EventSerializers(event_objs, many=True)
                response_data = {'events': event_serializer.data}
            else:
                response_data = {'message': 'No events found'}
        return JsonResponse(response_data, status=status.HTTP_200_OK)
    except Exception as e:
        response_data = {'message': f'Failed to retrieve event information: {str(e)}'}
        return JsonResponse(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def event_details(request):
    over_all_search = request.POST.get('searchValue')
    field_mapping = {
        0: 'name__icontains',
        1: 'location__icontains',
    }
    advance_filter = Q()
    if over_all_search:
        overall_search_filter = Q()
        for field in field_mapping.values():
            overall_search_filter |= Q(**{field: over_all_search})
        advance_filter |= overall_search_filter
    try:
        event_obj = EventDetails.objects.filter(advance_filter)
        event_obj = EventSerializers(event_obj,many=True)
        response = {
            'event':event_obj.data
        }
        return JsonResponse(response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {
            'message': f'Failed to send email: {str(e)}',
        }
        return JsonResponse(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
@authentication_classes([])
def event_add(request):
    try:
        post_data = request.POST.copy()
        try:
            slug      = request.GET.get('event_unique_id').replace("-","")
            event_obj = EventDetails.objects.get(unique_id=slug)
        except:
            event_obj = None
        event_serailizer = EventSerializers(instance=event_obj,data=request.data)

        if event_serailizer.is_valid():
            instance = event_serailizer.save()
            event_serailizer.save()

            if post_data.get('associate', None):
                count = int(post_data.get('associate'))
                for index in range(count):
                    key = post_data.get(f'associate_{index}')
                    try:
                        user_obj = get_object_or_404(User, id=key)
                        instance.associate.add(user_obj)
                    except user_obj.DoesNotExist:
                        print(f"Client account with ID {key} does not exist.")
                    except ValueError:
                        print(f"Invalid ID format for user_{index}")      
                        
            if post_data.get('committee_count', None):
                count = int(post_data.get('committee_count'))
                for index in range(count):
                    key = post_data.get(f'committee_{index}')
                    try:
                        committee_obj = get_object_or_404(Committee, id=key)
                        instance.committee.add(committee_obj)
                    except committee_obj.DoesNotExist:
                        print(f"Client account with ID {key} does not exist.")
                    except ValueError:
                        print(f"Invalid ID format for committee_{index}")  
            response = {
                'event':event_serailizer.data
            }
            return JsonResponse(response, status=status.HTTP_200_OK)
        else :
            response = {
            'message': f'Failed to save : {str(event_serailizer.errors)}',
        }
        return JsonResponse(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        response = {
            'message': f'{str(e)}',
        }
        return JsonResponse(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
@csrf_exempt
# @authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def register_for_event(request):
    try:
        event_unique_id = request.POST.get('event_unique_id')
        event = get_object_or_404(EventDetails, unqiue_id =event_unique_id.replace("-",""))
        user = request.user
        
        existing_registration = Registration.objects.filter(event=event, user=user).exists()
        if existing_registration:
            return Response({'message': 'User is already registered for this event'}, status=status.HTTP_400_BAD_REQUEST)
        registration_data = {'event': event_unique_id, 'user': user.id}
        serializer = RegistrationSerializer(data=registration_data)
        if serializer.is_valid():
            serializer.save()
            total_registrations = Registration.objects.count()
            return Response({'registration': serializer.data, 'total_registrations': total_registrations}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    except EventDetails.DoesNotExist:
        return Response({'message': 'Event does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@csrf_exempt
@permission_classes([AllowAny])
def get_events(request):
    try:
        current_date = datetime.now().date()
        ongoing_events = EventDetails.objects.filter(start_date__lte=current_date)
        upcoming_events = EventDetails.objects.filter(start_date__gt=current_date)

        ongoing_events_data = EventSerializers(ongoing_events, many=True).data
        upcoming_events_data = EventSerializers(upcoming_events, many=True).data
        
        return Response({
            'ongoing_events': ongoing_events_data,
            'upcoming_events': upcoming_events_data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_unapproved(request):
    try:
        events = EventDetails.objects.filter(is_approved=False)
        serializer = EventSerializers(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_by_mentor(request):
    try:
        event = EventDetails.objects.get(pk=request.GET.get('event_id'))
    except EventDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    event.approved_by_mentor = True
    event.save()
    return Response({'status': 'Event approved by mentor'})

@api_view(['POST'])
def approve_by_hod(request):


    try:
        event = EventDetails.objects.get(pk=request.GET.get('event_id'))
    except EventDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the event is approved by the mentor
    if not event.approved_by_mentor:
        return Response({'error': 'Event must be approved by mentor first'}, status=status.HTTP_400_BAD_REQUEST)

    # Mark the event as approved by H.O.D
    event.approved_by_hod = True
    event.save()
    return Response({'status': 'Event approved by H.O.D'})

@api_view(['POST'])
def approve_by_dean(request):

    try:
        event = EventDetails.objects.get(pk=request.GET.get('event_id'))
    except EventDetails.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the event is approved by the H.O.D
    if not event.approved_by_hod:
        return Response({'error': 'Event must be approved by H.O.D first'}, status=status.HTTP_400_BAD_REQUEST)

    event.is_approved = True
    event.approved_by_dean = True
    event.save()
    return Response({'status': 'Event approved by Dean'})
