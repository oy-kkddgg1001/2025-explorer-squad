import './IntroSlide.css'

function IntroSlide({ title, subtitle, background, icon, author, date }) {
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