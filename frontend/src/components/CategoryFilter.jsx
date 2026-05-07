const CATEGORY_EMOJI = {
  '전체': '🌐',
  '자연': '🌿',
  '역사': '🏛️',
  '도시': '🏙️',
  '휴양': '🏖️',
}

const styles = {
  wrapper: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' },
  label: { fontSize: '13px', color: '#64748b', fontWeight: 600, marginRight: '4px' },
}

function chipStyle(active) {
  return {
    padding: '8px 16px',
    borderRadius: '999px',
    border: `2px solid ${active ? '#6c63ff' : '#e2e8f0'}`,
    background: active ? '#6c63ff' : '#fff',
    color: active ? '#fff' : '#475569',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  }
}

export default function CategoryFilter({ categories, selected, onSelect }) {
  const all = ['전체', ...categories]

  return (
    <div style={styles.wrapper}>
      <span style={styles.label}>카테고리</span>
      {all.map((cat) => {
        const isActive = selected === cat || (cat === '전체' && !selected)
        return (
          <button
            key={cat}
            style={chipStyle(isActive)}
            onClick={() => onSelect(cat === '전체' ? '' : cat)}
          >
            {CATEGORY_EMOJI[cat] || '📍'} {cat}
          </button>
        )
      })}
    </div>
  )
}
