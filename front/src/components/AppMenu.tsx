import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CarRentalIcon from '@mui/icons-material/CarRental';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { blue, pink, purple, red } from "@mui/material/colors";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" sx={{ backgroundColor: "#e6a8b2",marginBottom: "40px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SchoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Car rental center
					</Typography>
					<Button
						variant={path.startsWith("/cars") ? "outlined" : "text"}
						to="/cars"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<NoCrashIcon sx={{ color: red[500] }}/>}>
						Cars
					</Button>
                    <Button
						variant={path.startsWith("/cars/statistics") ? "outlined" : "text"}
						to="/cars/statistics"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<CarRentalIcon sx={{ color: purple[500] }}/>}>
						Statistics
					</Button>
					<Button
						variant={path.startsWith("/clients") ? "outlined" : "text"}
						to="/clients"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PeopleAltIcon sx={{ color: blue[900] }}/>}>
						Clients
					</Button>
                    <Button
						variant={path.startsWith("/clients/statistics") ? "outlined" : "text"}
						to="/clients/statistics"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<SwitchAccountIcon sx={{ color: pink[900] }}/>}>
						Statistics
					</Button>

					<Button
						variant={path.startsWith("/addresses") ? "outlined" : "text"}
						to="/addresses"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<HomeTwoToneIcon sx={{ color: blue[500] }}/>}>
						Addresses
					</Button>

					<Button
						variant={path.startsWith("/bookings") ? "outlined" : "text"}
						to="/bookings"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<AssignmentIcon sx={{ color: pink[500] }} />}>
						Booking Details
					</Button>

				</Toolbar>
			</AppBar>
		</Box>
	);
};