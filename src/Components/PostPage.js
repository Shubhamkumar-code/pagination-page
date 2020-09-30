import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      offset: 0,
      perPage: 20,       
      currentPage: 0,
      search:null,
      error : null,
      isLoaded : false,
      items : []
    }
    this.searchSapce = this.searchSapce.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }
  /*
            const data = res.data
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)*/

  componentDidMount(){

    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then( res => res.json())
    .then( (result) => {
        this.setState({
            isLoaded:true,
            items:result.slice(this.state.offset, this.state.offset + this.state.perPage),
            pageCount: Math.ceil(result.length / this.state.perPage),

        })
    },

    (error) => {
        this.setState({
            isLoaded:true,
            error
        })
    }
 )
}

handlePageClick = (e) => {
  const selectedPage = e.selected
  const offset = selectedPage * this.state.perPage

  this.setState({
      currentPage: selectedPage,
      offset: offset
  }, () => {
      this.componentDidMount()
  })

}

  searchSapce(e){
    let keyword = e.target.value
    this.setState({search:keyword})
  }

  /*map(pd => 
                <Link to={{
                      pathname:'/'+ data.title,
                      state:{
                        title : data.title,
                        body:data.body,
                        id:data.id,
                        userId:data.userId
                      }
                    }} key={data.title} className="link">
                      <div className="all-post">
                          <h2>{data.title}</h2>
                          <p>{data.body}</p>
                      </div>
                </Link>
                )*/

  render(){
        
    const list = this.state.items.filter((item) => {
      if(this.state.search === null)
      return item
      else if(item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
               item.body.toLowerCase().includes(this.state.search.toLowerCase())){
        return item
      }
    }).map(data => <Link to={{
                    pathname:'/'+ data.title,
                    state:{
                        title : data.title,
                        body:data.body,
                        id:data.id,
                        userId:data.userId
                    }
                    }} key={data.title} className="link">
                  <div className="all-post">
                      <h2>{data.title}</h2>
                      <p>{data.body}</p>
                  </div>
            </Link>)

      return(
        <div className="App">
            <input type="text" placeholder="search"
                   onChange={(e) => this.searchSapce(e)} /><hr/>
            <ul>
              {list}
            </ul>
            <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}/>
        </div>
      )
    
  }
}

export default App
/*
const list = items.filter((item) => {
      if(this.state.search === null)
      return item
      else if(item.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
               item.type.toLowerCase().includes(this.state.search.toLowerCase())){
        return item
      }
    }).map(data => <div key={data.name}><span><li>{data.name}</li></span><span><p>{data.type}</p></span></div>)

      return(
        <div className="App">
            <input type="text" placeholder="search"
                   onChange={(e) => this.searchSapce(e)} />
            <ul>
              {list}
            </ul>
        </div>
      )
      */