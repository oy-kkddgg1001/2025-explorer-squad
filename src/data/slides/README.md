# 📊 슬라이드 마크다운 가이드

발견스쿼드 프레젠테이션 시스템에서 사용할 수 있는 슬라이드 마크다운 파일 작성 가이드입니다.

## 🚀 시작하기

1. **슬라이드 파일 생성**: 이 디렉토리에 `.md` 파일을 생성합니다
2. **YAML Front Matter 작성**: 파일 상단에 슬라이드 메타데이터를 정의합니다
3. **마크다운 콘텐츠 작성**: Front Matter 아래에 실제 슬라이드 내용을 작성합니다

## 📋 지원하는 슬라이드 타입

### 1. 인트로 슬라이드 (`type: intro`)
프레젠테이션의 시작 페이지로 사용

```yaml
---
type: intro
title: "프레젠테이션 제목"
subtitle: "부제목"
icon: "🚀"
author: "작성자"
date: "2025년 12월"
background: "배경이미지URL(선택사항)"
---
```

### 2. 콘텐츠 슬라이드 (`type: content`)
일반적인 텍스트 콘텐츠 표시

```yaml
---
type: content
title: "슬라이드 제목"
layout: center  # center, left, two-column
background: "배경이미지URL(선택사항)"
---

# 마크다운 콘텐츠
일반적인 마크다운 문법을 사용하여 내용 작성
```

### 3. 통계 슬라이드 (`type: stats`)
수치 데이터를 시각적으로 표시

```yaml
---
type: stats
title: "통계 제목"
subtitle: "통계 부제목"
layout: horizontal  # horizontal, vertical, grid
stats:
  - value: "100"
    label: "완료 프로젝트"
  - value: "50%"
    label: "성과 달성"
---
```

### 4. 타임라인 슬라이드 (`type: timeline`)
프로젝트 진행 상황을 타임라인으로 표시

```yaml
---
type: timeline
title: "타임라인 제목"
subtitle: "타임라인 부제목"
compact: true
projects:
  - id: "project-1"
    name: "프로젝트명"
    icon: "🚀"
    color: "#e74c3c"
    phases:
      - month: 1
        type: "dev"
        label: "개발"
        tooltip: "설명"
    status: "completed"
    achievement: "주요 성과"
---
```

## 🎨 레이아웃 옵션

### 콘텐츠 슬라이드 레이아웃
- `center`: 중앙 정렬 (기본값)
- `left`: 좌측 정렬
- `two-column`: 2단 레이아웃 (`---` 구분선 기준으로 좌우 분할)

### 통계 슬라이드 레이아웃
- `horizontal`: 가로 배치 (기본값)
- `vertical`: 세로 배치
- `grid`: 격자 배치

## ✍️ 마크다운 문법

### 제목
```markdown
# 대제목 (H1)
## 중제목 (H2)
### 소제목 (H3)
```

### 텍스트 스타일링
```markdown
**굵은 글씨**
*기울임 글씨*
~~취소선~~
```

### 목록
```markdown
- 불릿 포인트 1
- 불릿 포인트 2
  - 하위 항목

1. 번호 목록 1
2. 번호 목록 2
```

### 구분선
```markdown
---
```

## 📁 파일 구조 예시

```
src/data/slides/
├── README.md              # 이 가이드 파일
├── intro.md               # 인트로 슬라이드
├── tech-achievements.md   # 기술 성과
├── business-impact.md     # 비즈니스 임팩트
├── team-culture.md        # 팀 문화
├── future-vision.md       # 미래 비전
├── stats-example.md       # 통계 슬라이드 예시
└── timeline-example.md    # 타임라인 슬라이드 예시
```

## 🔧 사용법

1. 원하는 슬라이드 타입에 맞는 예시 파일을 참고하세요
2. 새로운 `.md` 파일을 생성하고 YAML Front Matter를 작성하세요
3. 마크다운 콘텐츠를 작성하세요
4. 프레젠테이션 모드에서 확인하세요

## 💡 팁

- **간결함 유지**: 슬라이드는 핵심 내용만 포함하세요
- **시각적 요소**: 이모티콘을 활용해 시각적 효과를 높이세요
- **일관성**: 전체 프레젠테이션에서 일관된 톤앤매너를 유지하세요
- **테스트**: 작성 후 프레젠테이션 모드에서 확인하세요

## 🚨 주의사항

- YAML Front Matter는 반드시 파일 최상단에 `---`로 감싸야 합니다
- 들여쓰기는 공백 2칸을 사용하세요
- 특수문자가 포함된 텍스트는 따옴표로 감싸세요