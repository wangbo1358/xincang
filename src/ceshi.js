import React from 'react';
import PHTopicInfo from "../../../ProductHelp/Topic/phTopicInfo";
import UHeader from '../../../../../app/pc/widget/UHeader';
import CSS from './websiteHelpTopicInfo.module.less';
import { Kernel, Widget } from 'erpcore';
import {MinCommandListItem as MinCommandListItemP} from "../../../Forum/Widget/PC/MinCommandListItem";
import {Card as CardP, Icon} from 'antd';
const InputDateRangeAndSearch = Widget.InputDateRangeAndSearch,
    GapOfLarge = Widget.GapOfLarge,
    MenuOfSwiper = Widget.MenuOfSwiper,
    ERPTreeNode = Kernel.ERPTreeNode,
    EmptyBox = Widget.EmptyBox,
    MenuObjOfSwiper = Widget.MenuObjOfSwiper,
    ERPContext = Kernel.ERPContext;


class WebsiteHelpTopicInfo extends PHTopicInfo {

    getDefaultBackLink = () => {
        const teamId = this.urlGetParams().teamId;

        if (this.state.meta.parent) {
            return ('/team/' + teamId + '/website/help/topic/' + this.state.meta.parent);
        } else {
            return ('/team/' + teamId + '/website/help/topics');
        }
    };

    getDefaultBackName = () => {
        if (this.state.meta.parent) {
            return '';
        } else {
            return '帮助';
        }
    };

    // onlyForLoginUser = () => {
    //     return false;
    // };

    onlyForTeamMember = () => {
        return false;
    };

    needCreateElementsInForeheadOnWXMP = () => {
        return false;
    };

    needCreateElementsInForeheadOnPC = () => {
        return false
    };

    needCreateElementsInForeheadLeftContent = () => {
        if (this.state.meta.parent) {
            return true;
        } else {
            return false;
        }
    };

    needCreateSaveButton = () => {
        return (this.state.meta.valid === 0 || this.state.meta.valid === 1);
    };

    needCreatePublishButton = () => {
        return (this.state.meta.valid === 0 || this.state.meta.valid === 1);
    };

    onSaveAfter = (callback) => {
        if (this.state.meta.parent) {
            this.publishItem(callback);
        }
    };

    treeOnSelect = (item) => {
        if (item.meta.haschildren) return;
        const teamId = this.urlGetParams().teamId;
        this.urlNavigate('/team/' + teamId + '/website/help/topic/' + item.dataId, true, true);
    };

    onPostPublish = (callback) => {
        const teamId = this.urlGetParams().teamId;
        if (this.state.meta.parent) {
            this.urlNavigate('/team/' + teamId + '/website/help/topic/' + this.state.meta.parent, true, false, true);
        } else {
            this.urlNavigate('/team/' + teamId + '/website/help/topics', true);
        }
    };

    onComponentWillMountLater = () => {
        this.setState({user: this.glbcontext.user, profile: this.glbcontext.profile});
    };

    onPostReadData = (data) => {
        this.configWx(data, {titlepostfix: '筑星云ERP帮助中心'});
        this.getOwnerUUID(uuid => {
            this.getApi().api_getItemsByOwnerUUID(uuid, {valid:2}, {order: "-__CREATED__"}, data => {
                if (!data) data = [];
                this.setState({itemList: data});
            });
        });
    };

    createElementsInEyeOnPC = () => {
        return (
            <div style={{ height: '4.375rem' }}>
                <div style={{
                    position: "fixed",
                    top: 0,
                    right: '0',
                    height: '4.375rem',
                    width: "100%",
                    zIndex: "100",
                    background: "#fff"
                }}>
                    <UHeader
                        isZx={this.state.isZx}
                        user={this.state.user}
                        profile={this.state.profile}
                        glbcontext={this.glbcontext}
                        pathname={this.props.history.location.pathname}
                        urlNavigate={this.urlNavigate}
                    />
                </div>
            </div>
        )
    };

