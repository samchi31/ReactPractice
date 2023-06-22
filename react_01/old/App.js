// import logo from './logo.svg';
// import './App.css';
import {useState} from 'react';
function Header(props){
  //console.log('props', props)
  return <header>
    <h1><a href='/' onClick={function(event){
      event.preventDefault();
      //alert("이렇게는?");
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const list = [];
  for(let i=0; i<props.topics.length; i++){
    let  t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        //props.onChangeMode(event.target.id); // 문자열
        props.onChangeMode(t.id); // 숫자
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
    <ol>
      {list}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value="Create"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value="Update"></input></p>
    </form>
  </article>
}
function App() {
  const [nextId, setnextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'}
    , {id:2, title:'css', body:'css is ...'}
    , {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  // const _mode = useState('WELCOME');
  // console.log("_mode", _mode);
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');  // 위 세줄과 같다
  const [id, setId] = useState(null);
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ'){  
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <><li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type='button' value="Delete" onClick={event=>{
        const newTopics = [];
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body: body};
      const newTopics = [...topics];  // 복제
      newTopics.push(newTopic);       // 수정
      setTopics(newTopics);
      setId(nextId);
      setnextId(nextId+1);
      setMode('READ');      
    }}></Create>
  } else if (mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === Number(id)){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const updateTopic = {id: Number(id), title : title, body: body}
      const newTopics = [...topics];  // 복제
      for (let i=0; i < newTopics.length; i++){
        if(newTopics[i].id === Number(id)){
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
      
    }}></Update>
  }
  return (
    <div className="App">
      <Header title="REACT" onChangeMode={function(){
        //alert("Header");
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        //alert(id);
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
