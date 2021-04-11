import React from "react";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

export default function CrashingButton(props) {
	// throw Error();
	return <Button onClick={() => {
		throw new Error("Crash test");
	}}>
		<MenuIcon/>
	</Button>;
}