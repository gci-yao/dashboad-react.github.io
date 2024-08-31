import { Stack,Box, Typography,Button, TextField } from '@mui/material'
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Connexinon() {
  const Navigate = useNavigate();
  const {handleSubmit, register, reset,watch, formState: {errors} } = useForm();
  useEffect(()=>{
    if(localStorage.getItem("utilisateur")){
      Navigate("/");
    }
  })
  const onSubmit = (data) =>{
      axios.get(`http://localhost:3000/utilisateur?AddresseUsers=${data.AddresseUsers}&motDePasseUsers=${data.motDePasseUsers}`)
      .then((res)=>{
        if(res.data.length > 0){
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          toast.success("Connexion reussie !");
          Navigate("/");
        }else{
          toast.error("Les Identifiants ne sont pas correctes !");
        }
      })
    }

            
  return (
    <>
      <div>
        <Stack
         alignItems={"center"}
         justifyContent={"center"}
         height={"100vh"}width={"100%"}
         BackgroundColor={"#f5f5f5"}
         >
          <Box width={500}sx={{
            backgroundColor:"#fff",
            padding:3,
          }}>
            <Typography variant="h4">
                Connexion
            </Typography>
            <form 
            style={{
              marginTop:4,
            }}
            onSubmit={handleSubmit(onSubmit)}
            action="" >
              <Stack direction={"column"}
              gap={2}
              >
                 <TextField 
                fullWidth
                size="small"
                id="filled-basic" 
                label="Veuilez saisir votre adresse mail svp" 
                variant="filled"
                type="email"
                {...register("AddresseUsers", {required : "Veuillez entrez un nom svp",
                 pattern:"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/",
               })} />
                <TextField 
                fullWidth
                size="small"
                id="filled-basic"
                label="Veuilez saisir un mot de passe " 
                variant="filled" 
                type="password"
                {...register("motDePasseUsers", {required: "veuillez saisir un mot de passe", minLenght:{
                  value:8, message:"Saisissez un mot de passe d'aumoins 08 caractères svp"
                }})}
                />
              </Stack><br />
              <Button
              sx={{
                marginTop:2,
              }}
              type="submit"
               variant="contained"
               >Connexion</Button>
               
                <Typography marginTop={4}>
                 Créer un compte {"    "}
                  <Link to="/inscription" variant="contained">Inscription</Link>
                </Typography>
            </form>
          </Box>
        </Stack>
      </div>
    </>
  )
}
