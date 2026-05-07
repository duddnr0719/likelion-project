import { useState } from 'react'

const styles = {
  wrapper: {
    position: 'relative',
    flex: '1 1 280px',
  },
  icon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 42px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#fff',
  },
}

export default function SearchBar({ value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={styles.wrapper}>
      <span style={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder="여행지, 태그, 키워드 검색..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          borderColor: focused ? '#6c63ff' : '#e2e8f0',
          boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.15)' : 'none',
        }}
      />
    </div>
  )
}
