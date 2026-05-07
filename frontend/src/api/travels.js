const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

/**
 * 여행지 목록 조회
 * @param {{ search?: string, category?: string, region?: string, sort?: string }} params
 */
export async function fetchTravels(params = {}) {
  const query = new URLSearchParams()

  if (params.search)   query.append('search',   params.search)
  if (params.category) query.append('category', params.category)
  if (params.region)   query.append('region',   params.region)
  if (params.sort)     query.append('sort',      params.sort)

  const url = `${BASE_URL}/travels/?${query.toString()}`
  const res = await fetch(url)

  if (!res.ok) throw new Error(`API 오류: ${res.status}`)
  return res.json()
}

/**
 * 필터 메타정보 조회 (카테고리, 정렬 옵션 등)
 */
export async function fetchMeta() {
  const res = await fetch(`${BASE_URL}/travels/meta/`)
  if (!res.ok) throw new Error(`API 오류: ${res.status}`)
  return res.json()
}