    linkToHelpTopices = (value) => {
        if (value) {
            const teamId = this.urlGetParams().teamId;
            this.urlNavigate('/team/' + teamId + '/website/help/topics?searchKey=' + encodeURIComponent(value), true, true);
        }
    };

    needShowUser =()=>{
        return false;
    };
    menuBarOnSearchSubmit = (value) => {
        if (value) {
            this.state.needGetMore = false
        } else {
            this.state.needGetMore = true
        }
        this.state.menuDataOfSearchValue = value;
        this.onMenuBarOnSearchSubmit();
    };
    changeAutoHeight = (item) => {
        let index = this.state.menuDataOfSetting.filters.findIndex(i => i.key === item.key)
        if (index > -1) {
            this.state.menuDataOfSetting.filters[index].nHeight = 'max-content'
            this.setState({
                menuDataOfSetting: this.state.menuDataOfSetting
            })
        }
    };
    isKeyAll = () => {
        return (this.state.menuDataOfSelectedMenuItem.filter === null || this.state.menuDataOfSelectedMenuItem.key === "keyAll")
            && this.state.needGetMore
    };
    // createElementsOfCommandOnPC = () => {
    //     return (
    //         <div className={CSS.commandWrap}>
    //             {
    //                 this.state.menuDataOfSetting.filters && this.state.menuDataOfSetting.filters.map((item, index) => {
    //                     if (item.key !== "keyAll") {
    //                         // let filterItem = this.state.itemList.filter(i => i.meta.typeId === item.key)
    //                         let filterItem = []
    //                         this.state.itemList.forEach((i) => {
    //                             if (i.meta.typeId === item.key) {
    //                                 filterItem.push(i)
    //                             }
    //                         })
    //                         // let newFilter = DataFormatting.buildTree(filterItem).children;
    //                         let newFilter = ERPTreeNode.buildTree(filterItem).children;
    //                         return (
    //                             <CardP
    //                                 key={item.key}
    //                                 bodyStyle={{
    //                                     padding: "0",
    //                                     backgroundColor: '#fff',
    //                                     margin: '0 0 1.25rem 0',
    //                                 }}
    //                                 bordered={false}
    //                             >
    //                                 <div
    //                                     className={CSS.cardWrap}
    //                                     style={{
    //                                         maxHeight: (item.nHeight ? item.nHeight : '28rem')
    //                                         // height: (item.nHeight ? item.nHeight : '28rem')
    //                                     }}>
    //                                     <h1>
    //                                         <Icon
    //                                             style={{ color: '#489BFF', margin: '0 10px 0 0' }}
    //                                             type="book"
    //                                             theme="filled" />
    //                                         {item.name}
    //                                     </h1>
    //                                     <div className={CSS.commandListWrap}>
    //                                         {
    //                                             newFilter[0] && newFilter[0].children.map((com, inde) => {
    //                                                 return (
    //                                                     <MinCommandListItemP
    //                                                         key={com.key}
    //                                                         nStyle={{
    //                                                             width: '12.5rem',
    //                                                             height: '12.5rem',
    //                                                             // maxHeight: '12.5rem',
    //                                                             overflow: "hidden",
    //                                                             margin: '0 15px'
    //                                                         }}
    //                                                         item={com}
    //                                                         title={com.title}
    //                                                         itemList={com.children}
    //                                                         onItemClick={(id) => { this.onItemClick(id) }}
    //                                                     />
    //                                                 )
    //                                             })
    //                                         }
    //                                         <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
    //                                         <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
    //                                         <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
    //                                     </div>
    //                                     {
    //                                         newFilter[0] && newFilter[0].children.length > 8 && !item.nHeight && <div
    //                                             className={CSS.learnMore}
    //                                             onClick={() => { this.changeAutoHeight(item) }}
    //                                         >
    //                                             查看更多
    //                                  </div>
    //                                     }
    //                                 </div>
    //                             </CardP>
    //                         )
    //                     }
    //                 })
    //             }

