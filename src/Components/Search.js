import React,{ useEffect } from 'react'

function Search(props){


    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])


    const handleChange = e => {
            setSearchTerm(e.target.value)
        }

  React.useEffect(() => {
            const results = props.title.filter(person =>
                    person.toLowerCase().includes(searchTerm)
                    )
            setSearchResults(results)
        }, [searchTerm])

return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}
export default Search