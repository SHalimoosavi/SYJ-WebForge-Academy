import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

class AppErrorBoundary extends Component<{children:ReactNode},{hasError:boolean;message:string}> {
  state={hasError:false,message:''};
  static getDerivedStateFromError(error:Error){return {hasError:true,message:error.message||'Unknown rendering error'};}
  componentDidCatch(error:Error,info:ErrorInfo){console.error('SYJ WebAcademy render error:',error,info);}
  render(){
    if(this.state.hasError)return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#0b1120',color:'#edf2ff',fontFamily:'system-ui'}}>
      <section style={{maxWidth:560,padding:28,border:'1px solid #394761',borderRadius:16,background:'#121e32'}}>
        <h1 style={{marginTop:0}}>SYJ WebAcademy could not start</h1>
        <p>The page loaded, but the application encountered an error. Please refresh once. If it continues, share this diagnostic message with the project maintainer.</p>
        <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',color:'#ffb4b4'}}>{this.state.message}</pre>
        <button style={{padding:'12px 18px',borderRadius:8,border:0,cursor:'pointer'}} onClick={()=>window.location.reload()}>Reload application</button>
      </section>
    </main>;
    return this.props.children;
  }
}

const root=document.getElementById('root');
if(root)ReactDOM.createRoot(root).render(<React.StrictMode><AppErrorBoundary><App/></AppErrorBoundary></React.StrictMode>);
