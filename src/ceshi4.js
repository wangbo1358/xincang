import React from "react";
import PHTopics from "../../../ProductHelp/Topic/phTopics";
import UHeader from '../../../../../app/pc/widget/UHeader';
import CSS from './websiteHelpTopics.module.less';
import {TopicListItem as TopicListItemP} from "../../../Forum/Widget/PC/TopicListItem";
import {MinCommandListItem as MinCommandListItemP} from "../../../Forum/Widget/PC/MinCommandListItem";
import {Card as CardP, Icon} from 'antd';
import { Kernel, Widget } from 'erpcore';
const InputDateRangeAndSearch = Widget.InputDateRangeAndSearch,
    GapOfLarge = Widget.GapOfLarge,
    MenuOfSwiper = Widget.MenuOfSwiper,
    ERPTreeNode = Kernel.ERPTreeNode,
    EmptyBox = Widget.EmptyBox,
    SuperTree = Widget.SuperTree,
    ERPContext = Kernel.ERPContext;


class WebsiteHelpTopics extends PHTopics {
    constructor(props) {
        super(props);
        this.state.treeItemList = [];
    }

    getPageTitle = () => {
        return '帮助';
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

    needCreateAddButton = () => {
        return false;
    };

    onUpdateFilterByOthers = (filter) => {
        filter.valid = 2;
    };

    showInfo = (item) => {
        const teamId = this.urlGetParams().teamId;
        this.urlNavigate('/team/' + teamId + '/website/help/topic/' + item.dataId, true, true);
    };

    onItemClick = (id) => {
        const teamId = this.urlGetParams().teamId;
        this.urlNavigate('/team/' + teamId + '/website/help/topic/' + id, true, true);
    };

    treeOnSelect = (item) => {
        if (item.meta.haschildren) return;
        this.showInfo(item);
    };

    // onPostReadData = (data) => {
    //     // this.configWx(data, {titlepostfix: '筑星云ERP帮助中心'});
    //     this.getOwnerUUID(uuid => {
    //         this.getApi().api_getItemsByOwnerUUID(uuid, {valid:2}, {order: "-__CREATED__"}, data => {
    //             if (!data) data = [];
    //             this.setState({itemList: data});
    //         });
    //     });
    // };

    onComponentWillMount = () => {
        if (this.state.treeItemList.length <= 0) {
            this.getAllItems(data => {
                this.addItemIsGranted(isGranted => {
                    this.setState({
                        // bAddItemIsGranted: isGranted,
                        treeItemList: this.state.treeItemList,
                        // pagination: this.state.pagination
                    });
                    // this.onPostReadData();
                });
            });
        }

        if (this.isSSAdmin()) {
            if (this.state.pagination.pageSizeOptions.length === 5) {
                this.state.pagination.pageSizeOptions.push('100000');
            }
        }
        this.onSetPageSize();

        let params = new URLSearchParams(this.props.location.search);
        let target = params.get('searchKey')

        if (target && target !== '') {
            this.setState({
                // defaultSearchValue: decodeURI(searchKey),
                menuDataOfSearchValue: decodeURI(target),
                isShowLoading: true
            }, () => {
                // this.menuBarOnSearchSubmit(this.state.defaultSearchValue)
                this.onMenuBarOnSearchSubmit();
            })
        } else {
            this.onGetItems();
        }
    };

    onComponentWillMountLater = () => {
        this.setState({ user: this.glbcontext.user, profile: this.glbcontext.profile });
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

    needShowUser = () => {
        return false;
    };

    isKeyAll = () => {
        console.log(this.state)
        // debugger
        return (this.state.menuDataOfSelectedMenuItem.filter === null || this.state.menuDataOfSelectedMenuItem.key === "keyAll")
            && this.state.needGetMore
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

    scrollToLoadMore = () => {
        if (this.isKeyAll()) {
            return false;
        } else {
            return true;
        }
    };

    getAllItems = (callback) => {
        this.getOwnerUUID(uuid => {
            if (!uuid) {
                this.showErrorMessage('您访问的模块还未激活，请联系企业管理员');
                callback([]);
                return;
            }
            let treeCond = {
                limit: 1000000,
                skip: 0,
                order: "-__CREATED__"
            }
            this.getApi().api_getItemsByOwnerUUID(uuid, { valid: 2 }, treeCond, data => {
                this.getValidData(data, data => {
                    if (!data) data = [];
                    for (let i = 0; i < data.length; ++i) {
                        const item = data[i];
                        this.state.treeItemList.push(item);
                    }
                    callback(this.state.treeItemList);
                });
            });
        });
    };

    onGetItems = () => {
        this.state.itemList.length = 0;
        const current = this.urlExtractParam('current');
        if (current) {
            this.state.pagination.current = Number(current);
        } else {
            this.state.pagination.current = 1;
        }

        this.onBeforeReadData(data => {
            this.getItems(data => {
                this.addItemIsGranted(isGranted => {
                    this.setState({
                        bAddItemIsGranted: isGranted,
                        itemList: this.state.itemList,
                        pagination: this.state.pagination
                    });
                    this.onPostReadData();
                });

                this.postProcessItems(this.state.itemList, data => {
                    this.setState({ itemList: this.state.itemList, pagination: this.state.pagination });
                });
            });
        });
    };

    createElementsOfTree = () => {
        let oldList = this.state.itemList;
        if (this.state.menuDataOfSelectedMenuItem.key !== "keyAll") {
            this.state.treeItemList.forEach((item, index) => {
                let iteI = oldList.findIndex(i => (i.dataId === item.meta.parent))
                if (iteI > -1
                    && oldList.findIndex(j => (j.dataId === item.dataId)) <= -1
                ) {
                    oldList.push(item)
                }
            })
        } else {
            oldList = this.state.treeItemList
        }
        return (
            <SuperTree
                itemList={oldList}
                onSelect={this.treeOnSelect}
                onDrop={this.treeOnDrop}
                onRightClick={this.treeOnRightClick}
            />
        )
    };

    onCreateElementsInChestOnPC = () => {
        return (
            <React.Fragment>
                <GapOfLarge />
                <div className={CSS.erp_layout}>
                    <div className={CSS.erp_menu_bar}>
                        <MenuOfSwiper
                            showMenu={true}
                            showDateRange={false}
                            showSearch={false}
                            direction={'vertical'}
                            setting={this.state.menuDataOfSetting}//菜单
                            menuItemOfCurrent={this.state.menuDataOfSelectedMenuItem}//菜单数据
                            onMenuItemClick={value => {
                                // this.state.menuDataOfSelectedMenuItem = value;
                                debugger
                                this.menuBarOnMenuItemClick(value)
                            }}
                            onSearchSubmit={this.menuBarOnSearchSubmit}
                        />
                        <div style={{ overflow: 'auto', marginTop: '15px', maxHeight: '60vh', backgroundColor: "#fff" }}>
                            {
                                this.createElementsOfTree()
                            }
                        </div>
                    </div>
                    <div className={CSS.erp_search_input}>
                        <InputDateRangeAndSearch
                            searchValue={this.state.menuDataOfSearchValue}
                            onSearchChangeValue={
                                (e) => {
                                    this.setState({
                                        menuDataOfSearchValue: e.target.value
                                    })
                                }
                            }
                            showDateRange={false}
                            showSearch={true}
                            onDateRangeConfirm={this.menuBarOnDateRangeConfirm}
                            onSearchSubmit={this.menuBarOnSearchSubmit}
                        />
                    </div>
                    <div className={CSS.erp_lists}>
                        <GapOfLarge />
                        {
                            this.isKeyAll()
                                ?
                                this.createElementsOfCommandOnPC()
                                :
                                this.createElementsOfTopicListOnPC()
                        }
                        {/* {this.createElementsOfTopicListOnPC()}  */}
                        {/* {this.createElementsOfCommandOnPC()} */}
                    </div>
                </div>
            </React.Fragment>
        )
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

    createElementsOfCommandOnPC = () => {
        return (
            <div className={CSS.commandWrap}>
                {
                    this.state.menuDataOfSetting.filters && this.state.menuDataOfSetting.filters.map((item, index) => {
                        if (item.key !== "keyAll") {
                            // let filterItem = this.state.itemList.filter(i => i.meta.typeId === item.key)
                            let filterItem = []
                            this.state.itemList.forEach((i) => {
                                if (i.meta.typeId === item.key) {
                                    filterItem.push(i)
                                }
                            })
                            // let newFilter = DataFormatting.buildTree(filterItem).children;
                            let newFilter = ERPTreeNode.buildTree(filterItem).children;
                            return (
                                <CardP
                                    key={item.key}
                                    bodyStyle={{
                                        padding: "0",
                                        backgroundColor: '#fff',
                                        margin: '0 0 1.25rem 0',
                                    }}
                                    bordered={false}
                                >
                                    <div
                                        className={CSS.cardWrap}
                                        style={{
                                            maxHeight: (item.nHeight ? item.nHeight : '30.5rem')
                                            // height: (item.nHeight ? item.nHeight : '28rem')
                                        }}>
                                        <h1 className={CSS.top_title}>
                                            <Icon
                                                style={{ color: '#489BFF', margin: '0 10px 0 0' }}
                                                type="book"
                                                theme="filled" />
                                            {item.name}
                                        </h1>
                                        <div className={CSS.commandListWrap}>
                                            {
                                                newFilter[0] && newFilter[0].children.map((com, inde) => {
                                                    return (
                                                        <MinCommandListItemP
                                                            key={com.key}
                                                            nStyle={{
                                                                width: '12.5rem',
                                                                height: '12.5rem',
                                                                // maxHeight: '12.5rem',
                                                                overflow: "hidden",
                                                                // margin: '0 15px',
                                                                margin: "15px 15px 0px",
                                                                border: "1px solid #e5e5e5",
                                                                padding: "0px 10px",
                                                                boxShadow: "3px 3px 3px rgba(0,0,0,0.4)",
                                                                borderRadius:"5px"
                                                            }}
                                                            item={com}
                                                            title={com.title}
                                                            itemList={com.children}
                                                            onItemClick={(id) => { this.onItemClick(id) }}
                                                        />
                                                    )
                                                })
                                            }
                                            <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
                                            <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
                                            <EmptyBox nStyle={{ width: '12.5rem', height: '0rem', margin: '0 15px' }} />
                                        </div>
                                        {
                                            newFilter[0] && newFilter[0].children.length > 8 && !item.nHeight && <div
                                                className={CSS.learnMore}
                                                onClick={() => { this.changeAutoHeight(item) }}
                                            >
                                                查看更多
                                     </div>
                                        }
                                    </div>
                                </CardP>
                            )
                        }
                    })
                }

            </div>
        )
    };

    createElementsOfTopicListOnPC = () => {
        return (
            <div className={'topicListOnPC'}>
                {
                    this.state.itemList.map(item => {
                        if (item.meta.haschildren) return null;
                        return (
                            <TopicListItemP
                                key={item.dataId}
                                title={this.getItemDisplayName(item)}
                                brief={item.meta.brief}
                                author={item.meta.creatorname}
                                time={item.lastModified}
                                images={item.meta.images}
                                onClick={() => this.showInfo(item)}
                                needShowUser={this.needShowUser()}
                            />
                        )
                    })
                }
                <div id={'listcontainerend'} />
                <GapOfLarge />
                <GapOfLarge />
            </div>
        )
    };
}

ERPContext.getInstance().registerPCModule('/team/:teamId/website/help/topics', WebsiteHelpTopics);

export default WebsiteHelpTopics;
