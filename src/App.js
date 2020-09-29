import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Route } from "react-router-dom"
import PostPage from './Components/PostPage'
import Post from './Components/Post'

class App extends Component{
  
  render(){
    return(

      <BrowserRouter>
        <div className="App">
          
            <Route component={PostPage} path="/" exact />
            <Route component={Post} path="/:id" />
            

        </div>
      </BrowserRouter>

    )
  }

}

export default App;
