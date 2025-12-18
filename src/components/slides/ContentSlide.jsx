import { useEffect, useState } from 'react'
import './ContentSlide.css'

function ContentSlide({ title, content, layout = 'default', background, animation = true, image, images }) {
  const [parsedContent, setParsedContent] = useState('')

  useEffect(() => {
    // 간단한 마크다운 파싱 (나중에 더 정교한 파서로 교체 가능)
    const parseMarkdown = (markdown) => {
      if (!markdown) return ''

      // 줄 단위로 분할해서 처리
      const lines = markdown.split('\n')
      let result = []
      let listStack = [] // 중첩 리스트 레벨을 추적하는 스택

      lines.forEach((line, index) => {
        const trimmedLine = line.trim()

        // 빈 줄 처리
        if (trimmedLine === '') {
          // 리스트 모두 닫기
          while (listStack.length > 0) {
            result.push('</ul>')
            listStack.pop()
          }
          return
        }

        // 수평선 처리
        if (trimmedLine === '---') {
          while (listStack.length > 0) {
            result.push('</ul>')
            listStack.pop()
          }
          result.push('<hr />')
          return
        }

        // 헤딩 처리 (볼드/이탤릭 처리 포함)
        if (trimmedLine.startsWith('### ')) {
          while (listStack.length > 0) {
            result.push('</ul>')
            listStack.pop()
          }
          let headingContent = trimmedLine.substring(4)
          headingContent = headingContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          headingContent = headingContent.replace(/\*(.*?)\*/g, '<em>$1</em>')
          result.push(`<h3>${headingContent}</h3>`)
          return
        }
        if (trimmedLine.startsWith('## ')) {
          while (listStack.length > 0) {
            result.push('</ul>')
            listStack.pop()
          }
          let headingContent = trimmedLine.substring(3)
          headingContent = headingContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          headingContent = headingContent.replace(/\*(.*?)\*/g, '<em>$1</em>')
          result.push(`<h2>${headingContent}</h2>`)
          return
        }
        if (trimmedLine.startsWith('# ')) {
          while (listStack.length > 0) {
            result.push('</ul>')
            listStack.pop()
          }
          let headingContent = trimmedLine.substring(2)
          headingContent = headingContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          headingContent = headingContent.replace(/\*(.*?)\*/g, '<em>$1</em>')
          result.push(`<h1>${headingContent}</h1>`)
          return
        }

        // 리스트 아이템 처리 (중첩 리스트 지원)
        const listMatch = line.match(/^(\s*)- (.*)$/)
        if (listMatch) {
          const indent = listMatch[1].length
          const content = listMatch[2]
          const level = Math.floor(indent / 4) // 4칸씩 한 레벨

          // 현재 레벨에 맞게 리스트 스택 조정
          while (listStack.length > level + 1) {
            result.push('</ul>')
            listStack.pop()
          }

          // 새로운 레벨이면 ul 열기
          while (listStack.length <= level) {
            result.push('<ul>')
            listStack.push(true)
          }

          // 볼드/이탤릭 처리
          let listContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          listContent = listContent.replace(/\*(.*?)\*/g, '<em>$1</em>')
          result.push(`<li>${listContent}</li>`)

          return
        }

        // 일반 텍스트 처리
        while (listStack.length > 0) {
          result.push('</ul>')
          listStack.pop()
        }

        // 볼드/이탤릭 처리
        let processedLine = trimmedLine
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>')

        result.push(`<p>${processedLine}</p>`)
      })

      // 마지막에 열린 리스트들 모두 닫기
      while (listStack.length > 0) {
        result.push('</ul>')
        listStack.pop()
      }

      return result.filter(line => line.trim() !== '').join('\n')
    }

    setParsedContent(parseMarkdown(content))
  }, [content])

  const getLayoutClass = () => {
    switch (layout) {
      case 'center':
        return 'content-layout-center'
      case 'left':
        return 'content-layout-left'
      case 'two-column':
        return 'content-layout-two-column'
      case 'image-right':
        return 'content-layout-image-right'
      default:
        return 'content-layout-default'
    }
  }

  return (
    <div
      className={`content-slide ${getLayoutClass()} ${animation ? 'animated' : ''}`}
      style={{
        backgroundImage: background ? `url(${background})` : undefined
      }}
    >
      {background && <div className="content-overlay" />}

      <div className="content-container">
        {title && (
          <div className="content-header">
            <h1 className="content-title">{title}</h1>
            <div className="title-underline" />
          </div>
        )}

        <div className={`content-body ${images && images.length > 0 ? 'with-images-left' : ''}`}>
          {images && images.length > 0 && (
            <div className="content-images">
              {images.map((img, idx) => (
                <div key={idx} className="content-image-item">
                  <img src={img} alt={`${title || ''} ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
          {image && !images && (
            <div className="content-image">
              <img src={image} alt={title || ''} />
            </div>
          )}
          <div
            className="content-text"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentSlide