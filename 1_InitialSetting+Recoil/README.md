# 초기세팅 (ESLint + Prettier + Stylelint) / Recoil

# ESLint란?

ES는 EcmaScript(=Js)로서 Ecma재단에서 만든 Script Specification을 의미하고, Lint는 에러가 있는 코드에 표시를 달아주는 것을 의미한다.

자바스크립트는 동적 분석을 하기 때문에 에러를 찾기 위해서는 코드를 직접 실행하고 확인해야 한다.

- 동적 분석: 프로그램을 직접 실행해서 코드 분석
- 정적 분석: 프로그램을 실행하지 않고 코드 분석

이를 도와주는 것이 Linter인데, 코드를 정적으로 분석해서 프로그램 실행 전에 코딩 컨벤션에 맞지 않는 내용을 검출해준다.
<img width="1194" alt="스크린샷 2022-05-08 오후 4 32 03" src="https://user-images.githubusercontent.com/86053064/168998812-74cff6eb-a129-4a39-85d7-dc58687b6e34.png">

출처: [https://eslint.org/](https://eslint.org/)

constant는 재선언, 재할당이 불가능한데 같은 이름의 상수를 재선언 했을 경우에 lint가 알려준다.

# Prettier
<img width="1440" alt="스크린샷 2022-05-08 오후 4 35 08" src="https://user-images.githubusercontent.com/86053064/168999066-5bdfff56-67bc-4728-8ead-86be17ae9dfc.png">

출처: [https://prettier.io/playground/](https://prettier.io/playground/)

전체 코드가 출력되는 width, 개발자들 사이에서도 말 많은 tab width 등 유저가 원하는 값들을 설정하면, 개떡같이 코드를 쳐도 찰떡같이 정리해주는 코드 포매터이다.

### Pretteir 와 Linter(ESLint 포함)의 차이점?

린터에는 크게 두 가지 규칙이 있다.

1. formatting 규칙: no-mixed-spaces-and-tabs, comma-style...

prettier을 사용하면 linter가 띄워주는 formatting 관련 경고들이 필요없어진다. Prettier을 적용하고 코드를 저장하게 되면 자동으로 전체 코드를 포맷에 맞게 재정렬하기 때문이다.

1. code-quality 규칙: [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind), [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)...

코드 퀄리티 보장 측면에서 ECMAScript의 규격에 맞도록 linter가 에러를 띄워주는데, prettier은 이 측면에서 무능(...)하다.

<aside>
💡 포매팅을 위해 prettier을, 버그를 잡기 위해서 linter을! 두 개의 용도를 알고 같이 사용하는 것이 가장 적합하다.

</aside>

# Stylelint

css 린트 툴로, css/scss/less에서 style 구문을 린팅한다.
![Untitled](https://user-images.githubusercontent.com/86053064/168999189-c84d9597-a136-43cb-b45f-abf5f82389b1.png)

VS Code 확장 툴로 설치하고 settings.json에서 사용 여부를 설정할 수 있다.

```jsx
{
  "stylelint.enable": true, // stylelint 사용
  "css.validate": false, // 내장되어 있는 css linter 사용하지 않음
  "scss.validate": false // 내장되어 있는 scss linter 사용하지 않음
}
```

# Recoil

리액트의 부모인 페이스북이 직접 내놓은 상태 관리 라이브러리다.

## 등장 배경

### 외부 상태 관리 라이브러리의 한계

기존에 널리 쓰이던 Redux나 Mobx에서 사용하는 store는 리액트 입장에서 외부요인으로 취급되기 때문에 내부 스케줄러에 접근할 수 없었다. 또한, 기본적인 store 구성을 위해 많은 보일러 플레이트와 코드가 필요했다. 비동기 데이터 처리, 계산된 값 캐시와 같은 중요한 기능은 라이브러리의 자체 기능이 아니였으며, 이를 해결하기 위해 또 다른 라이브러리를 사용해야 했다. 그리고 만약 selector가 동적인 prop을 받아야 할 경우, 이 값을 정확하게 memoization하는 것이 어려웠다.

- memoization: 주어진 입력값에 대한 결과를 메모리에 저장함으로써 같은 입력값에 대해 함수가 한 번만 실행되는 것을 보장한다(주로 dictionary에 저장).

### Context API의 한계

- Context API란?
  리액트가 가진 상태 공유 솔루션이다. 일반적으로 부모와 자식간 props를 날려 state를 변화시키는 것과 달리, context api는 컴포넌트간 간격이 없다. 즉, 컴포넌트를 건너뛰고 다른 컴포넌트에서 state와 function을 사용할 수 있다. 컴포넌트 안에서 전역적으로 데이터를 공유하도록 하기에, theme/로그인 데이터/웹 내 사용자가 쓰는 설정파일 등 다양한 컴포넌트간 공유되어야 하는 데이터에 사용하면 좋다.
- 한계
  반복적이고 복잡한 업데이트에 사용할 경우 비효율적이기때문에, React-Redux에서는 store 참조를 전달할 때만 context API를 사용한다.

## Recoil의 차별성

1. 배우기 쉽다. API가 단순하며, 이미 hook을 사용해 본 사람들에게 익숙하다. Recoil을 사용하기 위해서는 어플리케이션을 RecoilRoot로 감싸고, 데이터를 atom이라는 단위로 선언하여 useState를 Recoil의 useRecoilState로 대체해야 한다.
2. 컴포넌트가 사용하는 데이터 조각만 사용할 수 있고, 계산된 selector을 선언할 수 있으며, 비동기 데이터 흐름을 위한 내장 솔루션이 제공된다.

   동적 키로 atom을 만들고, selector에 인자를 보내는 작업 등을 간단하게 할 수 있다.

단점: Hooks를 통해서만 사용할 수 있고, 디버깅 도구의 지원이 미미하며, 프로덕션 레벨에서 사용하기엔 아직 부담이 있다.

## Recoil 기본기

**atom —** 하나의 상태. 컴포넌트가 구독할 수 있는 React state이다. atom의 값을 변경하면 그것을 구독하고 있는 컴포넌트들이 모두 다시 렌더링된다. atom을 생성하기 위해선 고유한 키 값과 디폴트 값을 설정해야한다.

```jsx
export const nameState = atom({
  key: "nameState",
  default: "Jane Doe",
});
```

**useRecoilState —** atom의 값을 구독하여 업데이트할 수 있는 hook. `useState`와 동일한 방식으로 사용할 수 있다.

**useRecoilValue —** setter 함수 없이 atom의 값을 반환만 한다.

**useSetRecoilState —** setter 함수만 반환한다.

```jsx
import { nameState } from "./someplace";
// useRecoilState
const NameInput = () => {
  const [name, setName] = useRecoilState(nameState);
  const onChange = (event) => {
    setName(event.target.value);
  };
  return (
    <>
      <input type="text" value={name} onChange={onChange} />
      <div>Name: {name}</div>
    </>
  );
};
// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
};
// useSetRecoilState
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName("Jon Doe")}>Set Name</button>;
};
```

**selector —**
 seletor는 상태에서 파생된 데이터로, 다른 atom에 의존하는 동적인 데이터를 만들 수 있게 해준다. Recoil의 selector는 기존에 우리가 알던 selector의 개념과는 조금 다르다. Redux의 `reselect`
와 MobX의 `@computed`처럼 동작하는 "get" 함수를 가지고 있다. 하지만 하나 이상의 atom을 업데이트 할 수 있는 "set" 함수를 옵션으로 받을 수 있다.

아래 예제에선 우선 “selector”만 다룬다.

```jsx
// 동물 목록 상태
const animalsState = atom({
  key: "animalsState",
  default: [
    {
      name: "Rexy",
      type: "Dog",
    },
    {
      name: "Oscar",
      type: "Cat",
    },
  ],
});
// 필터링 동물 상태
const animalFilterState = atom({
  key: "animalFilterState",
  default: "dog",
});
// 파생된 동물 필터링 목록
const filteredAnimalsState = selector({
  key: "animalListState",
  get: ({ get }) => {
    const filter = get(animalFilterState);
    const animals = get(animalsState);

    return animals.filter((animal) => animal.type === filter);
  },
});
// 필터링된 동물 목록을 사용하는 컴포넌트
const Animals = () => {
  const animals = useRecoilValue(filteredAnimalsState);
  return animals.map((animal) => (
    <div>
      {animal.name}, {animal.type}
    </div>
  ));
};
```

자료 출처 및 추가적으로 더 복잡한 구현을 보고 싶다면 →

[Recoil - 또 다른 React 상태 관리 라이브러리?](https://ui.toast.com/weekly-pick/ko_20200616)

# 과제

recoil 공식 문서를 참고해서 counter 만들어보기
