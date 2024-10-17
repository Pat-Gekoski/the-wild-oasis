import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useDeleteCabin() {
	const queryClient = useQueryClient()

	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationKey: ['deleteCabin'],
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
			toast.success('Cabin deleted')
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return {
		isDeleting,
		deleteCabin,
	}
}
