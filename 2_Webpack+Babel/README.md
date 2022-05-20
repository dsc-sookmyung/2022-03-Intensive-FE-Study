# webpack이란?

여러개의 파일을 하나의 파일로 합쳐주는 모듈 번들러

webpack이 애플리케이션을 처리할때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 하나 이상의 번들을 생성하는 디펜던시 그래프를 만든다.

앤트리 포인트에서 시작하여 애플리케이션에 필요한 모든 모듈을 포함하는 디펜던시 그래프를 재귀적으로 만들고 모든 모듈을 브라우저에 의해 로드 되는 작은 수의 번들로 묶는다.

- **Entry** : 앤트리 포인트는 webpack이 내부의 디펜던시 그래프를 생성하기 위해 사용해야 하는 모듈
webpack은 앤트리 포인트가 의존하는 모든 모듈과 라이브러리를 찾아냄
    
    ```jsx
    
    // 단일 앤트리 구문
    module.exports = {
      entry: './path/to/my/entry/file.js',
    };
    
    or
    
    // 다중 앤트리 구문 - 배열로 전달
    module.exports = {
      entry: ['./src/file_1.js', './src/file_2.js'],
      output: {
        filename: 'bundle.js',
      },
    };
    ```
    

- **Output** : 생성된 번들을 내보낼 위치와 이 파일의 이름을 webpack에 알려주는 역할
기본 출력 파일은 ./dist/main.js
생성된 기타 파일은 ./dist
    
    ```jsx
    const path = require('path');
    
    module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
      },
    };
    ```
    

- **Loader** : webpack이 기본적으로 이해하는 javascript 파일과 JSON 파일 외의 다른 유형의 파일을 처리할 때 그것들을 유효한 모듈로 변환하여 애플리케이션에 사용하거나 디펜던시 그래프에 추가함
 - test 속성: 변환이 필요한 파일을 식별
 - use 속성 : 변환을 수행하는 데에 사용되는 로더 지칭
    
    ```jsx
    const path = require('path');
    
    module.exports = {
      output: {
        filename: 'my-first-webpack.bundle.js',
      },
      module: {
        rules: [{ test: /\.css$/, use: 'style-loader', 'css-loader' }],
      },
    };
    ```
    

- **Plugins** : 번들을 최적화하거나 asset을 관리하고 환경 변수 주입 등을 함
플러그인을 사용하려면 `require ()`를 통해 플러그인을 요청하고 `plugins` 배열에 추가해야 함
플러그인을 여러 번 사용하도록 설정하기 위해 `new` 연산자로 호출하여 인스턴스를 만들어야 함
    
    ```jsx
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack'); // 내장 plugin에 접근하는 데 사용
    
    module.exports = {
      module: {
        rules: [{ test: /\.txt$/, use: 'raw-loader' }],
      },
      plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    };
    ```
    

- Mode : `development`, `production` 또는 `none`으로 설정하면 webpack에 내장된 환경별 최적화를 활성화 할 수 있다
기본값은 `production`
    
    ```jsx
    module.exports = {
      mode: 'production',
    };
    ```
    

# Babel 이란?

Babel은 ES6+ 버전 이상의 자바스크립트나 JSX, 타입 스크립트 코드를 하위 버전의 자바 스크립트 코드로 변환시켜 IE나 다른 브라우저에서 동작할 수 있도록 해준다.

### Babel을 사용하는 이유

- 크로스 브라우징
: 플랫폼이나 각 브라우저의 랜더링 엔진의 차이로 보이는 모습이 다른 경우가 있는 데, 최적화 작업을 통해 기존에 의도한 대로 보이도록 하는 작업

개발을 진행하면서 간혹 최신 브라우저에서 동작하는 기능을 다른 브라우저나 이전 버전의 브라우저에서 구현해야 하는 경우, 기능 자체를 생략하거나 단순화해야 하는 상황이 발생하는데 이는 코드 일관성을 해칠 수 있으면 협업 과정에 문제를 야기할 수 있으므로 Babel을 사용함

![image](https://user-images.githubusercontent.com/49112482/169436894-829c23c1-2513-4a40-8aee-2ddec17f0414.png)

출처 : [Babel 사이트](https://babeljs.io/)

### Babel 설치

```jsx
yarn add -D @babel/core @babel/cli
```

- @bable/core : Babel을 사용하는데 필요한 패키지
- @babel/cli : 터미널에서 커맨드를 입력해서 Babel을 사용하기 위한 패키지

### 작성했던 코드에 Babel을 적용하는 방법

```jsx
npx babel <파일명/디렉토리명>
```

### Preset 설정

- preset : 필요한 플러그인들을 목적에 따라 세트로 묶어놓은 것

매번 코드에 babel을 적용하는 것은 번거롭기 때문에 문법 변환 규칙을 한번에 적용하는 방법

preset 다운로드

```jsx
yarn add -D @babel/preset-env
```

Babel 설정 변환

```jsx
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79', // 크롬 79까지 지원하는 코드를 만든다
          ie: '11' // ie 11까지 지원하는 코드를 만든다
        }
      }
    ]
  ]
}
```

### Polyfill

폴리필은 최신 ECMAScript 환경을 만들기 위해 코드가 실행되는 환경에 존재하지 않는 빌트인, 메소드 등을 추가하는 역할

```jsx
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 폴리필 사용 방식 지정
        corejs: { // 폴리필 버전 지정
          version: 2
        }
      },
    ],
  ],
};
```

# 과제

1주차에 나미 언니 과제로 만든 Recoil 코드에 CSS를 추가해서 webpack 해보기
