import React from 'react';
import {Formik, Field, Form} from "formik";
//import s from './EditingProfile.module.css';


const EditingProfile = ({profile, handleSubmit}) => {
	const contacts = [];
	for (const name in profile.contacts) {
		contacts.push(<Contact name={name} key={name}/>);
	}
	return (
		<Formik
			initialValues={{
				userId: profile.userId,
				fullName: profile.fullName,
				lookingForAJob: profile.lookingForAJob,
				lookingForAJobDescription: profile.lookingForAJobDescription || '',
				contacts: profile.contacts,
				aboutMe: profile.aboutMe || '',
			}}
			onSubmit={values => handleSubmit(values)}
		>
			<Form>
				<div>
					<label htmlFor='fullName'>Full name: </label>
					<Field name="fullName" id='fullName' type="text" required/>
				</div>
				<div>
					<label htmlFor='lookingForAJob'>Looking for a job: </label>
					<Field name="lookingForAJob" id='lookingForAJob' type="checkbox" />
				</div>
				<div>
					<label htmlFor='lookingForAJobDescription'>Looking for a job description: </label>
					<textarea name="lookingForAJobDescription" id='lookingForAJobDescription'/>
				</div>
				<div>
					<label htmlFor='aboutMe'>About Me: </label>
					<textarea name="aboutMe" id='aboutMe'/>
				</div>
				{contacts}
				<button type="submit">Save</button>
			</Form>
		</Formik>
	);
};

const Contact = ({name}) => {
	return (
		<div>
			<label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}: </label>
			<Field name={'contacts.' + name} id={name} type="text" />
		</div>
	);
}

export default EditingProfile;