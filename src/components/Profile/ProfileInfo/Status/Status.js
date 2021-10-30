import React from "react";
import s from './Status.module.css';


class Status extends React.Component {
	state = {
		editMode: false,
		status: this.props.status
	}

	enableEditMode = () => {
		this.setState({
			editMode: true
		});
	}

	disableEditMode = () => {
		this.setState({
			editMode: false
		});
		this.props.updateStatus(this.state.status);
	}

	onStatusChange = (e) => {
		this.setState({
			status: e.target.value
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			});
		}
	}

	render() {
		return (
			<div className={s.status}>
				{
					this.state.editMode
						? <input
							onBlur={this.disableEditMode}
							autoFocus={true}
							type="text"
							value={this.state.status}
							onChange={e => this.onStatusChange(e)}
						/>
						: <span onDoubleClick={this.enableEditMode}>{this.props.status}</span>
				}
			</div>
		);
	}
}

export default Status;