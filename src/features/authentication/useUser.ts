import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

export function useUser() {
	const {
		data: user,
		isPending: isLoading,
		fetchStatus,
	} = useQuery<any>({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	return {
		user,
		isLoading,
		isAuthenticated: user?.role === 'authenticated',
		fetchStatus,
	}
}
