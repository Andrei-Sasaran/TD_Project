import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    TextField,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import axios from "axios";
  import { GlobalURL } from "../../main";
  import { BACKEND_API_URL } from "../../constants";
import { Clients } from "../../models/Client";
  
  export const ClientUpdate = () => {
    const navigate = useNavigate();
  
    const { id } = useParams();
    const [client, setClients] = useState({
      phoneNR: "",
      email_address: "",
      dateOfBirth: "",
      addressID: 0,
      fname: "",
      lname:"",
    });
  
    useEffect(() => {
      const fetchClientUpdate = async () => {
        const response = await fetch(`${BACKEND_API_URL}/clients/${id}/edit`);
        //const response = await fetch(`../../api/car/${busRouteId}`);
        const client = await response.json();
        setClients(client);
        console.log(client);
      };
      fetchClientUpdate();
    }, [id]);
  
    const updateClient = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.put(`${BACKEND_API_URL}/clients/${id}/edit`, client);
        //await axios.put(`../../api/car/${busRouteId}`, busroute);
        //navigate(`/car/${busRouteId}/`);
        navigate("/clients");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
        <Card>
          <CardContent>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/clients`}
            >
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateClient}>
            <TextField label="Phone Number" variant="standard" defaultValue={client.phoneNR} onChange={(event)=>{
                        client.phoneNR = event.target.value;
                        setClients(client);
                    }}/>
                    <br></br>
                    <TextField label="Email Address" variant="standard" defaultValue={client.email_address} onChange={(event)=>{
                        client.email_address = event.target.value;
                        setClients(client);
                    }}/>
                    <br></br>
                    <TextField label="Date Of Birth" variant="standard" defaultValue={client.dateOfBirth} onChange={(event)=>{
                        client.dateOfBirth = event.target.value;
                        setClients(client);
                    }}/>
                    <br></br>
                    <TextField type="number" label="Address Id" variant="standard" defaultValue={client.addressID} onChange={(event)=>{
                        client.addressID = parseInt(event.target.value)
                        setClients(client);
                    }} />
                    <br></br>
                    <TextField label="First Name" variant="standard" defaultValue={client.fname} onChange={(event)=>{
                        client.fname = event.target.value
                        setClients(client);
                    }} />
                    <TextField label="Last Name" variant="standard" defaultValue={client.lname} onChange={(event)=>{
                        client.lname = event.target.value
                        setClients(client);
                    }} />
  
              <Button type="submit">Update Client</Button>
            </form>
          </CardContent>
  
          <CardActions>
           
          </CardActions>
  
        </Card>
      </Container>
    );
  };