import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";


import { Car } from "../../models/Car";
import { GlobalURL } from "../../main";

export const CarsAdd = () => {
	const navigate = useNavigate();

	const [car, setCars] = useState<Car>({
		id: 0,
		model: "",
		brand: "",
		color: "",
		year_manufacture: 0,
		nrkilometers: 1,
		description : "",
		bookingDetailsSet : []
	});

	// State variables for input field errors
	const [brandError, setBrandError] = useState(false);
	const [modelError, setModelError] = useState(false);
	const [colorError, setColorError] = useState(false);
	const [yearError, setYearError] = useState(false);
	const [kilometersError, setKilometersError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);

	const addcar = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// Check for input field errors
		if (car.brand === "") {
			setBrandError(true);
			return;
			// Return to prevent submission if there is an error
		}
		if (car.model === "") {
			setModelError(true);
			return;
		}
		if (car.color === "") {
			setColorError(true);
			return;
		}
		if (car.year_manufacture === 0) {
			setYearError(true);
			return;
		}
		if (car.nrkilometers === 1) {
			setKilometersError(true);
			return;
		}
		if (car.description === "") {
			setDescriptionError(true);
			return;
		}
		try {
			await axios.post(`${BACKEND_API_URL}/cars/add`, car);
			navigate("/cars");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/cars`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addcar}>
						<TextField
							id="brand"
							label="Brand"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={brandError}
							helperText={brandError ? "Brand cannot be empty" : ""}
							onChange={(event) => {
								setCars({ ...car, brand: event.target.value });
								setBrandError(false);
							}}
						/>
						<TextField
							id="model"
							label="Model"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={modelError}
							helperText={modelError ? "Model cannot be empty" : ""}
							onChange={(event) => {
								setCars({ ...car, model: event.target.value });
								setModelError(false);
							}}
						/>

                        <TextField
							id="color"
							label="Color"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={colorError}
							helperText={colorError ? "Color cannot be empty" : ""}
							onChange={(event) => {
								setCars({ ...car, color: event.target.value });
								setColorError(false);
							}}
						/>

                        <TextField
							id="year_manufacture"
							label="Year of manufacture "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={yearError}
							helperText={yearError ? "Year cannot be empty" : ""}
							onChange={(event) => {
								setCars({ ...car, year_manufacture: parseInt(event.target.value) });
								setColorError(false);
							}}
						/>

                        <TextField
							id="nrkilometers"
							label="No. of kilometers"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							error={kilometersError}
							helperText={kilometersError ? "Number of kilometers cannot be empty" : ""}
							onChange={(event) => {
								setCars({ ...car, nrkilometers: parseInt(event.target.value) });
								setColorError(false);
							}}
						/>
						<TextField
							id="description"
							label="Description "
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCars({ ...car, description: event.target.value })}
						/>
						<Button type="submit">Add car</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};