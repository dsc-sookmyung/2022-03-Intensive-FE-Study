# CSS-in-CSS

1. CSS module

css를 모듈화하여 사용하는 방식으로, css 클래스를 만들면 자동으로 고유한 class name을 만들어 scope를 지역적으로 제한한다. 모듈화된 css를 번들러로 불러오면, 아래 그림과 같이 사용자가 정의한 class name과 고유한 class name으로 이루어진 객체가 반환된다. 


장점: 동일한 프로젝트 소스 안에 중복되는 css 클래스 이름이 있더라도, 새로운 이름이 입혀져 중복의 위험성이 적다. 

css 네이밍 규칙이 간소화된다. 

단점: 한 곳에서 모든것을 작성하지 않기에 별도로 많은 css 파일을 만들어 관리해야 한다. 

1. CSS 전처리기

자신만의 특별한 구문(syntax)를 가지고 css를 생성하는 프로그램. 변수, 함수, 상속 등 일반적인 프로그래밍 개념을 사용할 수 있다. 가장 많이 사용하는 모듈은 Sass, Less, Stylus다. 

장점: 공통 요소, 반복적인 항목을 변수 또는 함수로 대체하여 재사용성이 높다. 

임의 함수, 내장 함수로 인해 개발 시간과 비용 절약이 가능하다. 

중첩, 상속과 같은 요소로 인해 구조화된 코드를 유지할 수 있어 관리가 용이하다. 

단점: 전처리기를 위한 도구가 반드시 필요하고, 컴파일 단계를 한번 더 거치기 때문에 시간이 더 소요된다. 

- Sass 사용 예시(출처: sass-lang.com)
    - 변수 사용
```jsx        
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}  
```
    
    - 중첩
        
```jsx
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
    

# CSS-in-JS

자바스크립트 코드에서 CSS를 작성하는 방식이다. 
## Styled Components

가장 많이 쓰이는 CSS-in-JS 라이브러리 중 하나로, 스타일링을 위한 프레임워크다. 자바스크립트의 태그가 지정된 템플릿 리터럴과 CSS로 스타일링을 한다. 

- styled-components 설치

```jsx
$ yarn add styled-components
```

styled-components를 사용하면 스타일을 입력함과 동시에 해당 스타일을 가진 컴포넌트를 만들 수 있다. 

- styled.div → div 스타일링
- styled.input → input 스타일링

### 사용 예시

```jsx
import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: black;
  border-radius: 50%;
`;

function App() {
  return <Circle />;
}

export default App;
```

### props 적용

- 템플릿 리터럴로 컴포넌트의 props 읽어오기
    
    ```jsx
    const StyledDiv = styled`
      background: ${props => props.color};
    `;
    ```
    

```jsx
import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
`;

function App() {
  return <Circle color="blue" />;
}

export default App;
```

- 위 코드는 어떻게 작동할까?
    
    color props 값을 설정했을 시 해당 값을 배경색으로 설정한다. props가 없으면 검정색을 배경으로 사용한다. 
    
```jsx
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: black;
  `}
`

render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs">
      Documentation
    </Button>
  </div>
)
```

### 과제

1주차 과제의 counter 버튼을 styled-components 사용해서 만들기

- +, - 버튼 색상 다르게 (props 사용)

📚참고 자료

공식 문서: [https://styled-components.com/](https://styled-components.com/)

[https://react.vlpt.us/styling/03-styled-components.html](https://react.vlpt.us/styling/03-styled-components.html)

[https://www.samsungsds.com/kr/insights/web_component.html](https://www.samsungsds.com/kr/insights/web_component.html)
