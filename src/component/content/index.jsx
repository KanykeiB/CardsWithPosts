import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {Link} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import styles from './index.module.css'

const Content = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading]= useState(false)
    const fetchData = async ()=> {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      const data = await res.json()
      return data
    }
    useEffect(()=>{
      (async()=>{
        try{
          setIsLoading(true)
          const data = await fetchData()
          setPosts(data)
        } catch(e){
          console.log(e)
        } finally{
          setIsLoading(false)
        }
      })()
    }, [])


    if (isLoading){
      return(
          <Box className={styles.loader}>
              <CircularProgress />
          </Box>
      )
    }
    if(!posts.length){
      return (
        <Card className={styles.cardWrap} >
              <CardContent className={styles.cardWrapItem}>
                  <Typography>
                    Oops! Something went wrong!
                  </Typography>     
              </CardContent> 
      </Card>
      )
    }
    return (
      <Card className={styles.cardWrap} >
        {posts.map((item, idx)=>{
          return (
            <Link key={idx} to={`/posts/${item.id}`}>
              <CardContent className={styles.cardWrapItem}>
                <Tooltip title= {`Press to open the card ${item.id}`}>
                  <Typography>
                    {`Card: ${item.id}`}
                  </Typography>
                </Tooltip>       
              </CardContent> 
            </Link>
         )})}
      </Card>
    )
  }
  

export default Content;