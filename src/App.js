/* import logo from './logo.svg'; */
import App_top_img from "./uview.jpg";
import img2 from "./deleta.png";
import './App.css';
/* const express =require("express");
const app=express(); */
const axios = require('axios');
var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.charset="utf-8";
script.src = 'https://static.zhuxingyun.com/uyun-prod/uyun/api/uyun-aea4822e9c56245523a6ac59f85d6f2f.js';
document.head.appendChild(script);  
script.onload = () => {
  window.uyun.env = 'prod';
  window.uyun.api.authenticateMobileUser('17596576465','wangbo1358', function(err, result) {
    console.log(result);
    App(result);
    window.uyun.util.setToken(result.token);
    window.uyun.api.getDesigns(function(err, result) {console.log(result)})
  });

}  

function App(res) {

  /* uyun.util.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WyJkMTc0OTUxNzUwMzg0NjkyOTNkZTk0YmRhOTVmOTdmNiIsMTYwNTA3NTA0MTEyNywibW9iaWxlIl0.-jY-VdUQlNugtdzc588L0wG0gUCNKQtYAGvVnKL-_zc") */
  /* uyun.api.getDesigns(function(err, result) {console.log(result)}) */
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div className="top_title clearfix">
          <div className="title_left tit">
            <a className="App-link" href="javascript:;">&nbsp;BIM</a>
            
          </div>
          <div className="title_middle tit">设计列表</div> 
          <div className="title_right tit"></div> 
        </div>
        <ul className="top_ul clearfix">
          <li>所有</li>
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
          <li>...</li>
        </ul>
      </header>
      <div className="content">
        <ul className="content_ul">
          <li>
            <div className="content_ul_con">
              {/* <img src={require("uview.jpg”)} className="App_top_img" alt="App_top_img" /> */}
              <div className="content_ul_con_top">
                <span className="cadtit">CAD</span>
                <img src={App_top_img} className="App_top_img" alt="App_top_img" />
                <p><span className="ultop_title">测试</span>设计</p>
              </div>
              <div className="content_ul_con_bottom">
                <div className="content_ul_con_bottom_top">
                  <span>联系1</span>
                  <span>61.60m<sup>2</sup></span>
                </div>
                <div className="content_ul_con_bottom_middle">
                  <p>2020/11/09 17:34:23 修改</p>
                </div>
                <div className="content_ul_con_bottom_bottom">
                  <button className="openset" >打开设计</button>
                  <img src={img2} className="img2" alt="img2" />
                </div>

              </div>
              
            </div>
          </li>
        </ul>
      </div>
    </div>
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
export default App;
