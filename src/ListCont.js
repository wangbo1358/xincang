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
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;


//列表组件1
class ListCont extends React.Component{
    constructor(props) {
      super(props)
      
  
    }
    onMouseOver = (item) => {
      item.a = true;
      // this.forceUpdate();强制更新
      this.setState({
  
      })
    }
     onMouseOut = (item) => {
      item.a = false;
      // debugger
      // this.forceUpdate();
      this.setState({
  
      })
    }
    time = (date) => {
      let json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
     
    render(){
    return  <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6} key={this.props.listindex}>
          <li>
          <Card className="cardone">
              <div className="cartitle_top">
              <a target="_blank" onMouseOver={() => { this.onMouseOver(this.props.listcon) }} onMouseOut={() => { this.onMouseOut(this.props.listcon) }} href={'https://bim.zhuxingyun.com/tool/cad?id=' + this.props.listcon.id + '&tid=' + this.props.listcon.tid} className="cadtit">CAD</a>
              <Link to={{ pathname: "/info", state: this.props.listcon }}>
                  
                  <img className="cartitle_top_img block" src={this.props.listcon.a ? this.props.listcon.drawingpreviewurl : this.props.listcon.previewurl} />
  
                  <div className="cartitle">
                  <Avatar className="avarar1" src={this.props.headurl} />{this.props.dispname}&nbsp;设计
                  </div>
              </Link>
              </div>
              <div className="cartitle_bottom">
              <div className="content_ul_con_bottom_top">
                  <span>{this.props.listcon.name}</span>
                  <span>{this.props.listcon.properties.area}</span>
              </div>
              <div className="content_ul_con_bottom_middle">
                  <p>{this.time(this.props.listcon.updatedAt)}&nbsp;修改</p>
              </div>
              <div className="content_ul_con_bottom_bottom">
                  <a target="_blank" href={'https://bim.zhuxingyun.com/tool/design?id=' + this.props.listcon.id + '&tid=' + this.props.listcon.tid} className="openset" >打开设计</a>
                  <img src={img2} className="img2" alt="img2" />
              </div>
              </div>
          </Card>
          </li>
      </Col>
    }
    // console.log(props.listcon,props.listindex)
  }

 //列表组件1
//  ListCont=(item,index)=>{
//     return  <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6} key={index}>
//           <li>
//           <Card className="cardone">
//               <div className="cartitle_top">
//               <a target="_blank" onMouseOver={() => { this.onMouseOver(item) }} onMouseOut={() => { this.onMouseOut(item) }} href={'https://bim.zhuxingyun.com/tool/cad?id=' + item.id + '&tid=' + item.tid} className="cadtit">CAD</a>
//               <Link to={{ pathname: "/info", state: item }}>
//                   {/* {
//                   item.a ? <img className={this.state.cartitle_top_img1} src={item.drawingpreviewurl} /> : <img className={this.state.cartitle_top_img1} src={item.previewurl} /> 
//                   } */}
//                   <img className={this.state.cartitle_top_img1} src={item.a ? item.drawingpreviewurl : item.previewurl} />

//                   <div className="cartitle">
//                   <Avatar className="avarar1" src={this.state.itemList1.headimgurl} />{this.state.itemList1.displayname}&nbsp;设计
//                   </div>
//               </Link>
//               </div>
//               <div className="cartitle_bottom">
//               <div className="content_ul_con_bottom_top">
//                   <span>{item.name}</span>
//                   <span>{item.properties.area}</span>
//               </div>
//               <div className="content_ul_con_bottom_middle">
//                   <p>{this.time(item.updatedAt)}&nbsp;修改</p>
//               </div>
//               <div className="content_ul_con_bottom_bottom">
//                   <a target="_blank" href={'https://bim.zhuxingyun.com/tool/design?id=' + item.id + '&tid=' + item.tid} className="openset" >打开设计</a>
//                   <img src={img2} className="img2" alt="img2" />
//               </div>
//               </div>
//           </Card>
//           </li>
//       </Col>
//   }

  export default ListCont