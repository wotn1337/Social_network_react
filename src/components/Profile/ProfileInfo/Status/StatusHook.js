import React, {useEffect, useState} from "react";
import s from './Status.module.css';

const StatusHook = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);
	useEffect(() => setStatus(props.status), [props.status]);
	const updateStatus = () => {
		setEditMode(false);
		props.updateStatus(status);
	}
	return (
		<div className={s.status}>
			{editMode
				? <input
					onBlur={updateStatus}
					autoFocus={true}
					type="text"
					value={status}
					onChange={e => setStatus(e.target.value)}
					placeholder={'Enter your status'}
				/>
				: <span onDoubleClick={props.isOwner ? () => setEditMode(true) : undefined}>{props.status}</span>
			}
		</div>
	);
}

export default StatusHook;