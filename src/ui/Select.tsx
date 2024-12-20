import { ChangeEvent } from 'react'
import styled from 'styled-components'

interface SelectProps {
	options: Array<{ value: any; label: string }>
	type: string
	onChange: (e: ChangeEvent<HTMLSelectElement>) => any
	value: any
}

const StyledSelect = styled.select<any>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid ${(props) => (props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`

function Select({ options, value, ...props }: SelectProps) {
	return (
		<StyledSelect value={value} {...props}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	)
}

export default Select
