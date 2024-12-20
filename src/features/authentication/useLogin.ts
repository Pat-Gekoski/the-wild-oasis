import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useLogin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: login, isPending: isLoading } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) => loginApi({ email, password }),
		onSuccess: ({ user }) => {
			queryClient.setQueryData(['user'], user)
			navigate('/dashboard', { replace: true })
		},
		onError: (err) => {
			console.error('ERROR: ', err)
			toast.error('Provided email or password is incorrect.')
		},
	})

	return {
		login,
		isLoading,
	}
}
