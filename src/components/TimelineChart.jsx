import { useState } from 'react'
import './TimelineChart.css'

const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

function TimelineChart({ projects, onProjectClick }) {
  const [hoveredPhase, setHoveredPhase] = useState(null)

  return (
    <div className="timeline-chart">
      <h2 className="timeline-title">프로젝트 타임라인 2025</h2>
      <p className="timeline-subtitle">프로젝트별 개발/배포 및 QA 일정 시각화</p>

      <div className="timeline-container">
        {/* 월 헤더 */}
        <div className="timeline-header">
          <div className="project-label-header">프로젝트</div>
          {months.map((month) => (
            <div key={month} className="month-header">
              {month}
            </div>
          ))}
        </div>

        {/* 프로젝트 행들 */}
        {projects.map((project) => (
          <div key={project.id} className="project-row">
            <div
              className="project-label"
              onClick={() => onProjectClick(project.id)}
            >
              <span className="project-icon">{project.icon}</span>
              <div className="project-info">
                <span className="project-name">{project.name}</span>
                <span className={`project-status ${project.status}`}>
                  {project.status === 'completed' ? '완료' : '진행중'}
                </span>
              </div>
            </div>

            {/* 12개월 셀 */}
            {months.map((_, monthIndex) => {
              const phase = project.phases.find(p => p.month === monthIndex + 1)
              return (
                <div key={monthIndex} className="timeline-cell">
                  {phase && (
                    <div
                      className={`phase-bar ${phase.type}`}
                      style={{ backgroundColor: project.color }}
                      onMouseEnter={() => setHoveredPhase(`${project.id}-${monthIndex}`)}
                      onMouseLeave={() => setHoveredPhase(null)}
                    >
                      <span className="phase-label">{phase.label}</span>
                      {hoveredPhase === `${project.id}-${monthIndex}` && (
                        <div className="tooltip">
                          {phase.tooltip.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="legend">
        <div className="legend-title">프로젝트 범례</div>
        <div className="legend-items">
          {projects.map((project) => (
            <div key={project.id} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: project.color }}
              />
              <span>{project.name}</span>
            </div>
          ))}
        </div>
        <div className="legend-phases">
          <div className="legend-phase">
            <div className="phase-indicator dev" /> 개발/배포
          </div>
          <div className="legend-phase">
            <div className="phase-indicator qa" /> QA/테스트
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineChart
