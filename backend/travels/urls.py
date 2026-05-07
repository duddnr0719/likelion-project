from django.urls import path
from . import views

urlpatterns = [
    path('travels/', views.travel_list, name='travel-list'),       # 메인 엔드포인트
    path('travels/meta/', views.category_list, name='travel-meta'), # 필터 옵션 조회
]
