import { useState, useEffect, useCallback } from 'react'
import './AreaCards.css'

function AreaCards({ cards }) {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const openLightbox = (index) => {
    if (cards[index].image) {
      setSelectedIndex(index)
    }
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const goToPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1))
  }, [cards.length])

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0))
  }, [cards.length])

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, goToPrev, goToNext])

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  return (
    <>
      <div className="area-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`area-card ${card.image ? 'clickable' : ''}`}
            onClick={() => openLightbox(index)}
          >
            <div className="area-card-image">
              {card.image ? (
                <img src={card.image} alt={card.title} />
              ) : (
                <div className="image-placeholder">
                  <span>대표 이미지</span>
                </div>
              )}
            </div>
            <div className="area-card-content">
              <h3 className="area-card-title">{card.title}</h3>
              <p className="area-card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            &#8249;
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={cards[selectedIndex].image}
              alt={cards[selectedIndex].title}
            />
            <div className="lightbox-caption">
              <h3>{cards[selectedIndex].title}</h3>
              <p>{cards[selectedIndex].description}</p>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            &#8250;
          </button>

          <div className="lightbox-dots">
            {cards.map((card, index) => (
              card.image && (
                <span
                  key={index}
                  className={`lightbox-dot ${index === selectedIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                />
              )
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default AreaCards
