// import axios from axios
// export function getMovies(){
//   return async function(dispatch){
//       //api call to the server 
//       const response = await axios.get('https://github.com/facebook/react/network/members')
//       console.log("action" , response)
//       return dispatch({
//           type : 'GET_MOVIES',
//           payload : response.data.results
//       })
//   }
// } 
import React, { Component } from 'react';
import axios from 'axios'
class ShoppingList extends React.Component {
  componentDidMount() {
    async function makeGetRequest() {

      let res = await axios.get('https://api.github.com/repos/octocat/hello-world/teams');
    document.write(res)
      let data = res.data;
      console.log(data);
    }
    
    makeGetRequest();
  
  }
  

  render() {
   

    // const response =  axios.get('https://api.themoviedb.org/3/movie/popular?api_key=b01beee0a54ec1668f8ead66dcbdcf08')
    //    document.write("action" , response)
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

export default ShoppingList;