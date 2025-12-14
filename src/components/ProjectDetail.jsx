import './ProjectDetail.css'

function ProjectDetail({ project, onClose }) {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header" style={{ backgroundColor: project.color }}>
          <span className="modal-icon">{project.icon}</span>
          <h2>{project.name}</h2>
          <span className={`modal-status ${project.status}`}>
            {project.status === 'completed' ? '✅ 완료' : '🔄 진행중'}
          </span>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>🎯 주요 성과</h3>
            <p className="achievement">{project.achievement}</p>
          </div>

          <div className="detail-section">
            <h3>📅 진행 단계</h3>
            <div className="phases-list">
              {project.phases.map((phase, index) => (
                <div key={index} className="phase-item">
                  <div
                    className={`phase-badge ${phase.type}`}
                    style={{ backgroundColor: project.color }}
                  >
                    {phase.label}
                  </div>
                  <div className="phase-info">
                    <span className="phase-month">{phase.month}월</span>
                    <span className="phase-tooltip">
                      {phase.tooltip.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>🎫 JIRA 티켓</h3>
            <div className="jira-tags">
              {project.jira.map((ticket, index) => (
                <span key={index} className="jira-tag">{ticket}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail