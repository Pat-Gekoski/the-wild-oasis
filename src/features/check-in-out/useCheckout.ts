import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useCheckOut() {
	const queryClient = useQueryClient()

	const { mutate: checkout, isPending: isCheckingOut } = useMutation({
		mutationFn: ({ bookingId }: { bookingId: string }) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`)
			queryClient.invalidateQueries() // passing no args here will invalidate all queries in the cache
		},
		onError: () => {
			toast.error(`There was an error while checking in`)
		},
	})

	return {
		checkout,
		isCheckingOut,
	}
}
