import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckIn() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast = {} }: { bookingId: string; breakfast?: any }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`)
			queryClient.invalidateQueries() // passing no args here will invalidate all queries in the cache
			navigate('/')
		},
		onError: () => {
			toast.error(`There was an error while checking in`)
		},
	})

	return {
		checkin,
		isCheckingIn,
	}
}
