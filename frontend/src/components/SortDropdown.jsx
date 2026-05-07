const styles = {
  wrapper: { display: 'flex', alignItems: 'center', gap: '8px' },
  label: { fontSize: '13px', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' },
  select: {
    padding: '10px 36px 10px 14px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#1e293b',
    background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%2364748b\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E") no-repeat right 12px center',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    fontWeight: 500,
  },
}

export default function SortDropdown({ sortOptions, value, onChange }) {
  return (
    <div style={styles.wrapper}>
      <span style={styles.label}>정렬</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.select}
      >
        <option value="">기본순</option>
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
