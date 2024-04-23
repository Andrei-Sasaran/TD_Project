import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";


import { Clients } from "../../models/Client";
import { GlobalURL } from "../../main";
import { ClientsDTO } from "../../models/ClientsDTO";
import { ClientDTOWIthCarsIds } from "../../models/ClienDTOWIthCarsIDs";

export const ClientDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [client, setClients] = useState<ClientsDTO>();

    useEffect(() => {
        const fetchClient = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/clients/${id}/details`);
            const data = await response.json();
            setClients(data);
            console.log(`Client id: ${data.idClient}`);
            
          } catch (error) {
            console.error(`Failed to fetch client with ID ${id}:`, error);
          }
        };
        fetchClient();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Client Details</h1>
					<p>Client phone number: {client?.phoneNR}</p>
					<p>Client email address: {client?.email_address}</p>
					<p>Client date of birth : {client?.dateOfBirth}</p>
                    <p>Client address id assigned : {client?.addressID}</p>
                    <p>Client first name : {client?.fname}</p>
					<p>Client last name : {client?.lname}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};