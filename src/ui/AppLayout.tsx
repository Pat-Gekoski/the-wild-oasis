import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'
import styled from 'styled-components'

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
	overflow: auto;
`

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 26rem 1fr;
	height: 100vh;
`

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<SideBar />
			<Main>
				<Container>
					<Outlet></Outlet>
				</Container>
			</Main>
		</StyledAppLayout>
	)
}

export default AppLayout
