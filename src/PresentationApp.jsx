import { useState, useEffect } from 'react'
import SlideContainer from './components/presentation/SlideContainer'
import IntroSlide from './components/slides/IntroSlide'
import ContentSlide from './components/slides/ContentSlide'
import StatsSlide from './components/slides/StatsSlide'
import TimelineSlide from './components/slides/TimelineSlide'
import './PresentationApp.css'

function PresentationApp({ onExitPresentation, discoverySquadData }) {
  const [slides, setSlides] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 슬라이드 데이터 로드
  useEffect(() => {
    const loadSlides = async () => {
      try {
        // 임시 슬라이드 데이터 (나중에 마크다운 파일에서 로드)
        const slideData = [
          // 1. 인트로 슬라이드
          {
            type: 'intro',
            title: '발견스쿼드 2025년 성과',
            subtitle: 'Discovery Squad - 올리브영 콘텐츠 경험의 새로운 혁신',
            icon: '',
            author: '발견스쿼드',
            date: '2025년 12월'
          },

          // 2. 2025년 주요 성과 통계
          {
            type: 'stats',
            title: '2025년 주요 성과',
            subtitle: '숫자로 보는 발견스쿼드의 임팩트',
            stats: discoverySquadData?.stats || [
              { value: '예시 데이터', label: '성과 지표 1' },
              { value: '예시 데이터', label: '성과 지표 2' },
              { value: '예시 데이터', label: '성과 지표 3' },
              { value: '예시 데이터', label: '성과 지표 4' }
            ]
          },

          // 3. 기술적 성과
          {
            type: 'content',
            title: '기술적 혁신과 성과',
            content: `
# 주요 기술 성과

## 모던 아키텍처 전환
- **리뷰탭 모던아키텍처**: Web Component(LIT) 기반 전환
- **37/37 티켓 완료**: 완벽한 마이그레이션 달성
- **점진적 오픈**: 안정적인 서비스 전환

## 숏폼 플랫폼 구축
- **403건 영상 수집**: CBT를 통한 콘텐츠 확보
- **13건 제보 처리**: 커뮤니티 기반 콘텐츠 생성
- **셔터 메인 개편**: 새로운 콘텐츠 소비 경험

## 인프라 고도화
- **공통화 모듈 분리**: OpenSearch 클러스터 기반
- **IA 개편 완료**: 발견탭과 하단탭바 혁신
            `
          },

          // 4. 올해 대표적인 성과
          {
            type: 'content',
            title: '2025년 대표적인 성과',
            content: `
# 올해 이룬 주요 성과들

## 1. 어필리에이트 비즈니스 모델 론칭
- **새로운 올리브영 비즈니스 모델 추가**
- 성공적인 검증과 안정적 출시 완료
- Phase 구조 접근법으로 체계적 런칭

## 2. 리뷰탭 모던 아키텍처 전환
- **기존 문제점 해결과 미래 과제 대응**
- Web Component(LIT) 기반 전환 완료
- **완벽한 마이그레이션**으로 스마트한 해결책 제시

## 3. 숏폼 콘텐츠 생태계 구축
- **올해 초 숏폼 도입으로 콘텐츠 확장**
- 현재 셔터에서 일반 게시물보다 숏폼이 더 많음
- **m3u8 포맷 영상 도입** 안정적 완료
- 다양한 지면에서 활용 가능한 콘텐츠로 발전
            `
          },

          // 5. 2026년 비전과 계획
          {
            type: 'content',
            title: '2026년 계획과 비전',
            content: `
# 더 재미있는 도전이 기다리고 있습니다

## 2026년 핵심 목표
- **콘텐츠 허브 구축**: 통합된 콘텐츠 생태계 완성
- **개인화 서비스**: AI 기반 맞춤형 콘텐츠 추천
- **사용자 경험 혁신**: 더 재미있고 유용한 발견 경험

## 기술적 도전 과제
- **콘텐츠 특성을 살린** 새로운 기술 도입
- **색다른 시각**에서의 개발 접근법
- 정답이 없는 영역에서의 **창의적 해결책**

## 발견스쿼드의 미래
- 매번 새로운 시각으로 문제 해결
- 생산성 도구와 AI 활용 극대화
- 올리브영 콘텐츠 생태계의 핵심 역할
            `
          },

          // 6. 마무리 - Q&A
          {
            type: 'content',
            title: 'Q&A',
            layout: 'center',
            content: `
# 질문과 답변

## 궁금한 점이 있으시다면 언제든 물어보세요!

---

### 연락처
**발견스쿼드 팀**

### 참고 자료
- 프로젝트 상세 문서
- 기술 블로그 포스팅
- 성과 측정 대시보드

---

## 함께해 주셔서 감사합니다!
            `
          }
        ]

        // 슬라이드 컴포넌트 생성
        const createdSlides = slideData.map((slide, index) => {
          switch (slide.type) {
            case 'intro':
              return <IntroSlide key={index} {...slide} />
            case 'content':
              return <ContentSlide key={index} {...slide} />
            case 'stats':
              return <StatsSlide key={index} {...slide} />
            case 'timeline':
              return <TimelineSlide key={index} {...slide} />
            default:
              return <ContentSlide key={index} {...slide} />
          }
        })

        setSlides(createdSlides)
        setIsLoading(false)
      } catch (error) {
        console.error('슬라이드 로드 오류:', error)
        setIsLoading(false)
      }
    }

    loadSlides()
  }, [discoverySquadData])

  if (isLoading) {
    return (
      <div className="presentation-loading">
        <div className="loading-spinner" />
        <p>프레젠테이션을 준비하고 있습니다...</p>
      </div>
    )
  }

  return (
    <div className="presentation-app">
      <SlideContainer
        slides={slides}
        onExitPresentation={onExitPresentation}
      />
    </div>
  )
}

export default PresentationApp