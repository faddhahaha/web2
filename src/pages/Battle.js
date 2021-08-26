import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'antd';
// import { PoweroffOutlined } from '@ant-design/icons';
class Battle extends Component{
    constructor(props){
        super(props);
        this.state={
            left:false,
            right:false,
            valueleft:true,
            valuerigth:true,
            btnleftvalue:false,
            btnrightvalue:false,
            leftvalue:'',
            rightvalue:'',
            imgUrlLeft:'',
            imgUrlRight:'',
            errorleft:'',
            errorright:''
            
        }
    }
    details=()=>{
        this.props.history.push(`/Battle/relust?player1=${this.state.leftvalue}&player2=${this.state. rightvalue}`);
    }
    clearLeft=()=>{
        this.setState({
            left:false,
            imgUrlLeft:''     
        }) 
        let a =document.getElementsByClassName('inputleft')[0];
        a.value='';
    }
    clearRight=()=>{
        this.setState({
            right:false,
            imgUrlRight:''
        }) 
        let a =document.getElementsByClassName('inputright')[0];
        a.value='';

    }
    rightkeyUp = (e) => {
        if (e.keyCode === 13) {
           this.setState({
            right:true,
            btnrightvalue:true
           })
        this.requestVlaue(this.state.rightvalue,'right');
        }
    };
    leftkeyUp = (e) => {
        if (e.keyCode === 13) {
           this.setState({
            left:true,
            btnleftvalue:true
           })
        this.requestVlaue(this.state.leftvalue,'left');
        }
    };
    changeLeft=(e)=>{
        if(e.target.value){
            this.setState({
                valueleft:false,
                errorleft:false,
                leftvalue:e.target.value
            })
        }
    }
    changeRight=(e)=>{
        if(e.target.value){
            this.setState({
                valuerigth:false,
                errorright:false,
                rightvalue:e.target.value
            })
        }
    }
    requestVlaue=(page,both)=>{
      
        if(both=='left'){
             let url = `https://api.github.com/users/${page}`
                fetch(url).then(res => 
                     res.json()       
                )
                .then(res=>{
                   
                    this.setState({
                        imgUrlLeft:res.avatar_url,
                        btnleftvalue:false,
                        valueleft:true, 
                        errorleft:false                
                    })
                  if(res.message){
                        this.setState({
                            errorleft:res.message
                        })
                    }
                }).catch(error=>{
                   
                    this.setState({
                        btnleftvalue:false
                    })
                })
        }
        if(both=='right'){
            let url = `https://api.github.com/users/${page}`
            fetch(url).then(res => 
                    res.json()
            )
            .then(res=>{
              
                this.setState({
                    imgUrlRight:res.avatar_url,
                    btnrightvalue:false,
                    valuerigth:true,
                    errorright:false
                })
                if(res.message){
                    this.setState({
                        errorright:res.message
                    })
                }
            }).catch(error=>{
                this.setState({
                    btnrightvalue:false
                })
               
            })
        }
       
    }
    btnLeft=()=>{
        this.setState({
            left:true,
            btnleftvalue:true
        }) 
       
       this.requestVlaue(this.state.leftvalue,'left');
    }
    btnRigth=()=>{
        this.setState({
            right:true,
            btnrightvalue:true
        }) 
        this.requestVlaue(this.state.rightvalue,'right');
    }
    render(){
        const {errorleft,errorright,left,right,valueleft,valuerigth,leftvalue,rightvalue,imgUrlRight,imgUrlLeft,btnleftvalue,btnrightvalue} =this.state;
    
        return(
            <div>
                <h2 style={{textAlign:'center'}}>Instructions</h2>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{width:'16%',margin:'20px 20px 0 20px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <p style={{fontWeight:'550',fontSize:'22px'}}>Enter two Github users</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-users' style={{ fontSize: '150px', color: '#ffbf74' }}></i>
                        </div>
                    </div>
                    <div style={{width:'16%',margin:'20px 20px 0 20px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <p style={{fontWeight:'550',fontSize:'22px'}}>Battle</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-fighter-jet' style={{ fontSize: '150px', color: '#808080' }}></i>
                        </div>
                    </div>
                    <div style={{width:'16%',margin:'20px 20px 0 20px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <p style={{fontWeight:'550',fontSize:'22px'}}>See the winner</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-bell' style={{ fontSize: '150px', color: '#ffbf74' }}></i>
                        </div>
                    </div>
                   
                </div>
                <h2 style={{textAlign:'center',margin:'30px 0'}}>players</h2>
                <div style={{width:'90%',margin:'70px auto',display:'flex',justifyContent:'space-around'}}>
                <div>
                        <p style={{fontWeight:'550',fontSize:'20px'}}>Player One</p>
                        <input type="text" style={{width:'400px',lineHeight:'38px'}}  className="inputleft" onChange={this.changeLeft}  placeholder="github username" onKeyUp={this.leftkeyUp}></input>
                        <Button   style={{marginLeft:'20px'}} type="primary" disabled={valueleft || btnleftvalue ||imgUrlLeft ?"disabled":""} onClick={this.btnLeft}  loading={btnleftvalue}>Submit</Button>
                        <div style={{display: imgUrlLeft ?'flex':"none",justifyContent:'space-between',alignItems:'center',width:'510px',height:'100px',background:'#DFDFDF',marginTop:'10px',borderRadius:'10px'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                            <div style={{width:'80px',height:'80px',margin:'0 20px'}}>
                                <img style={{width:'100%',borderRadius:'10px'}} src={imgUrlLeft} />
                            </div>
                            <span style={{fontSize:'20px',marginLeft:'10px'}}>{leftvalue}</span>
                            </div> 
                            <div style={{width:'40px',height:'40px',marginRight:'20px',background:'red',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}} onClick={this.clearLeft}>
                                <i className="fa fa-times fa-3x" ></i>
                            </div>
                        </div>
                        <p style={{display: errorleft ?'flex':"none"}}>{errorleft}</p>
                    </div>
                    <div >
                        <p style={{fontWeight:'550',fontSize:'20px'}}>Player Two</p>
                        <input type="text" style={{width:'400px',lineHeight:'38px'}} className="inputright"  onChange={this.changeRight} placeholder="github username" onKeyUp={this.rightkeyUp}></input>
                        <Button style={{marginLeft:'20px'}} type="primary" disabled={ valuerigth || btnrightvalue || imgUrlRight  ?"disabled":""} onClick={this.btnRigth}  loading={btnrightvalue}>Submit</Button>
                        <div style={{display: imgUrlRight ?'flex':"none",justifyContent:'space-between',alignItems:'center',width:'510px',height:'100px',background:'#DFDFDF',marginTop:'10px',borderRadius:'10px'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                                <div style={{width:'80px',height:'80px',margin:'0 20px'}}>
                                    <img style={{width:'100%',borderRadius:'10px'}} src={imgUrlRight} />
                                </div>
                                <span style={{fontSize:'20px',marginLeft:'10px'}}>{rightvalue}</span>
                            </div>
                            <div style={{width:'40px',height:'40px',marginRight:'20px',background:'red',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}} onClick={this.clearRight}>
                                <i className="fa fa-times fa-3x"></i>
                            </div>
                        </div>
                        <p style={{display: errorright ?'flex':"none"}}>{errorright}</p>
                    </div>
                </div>
                <div style={{width:'100%'}}>
                  <Button style={{marginLeft:'20px',display:( imgUrlLeft && imgUrlRight) ? 'block' : 'none',margin:'0 auto'}} onClick={this.details.bind(this)}>
                    Battle
                  </Button>
                </div>
            </div>
            ) ;

        }
}
export default Battle;