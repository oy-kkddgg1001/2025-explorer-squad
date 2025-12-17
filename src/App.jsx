import { useState } from 'react'
import './App.css'
import TimelineChart from './components/TimelineChart'
import AreaCards from './components/AreaCards'
import Milestones from './components/Milestones'
import ProjectDetail from './components/ProjectDetail'
import PresentationApp from './PresentationApp'

const projectsData = [
  {
    id: 'shortform',
    name: '숏폼 개발 프로젝트',
    icon: '',
    color: '#e74c3c',
    phases: [
      { month: 1, type: 'dev', label: '개발', tooltip: '숏폼 업로드 기능 개발 시작' },
      { month: 3, type: 'qa', label: 'CBT', tooltip: '숏폼 CBT: 3/4-3/31\n403건 영상 수집' },
      { month: 4, type: 'qa', label: 'QA', tooltip: '셔터 메인 개편 QA: 4/21' },
      { month: 5, type: 'dev', label: '배포', tooltip: '셔터 메인 개편 배포: 5/15' },
    ],
    status: 'completed',
    achievement: '403건 영상, 13건 제보 처리',
  },
  {
    id: 'affiliate',
    name: '어필리에이트 프로젝트',
    icon: '',
    color: '#f39c12',
    phases: [
      { month: 4, type: 'dev', label: '착수', tooltip: '프로젝트 착수 및 설계' },
      { month: 7, type: 'dev', label: 'P1', tooltip: 'Phase 1 개발완료: 7/25' },
      { month: 8, type: 'qa', label: 'QA', tooltip: 'Phase 1 QA: 7/28-8/18\nPhase 1 배포: 8/21' },
      { month: 9, type: 'dev', label: 'P2', tooltip: 'Phase 2 배포: 9/18\n5일간 매출 5,133만원!' },
    ],
    status: 'completed',
    achievement: '5일간 매출 5,133만원 달성',
  },
  {
    id: 'review-modern',
    name: '리뷰탭 모던아키텍처',
    icon: '',
    color: '#3498db',
    phases: [
      { month: 7, type: 'dev', label: '개발', tooltip: '개발 착수: 7/1\nWeb Component(LIT) 기반' },
      { month: 8, type: 'dev', label: '홈GNB', tooltip: '홈&GNB: 8/8 완료\nAPI 지원 & 컴포넌트 제공: 8/7\n상품탭: 8/28 완료' },
      { month: 9, type: 'dev', label: '배포', tooltip: '홈&GNB 통합 배포: 9/11\n부하테스트: 8/27' },
      { month: 10, type: 'dev', label: '상품탭', tooltip: '상품탭 개발배포: 10/23' },
      { month: 11, type: 'dev', label: '점진오픈', tooltip: '대고객 점진오픈: 11/10\n37/37 티켓 완료!' },
    ],
    status: 'completed',
    achievement: '37/37 티켓 100% 완료, API & 컴포넌트 지원 완료',
  },
  {
    id: 'discovery',
    name: '발견탭 개발',
    icon: '',
    color: '#9b59b6',
    phases: [
      { month: 5, type: 'dev', label: 'P1', tooltip: 'Phase 1 시작 및 완료' },
      { month: 10, type: 'dev', label: 'P2', tooltip: 'Phase 2 기획: 10/1' },
      { month: 11, type: 'dev', label: '개발', tooltip: '개발완료 예정: 11/24' },
      { month: 12, type: 'dev', label: '배포', tooltip: 'QA: 11/25 시작\n배포: 12/18 예정' },
    ],
    status: 'in-progress',
    achievement: '12월 18일 배포 예정',
  },
]


