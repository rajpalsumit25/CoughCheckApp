import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
// import i18n from 'i18n-js'
import {
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	Button,
	StyleSheet,
	View,
	KeyboardAvoidingView,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { useAuthContext } from '../../../../globalState/AuthContext'

export const SignupForm = (props) => {
	const passwordInput = React.useRef(null)
	const { dispatch } = useAuthContext()

	return (
		<KeyboardAvoidingView behavior={'position'}>
			<Formik
				initialValues={{ email: '', password: '', check: false }}
				validationSchema={Yup.object({
					email: Yup.string().email('Invalid Email').required('Required'),
					password: Yup.string().required('Required'),
					check: Yup.string().required('Required').oneOf([true]),
				})}
				onSubmit={(values, formikActions) => {
					setTimeout(() => {
						Alert.alert(JSON.stringify(values))
						// Important: Make sure to setSubmitting to false so our loading indicator
						// goes away.
						formikActions.setSubmitting(false)
					}, 500)
				}}
			>
				{(props) => (
					<View>
						<TextInput
							onChangeText={props.handleChange('email')}
							onBlur={props.handleBlur('email')}
							value={props.values.email}
							// autoFocus
							placeholder="Email Address"
							style={styles.input}
							onSubmitEditing={() => {
								passwordInput.current.focus()
							}}
						/>
						{props.touched.email && props.errors.email ? (
							<Text style={styles.error}>{props.errors.email}</Text>
						) : null}
						<TextInput
							onChangeText={props.handleChange('password')}
							onBlur={props.handleBlur('password')}
							value={props.values.password}
							placeholder="Password"
							secureTextEntry={true}
							style={styles.input}
							ref={passwordInput}
						/>
						{props.touched.password && props.errors.password ? (
							<Text style={styles.error}>{props.errors.password}</Text>
						) : null}
						<TouchableOpacity
							// onPress={props.handleSubmit}           This is the syntax from Formik. Temporarily replaced with a function to Bypass Auth.
							onPress={() => {
								dispatch({
									type: 'SIGN_IN',
									token: 'TODO_SAVE_HERE_ANY_DATA_USEFUL_FOR_FUTURE_CALLS',
								})
							}}
							accessibilityLabel="Submit button"
						>
							<View style={styles.signupButton}>
								<Text style={styles.signupButtonText}>Sign Up</Text>
							</View>
						</TouchableOpacity>

						<CheckBox
							containerStyle={styles.checkboxContainer}
							wrapperStyle={styles.checkboxWrapper}
							checkedIcon="check-box"
							iconType="material"
							uncheckedIcon="check-box-outline-blank"
							title="Check to agree to our terms and conditions"
							checkedTitle="I agree to our terms and conditions"
							checked={props.values.check}
							onPress={() => props.setFieldValue('check', !props.values.check)}
						/>
					</View>
				)}
			</Formik>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	error: {
		marginBottom: 13,
		marginLeft: 8,
		fontSize: 14,
		color: 'red',
		fontWeight: 'bold',
	},
	input: {
		height: 50,
		paddingHorizontal: 8,
		width: '100%',
		borderColor: '#ededed',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#fff',
		marginBottom: 10,
	},
	signupButton: {
		backgroundColor: '#126FEE',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginBottom: 10,
	},
	signupButtonText: {
		color: 'white',
		padding: 20,
		fontSize: 20,
	},
	checkboxContainer: {
		backgroundColor: 'white',
		margin: 0,
		paddingVertical: 0,
		paddingRight: 10,
		marginLeft: 0,
		marginRight: 0,
	},
	checkboxWrapper: {
		margin: 0,
		height: 50,
	},
})
