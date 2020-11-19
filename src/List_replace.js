import React from 'react';
import './App_content.css';
import img2 from "./deleta.png";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, DatePicker, Select, version, message, Pagination, Avatar, Input, Image, Card, Tabs, List, Space, Radio, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { AudioOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { Meta } = Card;


const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}


// 切换列表组件
class Login extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        itemList: [],
        itemList1: [],
        titledata: ["所有", "现代", "田园", "欧式", "美式", "中式", "日式", "北欧", "地中海", "东南亚", "简欧", "工业风", "简美", "工装"],
        selectdata: "所有"
  
      }
    }
    time = (date) => {
      console.log("ss")
      let json_date = new Date(date).toLocaleString();
      return json_date;
      // return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
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
      });
    }
    datacont = (listc, index) => {
      console.log(listc[index])
      this.setState({
        selectdata: listc[index]
      })
    }
    render() {
      return (
        <div>
          <Tabs className="tabnav" defaultActiveKey="1" onChange={callback}>
            {
              this.state.titledata.map((item, index) => {
                return <TabPane onChange={() => { this.datacont(this.state.titledata, 2) }} tab={item} key={index + 1} ></TabPane>
              })
            }
          </Tabs>
          <List
            className="list_content"
            itemLayout="horizontal"
            dataSource={this.state.itemList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  avatar={<Avatar src={this.state.itemList1.headimgurl} />}
                  title={<a target="_blank" href={'https://bim.zhuxingyun.com/tool/design?id=' + item.id + '&tid=' + item.tid}>{item.name}——{this.time(item.updatedAt)}</a>}
                  description={item.properties.comments}
                  content={this.time(item.updatedAt)}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )
    }
  }

  export default Login