import { useState, useEffect, useCallback } from 'react'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import SortDropdown from './components/SortDropdown'
import TravelCard from './components/TravelCard'
import { fetchTravels, fetchMeta } from './api/travels'

// ── 스타일 ────────────────────────────────────────────────────
const S = {
  header: {
    background: 'linear-gradient(135deg, #6c63ff, #48c774)',
    color: '#fff',
    padding: '48px 24px 36px',
    textAlign: 'center',
    borderRadius: '0 0 24px 24px',
    marginBottom: '32px',
  },
  headerTitle: { fontSize: '32px', fontWeight: 800, marginBottom: '8px' },
  headerSub: { fontSize: '15px', opacity: 0.85 },

  filterBox: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  topRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' },

  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#64748b',
  },
  count: { fontWeight: 700, color: '#6c63ff' },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },

  empty: {
    textAlign: 'center',
    padding: '80px 0',
    color: '#94a3b8',
    fontSize: '18px',
  },

  loading: {
    textAlign: 'center',
    padding: '80px 0',
    fontSize: '24px',
    animation: 'spin 1s linear infinite',
  },

  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '16px 24px',
    color: '#dc2626',
    marginBottom: '24px',
    fontSize: '14px',
  },
}

// ── 컴포넌트 ─────────────────────────────────────────────────
export default function App() {
  const [travels, setTravels]     = useState([])
  const [meta, setMeta]           = useState({ categories: [], sort_options: [] })
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('')
  const [sort, setSort]           = useState('')
  const [count, setCount]         = useState(0)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)

  // 메타 정보 1회 로드
  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch(() => {}) // 메타 로드 실패는 무시
  }, [])

  // 필터 변경시 자동 검색
  const loadTravels = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTravels({ search, category, sort })
      setTravels(data.results)
      setCount(data.count)
    } catch (err) {
      setError('백엔드 서버에 연결할 수 없습니다. Django 서버가 실행 중인지 확인해주세요.')
      setTravels([])
    } finally {
      setLoading(false)
    }
  }, [search, category, sort])

  useEffect(() => {
    const timer = setTimeout(loadTravels, 300) // debounce 300ms
    return () => clearTimeout(timer)
  }, [loadTravels])

  return (
    <>
      {/* 헤더 */}
      <header style={S.header}>
        <div style={S.headerTitle}>🌍 여행지 추천</div>
        <div style={S.headerSub}>검색, 카테고리, 정렬로 나만의 여행지를 찾아보세요</div>
      </header>

      {/* 필터 영역 */}
      <div style={S.filterBox}>
        <div style={S.topRow}>
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown
            sortOptions={meta.sort_options}
            value={sort}
            onChange={setSort}
          />
        </div>
        <CategoryFilter
          categories={meta.categories}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      {/* 에러 */}
      {error && <div style={S.error}>⚠️ {error}</div>}

      {/* 결과 수 */}
      {!loading && !error && (
        <div style={S.meta}>
          <span>총 <span style={S.count}>{count}개</span>의 여행지</span>
          {(search || category || sort) && (
            <button
              onClick={() => { setSearch(''); setCategory(''); setSort('') }}
              style={{ border: 'none', background: 'none', color: '#6c63ff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              필터 초기화 ✕
            </button>
          )}
        </div>
      )}

      {/* 카드 그리드 */}
      {loading ? (
        <div style={S.loading}>⏳</div>
      ) : travels.length === 0 ? (
        <div style={S.empty}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div style={S.grid}>
          {travels.map((t) => <TravelCard key={t.id} travel={t} />)}
        </div>
      )}
    </>
  )
}
