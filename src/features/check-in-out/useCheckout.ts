import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export function useCheckOut() {
	const queryClient = useQueryClient()

	const { mutate: checkout, isPending: isCheckingOut } = useMutation({
		mutationFn: ({ bookingId }: any) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`)
			queryClient.invalidateQueries() // passing no args here will invalidate all queries in the cache
		},
		onError: (err) => {
			console.log(err)
			toast.error(`There was an error while checking out`)
		},
	})

	return {
		checkout,
		isCheckingOut,
	}
}
