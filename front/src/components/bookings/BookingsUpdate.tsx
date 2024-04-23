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
import { Address } from "cluster";
  
  export const AddressUpdate = () => {
    const navigate = useNavigate();
  
    const { id } = useParams();
    const [address, setAddresses] = useState({
      country: "",
      county: "",
      city: "",
      additional_info:"",
    });
  
    useEffect(() => {
      const fetchClientUpdate = async () => {
        const response = await fetch(`${BACKEND_API_URL}/bookings/${id}/edit`);
        const address = await response.json();
        setAddresses(address);
        console.log(address);
      };
      fetchClientUpdate();
    }, [id]);
  
    const updateAddress = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      try {
        await axios.put(`${BACKEND_API_URL}/bookings/${id}/edit`, address);
        //await axios.put(`../../api/car/${busRouteId}`, busroute);
        //navigate(`/car/${busRouteId}/`);
        navigate("/bookings");
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
              to={`/bookings/${id}/details`}
            >
              <ArrowBackIcon />
            </IconButton>{" "}
            <form onSubmit={updateAddress}>
            <TextField label="Country" variant="standard" defaultValue={address.country} onChange={(event)=>{
                        address.country = event.target.value;
                        setAddresses(address);
                    }}/>
                    <br></br>
                    <TextField label ="Country" variant="standard" defaultValue={address.county} onChange={(event)=>{
                        address.county = event.target.value;
                        setAddresses(address);
                    }}/>
                    <br></br>
                    <TextField label="City" variant="standard" defaultValue={address.city} onChange={(event)=>{
                        address.city = event.target.value;
                        setAddresses(address);
                    }}/>
                    <br></br>
                    <TextField label="Additional information" variant="standard" defaultValue={address.additional_info} onChange={(event)=>{
                        address.additional_info = event.target.value
                        setAddresses(address);
                    }} />
  
              <Button type="submit">Update Booking</Button>
            </form>
          </CardContent>
  
          <CardActions>
           
          </CardActions>
  
        </Card>
      </Container>
    );
  };