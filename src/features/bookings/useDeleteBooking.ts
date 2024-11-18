import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useDeleteBooking() {
	const queryClient = useQueryClient()

	const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
		mutationKey: ['deleteBooking'],
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			})
			toast.success('Booking deleted')
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return {
		isDeleting,
		deleteBooking,
	}
}
