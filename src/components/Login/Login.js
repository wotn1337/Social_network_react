import React from "react";
import {Form, Formik, Field, ErrorMessage} from "formik";
import s from './Login.module.css';
import {requiredField} from "../../utils/validators/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect, withRouter} from "react-router-dom";


const LoginForm = (props) => {
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: false
			}}
			onSubmit={(values, {setStatus}) => {
				props.login(values.email, values.password, values.rememberMe, setStatus)
			}}
			validate={(values) => {
				const errors = {};
				const emailErr = requiredField(values.email);
				const passErr = requiredField(values.password);
				if (emailErr) {
					errors.email = emailErr;
				}
				if (passErr) {
					errors.password = passErr;
				}
				return errors;
			}}
		>
			{({status}) => (
				<Form className={s.form}>
					<div className={s.summaryError}>{status}</div>
					<div className={s.inputGroup}>
						<label htmlFor={'email'}>Login</label>
						<Field type={'email'} component={'input'} name={'email'} placeholder={'Email'} id={'email'}/>
					</div>
					<ErrorMessage name={'email'} className={s.validationMessage} component={'div'}/>
					<div className={s.inputGroup}>
						<label htmlFor={'password'}>Password</label>
						<Field type={'password'} name={'password'} placeholder={'Password'} id={'password'}/>
					</div>
					<ErrorMessage name={'password'} className={s.validationMessage} component={'div'}/>
					<div>
						<Field type={'checkbox'} name={'rememberMe'} id={'rememberMe'}/>
						<label htmlFor={'rememberMe'}>Remember me</label>
					</div>
					<button type={'submit'} className={s.btn}>Login</button>
				</Form>
			)}
		</Formik>
	);
};

const Login = (props) => {
	if (props.isAuth) {
		return <Redirect to={'/profile'}/>;
	}
	return (
		<>
			<h1>Login</h1>
			<div className={s.loginPage}>
				<LoginForm login={props.login}/>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
});


export default compose(
	connect(mapStateToProps, {
		login
	}),
	withRouter
)(Login);


