import React from 'react';
import './App_content.css';
import img2 from "./deleta.png";
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, DatePicker, Select,Spin, version, message, Pagination, Avatar, Input, Image, Card, Tabs, List, Space, Radio, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
/* import Scrollload from 'Scrollload'
const Scrollload = require('Scrollload').default */
import LazyLoad from 'react-lazyload';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { AudioOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ListCont from "./ListCont"
import ListCont2 from "./ListCont2"
import Password from 'antd/lib/input/Password';
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;


class Homelogin extends React.Component{
    constructor(props){
       super(props)
       this.state={
           username:"",
           password:""
       }
    }
    inputChange=(e)=>{
        this.setState({
            username:e.target.value
        })
    }
    inputChange2=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    Logincon = () => {
        console.log(this.state.username)
        let _this = this
        console.log(_this.state.username)
        window.uyun.env = 'prod';
        window.uyun.api.authenticateMobileUser(_this.state.username, _this.state.password, function (err, result1) {
          
        //   document.cookie=result1.token;
            // let oDate=new Date();
            // oDate.setDate(oDate.getDate());
            // document.cookie='usepwd='+result1.token+';expires='+oDate;

        //     let date = new Date();
        //     let ms = 1*3600*1000;
        //     date.setTime(date.getTime() + ms);
        //     document.cookie='usepwd='+result1.token + "; expires=" + date.toGMTString();
        //   console.log(result1.token)
        console.log(result1.token)
          if(result1.token!=undefined){
              alert("登陆成功！");
              window.uyun.util.setToken(result1.token);
              _this.props.history.push("./");
          }else{
            // _this.props.history.push("./404");
            alert("账号密码不正确！请重新输入！");
            return false;
          }
        });
      }

    render(){
        return(
            <div className="login_content">
                <Card
                className="login_content_card"
                    hoverable
                >
                    <span className="login_title">登陆</span>
                    <div className="login_top">
                        <span>请输入账号：</span>
                        <Input className="username" onChange={this.inputChange}  placeholder="请输入用户名" prefix={<UserOutlined />} />
                    </div>
                    <div className="login_bottom">
                        <span>请输入密码：</span>
                        <Input.Password className="password" onChange={this.inputChange2}  placeholder="请输入您的密码" />
                    </div>
                    <Button onClick={()=>{this.Logincon()}} className="login_btn" type="primary">登陆</Button>
                    
                </Card>
            </div>
        )
    }
}

export default Homelogin