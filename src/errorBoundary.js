import React from "react";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		console.error("ERROR", error, errorInfo);
	}

	render() {
		return this.state.hasError ?
			<h1>Something went wrong</h1>
			: this.props.children;
	}
}