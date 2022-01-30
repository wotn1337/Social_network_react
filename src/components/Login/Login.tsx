import React from "react";
import {Form, Formik, Field, ErrorMessage} from "formik";
import s from './Login.module.css';
import {requiredField} from "../../utils/validators/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {initialStateType, login} from "../../redux/authReducer";
import {Redirect, withRouter} from "react-router-dom";

type propsType = {
	captchaUrl: string | null
	login: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: (messages: any) => void) => void,
	isAuth: boolean
}

const LoginForm = (props: propsType) => {
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberMe: false,
				captcha: ''
			}}
			onSubmit={(values, {setStatus}) => {
				alert('!!!!')
				props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
			}}
			validate={(values) => {
				const errors = {
					email: undefined,
					password: undefined
				};
				const emailErr = requiredField(values.email);
				const passErr = requiredField(values.password);
				if (emailErr) {
					// @ts-ignore
					errors.email = emailErr;
				}
				if (passErr) {
					// @ts-ignore
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
					{props.captchaUrl &&
						<>
							<div>
								<img src={props.captchaUrl} alt="captcha"/>
							</div>
							<div>
								<label htmlFor={'captcha'}>Captcha</label>
								<Field type={'text'} name={'captcha'} id={'captcha'}/>
							</div>
						</>
					}
					<button type={'submit'} className={s.btn}>Login</button>
				</Form>
			)}
		</Formik>
	);
};

const Login = (props: propsType) => {
	if (props.isAuth) {
		return <Redirect to={'/profile'}/>;
	}
	return (
		<>
			<h1>Login</h1>
			<div className={s.loginPage}>
				<LoginForm {...props}/>
			</div>
		</>
	);
};
type stateType = { auth: initialStateType }
const mapStateToProps = (state: stateType) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
});


export default compose(
	connect(mapStateToProps, { login }),
	withRouter
)(Login);


