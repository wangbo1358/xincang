import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/* import Childcom from './01index copy'; */
import reportWebVitals from './reportWebVitals';

class Clock extends React.Component{
  constructor(props){
    super(props)
    //状态（数据）--》view
    //构造函数初始化数据，将需要改变的数据初始化到state中
    this.state={
      time:new Date().toLocaleTimeString()
    }
  }
  render(){
    //this.state.time=new Date().toLocaleTimeString()
    return(
      <div>
        <h1>
          当前时间：{this.state.time}
        </h1>
      </div>
    )
  }
  //生命周期函数
  componentDidMount(){
    setInterval(()=>{
      console.log(this.state.time);
      //this.state.time=new Date().toLocaleTimeString()
      //切勿直接修改state数据，直接state重新渲染内容需要使用setState修改数据
      //this.setState修改完数据后并不会立即修改dom里面的内容react会在这个函数内容所有设置状态后统一对比虚拟dom对象，然后统一修改提升性能
      //小程序也是借鉴react
      /* ReactDOM.render(
        <Clock/>,
        document.getElementById('root')
      ); */
      //用setState修改数据
      this.setState({
        time:new Date().toLocaleTimeString()
      })
    },1000)
  }
}

/* 只能放一个组件 */
ReactDOM.render(
  <Clock/>,
  document.getElementById('root')
);

/* setInterval(()=>{
  ReactDOM.render(
    <Clock/>,
    document.getElementById('root')
  );
},1000) */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
