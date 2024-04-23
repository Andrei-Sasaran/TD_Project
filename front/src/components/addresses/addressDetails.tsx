import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";



import { Address } from "../../models/Address";
import { GlobalURL } from "../../main";
import { ClientsDTO } from "../../models/ClientsDTO";

export const AddressDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [address, setAddresses] = useState<Address>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
		setLoading(true)
        const fetchAddress = async () => {
          try {
            
            const response = await fetch(`${BACKEND_API_URL}/addresses/${id}/details`);
            const data = await response.json();
            setAddresses(data);
			setLoading(false);
            console.log(`Address id: ${data.address_id}`);
          } catch (error) {
            console.error(`Failed to fetch address with ID ${id}:`, error);
          }
        };
        fetchAddress();
      }, [id]);

      return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Address Details</h1>
					<p>Address country: {address?.country}</p>
					<p>Address county: {address?.county}</p>
					<p>Address city : {address?.city}</p>
					<p>Address additional_info : {address?.additional_info}</p>
				</CardContent>

				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/pets/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/pets/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			<p>The clients assigned</p>
            {!loading &&!address?.clientList&& <p> No clients </p>}
            {!loading&& address?.clientList &&(
                
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
						<TableCell>#</TableCell>
                      <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Details</TableCell>
					  
                          <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Phone number</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Email address</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date of birth</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>First name</TableCell>
                          <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Last name</TableCell>

                      </TableRow>
						</TableHead>
						<TableBody>
                            
							{address?.clientList.map((client: ClientsDTO, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">
										{ index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/clients/${client.idClient}/details`} title="View client details">
											{client.fname}
										</Link>
									</TableCell>
									
									<TableCell align="center">{client.phoneNR}</TableCell>
									<TableCell align="center">{client.email_address}</TableCell>
									<TableCell align="center">{client.dateOfBirth}</TableCell>
									<TableCell align="center">{client.fname}</TableCell>
									<TableCell align="center">{client.lname}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/clients/${client.idClient}/details`}>
											<Tooltip title="View client details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.idClient}/edit`} title="Edit client details">
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/clients/${client.idClient}/delete`} title="Delete client">
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

            )}

				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};