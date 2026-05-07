from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-likelion-dev-key-change-in-production')

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'travels',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # 반드시 최상단
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {}  # DB 미사용

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── CORS 설정 ─────────────────────────────────────────────
# 개발 환경: 모든 오리진 허용
CORS_ALLOW_ALL_ORIGINS = DEBUG

# 프로덕션 환경: 아래 리스트에 허용할 오리진 추가
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Vite 개발 서버
    "http://127.0.0.1:5173",
    # "https://your-app.vercel.app",  # 배포 후 추가
]

CORS_ALLOW_METHODS = [
    "GET",
    "OPTIONS",
]

# ── DRF 설정 ──────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [],
}

STATIC_URL = 'static/'
LANGUAGE_CODE = 'ko-kr'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_TZ = True
