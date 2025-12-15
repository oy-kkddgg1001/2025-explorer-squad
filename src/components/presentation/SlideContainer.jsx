import { useSlideNavigation } from '../../hooks/useSlideNavigation'
import ProgressBar from './ProgressBar'
import Navigation from './Navigation'
import './SlideContainer.css'

function SlideContainer({ slides, onExitPresentation }) {
  const {
    currentSlide,
    totalSlides,
    isFullscreen,
    progress,
    goToNext,
    goToPrev,
    goToSlide,
    toggleFullscreen,
    canGoNext,
    canGoPrev
  } = useSlideNavigation(slides.length, onExitPresentation)

  // 마우스 클릭으로 네비게이션 (왼쪽/오른쪽 영역)
  const handleSlideClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const slideWidth = rect.width

    // 왼쪽 30%는 이전, 오른쪽 30%는 다음, 가운데 40%는 아무 동작 안함
    if (clickX < slideWidth * 0.3) {
      goToPrev()
    } else if (clickX > slideWidth * 0.7) {
      goToNext()
    }
  }

  // 현재 슬라이드 렌더링
  const renderCurrentSlide = () => {
    const currentSlideData = slides[currentSlide]
    if (!currentSlideData) return <div>슬라이드를 불러올 수 없습니다.</div>

    return currentSlideData
  }

  return (
    <div className={`slide-container ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* 프로그레스 바 */}
      <ProgressBar progress={progress} />

      {/* 슬라이드 영역 */}
      <div className="slide-area" onClick={handleSlideClick}>
        <div className="slide-content">
          {renderCurrentSlide()}
        </div>

        {/* 마우스 호버 가이드 */}
        <div className="click-guide left-guide">
          {canGoPrev && <span>← 이전</span>}
        </div>
        <div className="click-guide right-guide">
          {canGoNext && <span>다음 →</span>}
        </div>
      </div>

      {/* 네비게이션 컨트롤 */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={goToNext}
        onPrev={goToPrev}
        onGoToSlide={goToSlide}
        onToggleFullscreen={toggleFullscreen}
        onExitPresentation={onExitPresentation}
        isFullscreen={isFullscreen}
      />

      {/* 키보드 단축키 안내 (프레젠테이션 시작시 잠시 표시) */}
      <div className="keyboard-hints">
        <div className="hint">← → : 슬라이드 이동</div>
        <div className="hint">F, F11 : 전체화면</div>
        <div className="hint">ESC : 전체화면 종료</div>
        <div className="hint">1-9 : 슬라이드 직접 이동</div>
      </div>
    </div>
  )
}

export default SlideContainer