// 콘텐츠전시 스쿼드 프로젝트 데이터
const contentProjectsData = [
  {
    id: 'partner-live',
    name: '파트너 라이브 인프라',
    icon: '',
    color: '#f39c12',
    phases: [
      { month: 2, type: 'dev', label: '착수', tooltip: '프로젝트 착수 및 설계' },
      { month: 6, type: 'qa', label: 'QA', tooltip: 'STG QA: 6/26-7/8' },
      { month: 7, type: 'dev', label: '배포', tooltip: '배포 완료: 7/10\n점진적 오픈: 50%→70%→100%' },
    ],
    status: 'completed',
    achievement: '파트너 라이브 시스템 구축 완료',
  },
  {
    id: 'event-automation',
    name: '이벤트 당첨 자동화',
    icon: '',
    color: '#1abc9c',
    phases: [
      { month: 10, type: 'qa', label: '1차QA', tooltip: '1차 QA: 10/1-10/13\n75% 진척률' },
      { month: 11, type: 'qa', label: '통합QA', tooltip: '통합 QA: 10/27-11/3\nSTG: 11/6-11/13' },
      { month: 11, type: 'dev', label: '배포', tooltip: '배포: 11/20\n이벤트 당첨자 자동 추출' },
    ],
    status: 'completed',
    achievement: '이벤트 자동화 시스템 완료',
  },
  {
    id: 'live-preview',
    name: '라이브 예고 페이지 & 어드민',
    icon: '',
    color: '#9b59b6',
    phases: [
      { month: 10, type: 'dev', label: '1차개발', tooltip: '1차 개발 완료: 10/31\n기본 생성 시스템\n2차 진척률: 66% (28/42)' },
      { month: 11, type: 'qa', label: '통합QA', tooltip: '1차 QA: 11월\n2차 QA: 11월\n백포스 프로세스 간소화' },
      { month: 11, type: 'dev', label: '1차배포', tooltip: '1차 배포: 11월 중\n예고 페이지 자동 생성' },
      { month: 12, type: 'dev', label: '2차배포', tooltip: '2차 배포: 12/11\n제작 어드민 완료' },
    ],
    status: 'completed',
    achievement: '라이브 예고 페이지 시스템 & 제작 어드민 완료',
  },
  {
    id: 'other-projects',
    name: '기타 프로젝트',
    icon: '',
    color: '#95a5a6',
    phases: [
      { month: 1, type: 'dev', label: '웹접근성', tooltip: '웹앱접근성 개선 완료: 1/16\n라이브&매거진 접근성 향상' },
      { month: 3, type: 'dev', label: 'm3u8', tooltip: 'm3u8 영상 변환 배포: 3/13\n비디오 파일 자동 변환' },
      { month: 7, type: 'dev', label: 'IA개편', tooltip: 'IA 개편 완료: 7/3\n발견탭 & 하단탭바 멀티 드로워' },
      { month: 10, type: 'dev', label: '편집기', tooltip: '아티클편집기 웹컴포넌트: 10/31\n100% 완료' },
      { month: 12, type: 'dev', label: '어워즈', tooltip: '올리브영 어워즈: 12/5-12/24\n프리퀀시 프로모션' },
    ],
    status: 'completed',
    achievement: '웹접근성, m3u8, IA개편, 편집기, 어워즈 등 다수 완료',
  },
]

const contentMilestonesData = [
  { date: '3월 13일', title: '기타 프로젝트 시작', desc: '웹접근성, m3u8 영상변환 등 다수 프로젝트 착수' },
  { date: '7월 10일', title: '파트너 라이브 인프라 완성', desc: '파트너사 라이브 방송 시스템 오픈' },
  { date: '10월 31일', title: '기타 프로젝트 완료', desc: 'IA개편, 아티클편집기, 어워즈 등 다수 프로젝트 완성' },
  { date: '11월 20일', title: '이벤트 당첨 자동화 런칭', desc: '이벤트 당첨자 자동 추출 시스템' },
  { date: '12월 11일', title: '라이브 예고 페이지 & 어드민 완성', desc: '예고 페이지 시스템 & 제작 어드민 통합 완료' },
]



const milestonesData = [
  { date: '3월 4일-31일', title: '숏폼 CBT 대성공', desc: '403건 영상 수집, 13건 제보 처리' },
  { date: '5월 15일', title: '셔터 메인 개편 완료', desc: '숏폼 Phase2 성공적 배포' },
  { date: '6월 7일-11일', title: '어필리에이트 실적 검증', desc: '5일간 총 매출 5,133만원 달성' },
  { date: '8월 21일', title: '어필리에이트 Phase 1 런칭', desc: '95% 진척률(89/93 티켓)' },
  { date: '9월 11일', title: '리뷰탭 모던아키텍처 & 홈GNB 통합 배포', desc: 'Web Component(LIT) 기반 홈&GNB 배포, API 지원 & 컴포넌트 제공' },
  { date: '9월 18일', title: '어필리에이트 Phase 2 완성', desc: '정산금 지급 시스템 완료' },
  { date: '11월 10일', title: '리뷰탭 상품탭 점진오픈', desc: '37/37 티켓 100% 완료' },
  { date: '12월 18일', title: '발견탭 Phase 2 배포', desc: '통합 콘텐츠 경험 개선 (예정)' },
]

const discoveryCardsData = [
  {
    title: '셔터',
    description: '숏폼 콘텐츠 플랫폼',
    image: `${import.meta.env.BASE_URL}images/discovery.png`
  },
  {
    title: '라이브',
    description: '실시간 방송 콘텐츠',
    image: `${import.meta.env.BASE_URL}images/live.png`
  },
  {
    title: '매거진',
    description: '아티클 및 매거진 콘텐츠',
    image: `${import.meta.env.BASE_URL}images/magazine.png`
  }
]

const otherCardsData = [
  {
    title: '리뷰',
    description: '진정성 있는 사용자 후기와 소통',
    image: `${import.meta.env.BASE_URL}images/review.png`
  },
  {
    title: '어필리에이트',
    description: '새로운 비즈니스 모델',
    image: `${import.meta.env.BASE_URL}images/affiliate2.png`
  }
]

