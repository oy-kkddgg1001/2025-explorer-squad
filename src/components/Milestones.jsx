import './Milestones.css'

function Milestones({ milestones }) {
  return (
    <div className="milestones-section">
      <h2 className="milestones-title">🎯 2025년 주요 성과 마일스톤</h2>

      <div className="milestones-timeline">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`milestone-item ${index % 2 === 0 ? 'left' : 'right'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="milestone-content">
              <div className="milestone-date">{milestone.date}</div>
              <div className="milestone-title">{milestone.title}</div>
              <div className="milestone-desc">{milestone.desc}</div>
            </div>
            <div className="milestone-dot" />
          </div>
        ))}
        <div className="timeline-line" />
      </div>
    </div>
  )
}

export default Milestones