    //         </div>
    //     )
    // };
    scrollToLoadMore = () => {
        if (this.isKeyAll()) {
            return false;
        } else {
            return true;
        }
    };
    onPostReadData = (data) => {
        const cond = {};
        this.getOwnerUUID(uuid => {
            this.getTypeApi().api_getItemsByOwnerUUID(uuid, null, cond, data => {
                
                if (data) {
                    
                    console.log(data)
                    let filters = [];
                    for (let i = 0; i < data.length; ++i) {
                        let item = data[i];
                        let menuObj = new MenuObjOfSwiper({
                            name: item.meta.name,
                            key: item.dataId
                        });
                        filters.push(menuObj);
                    }
                    
                    this.setState({ 
                        menuDataOfSetting: { filters: filters } 
                    }, () => {
                        // debugger
                        let params = new URLSearchParams(this.props.location.search)
                        let bbsKey = params.get('bbsKey');
                        if (bbsKey && bbsKey != '') {
                            let index = this.state.menuDataOfSetting.filters.findIndex(item => item.label === bbsKey)
                            if (index > -1) {
                                // debugger
                                this.state.menuDataOfSelectedMenuItem = this.state.menuDataOfSetting.filters[index];
                                this.menuBarOnMenuItemClick(this.state.menuDataOfSelectedMenuItem)
                            }
                        }
                    });
                }
            });
        });
    };
    createElementsInChestOnPC = () => {
        // console.log(this.state.menuDataOfSetting)
        if (this.state.menuDataOfSetting&&this.state.menuDataOfSetting.filters && this.state.menuDataOfSetting.filters.length > 0) {
        return (
            <React.Fragment>
                {/* <GapOfMedium /> */}
                <div className={CSS.erp_layout}>
                    <div className={CSS.erp_menu_bar}>
                        {/* <MenuOfSwiper
                            showMenu={true}
                            showDateRange={false}
                            showSearch={false}
                            direction={'vertical'}
                            setting={this.state.menuDataOfSetting}
                            // onMenuItemClick={value => {
                            //     this.state.menuDataOfSelectedMenuItem = value;
                            //     this.menuBarOnMenuItemClick(value)
                            // }}
                            // onSearchSubmit={this.menuBarOnSearchSubmit}
                        /> */}
                        {console.log(this.state.menuDataOfSelectedMenuItem)}
                        
                        <MenuOfSwiper
                            showMenu={true}
                            showDateRange={false}
                            showSearch={false}
                            direction={'vertical'}
                            setting={this.state.menuDataOfSetting}
                            menuItemOfCurrent={this.state.menuDataOfSelectedMenuItem}
                            onMenuItemClick={value => {
                                // this.state.menuDataOfSelectedMenuItem = value;
                                // debugger
                                this.menuBarOnMenuItemClick(value)
                            }}
                            onSearchSubmit={this.menuBarOnSearchSubmit}
                        />
                        <div style={{
                            overflow: "auto",
                            backgroundColor: "#fff",
                            maxHeight:'80vh'
                        }}>
                            {console.log(this.state.itemList)}
                            {this.createElementsOfTree()}
                        </div>
                    </div>
                    <div className={CSS.erp_search_input}>
                        <InputDateRangeAndSearch
                            showDateRange={false}
                            showSearch={true}
                            // onDateRangeConfirm={this.menuBarOnDateRangeConfirm}
                            onSearchSubmit={this.linkToHelpTopices}
                        />
                    </div>
                    <div className={CSS.erp_lists}>
                        <GapOfLarge />
                        <GapOfLarge />
                        {this.createElementsOfTopicTitleOnPC()}

                        {this.createElementsOfContentOnPC()}
                    </div>
                </div>
            </React.Fragment>
        )
                    }
    };

    getElementsInChestClassName = () => {
        return CSS.erp_layout_lists;
    };

    getElementsInThighClassName = () => {
        return CSS.erp_layout_lists;
    };
}

ERPContext.getInstance().registerPCModule('/team/:teamId/website/help/topic/:topicId', WebsiteHelpTopicInfo);


export default WebsiteHelpTopicInfo;
