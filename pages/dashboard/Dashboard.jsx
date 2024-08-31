import * as React from 'react'
import { Link, useNavigate , Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import NavBar from './components/NavBar';
import { Box ,Button, Stack, Typography, Avatar} from '@mui/material';
import axios from 'axios';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteForeverOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast';


export default function Dashboard({publications}) {
    const [publication, setPublication] = React.useState([]);
    const [likes, setLikes] = useState(0);
    const Navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    useEffect(()=>{
        if(!localStorage.getItem("utilisateur")){
            Navigate("/connexion");
        }
        // axios.get("http://localhost:3000/Pub").
        // then((res)=>{
        //     setPublication(res.data);
        // });
    },);
    const compteLikes = ()=>{
        setLikes(likes+1);
    }
    const liker = (data)=>{
        const donnee = [...publication];
        const index = publication.indexOf(data);
        donnee[index] = {...publication[index], likerPub:!publication[index].likerPub};
        setPublication(donnee);
    }
    const clientQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) =>{
            return axios.delete(`http://localhost:3000/Pub/${id}`);
        },
        onerror: (error)=>{
                toast.error("une erreur s'est produite !");
        }, onSuccess : () =>{
            clientQuery.invalidateQueries("Pub");
            toast.success("supprimer");
        }
    });
    const {data: pub, error, isLoading} = useQuery({
        queryKey : "Pub",
        queryFn: () => axios.get("http://localhost:3000/Pub").
        then((res)=>{
           setPublication( res.data);
           setLikes(res.data);
        }),
        onerror: (error) => console.log(error),
    });
    const like = publication.filter((publication) => publication.likerPub);
    
   
    if(isLoading){
        return  <h3 style={{textAlign:"center",width:"100%",color:"#fff", marginTop:"200px", backgroundColor:"blue", fontSize:"2rem"}}>En cours de chargement...</h3>
    }
   
  
    let pubTrier =  publication.sort((a, b)=>{
        return new Date(b.datePub) - new Date(a.datePub);
    })
    const supPub = (id) =>{
       mutation.mutate(id);
    };
    const ajouter = ()=>{
        
    }
  return (
        <Box  bgcolor={"#eef4ff"}>
            <NavBar like={like.length} /><br /><br />
                <Link to="/ajouter">
                <Button sx={{
                    width:"100%",
                    color:"turquoi",
                    fontWeight:"bold",
                    fontSize:"1.2rem",
                    backgroundColor:"whitesmoke"
                }}
                   variant="outlined">Publication</Button>
                </Link>
                <Outlet />
             <br /><br /><br />
             
            <Box  width={"62%"} margin={"auto"} >
                {publication && pubTrier.map((publication) => ( 
                    <Box width={"100%"} 
                    bgcolor={"#fff"} 
                    borderRadius={4} 
                    marginBottom={4}
                    padding={2}
                    >
                        <Stack   style={{
                            direction:"columns"
                        }}  alignItems={"center"} gap={2}>
                            <Typography 
                            sx={{color:"#000e88",fontWeight:"bold", backgroundColor:"#fff", border:"1px solid white", borderRadius:"0.3rem", fontSize:"1.1rem"}}
                                
                            ><h6 style={{color:"red"}}>From </h6>{"  "}{publication.auteur}</Typography>
                            <Avatar src={publication.photoUtilisateur} />  
                            <Typography sx={{color:"turquoise",fontWeight:"bold", backgroundColor:"#fff", border:"1px solid white", borderRadius:"0.3rem", fontSize:"1rem"}}>{publication.datePub}</Typography>
                            <Typography sx={{color:"#000",fontWeight:"bold", backgroundColor:"#fff", border:"1px solid white", borderRadius:"0.3rem", fontSize:"0.9rem"}}>{publication.usersPub}</Typography>
                            <Typography 
                            style={{color:"#fff", 
                            backgroundColor:"violet",
                            borderRadius:"2rem",
                            width:"30px",
                            height:"30px",
                            fontSize:"1rem",
                            fontWeight:"bold"

                        }}
                            > <h4 
                            style={{
                                marginTop:"4px",
                                marginLeft:"10px",
                            }}
                            > {publication.likerPub+0}</h4> {"  "}Likes</Typography>
                            <img src={publication.urlImage} 
                            style={{
                                width:"100%",
                                borderRadius:4,
                            }}
                            />
                            <Typography  sx={{marginTop:"4px", fontSize:"1rem", fontWeight:"bold"}}>
                                <Button onClick={()=>liker(publication)} color="primary" variant="contained">{publication.likerPub?"Déjà Liker": "Liker"}</Button> {" "}
                                
                            </Typography>
                            
                            {
                                 user.id === publication.idUsers && (      
                                <IconButton style={{color:"red",}} onClick={()=>supPub(publication.id)} aria-label ="icons">
                                    <DeleteIcon style={{color:"red",fontSize:"1.8rem"}} />
                                </IconButton>
                                
                             )}
                        </Stack>
                    </Box>
                    ))}
                    
            </Box>
        </Box>
    
  )
}
