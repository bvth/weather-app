import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {toast} from "react-toastify";

const useStyles = makeStyles({
	subtitle: {
		fontSize: "inherit"
	}
});

export default function WeatherCard(props) {
	const classes = useStyles();
	const [data, setData] = useState({
		current: {},
		location: {}
	});
	const [isLoading, setLoadingState] = useState(true);
	useEffect(() => {
		let url = "http://api.weatherapi.com/v1/current.json?key=&q=" + props.cityName + "&aqi=" + (props.aiq ? "yes" : "no");
		axios.get(url)
			.then(
				res => {
					setData(res.data);
					setLoadingState(false);
				},
				err => {
					console.error(err);
					setLoadingState(false);
					toast.error("Failed to fetch weather data for " + props.cityName);
				}
			);
	}, []);

	const {current, location} = data;

	return (
		<Card>
			{isLoading ? <CircularProgress/>
				: <CardActionArea onClick={() => {
					toast.info(props.cityName);
				}}>
					<CardContent>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography variant="h5" component="h2">
									{props.cityName}
								</Typography>
								<Typography variant="h1" component="h2">
									{Math.round(current.temp_c)}&#8451;
								</Typography>
								<Typography gutterBottom variant="h5">
									Feels like {Math.round(current.feelslike_c)}&#8451;
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography className={classes.subtitle} variant={"subtitle1"} component={"span"}
											gutterBottom>
									Updated: {current.last_updated}
								</Typography>
								<Typography>
									Humidity: {current.humidity}%
								</Typography>
								<Typography>
									Wind: {current.wind_kph}km/h - {current.wind_dir}
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</CardActionArea>
			}
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