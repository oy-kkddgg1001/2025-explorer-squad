import './Stats.css'

function Stats({ stats }) {
  // 숫자를 노란색 span으로 감싸는 함수
  const highlightNumbers = (text) => {
    if (!text) return text
    const parts = text.split(/([0-9,.]+[억원건명%]?)/g)
    return parts.map((part, i) => {
      if (/^[0-9,.]+[억원건명%]?$/.test(part)) {
        return <span key={i} className="stat-number">{part}</span>
      }
      return part
    })
  }

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">
            {stat.label.split('\n').map((line, lineIndex, lines) => (
              <span key={lineIndex}>
                {highlightNumbers(line)}
                {lineIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Stats