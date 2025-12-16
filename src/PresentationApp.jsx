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
            subtitle: 'UGC/크리에이터 콘텐츠 생태계를 구축하는 스쿼드',
            author: '발견스쿼드',
            date: '2025년 12월'
          },

          // 2. 2025년 주요 성과 통계
          {
            type: 'stats',
            title: '2025년 주요 성과',
            subtitle: '각 영역별 핵심 성과',
            stats: [
              { value: '셔터', label: '전시게시물 49,751건 | 숏폼 9,594건' },
              { value: '어필리에이트', label: '파트너 8,706명 | 순매출 47.7억' },
              { value: '리뷰', label: '모던 아키텍처 전환 완료' },
              { value: '라이브', label: '브랜드사 방송 인프라 구축' }
            ]
          },

          // 3. 발견
          {
            type: 'content',
            title: '발견',
            images: [
              `${import.meta.env.BASE_URL}images/discovery.png`,
              `${import.meta.env.BASE_URL}images/discovery.png`,
              `${import.meta.env.BASE_URL}images/discovery.png`
            ],
            content: `
## 2025년 발견 영역 성과

### 셔터 성장
- **387만 유니크 액티브 유저** (작년 대비 약 100만 상승)
- **49,751건 전시게시물**: 전체 셔터 콘텐츠

### 숏폼 콘텐츠 플랫폼 구축
- **9,594건 숏폼 오픈**: 올해 새롭게 도입된 숏폼 콘텐츠
- 현재 셔터에서 일반 게시물보다 숏폼이 더 많음
- **m3u8 포맷 영상 도입** 안정적 완료

### 주요 작업
- 셔터 메인 개편으로 새로운 콘텐츠 소비 경험
- CBT를 통한 403건 영상 수집, 13건 제보 처리
            `
          },

          // 4. 어필리에이트
          {
            type: 'content',
            title: '어필리에이트',
            images: [
              `${import.meta.env.BASE_URL}images/affiliate.png`,
              `${import.meta.env.BASE_URL}images/affiliate.png`,
              `${import.meta.env.BASE_URL}images/affiliate.png`
            ],
            content: `
## 2025년 어필리에이트 성과

### 새로운 비즈니스 모델 구축
- **8,706명 파트너 가입**: 크리에이터 생태계 확장
- **47.7억 순매출 달성**: 새로운 수익 모델 검증
- 5일간 매출 5,133만원 달성 (런칭 초기)

### 주요 작업
- Phase 1/2 체계적 개발 및 런칭
- 정산금 지급 시스템 구축
- 성공적인 검증과 안정적 출시 완료

### TODO: 추가 내용 작성
- (여기에 상세 내용을 추가해주세요)
            `
          },

          // 5. 리뷰
          {
            type: 'content',
            title: '리뷰',
            images: [
              `${import.meta.env.BASE_URL}images/review.png`,
              `${import.meta.env.BASE_URL}images/review.png`,
              `${import.meta.env.BASE_URL}images/review.png`
            ],
            content: `
## 2025년 리뷰 영역 성과

### 모던 아키텍처 전환 완료
- **37/37 티켓 100% 완료**: 완벽한 마이그레이션 달성
- Web Component(LIT) 기반 전환
- 생산성과 UX 대폭 증대

### 주요 작업
- 홈&GNB 통합 개발
- 상품탭 개발 완료
- API 지원 & 컴포넌트 제공
- 11/10 점진적 오픈 완료

### TODO: 추가 내용 작성
- (여기에 상세 내용을 추가해주세요)
            `
          },

          // 6. 라이브
          {
            type: 'content',
            title: '라이브',
            images: [
              `${import.meta.env.BASE_URL}images/live.png`,
              `${import.meta.env.BASE_URL}images/live.png`,
              `${import.meta.env.BASE_URL}images/live.png`
            ],
            content: `
## 2025년 라이브 영역 성과

### 브랜드사 방송 인프라 구축
- 파트너사 라이브 방송 시스템 전체 인프라 구축
- 7/10 배포 완료
- 점진적 오픈 (50% → 70% → 100%)

### 주요 작업
- 라이브 예고 페이지 생성
- 제작 어드민 시스템 구축
- 백포스 수동 제작 프로세스 간소화
- 1차 11월 배포, 2차 12/11 배포 완료

### TODO: 추가 내용 작성
- (여기에 상세 내용을 추가해주세요)
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