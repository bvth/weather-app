import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {toast} from "react-toastify";
import WeatherCard from "./weatherCard";

export default function WeatherForm(props) {
	const [data, setData] = useState({
		current: {},
		location: {}
	});
	const [cityInput, setCity] = useState("Helsinki");
	const [isLoading, setLoadingState] = useState(true);

	const fetchWeatherData = city => {
		setLoadingState(true);
		props.setSelection(city);
		let cityName = city.split(" ").join("_");
		let url = "http://api.weatherapi.com/v1/current.json?key=bb25a52770c547b2be1225411210104&q=" + cityName + "&aqi=" + (props.aiq ? "yes" : "no");
		axios.get(url)
			.then(
				res => {
					setData(res.data);
					setLoadingState(false);
					toast.success("Fetched data for " + cityName);
				},
				err => {
					console.error(err);
					setLoadingState(false);
					toast.error("Failed to fetch weather data for " + cityName);
				}
			);
	};

	useEffect(() => {
		fetchWeatherData(cityInput);
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={5}>
				<WeatherCard isLoading={isLoading} data={data}/>
			</Grid>
			<Grid item xs={3}>
				{/**
					waiting for material-ui to support offset
				 */}
			</Grid>
			<Grid item xs={4}>
				<form onSubmit={e => {
					e.preventDefault();
					fetchWeatherData(cityInput);
				}}>
					<TextField required id="standard-required" label="City name" value={cityInput} onChange={e => {
						setCity(e.target.value);
					}}/>
					<Button variant="contained" color="primary" type={"submit"}>Submit</Button>
				</form>
			</Grid>
		</Grid>
	);
}

WeatherForm.propTypes = {
	aiq: PropTypes.bool, //air quality
	setSelection: PropTypes.func
};

WeatherForm.defaultProps = {
	aiq: false
};