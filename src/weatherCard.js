import React from "react";
import PropTypes from "prop-types";

import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
	subtitle: {
		fontSize: "inherit"
	}
});

export default function WeatherCard(props) {
	const classes = useStyles();

	const {current, location} = props.data;

	return <Card>
		{props.isLoading ? <div style={{
				display: "flex",
				justifyContent: "center",
				padding: "15px 0"
			}}>
				<CircularProgress/>
			</div>
			: <CardActionArea>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant="h5" component="h2">
								{location.name}
							</Typography>
							<Typography variant="h1" component="h2">
								{Math.round(current.temp_c)}&#8451;
							</Typography>
							<Typography gutterBottom variant="h5">
								Feels like {Math.round(current.feelslike_c)}&#8451;
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography className={classes.subtitle} variant={"subtitle1"}
										component={"span"}
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
	</Card>;

}

WeatherCard.propTypes = {
	data: PropTypes.object.isRequired
};