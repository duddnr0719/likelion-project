# 🌍 여행지 추천 서비스

> 멋쟁이사자처럼 협업 프로젝트 — 쿼리 파라미터 기반 리스트 데이터 가공 경험

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 주제 | 여행지 추천 |
| 백엔드 | Django + Django REST Framework |
| 프론트엔드 | React (Vite) |
| 배포 | Django → Railway / React → Vercel |
| DB | 미사용 (views.py 내 딕셔너리 데이터) |

---

## 👥 팀원

| 이름 | 역할 |
|------|------|
| 박준석 | FrontEnd |
| 박영욱 | BackEnd |
| 안수진 | Documentation + Deployment |

---

## 🗂️ 폴더 구조

```
likelion-project/
├── backend/                # Django 백엔드
│   ├── config/             # Django 설정
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── travels/            # 여행지 앱
│   │   ├── data.py         # 여행지 데이터 (12개)
│   │   ├── views.py        # API 뷰
│   │   └── urls.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── api/travels.js  # API 호출 함수
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── SortDropdown.jsx
│   │   │   └── TravelCard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
└── docs/
    ├── API_SPEC.md
    └── FEATURE_SPEC.md
```

---

## 🚀 로컬 실행 방법

### 백엔드 (Django)

```bash
cd backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# 패키지 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env

# 서버 실행 (http://localhost:8000)
python manage.py runserver
```

### 프론트엔드 (React)

```bash
cd frontend

# 패키지 설치
npm install

# 환경변수 설정
cp .env.example .env

# 개발 서버 실행 (http://localhost:5173)
npm run dev
```

---

## 🔗 API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/travels/` | 여행지 목록 조회 |
| GET | `/api/travels/meta/` | 필터 옵션 조회 |

자세한 내용 → [API 명세서](./docs/API_SPEC.md)

- `/api/travels/meta/` API를 통해 프론트엔드 필터 옵션을 동적으로 구성

---

## 🌐 배포 가이드

### Django → Railway

1. [railway.app](https://railway.app) 접속 후 GitHub 연동
2. Root Directory: `backend`
3. 환경변수: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS=your-app.railway.app`
4. 배포 후 `VITE_API_URL` 업데이트

### React → Vercel

1. [vercel.com](https://vercel.com) 접속 후 GitHub 연동
2. Root Directory: `frontend`
3. 환경변수: `VITE_API_URL=https://your-app.railway.app/api`
4. 백엔드 `CORS_ALLOWED_ORIGINS`에 Vercel 도메인 추가

---

## 📌 브랜치 전략

- `main` : 최종 배포 브랜치
- `develop` : 개발 통합 브랜치
- `feature/<기능명>` : 기능 개발 브랜치

```bash
git checkout develop && git pull origin develop
git checkout -b feature/my-feature
# 작업 후 GitHub에서 develop으로 PR 생성
```
