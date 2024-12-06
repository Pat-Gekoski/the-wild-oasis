import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from '../data/Uploader'

const StyledSideBar = styled.aside`
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	overflow: auto;

	grid-row: 1 / -1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`

function SideBar() {
	return (
		<StyledSideBar>
			<Logo />
			<MainNav />
			{process.env.NODE_ENV === 'development' && <Uploader />}
		</StyledSideBar>
	)
}

export default SideBar
