import React, {useState, useEffect} from "react";
import "./styles/app.css";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./errorBoundary";
import WeatherCard from "./weatherCard";
import WeatherDetail from "./weatherDetail";

const useStyles = makeStyles(() => ({
	root: {
		height: "100%",
		width: "100%"
	},
	container: {
		paddingTop: 10,
		paddingBottom: 10,
		flexGrow: 1
	},
	paper: {
		height: 250,
		width: "100%"
	}
}));

function App() {
	const classes = useStyles();
	const [city, setCity] = useState("Espoo");

	useEffect(() => {
		console.log(city);
	}, [city]);

	return (
		<div>
			<ErrorBoundary>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6">
							React weather app
						</Typography>
					</Toolbar>
				</AppBar>
				<Container className={classes.root}>
					<Grid container justify="center" className={classes.container} spacing={2}>
						<Grid item md>
							<WeatherCard cityName={"Ho_Chi_Minh"} aiq={true} setSelection={setCity}/>
						</Grid>
						<Grid item md>
							<WeatherCard cityName={"Helsinki"} setSelection={setCity}/>
						</Grid>
						<Grid item md>
							<WeatherCard cityName={"Espoo"} setSelection={setCity}/>
						</Grid>
					</Grid>
					{city && <WeatherDetail city={city}/>}
				</Container>
				<ToastContainer
					autoClose={3000}
					position={toast.POSITION.TOP_RIGHT}
					pauseOnFocusLoss={true}
					closeButton={false}/>
			</ErrorBoundary>
		</div>
	);
}

export default App;
