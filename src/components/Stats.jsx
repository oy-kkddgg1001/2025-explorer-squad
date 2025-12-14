import './Stats.css'

function Stats({ stats }) {
  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Stats