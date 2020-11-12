/* import logo from './logo.svg'; */
import App_top_img from "./uview.jpg";
import img2 from "./deleta.png";
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Link,Route, Switch} from "react-router-dom";
/* const express =require("express");
const app=express(); */
const axios = require('axios');




class Routrcs extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isActivename:"top_active"
    }
  }

  Glactive=()=>{
    
    /* if(this.className==isActivename){
      this.setState({
        isActivename:""
      })
    }else{
  
    } */
  }
  render(){
    return(
  
      <>
          <li className="top_active">
          <Link to='/'>所有</Link>
        </li>
        <li className="">
          <Link to='/login'>现代</Link>
        </li>
        <li className="">
          <Link to='/info'>田园</Link>
        </li>
      </>

    )
  }
}


class Info extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <div>sssss</div>

    )
  }
}

class Login extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>aaaa</div>
     

    )
  }
}

class Content1 extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
      itemList1: []
    }

  }
  componentWillMount = () => {
    let _this = this
    window.window.uyun.env = 'prod';
    window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
      
      // App(result);
      /* _this.setState({
        itemList1: result1
      }) */
      
      window.window.uyun.api.getDesigns({}, (err, result) => {
        /* console.log(err) */
        console.log(result.data)
        console.log(result1);
        _this.setState({
          itemList: result && result.data,
          itemList1: result1
        })
        // this.setState({
        //   itemList: result.data
        // })
      })
      window.window.uyun.util.setToken(result1.token);
    });
  }
  time=(date)=>{
    console.log("ss")
    let json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  }
  remove=(index)=>{
    this.state.itemList.slice(index,1)
  }

  render(){
    return(
  
      <ul className="content_ul">
            {
              this.state.itemList.map((item,index) => {
                return (
                  <li key={index}>
                    <div className="content_ul_con">
                      {/* <img src={require("uview.jpg”)} className="App_top_img" alt="App_top_img" /> */}
                      <div className="content_ul_con_top">
                         <a target="_blank" href={'https://bim.zhuxingyun.com/tool/cad?id='+item.id+'&tid='+item.tid} className="cadtit">CAD</a>
                        <img src={item.previewurl} className="App_top_img" alt="App_top_img" />
                        <p>
                          <img src={this.state.itemList1.headimgurl}  />
                          <span className="ultop_title">{this.state.itemList1.displayname}</span>
                          设计
                        </p>
                      </div>
                      <div className="content_ul_con_bottom">
                        <div className="content_ul_con_bottom_top">
                          <span>{item.name}</span>
                          <span>{item.properties.area}</span>
                        </div>
                        <div className="content_ul_con_bottom_middle">
                          <p>{this.time(item.updatedAt)}&nbsp;修改</p>
                        </div>
                        <div className="content_ul_con_bottom_bottom">
                          <a target="_blank" href={'https://bim.zhuxingyun.com/tool/design?id='+item.id+'&tid='+item.tid} className="openset" >打开设计</a>
                          <img onClick={this.remove(index)} src={img2} className="img2" alt="img2" />
                        </div>

                      </div>

                    </div>
                  </li>
                )
              })
            }

          </ul>

    )
  }
}


