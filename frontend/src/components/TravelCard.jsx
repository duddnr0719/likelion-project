const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  imgFallback: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #6c63ff22, #6c63ff44)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
  body: { padding: '16px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  name: { fontSize: '18px', fontWeight: 700, color: '#1e293b' },
  rating: { fontSize: '14px', color: '#f59e0b', fontWeight: 600 },
  desc: { fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '12px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badges: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  badge: {
    padding: '3px 10px',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    background: '#ede9fe',
    color: '#6c63ff',
  },
  price: { fontSize: '16px', fontWeight: 700, color: '#6c63ff' },
}

const CATEGORY_EMOJI = { '자연': '🌿', '역사': '🏛️', '도시': '🏙️', '휴양': '🏖️' }

export default function TravelCard({ travel }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,99,255,0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
      }}
    >
      {!imgError && travel.image ? (
        <img
          src={travel.image}
          alt={travel.name}
          style={styles.img}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div style={styles.imgFallback}>{CATEGORY_EMOJI[travel.category] || '📍'}</div>
      )}

      <div style={styles.body}>
        <div style={styles.topRow}>
          <span style={styles.name}>{travel.name}</span>
          <span style={styles.rating}>⭐ {travel.rating}</span>
        </div>

        <p style={styles.desc}>{travel.description}</p>

        <div style={styles.footer}>
          <div style={styles.badges}>
            <span style={styles.badge}>{travel.category}</span>
            <span style={{ ...styles.badge, background: '#fef3c7', color: '#d97706' }}>
              {travel.region}
            </span>
          </div>
          <span style={styles.price}>
            {travel.price.toLocaleString('ko-KR')}원~
          </span>
        </div>
      </div>
    </div>
  )
}

// useState import 필요
import { useState } from 'react'
