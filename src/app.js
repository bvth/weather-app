import React, {useState, useEffect} from "react";
import "./styles/app.css";
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./errorBoundary";
import WeatherForm from "./weatherForm";
import WeatherDetail from "./weatherDetail";
import CrashingButton from "./CrashingButton";

const useStyles = makeStyles(() => ({
	root: {
		height: "100%",
		width: "100%",
		marginTop: "15px"
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
	const [city, setCity] = useState("");

	return (
		<div>
			<ErrorBoundary>
				<AppBar position="static">
					<Toolbar>
						<CrashingButton/>
						<Typography variant="h6">
							React weather app
						</Typography>
					</Toolbar>
				</AppBar>
				<Container className={classes.root}>
					<WeatherForm setSelection={setCity}/>
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
