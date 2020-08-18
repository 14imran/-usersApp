
import GitHub from 'github-api';
import React,{ useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImgMediaCard from './card'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'
import ButtonAppBar from './navbar'
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"35px",
  
  },
  rootloader: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    margin : "auto",
    
  },

  rootPage: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }, 


}));





const gh = new GitHub({
  username: 'enter your username',
  password: 'enter your password',
  token: 'enter your token'
});

const repoData = gh.getRepo('facebook/react')



 function App() {
  const classes = useStyles();
  const [loading ,setLoading] = useState(true)
  const [reposData, setReposData] = useState([]);
   const [page, setPage] = React.useState(1);
  const [followState, setFollowState] = useState(false)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleChange = (event, value) => {
    setPage(value)
    setLoading(true)

    // setLoading(true)
    axios.get(`${gh.__apiBase}/repos/facebook/react/forks?page=${value}&per_page=30`)
    .then((res)=> {
      setReposData(res.data)
     
      setLoading(false)
    })
    .catch((err)=> console.log(err))
    
     
     }

   useEffect(() => {
    
    repoData.listForks(function(err,data){
      if(err) console.log(err)
      setReposData(data)
      setLoading(false)
    })
   }, [])
  




  function follow(owner){
    setFollowState(false)
    const follower = gh.getUser(owner)
    follower.follow(owner)
    .then(()=>  {
      setFollowState(true)
      setState({ open: true , vertical: 'top',horizontal: 'right' })
    }
      )
    .catch((err)=> console.log(err))
  };


 



  return (

    <div className="App">
            <ButtonAppBar />
      {/* Fetch data from API */}
      <div>
        
      </div>

      {/* Display data from API */}
      <div className={classes.rootloader} >
        {loading ? <div className={classes.rootloader} style={{paddingTop : "100px"}}> 
        <CircularProgress size={100}/> </div> :
        <>


<Grid  container justify="center"  className={classes.root} spacing={3}>
 
          {reposData.map((data)=>{
          return(
            <Grid  item key={data.id} >
            
                

  <ImgMediaCard data={data}  follow={follow}/>

            </Grid>
       
    
          )
        })}

<div className={classes.rootPage}>
      
      <Pagination size="large" count={10} page={page}  onChange={handleChange} />

    </div> 
</Grid>
        </>
        }
           

      </div>
      {followState && 
      <>
       <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="You have Successfully Followed"
        key={vertical + horizontal}
        autoHideDuration={1500}
        
      />
      </>}

      </div>
      
  );
  
}

export default  App;

















       
  // <ImgMediaCard data={data} key={data.id}/>

//         <div>
//           <img src={data.owner.avatar_url} alt='avtar'></img>
//          <p>{data.full_name}</p>
//          <p>{data.html_url}</p>
//          <p></p>
//          <p>{data.owner.login}</p>


// <button onClick={()=>follow(data.owner.login)}>Follow</button>

         
//         </div>
