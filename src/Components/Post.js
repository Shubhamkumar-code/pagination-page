import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Post extends Component{


 /* componentDidMount(){
    
    //const { title } = this.props.location.state
    //const { url } = this.props.location.state

  }*/

    render(){
        console.log(this.props)
        return(
            <div className="post-background">
                <div className="post">
                    <h2>{this.props.location.state.title}</h2>
                    <p>{this.props.location.state.body}</p>
                    <p>Id : {this.props.location.state.id}</p>
                    <p>userId : {this.props.location.state.userId}</p>
                    <Link to="/"><button type="button">back</button></Link>
                </div>
            </div>
        )
    }

}

export default Post