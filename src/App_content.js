import React from 'react';
import './App_content.css';
import img2 from "./deleta.png";
import ReactDOM from 'react-dom';
import Routelist from './router';
import Info from './detail';
import Login from './List_replace';
import Content1 from './Contetn_one';
import Homelogin from "./Homelogin"

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import  FrontendAuth  from './FrontendAuth'
import routerConfig from "./routerconfig"
import { Button, DatePicker, Select, version, message, Pagination, Avatar, Input, Image, Card, Tabs, List, Space, Radio, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { AudioOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Meta } = Card;



class App_content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemList: [],
      itemList1: [],
      // titledata: ["所有", "现代", "田园", "欧式", "美式", "中式", "日式", "北欧", "地中海", "东南亚", "简欧", "工业风", "简美", "工装"],
      selectdata: "所有"
    }

  }
  datacont = (listc, index) => {
    this.setState({
      selectdata: listc[index]
    })
  }
  componentWillMount = () => {
    let _this = this
    // window.window.uyun.env = 'prod';
    window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
      window.uyun.api.getDesigns({}, (err, result) => {
        console.log(result.data)
        console.log(result1);
        _this.setState({
          itemList: result && result.data,
          itemList1: result1
        })
      })
      // window.window.uyun.util.setToken(result1.token);
      // window.window.uyun.util.setApiToken(result1.token);
    });
  }

  
  render() {
    return (
      <Router>
        <div className="App" >
          <header className="App-header">
            <div className="top_t">
              <div className="top_tl">{this.state.itemList1.displayname}的个人空间</div>
              <div className="top_tr">
                <Avatar className="avarar1" src={this.state.itemList1.headimgurl} />{this.state.itemList1.displayname}
              </div>
            </div>
            <div className="top_title clearfix">
              <div className="title_left tit">
                <a className="App-link" href="#">&nbsp;BIM</a>
              </div>
              <div className="title_middle tit">设计列表</div>
              <div className="title_right tit"></div>
            </div>
            <div className="qh">
              <Routelist datacont={this.state.selectdata} />
            </div>
          </header>
          <div className="content">
            <Switch>
              {/* <Route path="/" exact auth={true} component={Content1}></Route>
              <Route path="/login" auth={true} component={Login}></Route>
              <Route path="/info" auth={true} component={Info}></Route>
              <Route path="/homelogin" component={Homelogin}></Route> */}
              <FrontendAuth routerConfig={routerConfig}></FrontendAuth>
            </Switch>
          </div>
          <div className="app_bottom">
              <a target="_blank" href="https://zhuxingyun.com/">上海筑星云计算技术有限公司</a><span>版权所有 © 2017-2020</span>
          </div>
        </div>

      </Router>

    );
  }
}

export default App_content;
/* export default Routrcs; */