// 발견스쿼드 통합 데이터 (프레젠테이션용)
const discoverySquadData = {
  // 통합 프로젝트 데이터
  projects: [
    ...projectsData,
    ...contentProjectsData
  ],

  // 통합 마일스톤
  milestones: [
    ...milestonesData,
    ...contentMilestonesData
  ].sort((a, b) => {
    // 날짜 기준 정렬
    const getDateValue = (dateStr) => {
      const match = dateStr.match(/(\d+)월\s*(\d+)일/)
      if (match) return parseInt(match[1]) * 100 + parseInt(match[2])
      return 0
    }
    return getDateValue(a.date) - getDateValue(b.date)
  }),

  // 통합 통계 (프레젠테이션용 - 나중에 수정 예정)
  stats: [
    { value: '예시 데이터', label: '성과 지표 1' },
    { value: '예시 데이터', label: '성과 지표 2' },
    { value: '예시 데이터', label: '성과 지표 3' },
    { value: '예시 데이터', label: '성과 지표 4' }
  ]
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeView, setActiveView] = useState('timeline')
  const [activeSquad, setActiveSquad] = useState('review') // 'review' or 'content'
  const [mode, setMode] = useState('dashboard') // 'dashboard' or 'presentation'

  // 현재 활성 스쿼드에 따른 데이터 선택
  const getSquadData = () => {
    switch(activeSquad) {
      case 'content':
        return {
          projects: contentProjectsData,
          milestones: contentMilestonesData,
          title: '발견스쿼드',
          subtitle: '리뷰/커뮤니티 스쿼드와 콘텐츠전시팀이 하나로 합쳐진 팀입니다. 유저에게 재미와 구매 의사결정에 도움을 주고, 올리브영 앱 체류 시간을 늘리는 콘텐츠 경험을 만듭니다. 정답과 성공 방정식이 정해져 있지 않은 도전적 영역에서 매번 색다른 시각으로 문제를 해결합니다.'
        }
      default: // review
        return {
          projects: projectsData,
          milestones: milestonesData,
          title: '발견스쿼드',
          subtitle: '리뷰/커뮤니티 스쿼드와 콘텐츠전시팀이 하나로 합쳐진 팀입니다. 유저에게 재미와 구매 의사결정에 도움을 주고, 올리브영 앱 체류 시간을 늘리는 콘텐츠 경험을 만듭니다. 정답과 성공 방정식이 정해져 있지 않은 도전적 영역에서 매번 색다른 시각으로 문제를 해결합니다.'
        }
    }
  }

  const squadData = getSquadData()

  // 프레젠테이션 모드 종료 핸들러
  const handleExitPresentation = () => {
    setMode('dashboard')
  }

  // 프레젠테이션 모드인 경우 PresentationApp 렌더링
  if (mode === 'presentation') {
    return (
      <PresentationApp
        onExitPresentation={handleExitPresentation}
        discoverySquadData={discoverySquadData}
      />
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="title-section">
            <h1>{squadData.title}</h1>
            <p className="subtitle">{squadData.subtitle}</p>
          </div>
          <div className="cards-section">
            <div className="discovery-section">
              <h2 className="section-title">발견</h2>
              <AreaCards cards={discoveryCardsData} />
            </div>
            <div className="other-cards-section">
              <h2 className="section-title">리뷰, 어필리에이트</h2>
              <AreaCards cards={otherCardsData} />
            </div>
          </div>
        </div>
      </header>

      <button
        className="presentation-fab"
        onClick={() => setMode('presentation')}
        title="프레젠테이션 모드로 전환"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      </button>

      <nav className="nav-tabs">
        <div className="tab-navigation">
          <div className="primary-tabs">
            <button
              className={`primary-tab ${activeSquad === 'review' ? 'active' : ''}`}
              onClick={() => {
                setActiveSquad('review')
                setSelectedProject(null)
              }}
            >
              리뷰/커뮤니티
            </button>
            <button
              className={`primary-tab ${activeSquad === 'content' ? 'active' : ''}`}
              onClick={() => {
                setActiveSquad('content')
                setSelectedProject(null)
              }}
            >
              콘텐츠전시
            </button>
          </div>

          <div className="secondary-tabs">
            <button
              className={`secondary-tab ${activeView === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveView('timeline')}
            >
              타임라인
            </button>
            <button
              className={`secondary-tab ${activeView === 'milestones' ? 'active' : ''}`}
              onClick={() => setActiveView('milestones')}
            >
              마일스톤
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {activeView === 'timeline' && (
          <TimelineChart
            projects={squadData.projects}
            onProjectClick={setSelectedProject}
          />
        )}

        {activeView === 'milestones' && (
          <Milestones milestones={squadData.milestones} />
        )}
      </main>

      {selectedProject && (
        <ProjectDetail
          project={squadData.projects.find(p => p.id === selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App
