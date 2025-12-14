import './Navigation.css'

function Navigation({
  currentSlide,
  totalSlides,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onGoToSlide,
  onToggleFullscreen,
  onExitPresentation,
  isFullscreen
}) {
  return (
    <div className="presentation-navigation">
      {/* 왼쪽 컨트롤 */}
      <div className="nav-left">
        <button
          className="nav-button"
          onClick={onExitPresentation}
          title="프레젠테이션 종료"
        >
          ✕
        </button>
      </div>

      {/* 가운데 컨트롤 */}
      <div className="nav-center">
        <button
          className={`nav-button ${!canGoPrev ? 'disabled' : ''}`}
          onClick={onPrev}
          disabled={!canGoPrev}
          title="이전 슬라이드 (←)"
        >
          ←
        </button>

        <div className="slide-indicator">
          <span className="current-slide">{currentSlide + 1}</span>
          <span className="slide-separator">/</span>
          <span className="total-slides">{totalSlides}</span>
        </div>

        <button
          className={`nav-button ${!canGoNext ? 'disabled' : ''}`}
          onClick={onNext}
          disabled={!canGoNext}
          title="다음 슬라이드 (→)"
        >
          →
        </button>
      </div>

      {/* 오른쪽 컨트롤 */}
      <div className="nav-right">
        <button
          className="nav-button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "전체화면 종료 (ESC)" : "전체화면 (F)"}
        >
          {isFullscreen ? '📱' : '📺'}
        </button>
      </div>

      {/* 슬라이드 점프 메뉴 (선택사항) */}
      <div className="slide-dots">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onGoToSlide(index)}
            title={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}

export default Navigation