# yplabs front-end
### Todo List

- react-native: 0.73
- react-navigation: 6.x
- react-native-async-storage: 1.22
- axios: 1.6.7
- dayjs: 1.11
- @reduxjs/toolkit: 2.2.1

### 실행 방법 및 실행 시 주의 사항
- 패키지 매니저로는 `yarn`을 사용했으며, 실행 전 `yarn install`을 통해 패키지를 설치합니다.
- `post-install`을 통해 `yarn install` 이후 `cd ios && pod install && cd ..`을 적용하여 `pod install`을 실행합니다.
- `yarn start` 이 후 `iOS는 i`, `android는 a`로 시뮬레이터/에뮬레이터를 실행합니다.

### 전반적인 구조 설계 및 설명
- `App > RootNavigation`내 `Stack`을 통해 페이지 이동이 이뤄 질 수 있도록 적용했습니다.
- `Stack`으로는 `Todo(TodoListScreen)`와 `Detail(TodoDetailScreen)` 스택이 있습니다.
- `TodoListScreen`
  - 할 일 `목록`을 표기하는 페이지로, 내부 `View Component`로는 `TodoList`와 `TodoModal`로 구성 되어 있습니다.
  - 전체 메모 가져오기, 전체 메모 slice (pageSize 기준으로 무한스크롤 적용), 상단 새로고침, 바닥 도달 시 무한스크롤, 토클 스위치 (완료|미완료), 완료 리스트 AsyncStorage 저장, 할 일 작성/수정, 할 일 제출 (등록|수정), 할 일 초기화, 할 일 수정하기, 할 일 삭제하기 로직이 있습니다.
    - `TodoList`
      - 목록의 View를 보여주는 컴포넌트로, `FlatList`를 통해서 리스트를 나열했으며, 내부 `Item` 컴포넌트로 각 아이템의 View를 구현했습니다.
      - 아이템별 수정, 삭제는 `TodoStatusComponent`를 통해 공통 컴포넌트로 구분하여 적용했습니다.
      - `navigation` 함수를 통해 할 일 클릭 시 해당 상세 페이지로 이동할 수 있도록 했습니다.
      - `onRefresh`,`onEndReached` 함수를 통해 상단 새로고침, 하단 무한 스크롤 구현했습니다.
      - 새로고침과 무한 스크롤은 `currPage`라는 변수를 통해 해당 변수가 +1 될 때 리스트를 slice 할 수 있도록 useEffect 내 dependency로 처리 하였으며, 중복 호출을 방지하고자 loading 함수로 구분하여 적용해습니다.
    - `TodoModal`
      - 할 일을 추가하는 모달로 ListScreen에서는 작성/수정이 가능할 수 있도록 `isEdit` flag를 통해 구분하였습니다.
- `TodoDetailScreen`
  - 할 일 `상세 페이지`로, 내부 `View Component`로는 `TodoDetail`과 `TodoModal`이 있습니다.
  - `TodoDetail`
    - 상세 내용의 View를 보여주는 컴포넌트로, 내부 내용이 길 경우를 대비하여 `ScrollView`를 통해서 표기할 수 있도록 적용하였습니다.
    - `TodoStatusComponent`를 사용하여 수정/삭제를 적용할 수 있도록 하였습니다.
    - 표기 및 적용하는 기능으로는 완료/미완료 토글, 할 내용, 작성 기능, 수정 시간 을 표기하였습니다.
  - `TodoModal`
    - 목록에서 사용되는 컴포넌트와 동일하나, `isEdit` flag를 추가하여, 수정만 가능할 수 있도록 했습니다.
- `TodoStatusComponent`
  - 각 할 일별 수정, 삭제를 적용할 수 있도록 하였으며, `is_finished`의 값에 따라 수정이 가능 혹은 불가능 하도록 적용했습니다.
- `LoadingComponent`
  - `Redux`로 관리되는 `loading` state에 따라 UX 관점에서 로딩이 표기될 수 있도록 생성한 공통 컴포넌트 입니다.
- `redux toolkit`, `asyncStorage`
  - 전역 상태관리를 위해 적용하였으며, slice로는 `commonSlice`, `todoDetailSlice`, `todoListSlice`로 공통, 디테일, 리스트로 구분하여 관리합니다.
  - 앱이 꺼졌을 때 완료/완료 취소 데이터를 유지하기 위해서는 `할 일 완료 유무` 데이터를 관리해야합니다. `redux persist` 또한 `asyncStorage`에 저장하는 것은 동일하다 판단하여, react-native에서 제공하는 라이브러리인 AsyncStorage에 완료된 id만 저장할 수 있도록 로직을 구현하였습니다.
  - `src/hook` 폴더 내부에 `asyncStorage.ts`를 통해 `storeData`와 `getData` 함수로 데이터를 조회/저장 하였으며, 차후 사용을 위해 `removeData` 함수 또한 적용해 두었습니다.
- `api`
  - `axios`를 적용하여 `get`, `post`, `delete`, `patch` 함수를 반영했습니다.
  - 일반적으로 `baseUrl`의 경우 `.env`에 적용해야 하나, 로컬 프로젝트임을 감안하여 상단에 `baseUrl` 를 지정함으로써 사용했습니다.


+ redux-saga
  + 리덕스 사가는 동기로 작동하는 redux와 비동기로 작동하는 api 연동 사이에 사이드 이펙트를 적용하는 미들웨어로 알고 있습니다.
  + 리덕스 사가를 적용하기 위해서 리덕스 내 미들웨어로 적용해야하나, 숙련도가 부족하여 `main` 브랜치에는 반영하지 않았습니다. 해당 테스트 로직은 `redux-saga` 브랜치로 따로 적용하였습니다. 
  + api 호출 및 비동기 사이드 이펙트 처리를 위해 async/await 처리로 적용했습니다.
  + 리덕스 사가를 적용하지 못하면서 테스트 함수인 Jest 또한 반영하지 못했습니다.
