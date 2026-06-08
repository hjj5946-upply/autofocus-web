# Project: AutofocusModernization

## 1. 프로젝트 개요
(주)오토포커스 홈페이지 리뉴얼 프로젝트. PHP 레거시에서 React + Vite 기반의 모던 스택으로 전환.

## 2. 기술 스택
- Frontend: React 19 (TypeScript)
- Build: Vite
- Styling: Tailwind CSS (v4.3+)
- Animation: GSAP (@gsap/react, useGSAP)
- State Management: Zustand
- I18n: react-i18next
- Mail: @emailjs/browser

## 3. 폴더 구조 원칙 (Atomic Design)
- `src/components/atoms`: 최소 단위 컴포넌트 (버튼, 인풋, 텍스트)
- `src/components/molecules`: 복합 컴포넌트 (검색창, 문의폼 라인)
- `src/components/organisms`: 주요 섹션 (헤더, 푸터, 히어로 섹션)
- `src/hooks`: 커스텀 훅
- `src/store`: Zustand 스토어

## 4. 개발 및 스타일링 규칙
- **TypeScript**: 모든 데이터와 props는 명확한 인터페이스/타입 정의를 가질 것.
- **Tailwind CSS**: 
  - 기본적으로 Tailwind 유틸리티 클래스 우선 사용.
  - 다크모드 대응: `dark:` 접두사 적극 활용.
- **GSAP**: 인터랙션은 반드시 `useGSAP` 훅을 사용하며, 메모리 누수 방지를 위해 정리(cleanup) 로직 포함.
- **이미지**: WebP 포맷 사용을 기본으로 하며, 필요 시 최적화.

## 5. 다국어 및 테마
- 모든 하드코딩된 텍스트는 `t('키값')`으로 번역 처리.
- 테마 상태는 `useThemeStore`를 통해 전역 관리.

## 6. 내비게이션 및 메뉴 구조 (Information Architecture)
홈페이지의 메뉴는 사용자가 직관적으로 이해할 수 있도록 아래와 같이 그룹화하여 관리한다.

- **Company**: 회사 소개
- **Solutions (Mega Menu)**:
    - 하위 항목: PDI, Logistics, Sales&CRM, DMS, PARTS, FINANCE
- **Services**:
    - 하위 항목: 수입자동차 솔루션, 고객 Sales&CRM, 부품판매시스템, 홈페이지 개발
- **Clients**: 고객사 및 파트너
- **Contact**: 문의하기

### 내비게이션 구현 원칙:
1. **Desktop**: 메가 메뉴(Mega Menu)를 활용하여 `Solutions`와 `Services`의 하위 항목을 한눈에 볼 수 있도록 구성한다.
2. **Mobile**: 햄버거 메뉴를 적용하여 계층 구조를 명확히 보여준다.
3. **확장성**: 추후 메뉴가 추가되거나 변경될 경우 `src/constants/navigation.ts`와 같은 파일에서 데이터로 관리되도록 구현한다.

## 7. 디자인 시스템 (Design System)
일관된 브랜드 아이덴티티 유지를 위해 다음 컬러 팔레트를 기본으로 한다.

- **Primary Brand Color**: `#1e293b` (Deep Navy) - 주요 버튼, 핵심 강조 요소
- **Accent Color**: `#3b82f6` (Tailwind Blue-500) - 인터랙티브 요소, 호버 효과, 강조 링크
- **Background (Light)**: `#ffffff` (White)
- **Background (Dark)**: `#0f172a` (Tailwind Slate-900)
- **Text (Light)**: `#1e293b` (Slate-800)
- **Text (Dark)**: `#f8fafc` (Slate-50)

### 스타일 적용 원칙:
1. **Primary 컬러(#1e293b)**는 핵심 브랜드 요소에만 사용하며, 너무 과도하게 사용하지 않는다.
2. 모든 컴포넌트의 컬러 값은 Tailwind의 `color` 유틸리티를 활용하되, 커스텀 컬러가 필요할 경우 `tailwind.config.js`의 `theme.extend.colors`에 등록하여 관리한다.

## 8. UX/UI 철학

본 프로젝트는 전통적인 회사소개 홈페이지를 만드는 것이 아니다.

목표는 글로벌 OEM 및 자동차 산업 관계자가 방문했을 때,
회사의 기술력, 안정성, 시스템 구축 역량을 직관적으로 이해할 수 있는
엔터프라이즈 플랫폼 스타일의 경험을 제공하는 것이다.

### UX 원칙

- 사용자는 메뉴를 탐색하는 것이 아니라 스크롤을 통해 회사를 이해해야 한다.
- 페이지 이동보다 섹션 기반 탐색을 우선한다.
- 정보 구조(Information Architecture)를 시각적으로 명확하게 표현한다.
- 모든 콘텐츠는 "서비스 소개"보다 "시스템 구조 설명"에 가깝게 표현한다.
- UI는 산업용 소프트웨어 플랫폼처럼 보이도록 설계한다.

### 디자인 원칙

- 화려함보다 신뢰감을 우선한다.
- 장식보다 정보 전달을 우선한다.
- 자동차 산업의 정밀함과 엔터프라이즈 소프트웨어의 안정성을 동시에 표현한다.
- 여백과 그리드를 적극 활용한다.
- 콘텐츠 중심 디자인을 유지한다.

### 인터랙션 원칙

- GSAP은 시각적 과시가 아닌 정보 이해를 돕기 위한 목적으로 사용한다.
- 모든 애니메이션은 의미를 가져야 한다.
- 스크롤 흐름을 방해하는 과도한 효과를 사용하지 않는다.
- 섹션 전환은 자연스럽고 부드럽게 구성한다.