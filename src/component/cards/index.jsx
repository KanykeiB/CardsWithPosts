import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './index.module.css'
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';


const PostCard= () => {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading]= useState(false)
    useEffect(()=>{
      (async()=>{
        try{
            setIsLoading(true)
            const data = await getData(id)
            setPost(data)
        } catch(e){
            console.log(e)
        } finally {
            setIsLoading(false)
        }
      })()
    }, [])
    const getData = async (id)=> {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/h${id}`)
        const data = await res.json()
        return data
      }
    if (isLoading){
        return(
            <Box className={styles.loader}>
                <CircularProgress />
            </Box>
        )
    }
    if(!post){
        return (
        <div>
            <Link to={`/`}>
                <Button variant="outlined" endIcon={<HomeIcon />}>
                    Home
                </Button>
            </Link>
            <Card className={styles.cardWrap} >
                <CardContent className={styles.failedFetch}>
                    <Typography>
                        Oops! Something went wrong!
                    </Typography>     
                </CardContent> 
            </Card>
        </div>
        )
             }
    return (
        <div>
        <Link to={`/`}>
            <Button variant="outlined" endIcon={<HomeIcon />}>
                Home 
            </Button>
        </Link>
        <Card className={styles.cardWrap} >
            <CardContent className={styles.cardWrapItem} >
                <Typography>
                    {`Card: ${id}`} 
                </Typography>  
                <Typography sx={{ fontSize: 22 }}>
                    {`${post.title}`}
                </Typography>  
                <Typography>
                    {`${post.body}`}
                </Typography>     
            </CardContent>
        </Card>
        </div>
    )
  }

export default PostCard;