---
type: timeline
title: "📅 2025년 프로젝트 타임라인"
subtitle: "월별 주요 프로젝트 진행 현황"
compact: true
background: ""
projects:
  - id: "example-project"
    name: "예시 프로젝트"
    icon: "🚀"
    color: "#e74c3c"
    phases:
      - month: 1
        type: "dev"
        label: "개발"
        tooltip: "프로젝트 개발 시작"
      - month: 3
        type: "qa"
        label: "QA"
        tooltip: "품질 보증 테스트"
      - month: 4
        type: "dev"
        label: "배포"
        tooltip: "프로덕션 배포"
    status: "completed"
    achievement: "성공적 배포 완료"
    jira: ["EXAMPLE-001"]
---

# 타임라인 슬라이드 사용법

## 📋 YAML Front Matter 설정

타임라인 슬라이드는 `projects` 배열에 프로젝트 데이터를 정의합니다.

### 프로젝트 객체 구조

```yaml
projects:
  - id: "프로젝트-고유-ID"
    name: "프로젝트 이름"
    icon: "🚀"  # 표시할 이모티콘
    color: "#e74c3c"  # 프로젝트 색상 (hex)
    phases:  # 프로젝트 단계들
      - month: 1  # 월 (1-12)
        type: "dev"  # 단계 타입: dev, qa, deploy 등
        label: "개발"  # 표시할 라벨
        tooltip: "상세 설명"
    status: "completed"  # completed, in-progress
    achievement: "주요 성과"
    jira: ["지라-티켓-번호"]
```

## 🎨 설정 옵션

- `compact: true` - 컴팩트한 레이아웃 사용
- 기존 대시보드의 TimelineChart 컴포넌트 재사용