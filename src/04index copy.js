import React from 'react';
import ReactDOM from 'react-dom';
import './Tab.css';
import './index.css';
import App from './App';
/* import Childcom from './01index copy'; */
import reportWebVitals from './reportWebVitals';

class Tab extends React.Component{
  constructor(props){
    super(props)

    //设置状态数据
    this.state={
      /* isActive:'',
      strClass:'' */
      c2:"",
      c1:""
    }
    //事件都需要绑定
    this.clickEvent=this.clickEvent.bind(this)
  }
  clickEvent(e){
    console.log("click");
    console.log(e.target);
    console.log(e.target.dataset.index);
    let index=e.target.dataset.index;
    if(index=="1"){
      this.setState({
        c1:"content active",
        c2:"content"
      })
    }else{
      this.setState({
        c1:"content",
        c2:"content active"
      })
    }
  }
  render(){
    return(
      <div>
        <button data-index="1" onClick={this.clickEvent}>内容一</button>
        <button data-index="2" onClick={this.clickEvent}>内容二</button>
        <div className={this.state.c1}>
          <h1>内容1</h1>
        </div>
        <div className={this.state.c2}>
          <h1>内容2</h1>
        </div>
      </div>
    )
  }
}
/* 只能放一个组件 */
ReactDOM.render(
  <Tab/>,
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
