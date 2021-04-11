import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import {toast} from "react-toastify";
import {Line} from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function WeatherDetail(props) {
	const [forecast, setForecastData] = useState({});
	const [isLoading, setLoadingState] = useState(true);
	useEffect(() => {
		let url = "http://api.weatherapi.com/v1/forecast.json?key=bb25a52770c547b2be1225411210104&q=" + props.city + "&days=3&aqi=no&alerts=yes";
		setLoadingState(true);
		axios.get(url)
			.then(
				res => {
					const {forecastday} = res.data.forecast;
					let labels = [];
					let data = [];
					forecastday.forEach(day => {
						day.hour.forEach(time => {
							labels.push(time.time);
							data.push({
								x: time.time,
								y: time.temp_c,
								wind: time.wind_kph,
								feelslike: time.feelslike_c
							});
						});
					});
					setForecastData({
						labels: labels,
						datasets: [{
							fill: false,
							pointHoverBackgroundColor: "#fff",
							pointHoverRadius: 6,
							pointBackgroundColor: "rgb(0,161,96)",
							data: data,
							borderColor: "rgb(0,161,96)",
							tension: 0.1
						}]
					});
					setLoadingState(false);
				},
				err => {
					console.error(err);
					toast.error("Failed to load weather forecast for city ", props.city);
					setLoadingState(false);
				}
			);
	}, [props.city]);

	return <>
		<Grid container justify={"center"} spacing={2}>
			<h1>{props.city}</h1>
		</Grid>
		<Grid container justify={"center"} spacing={2}>
			{isLoading ?
				<CircularProgress/>
				: <div style={{height: "500px", width: "100%", position: "relative"}}>
					<Line
						data={forecast}
						options={{
							tooltips: {
								callbacks: {
									label: (item, data) => {
										console.log(item, data);
										let detail = data.datasets[0].data[item.index];
										return `Temp: ${detail.y}\nFeels like: ${detail.feelslike}\nWind speed: ${detail.wind}`;
									}
								}
							},
							maintainAspectRatio: false,
							legend: {
								display: false
							},
							scales: {
								yAxes: [{
									scaleLabel: {
										labelString: "Temperature",
										display: true
									},
									ticks: {
										callback: (value, index, values) => {
											return value + "\u2103";
										}
									}
								}],
								xAxes: [{
									scaleLabel: {
										labelString: "Time",
										display: true
									},
									type: "time",
									time: {
										displayFormats: {
											hour: "hA"
										}
									},
									ticks: {
										callback: (value, index, values) => {
											if (value !== "12AM")
												return value;
											else {
												let timestamp = values[index].value;
												return new Date(timestamp).toLocaleDateString("fi-FI");
											}
										}
									}
								}]
							}
						}}
					/>
				</div>
			}
		</Grid>
	</>;
}
WeatherDetail.propTypes = {
	city: PropTypes.string.isRequired
};
