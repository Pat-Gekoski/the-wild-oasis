import { createContext, ReactElement, ReactNode, useContext, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

interface StyledListProps {
	$position: { x: number; y: number }
}

const Menu = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`

const StyledList = styled.ul<StyledListProps>`
	/* position: fixed; */
	position: absolute;
	z-index: 1;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.$position.x}px;
	top: ${(props) => props.$position.y}px;
`

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`
interface ToggleProps {
	id: string
}

const MenusContext = createContext<any>(null)
function Menus({ children }: any) {
	const [openId, setOpenId] = useState('')
	const [position, setPosition] = useState(null)
	const open = setOpenId
	const close = () => setOpenId('')

	return <MenusContext.Provider value={{ openId, open, close, position, setPosition }}>{children}</MenusContext.Provider>
}

function Toggle({ id }: ToggleProps) {
	const { openId, open, close, setPosition } = useContext(MenusContext)

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation()
		const rect = (e.target as HTMLElement).closest('button')?.getBoundingClientRect()

		setPosition({
			x: 0,
			y: rect!.height,
		})

		openId === '' || openId !== id ? open(id) : close()
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	)
}

function List({ id, children }: { id: string; children: ReactNode }) {
	const { openId, position, close } = useContext(MenusContext)
	const { ref } = useOutsideClick<HTMLUListElement>(() => {
		close()
	}, false)

	if (openId !== id) return null

	return (
		<StyledList ref={ref} $position={position}>
			{children}
		</StyledList>
	)
}

function Button({
	children,
	icon,
	onClick,
	disabled = false,
}: {
	children: ReactNode
	icon: ReactElement
	onClick?: () => void | undefined
	disabled?: boolean
}) {
	const { close } = useContext(MenusContext)

	function handleClick() {
		onClick?.()
		close()
	}
	return (
		<li>
			<StyledButton onClick={handleClick} disabled={disabled}>
				{icon} <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
			</StyledButton>
		</li>
	)
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
