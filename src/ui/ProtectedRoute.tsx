import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`

function ProtectedRoute({ children }: any) {
	const navigate = useNavigate()
	const { isAuthenticated, isLoading, fetchStatus } = useUser()

	const queryClient = useQueryClient()

	useEffect(() => {
		if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching') {
			navigate('/login')
		}

	}, [isAuthenticated, isLoading, navigate, fetchStatus, queryClient])

	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		)
	}

	if (isAuthenticated) return children
}

export default ProtectedRoute