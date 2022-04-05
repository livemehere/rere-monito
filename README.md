## 모니토 대공사

## Rules

- 작업은 반드시 `develop` 브랜치에서 합니다
- global 스타일은 src/index.css 에서 하도록 합니다
- 상태관리는 recoil 을 사용합니다.
- 컴포넌트는 반드시 `함수형 컴포넌트`를 사용합니다.
- ❗️ http 통신은 반드시 util/axiosManager.js 를 사용하도록 합니다(가급적 axios 따로 사용하지 말것!)
- 새로운 페이지를 만들때는 `<Layout>`컴포넌트로 감싸줍니다.(layout 규격맞추기)

## 상태관리(Recoil) 사용 Tip

- 상태를 새로 추가할때는 /src/atoms/에 `상태이름.js` 로 생성합니다
- 작성법은 다른 파일을 참고하도록 합니다.
- 사용은 `useRecoilState()`를 사용합니다

## Done

- page routing
- login
