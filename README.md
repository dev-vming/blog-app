# React Blog

**배포 주소** : [React Blog로 이동](https://react-blog-ed639.web.app)

React를 활용하여 간단한 블로그 앱을 제작하였습니다.
Firebase 기반 회원가입과 로그인, 게시물 CRUD와 댓글 기능, 배포를 진행하였습니다. 

## 🌟 주요 기능

- 이메일 회원가입 / 로그인 기능
- 게시물 카테고리 별 모아보기 기능
- 작성자 별 (전체 글, 내가 쓴 글) 게시물 모아보기 기능
- 게시물 작성, 자신의 게시물 편집 및 삭제 기능
- 댓글 작성 및 자신의 댓글 삭제 기능
- 다크 모드 지원

## 🛠️ 기술 스택
- **Frontend**
  <p display="inline-block">
  	<img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white" />
  	<img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white" />
  </p>

- **Backend & Deployment** (Firestore, Authentication, Hosting)
  <p display="inline-block">
    <img src="https://img.shields.io/badge/firebase-DD2C00?style=flat&logo=firebase&logoColor=white" /> 
  </p>

## 📦 프로젝트 설치 및 실행

```bash
git clone https://github.com/dev-vming/blog-app.git
cd blog-app
yarn install
yarn start
```

## 🚀 배포 방법

```bash
yarn build
yarn global add firebase-tools
yarn firebase deploy
```

