import React,{Component,Suspense,lazy} from 'react';
import Popular from './Popular';
import {HashRouter,Route,Link,Redirect,Switch}  from  'react-router-dom';
const  Battle=lazy(()=>import('./Battle'));
import Relust from '@/components/relust';
    class App extends Component {
        constructor(props){
            super(props);
            this.state={navigationValue:location.hash.substring(1)}
        }
        onSwich(value) {
            this.setState({
                navigationValue:value
            })
        }
        render(){
            const {navigationValue} =this.state;
            return(
            <div>
                <HashRouter>
                        <div style={{ fontSize:'30px',fontWeight:'600',margin:'40px 20px',display:'flex'}} >
                            
                            <div style={{margin:'0 20px'}} onClick={()=>{this.onSwich('/ALL')}} >
                            <Link to='/ALL'  style={{color:navigationValue==='/'||navigationValue==='/ALL'||navigationValue==='/ALL/JavaScript'||navigationValue==='/ALL/CSS' ||navigationValue==='/ALL/java'||navigationValue==='/ALL/Ruby' ? 'red':'black'}} >  Popular </Link>   
                            </div>
                            <div style={{margin:'0 20px'}} onClick={()=>{this.onSwich('/Battle')}}>
                            <Link to='/Battle'  style={{color: navigationValue==='/Battle'||navigationValue==='/Battle/relust' ? 'red':'black'}}> Battle</Link>   
                            </div>    
                        </div> 
                        <Suspense fallback={<div>Loading....</div>}>
                        <Switch>
                        <Route  path="/Battle" exact component={Battle}>  
                           
                        </Route>
                        <Route path="/ALL" component={Popular}>
                               
                        </Route>
                         <Route path="/Battle/relust" component={Relust} />
                        <Redirect exact from="/" to="/ALL"  />
                        </Switch>
                        </Suspense>
                </HashRouter>
            </div>
            );
        }
    }
    export default App;