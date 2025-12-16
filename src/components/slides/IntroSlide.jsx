import './IntroSlide.css'

function IntroSlide({ title, subtitle, background, icon, author, date, highlights, keywords }) {
  return (
    <div
      className="intro-slide"
      style={{
        backgroundImage: background ? `url(${background})` : undefined
      }}
    >
      <div className="intro-overlay" />

      <div className="intro-content">
        {icon && <div className="intro-icon">{icon}</div>}

        <h1 className="intro-title">{title}</h1>

        {subtitle && <h2 className="intro-subtitle">{subtitle}</h2>}

        {highlights && highlights.length > 0 && (
          <div className="intro-highlights">
            {highlights.map((item, index) => (
              <div key={index} className="highlight-item">
                <span className="highlight-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="highlight-text">{item}</span>
              </div>
            ))}
          </div>
        )}

        {keywords && keywords.length > 0 && (
          <div className="intro-keywords">
            {keywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        )}

        {author && (
          <div className="intro-meta">
            <div className="intro-author">{author}</div>
            {date && <div className="intro-date">{date}</div>}
          </div>
        )}
      </div>

      <div className="intro-decoration">
        <div className="decoration-line" />
        <div className="decoration-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default IntroSlide