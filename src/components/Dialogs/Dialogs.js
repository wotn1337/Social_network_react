import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Form, Formik, Field} from "formik";

const NewMessageForm = (props) => {
	return (
		<Formik
			initialValues={{message: ''}}
			onSubmit={values => props.sendMessage(values.message)}
		>
			<Form className={s.new_message_block}>
				<Field component={'textarea'} name={'message'} className={s.new_message}/>
				<button type={'submit'} className={s.button}>Send</button>
			</Form>
		</Formik>
	);
};

const Dialogs = (props) => {
	const dialogsElements = props.dialogs.dialogsData.map(dialog => (
		<DialogItem
			avatar={dialog.avatar}
			name={dialog.name}
			id={dialog.id}
			key={dialog.id}
		/>));

	const messagesElements = props.dialogs.messagesData.map(message => (
		<Message
			isMine={message.isMine}
			message={message.message}
			key={message.id}
		/>));

	const sendMessage = (message) => {
		props.sendMessage(message);
	};

	if (!props.isAuth) {
		return <Redirect to='/login'/>
	}

	return (
		<div className={s.dialogs}>
			<div className={s.items}>
				{dialogsElements}
			</div>
			<div>
				<div className={s.messages}>
					{messagesElements}
				</div>
				<NewMessageForm sendMessage={sendMessage}/>
			</div>
		</div>
	);
};

export default Dialogs;