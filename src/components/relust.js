
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Relust extends Component{
    constructor(props){
        super(props);
        this.state={
            player1:'',
            player2:'',
            plater1Value:{},
            plater2Value:{},
            active:false
        }
    }
    

    componentDidMount(){
        let a =this.props.location.search.split('?');
        let b =a[1].split('&');
        let player2=b[1].split("=")[1];
        let player1=b[0].split("=")[1];
        console.log(player1);
        console.log(player2);
        if(!player1 || !player2){
            
            console.log('zxzcxzxczxc');
            window.location.hash='#/Battle'
        } 
        if(player2===player1 ){
            this.setState({
                active:true
            })
        }
        let player1Url=`https://api.github.com/users/${player1}`;
        let player2Url=`https://api.github.com/users/${player2}`;
       
        this.request(player1Url,player2Url);
        console.log(this.state.plater2Value);
        console.log(this.state.plater1Value);

    }
    request(url1,url2){
        fetch(url2).then(res => 
            res.json()
        )
        .then(res=>{
            this.setState({
                plater2Value:res
            })
           
            console.log(res)
        })
        fetch(url1).then(res => 
            res.json()
        )
        .then(res=>{
            this.setState({
                plater1Value:res
            })
           
            console.log(res)
        })
    }
    judge=()=>{
         const {plater2Value,plater1Value}=this.state;
         if(plater2Value && plater1Value ){
            if(plater2Value.public_repos>plater1Value.public_repos){
                this.setState({
                    player1:plater2Value,
                    player2:plater1Value
                })

            }else if(plater2Value.public_repos<plater1Value.public_repos){
                this.setState({
                    player1:plater1Value,
                    player2:plater2Value
                })
            }else if(plater2Value.public_repos == plater1Value.public_repos){
                this.setState({
                    player1:plater1Value,
                    player2:plater2Value,
                    active:true
                })
            }
        }
      
       
        
    }
    RESET=()=>{
        window.history.back(-1);
        
    }

    render(){
        const {player1,player2}=this.state;
        
        return (
            <div >
                
            <div style={{display:'flex',width:'100%',justifyContent:'space-around',height:'500px'}}>

               <div style={{width:'20%',backgroundColor:'#EBEBEB',display:'flex',flexDirection:'column', alignItems:'center', justifyContent: 'center',margin:'1% 1%',}}> 
                                    <h2 style={{margin:'10px 0'}}>{this.state.active?"Draw":"Winner"}</h2>
                                    <div style={{margin:'0 auto',display:' inline-block',textAlign:'center',width:'100%'}}>
                                        <img style={{width:'150px'}} src={player1.avatar_url} />
                                    </div>
                                    <div style={{color:'blue',fontWeight:'600',fontSize:'20px'}}>Scores:{player1.public_repos}</div>
                                    <div style={{color:'red',fontWeight:'600',fontSize:'20px',visibility:player1.name?"":'hidden'}}>{player1.name}</div>
                                    <div style={{width:'100%',paddingLeft:'10px'}}>
                                        <ul className="fa-ul">
                                            <li><i className="fa-li fa fa-book"></i>{player1.location}</li>
                                            <li><i className="fa-li fa fa-check-square"></i>{player1.public_gists} </li>
                                            <li><i className="fa-li fa fa-spinner fa-spin"></i> {player1.followers}</li>
                                            <li><i className="fa-li fa fa-square"></i>{player1.public_repos}</li>
                                        </ul>
                                    </div>  
                </div>
                <div style={{width:'20%',backgroundColor:'#EBEBEB',display:'flex',flexDirection:'column', alignItems:'center', justifyContent: 'center',margin:'1% 1%',}}> 
                                    <h2 style={{margin:'10px 0'}}>{this.state.active?"Draw":"Lost"}</h2>
                                    <div style={{margin:'0 auto',display:' inline-block',textAlign:'center',width:'100%'}}>
                                        <img style={{width:'150px'}} src={player2.avatar_url} />
                                    </div>
                                    <div style={{color:'blue',fontWeight:'600',fontSize:'20px'}}>Scores:{player2.public_repos}</div>
                                    <div style={{color:'red',fontWeight:'600',fontSize:'20px',visibility:player2.name?"":'hidden'}}>{player2.name}</div>
                                    <div style={{width:'100%',paddingLeft:'10px'}}>
                                        <ul className="fa-ul">
                                            <li><i className="fa-li fa fa-book"></i>{player2.location}</li>
                                            <li><i className="fa-li fa fa-check-square"></i>{player2.public_gists} </li>
                                            <li><i className="fa-li fa fa-spinner fa-spin"></i> {player2.followers}</li>
                                            <li><i className="fa-li fa fa-square"></i>{player2.public_repos}</li>
                                        </ul>
                                    </div>  
                </div>  
            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'30px'}}>
            <button style={{padding:'8px 30px',marginLeft:'20px'}} onClick={this.RESET}>RESET</button>    
            </div>    
        </div>
        )
    }

}

export default Relust;