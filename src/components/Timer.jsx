import { useState, useEffect, useRef } from 'react'
import './Timer.css'

function Timer() {
  // localStorage에서 타이머 상태 복원
  const [time, setTime] = useState(() => {
    const saved = localStorage.getItem('presentationTimer')
    if (saved) {
      const { time, lastSaved } = JSON.parse(saved)
      const elapsed = Math.floor((Date.now() - lastSaved) / 1000)
      return Math.max(0, time - elapsed)
    }
    return 5 * 60 // 5분 = 300초
  })

  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('presentationTimer')
    return saved ? JSON.parse(saved).isRunning : false
  })

  const [isVisible, setIsVisible] = useState(() => {
    const saved = localStorage.getItem('presentationTimerUI')
    return saved ? JSON.parse(saved).isVisible : true
  })

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('presentationTimerUI')
    if (saved) {
      return JSON.parse(saved).position
    }
    return {
      x: 20, // 왼쪽에서 20px 떨어진 위치
      y: window.innerHeight - 200  // 아래에서 200px 떨어진 위치
    }
  })

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const intervalRef = useRef(null)
  const timerRef = useRef(null)

  // 타이머 상태를 localStorage에 저장
  useEffect(() => {
    const timerData = {
      time,
      isRunning,
      lastSaved: Date.now()
    }
    localStorage.setItem('presentationTimer', JSON.stringify(timerData))
  }, [time, isRunning])

  // UI 상태를 localStorage에 저장
  useEffect(() => {
    const uiData = {
      isVisible,
      position
    }
    localStorage.setItem('presentationTimerUI', JSON.stringify(uiData))
  }, [isVisible, position])

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, time])

  // 드래그 이벤트 핸들러
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return

      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)

      if (!clientX || !clientY) return

      const newX = clientX - dragOffset.x
      const newY = clientY - dragOffset.y

      // 화면 경계 체크
      const timerRect = timerRef.current?.getBoundingClientRect()
      if (!timerRect) return

      const maxX = window.innerWidth - timerRect.width
      const maxY = window.innerHeight - timerRect.height

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      })
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleMove, { passive: false })
      document.addEventListener('touchend', handleEnd)
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
      document.body.style.userSelect = 'auto'
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (!timerRef.current) return

    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)

    if (!clientX || !clientY) return

    const rect = timerRef.current.getBoundingClientRect()
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top
    })
    setIsDragging(true)
  }

  const handleTouchStart = (e) => {
    handleMouseDown(e)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(!isRunning)

  const handleReset = () => {
    setIsRunning(false)
    setTime(5 * 60)
    // localStorage에서 타이머 상태 초기화
    localStorage.removeItem('presentationTimer')
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  if (!isVisible) {
    return (
      <div
        className="timer-toggle"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          position: 'fixed'
        }}
        onClick={toggleVisibility}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        ref={timerRef}
      >
        <span>⏱️</span>
      </div>
    )
  }

  const timePercentage = ((5 * 60 - time) / (5 * 60)) * 100
  const isWarning = time <= 60 // 1분 이하일 때 경고
  const isDanger = time <= 30 // 30초 이하일 때 위험

  return (
    <div
      ref={timerRef}
      className={`timer ${isWarning ? 'warning' : ''} ${isDanger ? 'danger' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'fixed'
      }}
    >
      <div
        className="timer-header"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <span className="timer-title">발표 타이머</span>
        <button className="timer-minimize" onClick={toggleVisibility}>−</button>
      </div>

      <div className="timer-display">
        <div className="timer-time">
          {formatTime(time)}
        </div>
        <div className="timer-progress">
          <div
            className="timer-progress-bar"
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>

      <div className="timer-controls">
        <button
          className={`timer-btn ${isRunning ? 'pause' : 'start'}`}
          onClick={handleStart}
        >
          {isRunning ? '⏸️' : '▶️'}
        </button>
        <button className="timer-btn reset" onClick={handleReset}>
          🔄
        </button>
      </div>

      {time === 0 && (
        <div className="timer-finished">
          시간 종료!
        </div>
      )}
    </div>
  )
}

export default Timer