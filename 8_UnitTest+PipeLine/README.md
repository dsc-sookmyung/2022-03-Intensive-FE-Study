## Unit Test

: 하나의 모듈을 기준으로 독립적으로 진행되는 가장 작은 단위의 테스트

- 독립적인 테스트이기 때문에 어떤 코드를 리팩토링해도 빠르게 문제 여부 확인 가능
  - 테스팅에 대한 시간과 비용 절감 가능
  - 새로운 기능 추가 시에 수시로 빠르게 테스트 가능
  - 리팩토링 시에 안정성을 확보 가능
  - 코드에 대한 문서가 될 수 있음
- 문제점: 다른 객체와 메시지를 주고 받는 모듈의 경우 문제 발생 → 가짜 객체 주입해 특정 결과 반환하라고 정해진 답변 준비시켜야: stub
- 테스트코드가 따라야 할 규칙: FIRST
  1. Fast: 테스트는 빠르게 동작하여 자주 돌릴 수 있어야 한다.
  2. Independent: 각각의 테스트는 독립적이며 서로 의존해서는 안된다.
  3. Repeatable: 어느 환경에서도 반복 가능해야 한다.
  4. Self-Validating: 테스트는 성공 또는 실패로 bool 값으로 결과를 내어 자체적으로 검증되어야 한다.
  5. Timely: 테스트는 적시에 즉, 테스트하려는 실제 코드를 구현하기 직전에 구현해야 한다.

> 통합 테스트: 모듈 통합하는 과정에서 모듈 간의 호환성 확인

## TDD(Test Driven Development)

테스트 코드 작성 - 테스트 run - 테스트가 성공할 수 있는 최소한의 코드 작성해 다시 테스트 실행

## React Testing Library

### Jest

: Javascript 테스트 러너

- mocking modules과 timer 같은 특징과 결합돼 훌륭한 반복 속도 제공
- react testing
  - **설정/해제**: beforeEach와 afterEach 블록쌍을 사용
    - `beforeEach`: React 트리를 document의 DOM 엘리먼트에 렌더링
    - `afterEach`: 테스트 끝나면 테스트와 관련된 설정, 값에 대해 정리(clean up)하고 document 트리에서 마운트 해제
      ```jsx
      import { unmountComponentAtNode } from "react-dom";

      let container = null;
      beforeEach(() => {
        // DOM 엘리먼트를 렌더링 대상으로 설정
        container = document.createElement("div");
        document.body.appendChild(container);
      });

      afterEach(() => {
        // 종료시 정리
        unmountComponentAtNode(container);
        container.remove();
        container = null;
      });
      ```
  - **act()**
    - 단위와 관련된 모든 업데이트문이 실행되기 전에 처리, DOM에 적용되도록 도움.
      ```jsx
      act(() => {
        // 컴포넌트를 렌더링
      });
      // assertions 만들기
      ```
  - **렌더링 테스트**
    - 컴포넌트
      ```jsx
      // hello.js

      import React from "react";

      export default function Hello(props) {
        if (props.name) {
          return <h1>Hello, {props.name}!</h1>;
        } else {
          return <span>Hey, stranger</span>;
        }
      }
      ```
    - 테스트
      ```jsx
      it("renders with or without a name", () => {
        act(() => {
          render(<Hello />, container);
        });
        expect(container.textContent).toBe("Hey, stranger");

        act(() => {
          render(<Hello name="Jenny" />, container);
        });
        expect(container.textContent).toBe("Hello, Jenny!");

        act(() => {
          render(<Hello name="Margaret" />, container);
        });
        expect(container.textContent).toBe("Hello, Margaret!");
      });
      ```

## CI pipeline

- CI: Continuous Integration. 지속적인 통합.
  - 버그 수정이나 새로 만든 기능이 Main Repository에 주기적으로 build, test, merge되는 것
  - 통합을 위한 단계(build, test, merge)의 자동화
  - 머지 충돌 피할 수 있어 개발 생산성 향상, 테스트 과정에서 문제점 빠르게 발견 가능
- CD: Continuous Delivery/Deploy. 지속적인 제공/배포.
  - 최종 배포 단계 수동: delivery. 자동화: deploy
- Tools
  - Jekins의 Buildkite
  - github의 Actions
    ![image](https://user-images.githubusercontent.com/76686872/179396388-6e480c38-05f7-4e14-9a3b-4afd11cd53c3.png)
    ![image](https://user-images.githubusercontent.com/76686872/179396440-aa3566e7-1922-44df-9a6e-a0ff415fa2bb.png)

---

참고

- [https://ko.reactjs.org/docs/testing-recipes.html](https://ko.reactjs.org/docs/testing-recipes.html#act)
- [https://www.youtube.com/watch?v=0Emq5FypiMM](https://www.youtube.com/watch?v=0Emq5FypiMM)
- [https://mangkyu.tistory.com/143](https://mangkyu.tistory.com/143)

---

과제

카운터에 테스트 붙이기
