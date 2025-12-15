import { useState, useEffect, useCallback } from 'react'

export const useSlideNavigation = (totalSlides, onExitPresentation) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 다음 슬라이드로 이동
  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide, totalSlides])

  // 이전 슬라이드로 이동
  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  // 특정 슬라이드로 이동
  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
    }
  }, [totalSlides])

  // 전체화면 토글
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  // 키보드 이벤트 처리
  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'ArrowRight':
      case ' ': // 스페이스바
        event.preventDefault()
        goToNext()
        break
      case 'ArrowLeft':
        event.preventDefault()
        goToPrev()
        break
      case 'Home':
        event.preventDefault()
        goToSlide(0)
        break
      case 'End':
        event.preventDefault()
        goToSlide(totalSlides - 1)
        break
      case 'f':
      case 'F11':
        event.preventDefault()
        toggleFullscreen()
        break
      case 'Escape':
        event.preventDefault()
        if (isFullscreen) {
          toggleFullscreen()
        } else if (onExitPresentation) {
          onExitPresentation()
        }
        break
      default:
        // 숫자 키로 직접 슬라이드 이동
        if (event.key >= '1' && event.key <= '9') {
          const slideIndex = parseInt(event.key) - 1
          if (slideIndex < totalSlides) {
            goToSlide(slideIndex)
          }
        }
        break
    }
  }, [goToNext, goToPrev, goToSlide, toggleFullscreen, totalSlides, isFullscreen, onExitPresentation])

  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  // 전체화면 상태 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // 프로그레스 계산
  const progress = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0

  return {
    currentSlide,
    totalSlides,
    isFullscreen,
    progress,
    goToNext,
    goToPrev,
    goToSlide,
    toggleFullscreen,
    canGoNext: currentSlide < totalSlides - 1,
    canGoPrev: currentSlide > 0
  }
}