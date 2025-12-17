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
              { value: '리뷰', label: '모던 아키텍처(LIT) 전환 / AI 리뷰 요약' },
              { value: '라이브', label: '브랜드사 방송 인프라 구축 \n 지속적 확대로 매월 10-15개 브랜드 참여 중' }
            ]
          },

          // 3. 발견
          {
            type: 'content',
            title: '발견',
            images: [
              `${import.meta.env.BASE_URL}images/discovery.png`,
              `${import.meta.env.BASE_URL}images/discovery1.jpeg`,
            ],
            content: `
## 2025년 발견 영역 성과

### 셔터 성장
- **387만 유니크 액티브 유저** (작년 대비 약 100만 상승)
- **49,751건 전시게시물**: 전체 셔터 콘텐츠

### 숏폼 콘텐츠 플랫폼 구축
- **9,594건 숏폼 오픈**: 올해 새롭게 도입된 숏폼 콘텐츠
- **m3u8 포맷 영상 도입** 안정적 완료

### 주요 작업
- **듀얼탭 구조 도입**: Feed 탭(탐색형), Play 탭(숏폼 몰입형)
- **콘텐츠 통합 큐레이션**: 주제별 클러스터링, 해시태그 기반 연결
- **개인화 추천 고도화**: 뷰티 특화 데이터 활용
- **브랜드 솔루션 플랫폼화**: 브랜디드 콘텐츠, 크리에이터 프로필 지원
            `
          },

          // 4. 어필리에이트
          {
            type: 'content',
            title: '어필리에이트',
            images: [
              `${import.meta.env.BASE_URL}images/affiliate1.png`,
              `${import.meta.env.BASE_URL}images/affiliate2.png`,
              `${import.meta.env.BASE_URL}images/affiliate3.png`
            ],
            content: `
## 2025년 어필리에이트 성과

### 뷰티 버티컬 최초 자체 어필리에이트 프로그램 론칭
- **8/21 올리브영 쇼핑큐레이터 출시**: 뷰티 커머스 업계 선도
- **론칭 1.5개월 간 15억원 매출 달성**: 유튜브 어필리에이트 대비 +67.5%
- **1.9만명 활동자 참여**: 수익 활성자 87.5% 증가 (622명→1,166명)

### 압도적 성과 지표
- **ROAS 1,836%**: 업계 TOP 수준 달성
- **구매전환율 9.8%**: OY몰 평균 대비 +4.9%p
- **100만원 이상 매출 달성자**: 128명 (9.8%) 확보
- **47.7억 순매출 달성**: 새로운 수익 모델 검증 완료

### 콘텐츠 생태계 활성화
- **숏폼 콘텐츠 27% 증가**: 815건 → 1,036건
- **발견탭 연계**: 외부 크리에이터 유입으로 고퀄리티 콘텐츠 지속 생산
- **MCN 파트너십**: 9곳 미팅, 2곳 협업 진행 중

### 시스템 인프라 구축
- **다단계 승인 시스템**: 안정성과 효율성 확보
- **실시간 대시보드**: 투명한 성과 조회 환경 제공
- **SAP 연동 자동 정산**: 월단위 성과 집계 및 지급 처리

### 미래 계획
- **2027년 400억원 매출 목표** 설정
- 지속 가능한 인플루언서 생태계 구축
            `
          },

          // 5. 리뷰
          {
            type: 'content',
            title: '리뷰',
            images: [
              `${import.meta.env.BASE_URL}images/review.png`,
              `${import.meta.env.BASE_URL}images/review2.png`,
              `${import.meta.env.BASE_URL}images/review3.png`
            ],
            content: `
## 2025년 리뷰 영역 성과

### 모던 아키텍처 전환 완료
- Web Component(LIT) 기반 전환
- DX / UX 대폭 증대

### 주요 작업
- 홈&GNB 통합 개발
- 상품탭 개발 완료
- API 지원 & 컴포넌트 제공
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

### 파트너 라이브 플랫폼 구축 완료
- **3단계 시스템 구축**: 신청/승인 → 방송등록/승인 → 방송송출 시스템
- **협력사 자율 운영**: 파트너오피스를 통한 전체 프로세스 셀프 관리
- **실시간 대시보드**: 시청/매출 통계 실시간 확인 기능

### 라이브 예고 페이지 시스템 신설
- **브랜드 맞춤 구성**: 협력사가 브랜드 색깔에 맞게 자유롭게 제작
- **사전 화제성 증대**: 알림 신청을 통한 방송 전 유입 강화
- **아티클 편집기**: 다양한 모듈 활용한 페이지 구성 도구

### 2025년 핵심 실적
- **참여 브랜드**: 18개 브랜드 (파트너 라이브)
- **주문액 성과**: 누적 3.9억원 | 12월 세일 41억원 (목표 대비 102.7%)
- **시청자 성과**: 누적 153.6만명 | 12월 세일 268만명 (전년 대비 +123%)
- **기네스 달성**: 12월 세일 참여 36개 브랜드 중 16개 브랜드 기네스

### 2026년 확장 계획
- **파트너 라이브 533회** 진행 목표 (전년 대비 +428건)
- **매월 10-15개 브랜드** 지속 참여 중
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
