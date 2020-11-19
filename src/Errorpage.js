import React from 'react';
import './App_content.css';
import img2 from "./deleta.png";
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Button, DatePicker, Select,Spin, version, message, Pagination, Avatar, Input, Image, Card, Tabs, List, Space, Radio, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;


class Errorpage extends React.Component{
    constructor(props){
       super(props) 
    }

    render(){
        return(
            <div className="error_content">
                <span>404</span>
                <div className="error_content_bottom">
                    <span>该页面不存在</span>
                </div>
            </div>
        )
    }
}

export default Errorpage