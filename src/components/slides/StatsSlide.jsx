import Stats from '../Stats'
import './StatsSlide.css'

function StatsSlide({ title, subtitle, stats, background, layout = 'grid' }) {
  return (
    <div
      className={`stats-slide stats-layout-${layout}`}
      style={{
        backgroundImage: background ? `url(${background})` : undefined
      }}
    >
      {background && <div className="stats-overlay" />}

      <div className="stats-container">
        {title && (
          <div className="stats-header">
            <h1 className="stats-title">{title}</h1>
            {subtitle && <p className="stats-subtitle">{subtitle}</p>}
            <div className="title-underline" />
          </div>
        )}

        <div className="stats-content">
          <Stats stats={stats} />
        </div>

        <div className="stats-decoration">
          <div className="decoration-circle left" />
          <div className="decoration-circle right" />
        </div>
      </div>
    </div>
  )
}

export default StatsSlide