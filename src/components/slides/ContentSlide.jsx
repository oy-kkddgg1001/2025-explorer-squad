import { useEffect, useState } from 'react'
import './ContentSlide.css'

function ContentSlide({ title, content, layout = 'default', background, animation = true }) {
  const [parsedContent, setParsedContent] = useState('')

  useEffect(() => {
    // 간단한 마크다운 파싱 (나중에 더 정교한 파서로 교체 가능)
    const parseMarkdown = (markdown) => {
      if (!markdown) return ''

      return markdown
        // 헤딩 처리
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 볼드/이탤릭 처리
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // 리스트 처리
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
        // 코드 블록 처리
        .replace(/```([^`]*)```/gim, '<pre><code>$1</code></pre>')
        .replace(/`([^`]*)`/gim, '<code>$1</code>')
        // 줄바꿈 처리
        .replace(/\n\n/gim, '</p><p>')
        .replace(/\n/gim, '<br>')
        // 단락 래핑
        .replace(/^(?!<[hul]|<pre|<div)/gim, '<p>')
        .replace(/(?<!>)$/gim, '</p>')
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

        <div className="content-body">
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