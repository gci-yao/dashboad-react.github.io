import React, { useEffect } from 'react'
import { Stack, TextField, Box , Button} from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {uesEffect} from 'react';
import { useMutation, useQueryClient } from 'react-query';



export default function AjouterPub() {
    const {handleSubmit,reset, register, watch, formState: {errors}} = useForm();
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    const queryClient = useQueryClient();
    // const [image, setImage] = useState(0);

    // const handleImageChange = (event)=>{
    //     const file = event.target.files[0];
    //     if(file){
    //         const reader = new FileReader();
    //         reader.onloadend = () =>{
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // }
    // accept="image/*"
    //  onChange={handleImageChange}
    const mutation = useMutation({
        mutationFn: (pubs) =>{
            return axios.post("http://localhost:3000/Pub",pubs)
        },
        onerror: (error) =>{
            toast.error("une erreur est survenue !");
        },
        onSuccess :(succ) =>{
            reset();
            queryClient.invalidateQueries("Pub");
            toast.success("Envoyez !");
        }
            
    })
    const onSubmit = (data)=>{
        const pub = {
            ...data,
            idUsers: user.id,
            datePub: new Date(),
            likePub:false,
            auteur:user.nomUsers,
        };
        mutation.mutate(pub);
        //     axios.post("http://localhost:3000/Pub", pub)
        //     .then((res)=>{
        //             toast.success("Publication envoyé !");
        //             reset();
                
        //     })
    
        //     .catch((err)=>{
        //     toast.error("Une erreur est survenue !");
        // });
    };

  return (
   
    <Stack
       gap={"20px"} width={"60%"} margin={"auto"}
    >
        <h2 style={{
            marginTop:"4rem",
            color:"blue",
            userSelect:"none",
        }}>Ajouter une publication</h2>
        <Box width={"100%"}
        >
          
            <form  
             style={{gap:"20px", borderBottom:"20px",}}
            className="box"
            onSubmit={handleSubmit(onSubmit)}
            >
                <Stack gap={"4px"}>
                    <TextField
                        id="filled-basic"
                        label="Ajoutez une description"
                        variant="filled"
                        fullWidth
                        size="small"
                        type="text"
                        multiline
                        rows={4}
                        {...register("usersPub", {required:  "Veuillez saisir une publication svp ! ", maxLength: {value:200, message:"Ne depasser pas 200 caractères svp"}})}
                    />
                    <TextField
                        id="filled-basic"
                        label="Saisissez l'url de votre image svp !"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="text"
                        
                        style={{ marginTop:"7px"}}
                        {...register("urlImage", {required: "Saisissez l'url de votre image svp ! ", maxLength: {value: 200, message:"Ne depasser pas 200 caractères svp !"}})}
                    />
                    <Button style={{borderBottom:"20px", marginTop:"10px"}} type="submit"  variant="contained">Publier</Button>
                </Stack>
            </form>
        </Box>
    </Stack>
   
  )
}
