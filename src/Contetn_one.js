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
      itemListkeyword: "",
      scrollHeight: 0,
      hasMore: true  // 判断接口是否还有数据，通过接口设置
    }

  }
//   componentDidMount(){
//     this.setState({
//         scrollHeight: window.innerHeight - 320
//     })
// }
//组件渲染完毕，添加动画
componentDidMount() {
//   if (this.scroll) {
//    this.scroll.addEventListener("scroll", e => {
//      const { clientHeight, scrollHeight, scrollTop } = e.target;

//      const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
//      console.log(scrollTop, clientHeight, scrollHeight, isBottom);
//    });
//  }
window.addEventListener('scroll', this.handleScroll);
}
//组件将要渲染，ajax，添加动画前的类
componentWillUnmount(){
 window.removeEventListener('scroll', this.handleScroll);
}
// 处理滚动监听
handleScroll=()=>{
  console.log(this.state.itemListlimit)
  let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
    let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    //滚动条到底部
	if(scrollTop+windowHeight>=scrollHeight){
    //要进行的操作
     //this.fetchData()
	}
}
fetchData=()=>{
  // 接口调用数据字段
  //传入的参数包括但不限于：pageIndex， pageSize。。。
  // 获取后更新的数据包括但不限于：dataList，hasMore。。。
  console.log(this.state.itemListlimit)
  this.setState({
    itemListlimit:this.state.itemListlimit+3
  },()=>{
    let _this = this
    console.log(_this.state.itemListlimit)
    
    window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit }, (err, result) => {  
      console.log(result.data)
        console.log(_this.state.itemListlimit)
        _this.setState({
          itemList: result && result.data,
          itemListpage: result.page,
          itemListtotal: result.total

        })
      })
  })
}
  componentWillMount = () => {
    let _this = this
    window.window.uyun.env = 'prod';
    window.window.uyun.api.authenticateMobileUser('17596576465', 'wangbo1358', function (err, result1) {
      // window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit, page: _this.state.itemListpage }, (err, result) => {
        window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit }, (err, result) => {  
      console.log(result.data)
        console.log(_this.state.itemListlimit)
        if(result.data.length>0){
            console.log(result.data.length);
            document.getElementById("example").style.display="none"
        }
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
    if (this.state.value === 2) {
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
        // uyun.api.searchPrivateDesigns({keyword:'555'})
        window.window.uyun.api.searchPrivateDesigns({ keyword: _this.state.itemListkeyword,limit: _this.state.itemListlimit, page: _this.state.itemListpage }, (err, result2) => {
          console.log(result2);
          if(result2==null){
            window.window.uyun.api.getDesigns({ limit: _this.state.itemListlimit }, (err, result) => {
                console.log(result.data);
                /* console.log(result1); */
                // console.log(result.data.length)
                _this.setState({
                  itemList: result && result.data,
                  itemListpage: result.page,
                  // itemListlimit: result.limit,
                  itemListtotal: result.total
                })
      
              })
          }else{
          _this.setState({
            itemList: result2 && result2.data,
            itemListpage: result2.page,
            // itemListlimit: result.limit,
            itemListtotal: result2.total,
            itemListkeyword: result2.keyword
          })
        }

        })
      });

  }



  

  render() {
    // const {scrollHeight} = this.state;
    // console.log(this.props)
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
        {/* onScroll={this.handleScroll} */}
        <div className={this.state.tit1} >
          {/* 水平，垂直 */}
          <div className="example" id="example">
              <Spin size="large" className="spin" />
            </div>
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
                if (this.state.selectdata === "所有") {
                  // return ListCont(item,index);
                  return <ListCont ref={e => (this.scroll = e)} className='scroll-body' key={index} dispname={this.state.itemList1.displayname} headurl={this.state.itemList1.headimgurl} listcon={item} listindex={index} ></ListCont>;
                }
                if (this.state.selectdata === item.properties.style) {
                  // return ListCont(item,index);
                  return <ListCont onScroll={this.handleScroll} ref={e => (this.scroll = e)} className='scroll-body' key={index} dispname={this.state.itemList1.displayname} headurl={this.state.itemList1.headimgurl} listcon={item} listindex={index} ></ListCont>;
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
              if (this.state.selectdata === "所有") {
                // return ListCont2(item)
                return <ListCont2 imgurl={this.state.itemList1.headimgurl} listcon={item}></ListCont2>;
              }

              if (this.state.selectdata === item.properties.style) {
                // return ListCont2(item)
                return <ListCont2 imgurl={this.state.itemList1.headimgurl} listcon={item}></ListCont2>;
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