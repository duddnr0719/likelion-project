from rest_framework.decorators import api_view
from rest_framework.response import Response
from .data import TRAVEL_DATA


@api_view(['GET'])
def travel_list(request):
    """
    여행지 목록 API - 단일 엔드포인트

    Query Parameters:
        ?search=<키워드>    - 이름/설명/태그 검색
        ?category=<카테고리> - 카테고리 필터 (자연|역사|도시|휴양)
        ?region=<지역>      - 지역 필터 (국내|해외)
        ?sort=<정렬기준>     - 정렬 (price_asc|price_desc|rating_desc|name_asc)
    """
    data = list(TRAVEL_DATA)  # 원본 보호를 위해 복사

    # ── 1. 검색 (search) ──────────────────────────────
    search = request.query_params.get('search', '').strip()
    if search:
        keyword = search.lower()
        data = [
            item for item in data
            if keyword in item['name'].lower()
            or keyword in item['description'].lower()
            or any(keyword in tag.lower() for tag in item['tags'])
        ]

    # ── 2. 카테고리 필터 (category) ───────────────────
    category = request.query_params.get('category', '').strip()
    if category:
        data = [item for item in data if item['category'] == category]

    # ── 3. 지역 필터 (region) ─────────────────────────
    region = request.query_params.get('region', '').strip()
    if region:
        data = [item for item in data if item['region'] == region]

    # ── 4. 정렬 (sort) ────────────────────────────────
    sort = request.query_params.get('sort', '').strip()
    sort_options = {
        'price_asc':    lambda x: x['price'],
        'price_desc':   lambda x: -x['price'],
        'rating_desc':  lambda x: -x['rating'],
        'name_asc':     lambda x: x['name'],
    }
    if sort in sort_options:
        data = sorted(data, key=sort_options[sort])

    return Response({
        "count": len(data),
        "filters": {
            "search": search or None,
            "category": category or None,
            "region": region or None,
            "sort": sort or None,
        },
        "results": data,
    })


@api_view(['GET'])
def category_list(request):
    """사용 가능한 카테고리 목록 반환"""
    categories = sorted(set(item['category'] for item in TRAVEL_DATA))
    regions = sorted(set(item['region'] for item in TRAVEL_DATA))
    return Response({
        "categories": categories,
        "regions": regions,
        "sort_options": [
            {"value": "price_asc",   "label": "가격 낮은순"},
            {"value": "price_desc",  "label": "가격 높은순"},
            {"value": "rating_desc", "label": "평점 높은순"},
            {"value": "name_asc",    "label": "이름순"},
        ],
    })
