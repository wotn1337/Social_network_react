import React, {useEffect, useState} from "react";
import s from './Status.module.css';

type propsType = {
	status: string,
	updateStatus: (status: string) => Promise<void>,
	isOwner: boolean
}

const StatusHook: React.FC<propsType> = ({isOwner, ...props}) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => setStatus(props.status), [props.status]);

	const updateStatus = () => {
		props.updateStatus(status)
			.then(() => setEditMode(false));
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
				: <span onDoubleClick={isOwner ? () => setEditMode(true) : undefined}>{props.status}</span>
			}
		</div>
	);
}

export default StatusHook;