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



//主要组件
class Content1 extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        itemList: [],
        itemList1: [],
        titledata: ["所有", "现代", "田园", "欧式", "美式", "中式", "日式", "北欧", "地中海", "东南亚", "简欧", "工业风", "简美", "工装"],
        selectdata: "所有",
        value: 1,
        tit1: "contentb block",
        tit2: "contentb hidden",
        imgurl: "",
        pagenum: 1,
        pagelength: 0,
        itemListpage: 1,
        itemListlimit: 8,
        itemListtotal: 1,
        cartitle_top_img1: "cartitle_top_img block",
        cartitle_top_img2: "cartitle_top_img hidden",
        itemListkeyword: ""
      }
  
    }
  
    time = (date) => {
      let json_date = new Date(date).toJSON();
      return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
    componentWillMount = () => {
      let _this = this
      window.window.uyun.env = 'prod';
      window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
        window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit, page: _this.state.itemListpage }, (err, result) => {
          console.log(result.data)
          console.log(_this.state.itemListlimit)
          _this.setState({
            itemList: result && result.data,
            itemList1: result1,
            itemListpage: result.page,
            itemListtotal: result.total
  
          })
        })
        // uyun.api.searchPrivateDesigns({keyword:'555'})
        window.window.uyun.util.setToken(result1.token);
      });
    }
  
    pagecont = (pageNumber) => {
      this.setState({
        itemListpage: pageNumber
      }, () => {
        console.log(this.state.itemListpage);
        console.log(pageNumber);
        let _this = this
        window.window.uyun.env = 'prod';
        window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
          window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit, page: _this.state.itemListpage }, (err, result) => {
            console.log(result.data);
            console.log(result1);
            // console.log(result.data.length)
            console.log(_this.state.itemListlimit)
            _this.setState({
              itemList: result && result.data,
              itemList1: result1,
              itemListpage: result.page,
              // itemListlimit: result.limit,
              itemListtotal: result.total
  
            })
          })
          window.window.uyun.util.setToken(result1.token);
        })
      });
    }
    datacont = (key) => {
      this.setState({
        selectdata: this.state.titledata[key - 1]
      })
    }
    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
      console.log(this.state.value)
      if (this.state.value == 2) {
        this.setState({
          tit1: "contentb block",
          tit2: "contentb hidden"
        })
      } else {
        this.setState({
          tit1: "contentb hidden",
          tit2: "contentb block"
        })
      }
    };
  
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
    suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );
    onSearch = (value) => {
      console.log(value);
      this.setState({
        itemListkeyword: value
      }, () => {
        console.log(this.state.itemListkeyword);
        let _this = this
        window.window.uyun.env = 'prod';
        window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
          // uyun.api.searchPrivateDesigns({keyword:'555'})
          window.window.uyun.api.searchPrivateDesigns({ keyword: _this.state.itemListkeyword }, (err, result2) => {
            console.log(result2);
            _this.setState({
              itemList: result2 && result2.data,
              itemList1: result1,
              itemListpage: result2.page,
              // itemListlimit: result.limit,
              itemListtotal: result2.total,
              itemListkeyword: result2.keyword
            })
          })
          window.window.uyun.util.setToken(result1.token);
        });
      })
    }

    //列表组件1
    ListCont=(item,index)=>{
      return  <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6} key={index}>
            <li>
            <Card className="cardone">
                <div className="cartitle_top">
                <a target="_blank" onMouseOver={() => { this.onMouseOver(item) }} onMouseOut={() => { this.onMouseOut(item) }} href={'https://bim.zhuxingyun.com/tool/cad?id=' + item.id + '&tid=' + item.tid} className="cadtit">CAD</a>
                <Link to={{ pathname: "/info", state: item }}>
                    {/* {
                    item.a ? <img className={this.state.cartitle_top_img1} src={item.drawingpreviewurl} /> : <img className={this.state.cartitle_top_img1} src={item.previewurl} /> 
                    } */}
                    <img className={this.state.cartitle_top_img1} src={item.a ? item.drawingpreviewurl : item.previewurl} />

                    <div className="cartitle">
                    <Avatar className="avarar1" src={this.state.itemList1.headimgurl} />{this.state.itemList1.displayname}&nbsp;设计
                    </div>
                </Link>
                </div>
                <div className="cartitle_bottom">
                <div className="content_ul_con_bottom_top">
                    <span>{item.name}</span>
                    <span>{item.properties.area}</span>
                </div>
                <div className="content_ul_con_bottom_middle">
                    <p>{this.time(item.updatedAt)}&nbsp;修改</p>
                </div>
                <div className="content_ul_con_bottom_bottom">
                    <a target="_blank" href={'https://bim.zhuxingyun.com/tool/design?id=' + item.id + '&tid=' + item.tid} className="openset" >打开设计</a>
                    <img src={img2} className="img2" alt="img2" />
                </div>
                </div>
            </Card>
            </li>
        </Col>
    }

    //列表组件2
    ListCont2=(item)=>{
       return <List.Item>
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
    }
  
    render() {
      console.log(this.props)
      return (
        <div className="content1">
          <div className="radio_chang">
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio value={1}>卡片视图</Radio>
              <Radio value={2}>列表视图</Radio>
            </Radio.Group>
          </div>
          <div className="search_top">
            <Search
              className="searcha"
              placeholder="请输入搜索内容"
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={this.onSearch}
            />
          </div>
          <Tabs className="tabnav" defaultActiveKey="1" onChange={(key) => { this.datacont(key) }}>
            {
              this.state.titledata.map((item, index) => {
                return <TabPane tab={item} key={index + 1} ></TabPane>
              })
            }
          </Tabs>
  
          <div className={this.state.tit1}>
            {/* 水平，垂直 */}
            <Row 
              wrap={true} 
              className="rowmar"
              justify="center"
              gutter={[
                // { xs: 8, sm: 16, md: 24, lg: 32 }, 
                // { xs: 8, sm: 16, md: 24, lg: 32 }
                16, 16
              ]}
            >
              {
                this.state.itemList.map((item, index) => {
                  console.log(this.state.selectdata)
                  if (this.state.selectdata == "所有") {
                    return this.ListCont(item,index);
                  }
                  if (this.state.selectdata === item.properties.style) {
                    return this.ListCont(item,index);
                  } else {
                    return null;
                  }
                })
              }
              <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6}><li></li></Col>
              <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6}><li></li></Col>
              <Col span={8} xs={24} sm={24} md={12} lg={8} xxl={6}><li></li></Col>
            </Row>
          </div>
          <div className={this.state.tit2}>
            <List
              itemLayout="horizontal"
              dataSource={this.state.itemList}
              renderItem={item => {
                if (this.state.selectdata == "所有") {
                  return this.ListCont2(item)
                }
  
                if (this.state.selectdata === item.properties.style) {
                  return this.ListCont2(item)
                } else {
                  return null;
                }
              }}
            />
          </div>
  
          {/* 分页 */}
          <Pagination className="pagecont" defaultCurrent={1} total={this.state.itemListtotal} onChange={(pageNumber) => { this.pagecont(pageNumber) }} />
        </div>
      )
    }
  }

  export default Content1