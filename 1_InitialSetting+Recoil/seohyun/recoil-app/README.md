## Recoil 등장 배경

|      | Redux, Mobx (외부 상태 관리 라이브러리)                                                                                                                                                                             | Context API                                              | Recoil                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 장점 | 상태 관리 용이                                                                                                                                                                                                      | 컴포넌트간 간격이 없기에 전역적이고 간단한 데이터에 용이 | hook을 사용한 사람에게 배우기 쉬움. <br /> 비동기 데이터 흐름을 위한 내장 솔루션 제공.                |
| 단점 | store는 리액트에서 외부 요인 취급되어 구성 위해 많은 코드 필요. <br /> 비동기 데이터 처리, 계산된 값 캐시 불가. 이를 해결하기 위해 또다른 라이브러리 사용해야. <br /> selector가 동적인 prop 받아야하면 정확한 memoization 어려움 | 반복적이고 복잡한 업데이트에 사용할 경우 비효율적.       | Hooks을 통해서만 사용 가능.<br />  디버깅 도구 지원 미미. <br /> 프로덕션 레벨에서 사용하기에는 부담이 있음. |

## Recoil 기본기

- **atom**: state
    ```jsx
    export const nameState = atom({
      key: 'nameState',
      default: 'Jane Doe'
    });
    ```   
- **useRecoilState**: atom 값 업데이트 가능. useState hook과 동일한 방식으로 사용.
- **useRecoilValue**: [value, setValue] 중 value(atom값)만 반환
- **useSetRecoilState**: setter 함수만 반환
    ```jsx
    import {nameState} from './someplace'

    // useRecoilState
    const NameInput = () => {
      const [name, setName] = useRecoilState(nameState);
      return <>
       <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
       <div>Name: {name}</div>
      </>;
    }
    
    // useRecoilValue
    const SomeOtherComponentWithName = () => {
      const name = useRecoilValue(nameState);
      return <div>{name}</div>;
    }
    
    // useSetRecoilState  
    const SomeOtherComponentThatSetsName = () => {
      const setName = useSetRecoilState(nameState);
      return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
    }
    ```
- **selector**: 파생된 상태(==상태의 변화)의 일부 나타냄. atom의 상태에 의존하는 동적인 데이터 생성.
    ```jsx
    // 파생된 state
    const nameCountState = selector({
      key: 'nameCountState', // unique ID (with respect to other atoms/selectors)
      get: ({get}) => {
        const text = get(nameState);

        return text.length;
      },
    });

    // 파생된 state를 사용하는 컴포넌트
    const nameCount = () => {
      const count = useRecoilValue(nameCountState);
      return <>NameStr Count: {count}</>;
    }
    ```

---


[RECOIL 공식 문서](https://recoiljs.org/ko/docs/introduction/getting-started)
