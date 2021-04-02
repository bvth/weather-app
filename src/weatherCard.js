import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {toast} from "react-toastify";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	}
});

export default function WeatherCard(props) {
	const classes = useStyles();
	const [data, setData] = useState({
		current: {},
		location: {}
	});
	const [alert, setAlert] = useState(false);
	useEffect(() => {
		let url = "http://api.weatherapi.com/v1/current.json?key= &q=" + props.cityName + "&aqi=" + (props.aiq ? "yes" : "no");
		axios.get(url)
			.then(
				res => {
					setData(res.data);
				},
				err => {
					console.error(err);
					toast.error("Failed to fetch weather data for " + props.cityName);
				}
			);
	}, []);

	const {current, location} = data;

	return (
		<Card className={classes.root}>
			<CardActionArea onClick={() => {
				toast.info(props.cityName);
			}}>
				<CardContent>
					<Typography variant="h5" component="h2">
						{props.cityName}
					</Typography>
					<Typography variant="h1" component="h2">
						{current.temp_c}&#8451;
					</Typography>
					<Typography gutterBottom variant="h5">
						Feels like {current.feelslike_c}&#8451;
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

WeatherCard.propTypes = {
	cityName: PropTypes.string.isRequired,
	aiq: PropTypes.bool //air quality
};

WeatherCard.defaultProps = {
	aiq: false
};