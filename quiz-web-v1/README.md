# Vue.js , Spring Getting Started

Spring, Vue.js 기반의 심플한 웹사이트를 구축한다. 참고로, 업무와는 별개로 집에서 심심할때 개발하였다. 회사 소스는 보안상 추가할 수가 없었다. 

- Overview
- 관련연구
- 기본셋팅 및 프로젝트 구조
- Vue 기본 구성


## Overview
Spring 기반의 Vue.js 샘플 웹사이트 구축한다. 

**기술스펙**
- Vue.js
- Webpack
- Spring Boot 2.0
- Gradle

**요구사항**
- 간단한 퀴즈 웹사이트를 만든다.
- SPA 개념을 도입한다.
- 스프링 기반으로 서버를 띄운다. 즉, Jar 로 빌드 할 수 있어야 한다.

## 관련연구
개발 전에 관련연구를 한다. 

#### SPA(Single Page Application)
SPA(단일 페이지 애플리케이션)는 모던한 웹 개발 방법으로, 기본적으로 단일 페이지로 구성되며 네이티브 앱과 유사한 사용자 경험을 제공한다고 한다. 단일 페이지 애플리케이션은 CSS, Javascript 번들 리소스를 포함하는 심플한 HTML의 화면으로 구성되며, 사용자의 요청에 의해서 새로운 페이지를 호출하지 않고 현재 페이지에서 동적으로 빠르게 사용자에게 화면을 재구성한다.
> A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.

기존에 개발 방법과는 많이 다르기 때문에 사실 나는 아직도 이 방법이 익숙하지는 않다. 자세한 내용은 아래 링크를 참고하자.

[https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58)


> 사실 SPA 가 무조건 정답이라고 생각하지는 않는다. SPA가 장단점이 있기 때문에, SPA 가 적합한 웹사이트 여부는 신중하게 고민은 필요하다. 


