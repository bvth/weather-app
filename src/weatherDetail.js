import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {toast} from "react-toastify";
import {Line} from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmpty from "lodash/isEmpty";

export default function WeatherDetail(props) {
	const [forecast, setForecastData] = useState({});

	useEffect(() => {
		let url = "http://api.weatherapi.com/v1/forecast.json?key=bb25a52770c547b2be1225411210104&q=" + props.city + "&days=7&aqi=no&alerts=yes";
		axios.get(url)
			.then(
				res => {
					const {forecastday} = res.data.forecast;
					let labels = [];
					let data = [];
					forecastday.forEach(day => {
						day.hour.forEach(time => {
							labels.push(time.time);
							data.push({x: time.time, y: time.temp_c});
						});
					});
					setForecastData({
						labels: labels,
						fill: false,
						datasets: [{
							data: data,
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1
						}]
					});
				},
				err => {
					console.error(err);
					toast.error("Failed to load weather forecast for city ", props.city);
				}
			);
	}, [props.city]);

	return <Grid container justify={"center"} spacing={2}>
		<h1>{props.city}</h1>
		{isEmpty(forecast) ?
			<CircularProgress/>
			: <Line
				data={forecast}
				options={{
					legend: {
						display: false
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								displayFormats: {
									hour: "hh:ss",
									day: "DD MMM	"
								}
							}
						}]
					}
				}}
			/>
		}
	</Grid>;
}
WeatherDetail.propTypes = {
	city: PropTypes.string.isRequired
};
