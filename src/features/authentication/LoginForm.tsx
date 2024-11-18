import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
	const [email, setEmail] = useState("PatricGekoski@pm.me");
	const [password, setPassword] = useState("Valiscool$1");
	const { login, isLoading } = useLogin()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!email || !password) {
			return
		}
		login({ email, password }, {
			onSettled: () => {
				setEmail('')
				setPassword('')
			}
		})
	}

	return (
		<Form type="regular" onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button disabled={isLoading} $size="large">{!isLoading ? 'Login' : <SpinnerMini />}</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
