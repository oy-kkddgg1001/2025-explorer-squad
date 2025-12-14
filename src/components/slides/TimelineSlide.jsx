import TimelineChart from '../TimelineChart'
import './TimelineSlide.css'

function TimelineSlide({ title, subtitle, projects, background, compact = true }) {
  // 프레젠테이션 모드에서는 프로젝트 클릭을 비활성화
  const handleProjectClick = () => {
    // 프레젠테이션 모드에서는 아무 동작 안함
  }

  return (
    <div
      className={`timeline-slide ${compact ? 'timeline-compact' : ''}`}
      style={{
        backgroundImage: background ? `url(${background})` : undefined
      }}
    >
      {background && <div className="timeline-overlay" />}

      <div className="timeline-slide-container">
        {title && (
          <div className="timeline-header">
            <h1 className="timeline-title">{title}</h1>
            {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
            <div className="title-underline" />
          </div>
        )}

        <div className="timeline-content">
          <div className="timeline-wrapper">
            <TimelineChart
              projects={projects}
              onProjectClick={handleProjectClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSlide