import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/* import Childcom from './01index copy'; */
import reportWebVitals from './reportWebVitals';


//函数式组件  可以有无数个组件    静态没有交互内容
function HelloMessage(props) {
  console.log(props);
  let title = <h2>我是副标题</h2>
  let weather=props.weather
  let isGo=weather=='下雨'?"不出门":"出门"
  return (
    <div>
        <h1>Hello World!</h1>
        <span>{props.weather}</span>
        <div>
          是否出门？
          <span>{isGo}</span>
          {title}
        </div>
    </div>
  )
}
const element = <HelloMessage />;

//类组件定义    可以有无数个组件  有动态事件的用类组件例如：点击事件
//继承extends 组件里面有别的组件称为复合组件  可以有类组件可以有函数组件
class Helloworld extends React.Component{
  render(){
    console.log(this.props)
    return(
      <div>
        <h1>类组件定义hellowworld</h1>
        <HelloMessage weather={this.props.weather} />
      </div>
      
    )
  }
}

/* 只能放一个组件 */
ReactDOM.render(
  /* <React.StrictMode> */
    /* <App />, */
    /* <HelloMessage weather="出太阳" />, */
    /* <Childcom/> */
    <Helloworld weather="老陈" />, 
  /* </React.StrictMode>, */
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
