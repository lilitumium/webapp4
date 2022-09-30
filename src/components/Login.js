import { CssBaseline } from '@material-ui/core'
import React, { useState } from 'react'
import SignUp from './SignUp'
import ViewLogin from './viewLogin'


const Login = () => {
  const [autenting, setAutenting] = useState(true)
	return (
		<>
		<CssBaseline />
			{autenting ? (
				<SignUp autenting={autenting} setAutenting={setAutenting} />
			) : (
				<ViewLogin autenting={autenting} setAutenting={setAutenting} />
			)}
		</>
	)
}

export default Login
