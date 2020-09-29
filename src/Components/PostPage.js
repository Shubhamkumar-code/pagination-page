import axios from 'axios'
import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'

class PostPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      data: [],
      perPage: 20,       
      currentPage: 0,
      isLoading:true,
      search :null
    }
    this.handlePageClick = this.handlePageClick.bind(this)
    this.searchSapce = this.searchSapce.bind(this)
    
}
searchSapce(e){
    let keyword = e.target.value
    this.setState({search:keyword})
  }


receivedData() {
    axios
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => {

            const data = res.data
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

            
            const postData = slice.map(pd => 
                <Link to={{
                      pathname:'/'+ pd.title,
                      state:{
                        title : pd.title,
                        body:pd.body,
                        id:pd.id,
                        userId:pd.userId
                      }
                    }} key={pd.title} className="link">
                      <div className="all-post">
                          <h2>{pd.title}</h2>
                          <p>{pd.body}</p>
                      </div>
                </Link>
                )

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
               
                data:postData, isLoading:false
            })
        })
}
handlePageClick = (e) => {
    const selectedPage = e.selected
    const offset = selectedPage * this.state.perPage

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    })

}

componentDidMount() {
    this.receivedData()
}

render() {

    return (

        <div>
            {this.state.isLoading ? 
                    <div className="load">
                    <h1>loading...</h1>
                    </div>
                     : 
                    <div>
                        <input type="text" placeholder="search"
                    onChange={(e) => this.searchSapce(e)} /><hr/>
                    
                      {this.state.data}
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
                }
        </div>
      )
   }
}
export default PostPage
/*
const items = Information.filter((data)=>{
    if(this.state.search == null)
        return data
    else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLowerCase().includes(this.state.search.toLowerCase())){
        return data
    }
  })
  
  const items = Information.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.country.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    })

  */