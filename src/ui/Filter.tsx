import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface FilterProps {
	filterField: string
	options: Array<{ value: string; label: string }>
}
interface FilterButtonProps {
	$active: boolean
}

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`

const FilterButton = styled.button<FilterButtonProps>`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`

function Filter({ filterField, options }: FilterProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentFilter = searchParams.get(filterField) || options[0].value

	function handleClick(value: string) {
		searchParams.set(filterField, value)
		if (searchParams.get('page')) {
			searchParams.set('page', '1');
		}
		setSearchParams(searchParams)
	}

	return (
		<StyledFilter>
			{options.map((option) => {
				return (
					<FilterButton
						key={option.value}
						onClick={() => handleClick(option.value)}
						$active={currentFilter === option.value}
						disabled={currentFilter === option.value}
					>
						{option.label}
					</FilterButton>
				)
			})}
		</StyledFilter>
	)
}

export default Filter
