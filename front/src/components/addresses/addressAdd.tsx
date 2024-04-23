import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


import { Clients } from "../../models/Client";
import { GlobalURL } from "../../main";
import { Address } from "../../models/Address";

export const AddressAdd = () => {
	const navigate = useNavigate();

	const [address, setAddresses] = useState<Address>({
        address_id:0,
        country : "",
        county : "",
        city : "",
        additional_info : "",
		clientList : [],
    });

	// State variables for input field errors
	const [countryError, setCountryError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [countyError, setCountyError] = useState(false);

	const addAddress = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// Check for input field errors
		if (address.country === "") {
			setCountryError(true);
			return;
			// Return to prevent submission if there is an error
		}
		if (address.city === "") {
			setCityError(true);
			return;
		}
		if (address.county === "") {
			setCountyError(true);
			return;
		}
		try {
			await axios.post(`${BACKEND_API_URL}/addresses/add`, address);
			navigate("/addresses");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/addresses`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addAddress}>
						<TextField
							id="country"
							label="Country"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={countryError}
							helperText={countryError ? "Country cannot be empty" : ""}
							onChange={(event) => {
								setAddresses({ ...address, country: event.target.value });
								setCountryError(false);
							}}
						/>
						<TextField
							id="county"
							label="County"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={countyError}
							helperText={countyError ? "County cannot be empty" : ""}
							onChange={(event) => {
								setAddresses({ ...address, county: event.target.value });
								setCountryError(false);
							}}
						/>

                        <TextField
							id="city"
							label="City"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={cityError}
							helperText={cityError ? "City cannot be empty" : ""}
							onChange={(event) => {
								setAddresses({ ...address, city: event.target.value });
								setCityError(false);
							}}
						/>
						<TextField
							id="additional_info"
							label="Additional Informations "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAddresses({ ...address, additional_info: event.target.value })}
						/>
						<Button type="submit">Add Address</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};