import React from 'react';
import ReactDOM from 'react-dom';
import './Tab.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//props可以设置默认值 HelloMessage.defaultProps={name:"老陈"，msg:"helloworld"}
//props可以传递函数，props可以传递父元素的函数，就可以去修改氟元素的state,从而达到传递数据给父元素
class ParentCom extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isActive:true
    }
    this.changShow=this.changShow.bind(this)
  }
  render(){
    return(
      <div>
        <button onClick={this.changShow}>控制子元素显示</button>
        <ChildCom isActive={this.state.isActive}/>
      </div>
    )
  }
  changShow(){
    this.setState({
      isActive:!this.state.isActive
    })
  }
}

class ChildCom extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let strClass =null;
    if(this.props.isActive){
      strClass="active"
    }else{
      strClass=""
    }
    return(
      <div className={"content "+strClass}>
          <h1>我是子元素</h1>
      </div>
    )
  }
}

/* 只能放一个组件,组件类首字母大写 */
ReactDOM.render(
  <ParentCom/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