class AppCopy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
      itemList1: []
    }

  }
  componentWillMount = () => {
    let _this = this
    window.window.uyun.env = 'prod';
    window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
      
      // App(result);
      /* _this.setState({
        itemList1: result1
      }) */
      
      window.window.uyun.api.getDesigns({}, (err, result) => {
        /* console.log(err) */
        console.log(result.data)
        console.log(result1);
        _this.setState({
          itemList: result && result.data,
          itemList1: result1
        })
        // this.setState({
        //   itemList: result.data
        // })
      })
      window.window.uyun.util.setToken(result1.token);
    });
  }
  time=(date)=>{
    console.log("ss")
    let json_date = new Date(date).toJSON();
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  }
  remove=(index)=>{
    this.state.itemList.slice(index,1)
  }
  /* uyun.util.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WyJkMTc0OTUxNzUwMzg0NjkyOTNkZTk0YmRhOTVmOTdmNiIsMTYwNTA3NTA0MTEyNywibW9iaWxlIl0.-jY-VdUQlNugtdzc588L0wG0gUCNKQtYAGvVnKL-_zc") */
  /* uyun.api.getDesigns(function(err, result) {console.log(result)}) */
  render() {
    return (
      
    <Router>

      <div className="App" >
          
            
          

        <header className="App-header">
       
            <div className="top_t">
                <div className="top_tl">{this.state.itemList1.displayname}的个人空间</div>
                <div className="top_tr">
                  <img src={this.state.itemList1.headimgurl}  />{this.state.itemList1.displayname}
                </div>
            </div>



          <div className="top_title clearfix">
            <div className="title_left tit">
              <a className="App-link" href="javascript:;">&nbsp;BIM</a>

            </div>
            <div className="title_middle tit">设计列表</div>
            <div className="title_right tit"></div>
          </div>
          
          <ul className="top_ul clearfix">
          <Routrcs />
          {/* <Router basename="/">
            <div className="nav">
              <Link to="/">Home</Link>
              <Link to="/routrcs">routrcs</Link>
            </div>
            <Route path="/" exact component={AppCopy}></Route>
            <Route path="/routrcs" component={Routrcs}></Route> */}
                {/* <Route path="/" exact component={()=>{<div>首页</div>}} ></Route> */}

            {/* </Router> */}
            {/* <Routrcs /> */}
            {/* <li>所有</li>
            <li>现代</li>
            <li>田园</li>
            <li>欧式</li>
            <li>美式</li>
            <li>中式</li>
            <li>日式</li>
            <li>北欧</li>
            <li>地中海</li>
            <li>东南亚</li>
            <li>简欧</li>
            <li>工业风</li>
            <li>简欧</li>
            <li>工业风</li>
            <li>...</li> */}
          </ul>
        </header>
        <div className="content">
        <Switch>

          <Route path="/" exact component={Content1}>
            
          </Route>
          <Route path="/login" component={Login}>
           
          </Route>
          <Route path="/info" component={Info}>
            
          </Route>

        </Switch>
          {/* <Content1/> */}
        </div>
      </div>

    </Router>
      
    );
  }
  // axios.get("https://api.apiopen.top/videoRecommend?id=127398")
  // .then(function(res){
  //   resdata(res.data.result);
  // })
  // .catch(function(err){
  //   console.log("请求失败！")
  // })
  // function resdata (data){
  //   data.forEach(item => {
  //     console.log(item.data.cover.feed)
  //     let html;
  //     html+=<li>”；
  //     html+=“<div className="content_ul_con">”；
  //     html+=“<div className="content_ul_con_top">”；
  //     html+=“<span className="cadtit">CAD</span>”；
  //     html+=“<img src="+item.data.cover.feed+" className="App_top_img" alt="App_top_img" />”；
  //     html+=“<p><span className="ultop_title">测试</span>设计</p>”；
  //     html+=“</div>”；
  //     html+=“<div className="content_ul_con_bottom">”；
  //     html+=“<div className="content_ul_con_bottom_top">”；
  //     html+=“<span>联系1</span>”；
  //     html+=“<span>61.60m<sup>2</sup></span>”；
  //     html+=“</div>”；
  //     html+=“<div className="content_ul_con_bottom_middle">”；
  //     html+=“<p>2020/11/09 17:34:23 修改</p>”；
  //     html+=“</div>”；
  //     html+=“<div className="content_ul_con_bottom_bottom">”；
  //     html+=“<button className="openset" >打开设计</button>”；
  //     html+=“<img src={img2} className="img2" alt="img2" />”；
  //     html+=“</div>”；
  //     html+=“</div>”；
  //     html+=“</div>”；
  //     html+=“</li>


  //   });

  //   document.getElementsByClassName("")
  // }
  /* axios.post("",{
  
  })
  .then(function(res){
    
  })
  .catch(function(err){
  
  }) */
}
export default AppCopy;
/* export default Routrcs; */
