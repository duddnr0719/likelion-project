# 📡 API 명세서

> 여행지 추천 서비스 — REST API 문서

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| Base URL (개발) | `http://localhost:8000/api` |
| Base URL (배포) | `https://your-app.railway.app/api` |
| 응답 형식 | JSON |
| 인증 | 없음 (공개 API) |

---

## 1. 여행지 목록 조회

### `GET /travels/`

여행지 데이터를 검색, 필터, 정렬하여 반환합니다.

#### Query Parameters

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|----------|------|------|------|------|
| `search` | string | 선택 | 이름/설명/태그 키워드 검색 | `?search=해변` |
| `category` | string | 선택 | 카테고리 필터 | `?category=자연` |
| `region` | string | 선택 | 지역 필터 | `?region=해외` |
| `sort` | string | 선택 | 정렬 기준 | `?sort=price_asc` |

모든 Query Parameter는 조합하여 사용할 수 있습니다.

**예시:** 
GET /api/travels/?category=자연&region=국내&sort=rating_desc

#### sort 옵션

| 값 | 설명 |
|----|------|
| `price_asc` | 가격 낮은순 |
| `price_desc` | 가격 높은순 |
| `rating_desc` | 평점 높은순 |
| `name_asc` | 이름순 (가나다) |

#### 요청 예시

```
GET /api/travels/?search=해변&sort=price_asc
GET /api/travels/?category=자연&region=국내
GET /api/travels/?category=도시&sort=rating_desc
```

#### 응답 예시 (200 OK)

```json
{
  "count": 2,
  "filters": {
    "search": "해변",
    "category": null,
    "region": null,
    "sort": "price_asc"
  },
  "results": [
    {
      "id": 5,
      "name": "강릉",
      "category": "자연",
      "region": "국내",
      "price": 120000,
      "rating": 4.5,
      "description": "동해안의 아름다운 해변과 커피거리...",
      "image": "https://...",
      "tags": ["해변", "카페", "자연", "동해"]
    }
  ]
}
```

모든 응답은 count, filters, results 구조를 동일하게 유지합니다.

#### 응답 필드 설명

| 필드 | 타입 | 설명 |
|------|------|------|
| `count` | number | 결과 개수 |
| `filters` | object | 적용된 필터 현황 |
| `results` | array | 여행지 목록 |
| `results[].id` | number | 여행지 고유 ID |
| `results[].name` | string | 여행지 이름 |
| `results[].category` | string | 카테고리 (자연/역사/도시/휴양) |
| `results[].region` | string | 지역 (국내/해외) |
| `results[].price` | number | 예상 최저 비용 (원) |
| `results[].rating` | number | 평점 (1.0 ~ 5.0) |
| `results[].description` | string | 여행지 설명 |
| `results[].image` | string | 이미지 URL |
| `results[].tags` | array | 태그 목록 |

---

## 2. 필터 메타 정보 조회

### `GET /travels/meta/`

프론트엔드 필터 UI 구성에 필요한 옵션 데이터를 반환합니다.
프론트엔드가 하드코딩 없이 필터 옵션을 동적으로 렌더링할 수 있도록 메타 데이터를 제공합니다.

#### 응답 예시 (200 OK)

```json
{
  "categories": ["도시", "역사", "자연", "휴양"],
  "regions": ["국내", "해외"],
  "sort_options": [
    { "value": "price_asc",   "label": "가격 낮은순" },
    { "value": "price_desc",  "label": "가격 높은순" },
    { "value": "rating_desc", "label": "평점 높은순" },
    { "value": "name_asc",    "label": "이름순" }
  ]
}
```

---

## 에러 응답

| 상태 코드 | 설명 |
|-----------|------|
| `200 OK` | 정상 응답 |
| `405 Method Not Allowed` | GET 이외의 메서드 사용 시 |
| `500 Internal Server Error` | 서버 오류 |
