#!/bin/bash
# likelion-project 초기 커밋 및 푸시 스크립트
# Desktop/likelion-project 폴더에서 실행하세요

cd "$(dirname "$0")"

echo "🔒 Lock 파일 정리 중..."
rm -f .git/index.lock .git/config.lock .git/objects/maintenance.lock 2>/dev/null

echo "📦 파일 스테이징..."
git add .

echo "💾 커밋 중..."
git commit -m "✨ feat: 프로젝트 초기 세팅

- [Backend] Django 프로젝트 구조 생성 (config, travels 앱)
- [Backend] 여행지 데이터 12개 (data.py)
- [Backend] 단일 엔드포인트 API: ?search, ?category, ?region, ?sort 쿼리 파라미터
- [Backend] CORS 설정 (django-cors-headers)
- [Frontend] React (Vite) 프로젝트 구성
- [Frontend] SearchBar, CategoryFilter, SortDropdown, TravelCard 컴포넌트
- [Frontend] fetch API 연동 및 debounce 처리
- [Docs] README.md, API 명세서, 기능 명세서"

echo "🚀 GitHub 푸시 중..."
git push origin main

echo ""
echo "✅ 완료! https://github.com/duddnr0719/likelion-project 에서 확인하세요."
