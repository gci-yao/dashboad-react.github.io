import { Stack,Box, Typography,Button, TextField } from '@mui/material'
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Inscription() {
  const Navigate = useNavigate();
  const {handleSubmit,register, watch, formState: {errors} } = useForm();
  const onSubmit = (data) =>{
    if (data.motDePasseUsers !== data.motDePasseConfirmation){
      toast.error("Mot de passe incorrect! ");
    }else{
      axios.get(`http://localhost:3000/utilisateur?AddresseUsers=${data.AddresseUsers}`).
      then((res)=>{
          if(res.data.length > 0){
            toast.error("Cet email existe déjà !");
          }else{

            axios.post("http://localhost:3000/utilisateur", data)
            .then((res) => {
              toast.success("Inscription reussie !");
              Navigate("/connexion");
            })
            .catch((err) => {
                toast.error("une erreur est survenu !");
            });
          }
      })
    };
  };
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
                Inscription
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
                label="Veuilez saisir votre nom" 
                variant="filled" {...register("nomUsers", {required : "Veuillez entrez un nom svp",
                  minLenght:{value:3, message:"Saisissez un nom de d'aumoins 04 caractères svp ! "}
                 })} />
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
                <TextField 
                fullWidth
                size="small"
                id="filled-basic"
                label="Veuilez confirmer votre de passe svp" 
                variant="outlined" 
                type="password"
                {...register("motDePasseConfirmation", {required: "veuillez saisir un mot de passe", minLenght:{
                  value:8, message:"Confirmer votre mot de passe svp" 
                }})}
                />
              </Stack><br />
              <Button
              sx={{
                marginTop:2,

              }}
              type="submit"
               variant="contained"
               >Inscription</Button>
               <Typography marginTop={4}>
                 Connectez-vous {"    "}
                  <Link to="/connexion" variant="contained">Connexion</Link>
                </Typography>
            </form>
          </Box>
        </Stack>
      </div>
    </>
  )
}
