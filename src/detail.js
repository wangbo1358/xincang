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
function onChange(value) {
  console.log(`selected ${value}`);
}
function onBlur() {
  console.log('blur');
}
function onFocus() {
  console.log('focus');
}
function onSearch(val) {
  console.log('search:', val);
}
function callback(key) {
  console.log(key);
}
moment.locale('zh-cn');

//详情页组件
class Info extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        itemList: [],
        itemList1: [],
        titledata: ["所有", "现代", "田园", "欧式", "美式", "中式", "日式", "北欧", "地中海", "东南亚", "简欧", "工业风", "简美", "工装"],
        selectdata: "所有",
        propdata2: this.props.location.state.a,
        // proname:this.props.location.state.a.name,
        // proid:this.props.location.state.b
        propdata: [],
        proname:"",
        proid:"",
        procar:this.props.location.state.a.category
      }
    }
    // componentWillReceiveProps=()=>{
    //   this.setState({
    //     propdata: this.props.location.state.a,
    //     proname:this.props.location.state.a.name,
    //     proid:this.props.location.state.b
    //   })
    // }
    componentWillMount = () => {
      // let _this = this
      // window.window.uyun.api.getDesigns({}, (err, result) => {
      //   console.log(result.data)
      //   console.log(_this.state.proid)
      //   console.log(result.data[0].name)
      //   // console.log(result.data[_this.state.proid].name)
      //   // console.log(result.data[_this.props.lisindex].name)
      //     // if(result.data.length>0){
      //     //     console.log(result.data.length);
      //     //     document.getElementById("example").style.display="none"
      //     // }
      //     _this.setState({
      //       itemList: result && result.data,
      //       proname:result.data[0].name
      //     })
      //   })
      let _this = this
      if(_this.props.location.state.a.id!=null && _this.props.location.state.a.id!=undefined){
        window.uyun.api.getDesign(_this.props.location.state.a.id, (err, result3) => {
          console.log(result3)
          if (result3!=null&&result3!=undefined) {
            _this.setState({
              propdata: result3,
              proname:result3.name,
              procar:result3.category,
              proid:result3.id
            })
          }
          // window.window.uyun.util.setToken(result3.token);
          })
          
      }
      
    }
  //保存
    Preservation=()=>{
      // console.log(this.state.propdata.id)
      console.log(this.state.proid)
      let _this = this
      window.window.uyun.api.updateDesign(this.state.propdata.id, {name: this.state.proname},(err, result) =>{
        // window.window.uyun.api.getDesign(this.state.propdata.id, (err, result3) => {
        //   // console.log(result.data)
        //   // console.log(_this.state.proid)
        //   // console.log(result.data[0].name)
        //   // console.log(result.data[_this.state.proid].name)
        //   // console.log(result.data[_this.props.lisindex].name)
        //     // if(result.data.length>0){
        //     //     console.log(result.data.length);
        //     //     document.getElementById("example").style.display="none"
        //     // }
        //     _this.setState({
        //       // itemList: result && result.data,
        //       // proname:result.data[0].name
        //       propdata: result3,
        //       proname:result3.name,
        //       procar:result3.category
        //     })
        //   })
      })
      
    }
    inputChange=(e)=>{
      this.setState({
        proname:e.target.value
      })
    }
    Selectchange=(value)=>{
        // console.log(`selected ${value}`);
        console.log(value);
    }
    render() {
      // console.log(this.state.propdata)
      console.log(this.state.procar)
      return (
        <div>
          <Link to='/'><Button type="primary">返回</Button></Link>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="关联信息"
            extra={<a href="#"></a>}
          >
            <div className="sjlist">
              <span className="sjlname">
                项目
          </span>
              <Select
                showSearch
                style={{ width: "79%" }}
                placeholder="单击进行搜索选择"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/* <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option> */}
              </Select>
            </div>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="基本信息"
            extra={<a href="#"></a>}
          >
            <div className="sjlist">
              <span className="sjlname">
                名称
          </span>
              <Input placeholder="" value={this.state.proname} onChange={this.inputChange} />
            </div>
  
            <div className="sjlist">
              <span className="sjlname">
                类型
              </span>
              <Select onChange={this.Selectchange} defaultValue={this.state.procar} style={{ width: "79%" }} allowClear>
                <Option value="户型">户型</Option>
                <Option value="样板间">样板间</Option>
                <Option value="bim-design">设计</Option>
              </Select>
            </div>
  
            <div className="sjlist">
              <span className="sjlname">
                分享状态
          </span>
              <Select defaultValue="lucy2" style={{ width: "79%" }} allowClear>
                <Option value="其他人可编辑">其他人可编辑</Option>
                <Option value="其他人可复制">其他人可复制</Option>
                <Option value="其他人可读">其他人可读</Option>
                <Option value="lucy2">私有</Option>
              </Select>
            </div>
  
            <div className="sjlist2 clearfix">
              <span className="sjlname">
                预览
          </span>
              <div className="sjk">
                {/* <img src="" /> */}
                <Button className="bottom_btn" type="primary" size={"Default"}>
                  预览
            </Button>
              </div>
            </div>
          </Card>
          <Button onClick={()=>{this.Preservation()}} className="bottom_btn" type="primary" size={"large"}>
            保存
          </Button>
        </div>
      )
    }
  }


  export default Info;