#### Vue.js
Vue.js 에 대해서는 공식 가이드 를 참고하자.
[https://kr.vuejs.org/v2/guide/index.html](https://kr.vuejs.org/v2/guide/index.html)


#### Backend for Front-End Pattern
여유가 있다면 참고만 하자.
[https://docs.microsoft.com/ko-kr/azure/architecture/patterns/backends-for-frontends](https://docs.microsoft.com/ko-kr/azure/architecture/patterns/backends-for-frontends)
[https://samnewman.io/patterns/architectural/bff/](https://samnewman.io/patterns/architectural/bff/)

#### 스프링
dd

#### Gradle
ddd


## 기본 셋팅

#### Gradle 디펜던시
Gradle 기반으로 스프링 부트 웹 프로젝트를 시작한다. 디펜던시는 아래와 같이 아주 심플하게 추가하였다.
```java
dependencies {  
compile('org.springframework.boot:spring-boot-starter-freemarker')  
compile('org.springframework.boot:spring-boot-starter-web')  
compile 'org.projectlombok:lombok:1.16.16'  
testCompile('org.springframework.boot:spring-boot-starter-test')  
}
```

#### Vue.js , jQuery, BootStrap 등
필요한 모듈을 설치해야 한다. 아래와 같이 터미널에서 필요한 모듈을 설치한다. 
```
npm install -save jquery
npm install -save vue
```
node_modules 디렉토리에 해당 모듈이 생성이 된다. 그리고 package.json 파일에 추가가 된다. 
더 간단한 방법은 누군가가 만든 package.json 을 가져온 다음에 npm install 만 하면 전부 설치 추가 된다. 
```
npm install
```
같은 얘기지만, package.json 파일을 수정하고 npm install 을 실행하면 변경된 모듈이 재적용 된다. 예를 들어서, 내가 jquery 버전을 1.X 로 적용하고 싶다면, 아래와 같이 변경하고 npm install 을 하면 새로 적용된다. 
```javascript
"jquery.1": "^1.0.0",
```

#### 프로젝트 구조
생성된 프로젝트는 이렇다. 
![enter image description here](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2MrI/image/ixEgkAkJX_p82BgdOtjpFfM_HeQ.PNG)

모든 기능은 프론트엔드에서 수행한다. 백엔드에서는 비즈니스 로직 및 데이터를 API 형태로 구현한다. 즉, Backend for Front-End Pattern 을 적용한다. main\java 하위에 클래스는 백엔드에서 처리하는 로직을 포함한다. 그 외에 프론트엔드 기능은  main\js 밑에 vue 파일과 js 파일에 구현한다. 

- node_modules : npm 으로 설치 된 모듈 파일
- gradle
- out/production: 실제로 요청에 의해서, 애플리케이션에서 실행되는 파일
- src/main/java
- src/main/resources
- src/main/js : 내가 만든 디렉토리, Vue 등 컴포넌트 파일을 포함한다.

Spring MVC 구조의 특성을 고려하여, 프론트엔드에서 생성하는 bundle.js 파일을 out/production 디렉토리로 복사해야 한다. CSS 파일 마찬가지 이다.  webpack.config.js 파일을 아래와 같이 수정한다. 
```javascript
//webpack.config.js 파일 설정
생략...
output: {  
    filename: 'js/bundle.js',  
  path: __dirname + '/build/resources/main/static'  
},
생략...
plugins: [  
    new ExtractTextPlugin("css/styles.css"),  
  new FileManagerPlugin({  
        onEnd: {  
            copy: [  
                {  
                    source: __dirname + '/build/resources/main/static/js/bundle.js',  
  destination: __dirname + '/out/production/resources/static/js/bundle.js'  
  },  
  {  
                    source: __dirname + '/build/resources/main/static/css/styles.css',  
  destination: __dirname + '/out/production/resources/static/css/styles.css'  
  }  
            ]  
        }  
    })  
]
```

암튼 해당 디렉토리 구조가 매우 익숙하지 않다. 일반적으로 Spring MVC 개발을 하면 Javascript 파일은 resource/static 밑에 포함하지만, 해당 샘플 프로젝트에서는 새로 만든 디렉토리에 js 파일을 구성한다. 핵심 파일을 아래와 같이 정리하였다. 

- app.js : Webpack 엔트리 페이지, 초기 호출 파일이라고 생각하면 된다. 
- App.vue : app.js 파일에서 설정하는 루트 컴포넌트 페이지
- route.js : Vue 컴포넌트의 페이지 라우팅 설정
- pages/페이지.vue : 각종 Vue 컴포넌트 페이지

pages 디렉토리에 페이지 단위의 vue 컴포넌트 파일이 추가 될 것이다. 해당 파일은 webpack 에 의해서 빌드되어 호출된다. 


#### 사용자가 처음 호출하는 화면
아래 소스가 끝이다. 나는 이 소스를 보고 깨달았다. 
```html
<!doctype html>
<hml>
<head>
<title>My page</title>
<link href="[/css/styles.css](http://vuejs.co.kr/css/styles.css)" rel="stylesheet">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>
<div id="app"></div>
<script src="[/js/bundle.js](http://vuejs.co.kr/js/bundle.js)"></script>
</body>
</html>
```

> 아... 이게 SPA 이구나... 아님 말고...

어쨋든 Vue 컴포넌트 파일은 모두 bundle.js 하나의 파일에 빌드 된다. 솔직히 드는 생각은, 내가 서비스 하는 프로젝트에는 적합하지 않겠다는 생각이기는 하다. 모바일 서비스에는 적합할 수도 있겠다. 뭐 어쩃든 개인적인 의견은 이정도로 소심하게만 하겠다. 

#### 최종 Webpack.config
개인적으로 나는 Webpack이 너무 어렵다. 
```js
const webpack = require("webpack");  
const ExtractTextPlugin = require("extract-text-webpack-plugin");  
const FileManagerPlugin = require('filemanager-webpack-plugin');  
  
module.exports = {  
    entry: './src/main/js/app.js',  
  output: {  
        filename: 'js/bundle.js',  
  path: __dirname + '/build/resources/main/static'  
  },  
  module: {  
        loaders: [  
            {  
                test: /\.vue$/,  
  loader: 'vue-loader'  
  },  
  {  
                test: /\.js$/,  
  use: {  
                    loader: 'babel-loader',  
  options: {  
                        presets: ['es2015']  
                    }  
                },  
  exclude: /node_modules/  
  },  
  {  
                test: /\.css$/,  
  use: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
  use: "css-loader"  
  })  
            },  
  {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},  
  {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},  
  {test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff'},  
  {test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff'},  
  {test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff'}  
        ]  
    },  
  plugins: [  
        new ExtractTextPlugin("css/styles.css"),  
  new FileManagerPlugin({  
            onEnd: {  
                copy: [  
                    {  
                        source: __dirname + '/build/resources/main/static/js/bundle.js',  
  destination: __dirname + '/out/production/resources/static/js/bundle.js'  
  },  
  {  
                        source: __dirname + '/build/resources/main/static/css/styles.css',  
  destination: __dirname + '/out/production/resources/static/css/styles.css'  
  }  
                ]  
            }  
        })  
    ]  
}  
;
```
상세한 설명은 생략한다. 왜냐면 내가 자세히 모른다. 외국 개발자의 github 을 참고해서 구성하였다. 

#### npm run dev
매우 중요한 내용이다. webpack을 사용중인 개발자는 다 아는 내용일 것이다. 나만 모른다. 개발 중에도 바로바로 js 를 빌드하도록 설정을 해야 개발하기 편리하다. **npm run dev 설정** 을 해야 한다. 
```js
"scripts": {  
  "build": "webpack",
  "dev": "webpack -w"
```

터미널에서 **npm run dev** 을 실행하면, 변경된 파일이 자동으로 vue-loader 에 의해서 빌드가 될 것이고, bundle.js 파일이 생성될 것이다. 

캡쳐 화면, 

자!! 이제 Intellij 에서 Vuejs 파일을 수정하면서 굳이 서버를 재시작할 필요가 없다. 


#### Gradle npm 빌드 추가
나는 해당 프로젝트를 빌드해서 스프링부트 jar 파일로 만들고, 리눅스 서버에 배포할 것이다. 그러기 위해서는 서버 빌드 시에도, npm 빌드가 함께 수행이 되어야 한다. 아래 파일 참고만 하자. 
```java
buildscript {  
   ext {  
      springBootVersion = '2.0.0.RELEASE'  
  }  
   repositories {  
      maven {  
         url "https://plugins.gradle.org/m2/"  
  }  
   }  
   dependencies {  
      classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")  
      classpath "com.moowork.gradle:gradle-node-plugin:1.2.0"  
  }  
}  
  
apply plugin: 'java'  
apply plugin: 'eclipse'  
apply plugin: 'org.springframework.boot'  
apply plugin: 'io.spring.dependency-management'  
apply plugin: "com.moowork.node"  
  
group = 'quiz'  
version = '0.0.1-SNAPSHOT'  
sourceCompatibility = 1.8  
  
  
node {  
   version = '9.8.0'  
  npmVersion = '5.6.0'  
  download = true  
}  
  
repositories {  
   maven { url "http://repo.maven.apache.org/maven2" }  
}  
  
  
dependencies {  
   compile('org.springframework.boot:spring-boot-starter-freemarker')  
   compile('org.springframework.boot:spring-boot-starter-web')  
   compile 'org.projectlombok:lombok:1.16.16'  
  testCompile('org.springframework.boot:spring-boot-starter-test')  
}  
  
task webpack(type: NodeTask, dependsOn: 'npmInstall') {  
   def osName = System.getProperty("os.name").toLowerCase();  
   if (osName.contains("windows")) {  
      script = project.file('node_modules/webpack/bin/webpack.js')  
   } else {  
      script = project.file('node_modules/.bin/webpack')  
   }  
}  
  
processResources.dependsOn 'webpack'  
  
clean.delete << file('node_modules')
```

하지만, 굳이 이렇게 할필요는 없다. 그냥 Node 서버를 구축해라. 그리고, 해당 서버에서는 git 으로 Vue 등 필요한 파일을 Pull 해서 빌드해서 서비스하면 된다. 내가 이렇게 구현한 방법은 스프링 환경에서 서비스를 운영하고 싶기 때문이다. 

#### 셋팅 관련 추가 의견

의견1
확장자를 vue 로 하면 처음에는 오류가 표시될 것이다. 인텔리J 에서 아래와 같이 Vue 플러그인을 설치하면 해결된다. 

![enter image description here](https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2MrI/image/A_N391epmjWVUwNDinBYbdFk114.PNG)

의견2
또한, ES6 문법 오류가 발생한다면, 인텔리J에서 설정을 해서 오류가 나지 않도록 변경하면 된다. 


의견3
같은 얘기가 반복되지만, 굳이 Spring Framework에서 구축 안해도 된다. 스프링 환경으로 하지 말고, 그냥 Node 서버로 구성하는게 훨씬 심플할 것이다. 


#### 정리
기본적인 셋팅은 되었다. 



## Vue 기본 구성
작성 중...



참고로 확인할 사항
-   기본 구성 요소: data, computed, methods, 템플릿
-   이벤트 처리
-   Axios
-   컴포넌트
-   vue-router
-   이벤트 버스
-   기타 특징
