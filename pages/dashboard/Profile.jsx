import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Typography,Stack, Box, Avatar, Button} from '@mui/material';
import Profil from './Profil.jsx';
import {Outlet, Link} from 'react-router-dom'


export default function Profile() {
    const [users, setUsers] = React.useState([]);
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    const {data: error, isLoading} = useQuery({
        queryKey :"Pub",
        queryFn: ()=>
            axios.get("http://localhost:3000/Pub").
            then((res)=>{
                setUsers(res.data);
            }),
            onSuccess : () =>{
                toast.success("Bienvenue !")
            }
        
    });

   let fiche ;

  return (
    <>
       
        <h2 style={{backgroundColor:"#fff"}}>
            {/* {user.map((user) =>(
                <Typography>{user}</Typography>
            ))} */}
                    <Typography
                    sx={{
                        textAlign:"center",
                        fontSize:"2rem",
                        backgroundColor:"#000",
                        direction:"columns",
                        display:"flex",
                        width:"70%",
                        marginTop:"01px",
                        marginLeft:"10px",
                        height:"300px",
                        border:"1px solid #000",
                        borderRadius:"0.3rem"
                    }} 
                    color={"blue"} direction={"columns"}
                    >
                        <Stack 
                        style={{
                            marginLeft:"20px",
                            marginTop:"20px",
                        }}
                        >
                            <Avatar 
                            style={{
                                marginLeft:"120px",
                                color:"green",
                                marginTop:"1px"
                            }} /><br />
                            <Typography style={{
                                fontSize:"1.5rem",
                                marginTop:"-15px",
                                color:"aqua",
                                fontWeight:"bold"
                            }}>
                                <h4 style={{color:"#fff",marginLeft:"-120px", fontSize:"0.8rem"}}>Name</h4>
                                <Typography sx={{marginLeft:"-120px", fontSize:"1.3rem"}}>
                                    {
                                        user.nomUsers
                                    }
                                </Typography>
                                    {"   "}<br />
                                <Stack sx={{
                                    marginTop:"15px",
                                    marginLeft:"30px",
                                    color:"teal",
                                    userSelect:"none",
                                    justifyContent:"center"
                                }}>
                                    <h4 style={{color:"#fff",marginLeft:"-150px", fontSize:"0.8rem"}}>Email</h4>

                                    {
                                        user.AddresseUsers
                                    }
                                </Stack>
                            </Typography>
                        </Stack>
                    </Typography>
        </h2><br />
        <Link to="/" style={{marginLeft:"10px"}}><Button  color="secondary" variant="outlined">Retour à l'acceuil</Button></Link>
        
    </>
  
}
