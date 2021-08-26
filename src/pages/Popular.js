import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import InfiniteScroll from 'react-infinite-scroller'
import  './PopularCss.css';
import { Spin,Modal} from 'antd'
import 'antd/dist/antd.css';
import {Link}  from  'react-router-dom';

class Popular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error:true,
            spinning:false,
            date: [],
            errortext:'',
            switchIndex:window.location.href.substring(window.location.href.lastIndexOf("/") + 1),
            url: {
                'ALL': 'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories',
                'JavaScript': 'https://api.github.com/search/repositories?q=stars:3E1+language:javascript&sort=stars&order=desc&type=Repositories',
                'Ruby': 'https://api.github.com/search/repositories?q=stars:3E1+language:ruby&sort=stars&order=desc&type=Repositories',
                'Java': 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories',
                'CSS': 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories'
            },
            hasMore: true, // 是否开启下拉加载
            pageUrl: 'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories'
        }
        this.loadMoreData()
    }
    loadMoreData = (page = 1) => {
        // page 当前滚动到了第几页
        const { pageUrl } = this.state
        this.getData(`${pageUrl}&page=${page}`)
    }
    //获取数据
    getData = (url = this.state.url[this.state.switchIndex]) => {
        let { date } = this.state
        fetch(url).then(res => res.json())
            .then(res => {
                
                if (res.items) {
                    this.setState({ date: [...date, ...res.items],
                        spinning:true });
                    
                 }
                else{
                   
                    this.setState({
                        spinning:false,
                        error:false,
                        hasMore:false,
                        errortext:res.message
                    })
                }
            })
            
            .catch(e => { 
                this.setState({
                    spinning:false,
                    error:false,
                    hasMore:false,
                    errortext:e.message
                })
              
            })
    
    }
    //切换
    onSwitch = value => {
        this.setState({ 
            error:true,
            date: [], 
            pageUrl: this.state.url[value], 
            switchIndex: value }, 
            () => { this.loadMoreData(1) });
        
    }
    render() {
        const { date, hasMore, switchIndex,error,spinning,errortext } = this.state
        // console.log("error    "+error);
        // console.log("spinning    "+spinning)
        // console.log("switchIndex    "+switchIndex)  
        return (
            <div>
                <div >
                <h1 style={{textAlign:'center'}}>
                         <Link to="/ALL" style={{marginRight:'20px',color:(switchIndex=='ALL') ? "red" : " ",cursor:'default'}} onClick={()=>this.onSwitch('ALL')}>ALL</Link>
                         <Link to="/ALL/JavaScript" style={{marginRight:'20px',color:(switchIndex=='JavaScript') ? "red" : " ",cursor:'default'}} onClick={()=>this.onSwitch('JavaScript')}>JavaScript</Link>
                         <Link to="/ALL/Ruby" style={{marginRight:'20px',color:(switchIndex=='Ruby') ? "red" : " ",cursor:'default'}} onClick={()=>this.onSwitch('Ruby')}>Ruby</Link>
                         <Link to="/ALL/Java" style={{marginRight:'20px',color:(switchIndex=='Java') ? "red" : " ",cursor:'default'}} onClick={()=>this.onSwitch('Java')}>java</Link>
                         <Link to="/ALL/CSS" style={{marginRight:'20px',color:(switchIndex=='CSS') ? "red" : " ",cursor:'default'}} onClick={()=>this.onSwitch('CSS')}>CSS</Link>
                </h1>
                </div>
                <InfiniteScroll
                    initialLoad={false} // 不让它进入直接加载
                    pageStart={1} // 设置初始化请求的页数
                    loadMore={this.loadMoreData}  // 监听的ajax请求
                    hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
                    useWindow={true} // 不监听 window 滚动条
                    key={switchIndex}
                    style={{width: '100%',overflow:'hidden'}}
                >
                    <div className='row'  style={{display:'flex',justifyContent:'space-around'}}>
                        {date.map((item, index) => {
                            return (
                                <div className="col-lg-3 col-sm-12 col-md-6 " key={index}  >
                                <div style={{backgroundColor:'#EBEBEB',display:'flex',flexDirection:'column', alignItems:'center', justifyContent: 'center',margin:'1% 1%',}}> 
                                    <h2 style={{margin:'10px 0'}}>#{index}</h2>
                                    <div style={{margin:'0 auto',display:' inline-block',textAlign:'center',width:'100%'}}>
                                        <img style={{width:'150px'}} src={item.owner.avatar_url} />
                                    </div>
                                    <div style={{color:'red',fontWeight:'600'}}>{item.owner.login}</div>
                                    <div style={{width:'100%',paddingLeft:'10px'}}>
                                        <ul className="fa-ul">
                                            <li><i className="fa-li fa fa-book"></i>{item.owner.login}</li>
                                            <li><i className="fa-li fa fa-check-square"></i>{item.stargazers_count} stars</li>
                                            <li><i className="fa-li fa fa-spinner fa-spin"></i>{item.forks} forks</li>
                                            <li><i className="fa-li fa fa-square"></i>{item.open_issues_count} Open issues</li>
                                        </ul>
                                    </div>  
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </InfiniteScroll>
                    
                <Spin tip={"加载中"} spinning={spinning}>
                <Modal >
                    
                </Modal>
                </Spin>
                {error  ?'':
                                (<div style={{width:'400px',margin:'0 auto',height:'200px'}}>
                                            <h1 style={{fontSzie:'200px',fontWeight:'700',textAlign:'center'}}>Error !!!</h1>
                                            <p style={{textAlign:'center',color:'red',fontSize:'30px'}}>{errortext}</p>
                                </div>)}
	 </div>
        );
    }
}

export default Popular;