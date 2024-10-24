import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { Cabin } from './cabin.model'
import FormRow from '../../ui/FormRow'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

interface CreateCabinFormProps {
	cabinToEdit?: any
	onCloseModal?: () => void
}

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }: CreateCabinFormProps) {
	const { id: editId, ...editValues } = cabinToEdit
	const isEditSession = Boolean(editId)

	const { register, handleSubmit, reset, getValues, formState } = useForm<Cabin>({
		defaultValues: isEditSession ? editValues : {},
	})
	const { errors } = formState

	const { isCreating, createCabin } = useCreateCabin()
	const { isEditing, editCabin } = useEditCabin()

	const isWorking = isCreating || isEditing

	function onSubmit(data: any) {
		const image = typeof data.image === 'string' ? data.image : data.image[0]
		if (isEditSession) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data: any) => {
						reset()
						onCloseModal?.()
					},
				},
			)
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			createCabin(
				{ ...data, image },
				{
					onSuccess: (data: any) => {
						reset()
						onCloseModal?.()
					},
				},
			)
		}
	}

	function onError(error: any) {
		console.log(error)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Cabin Name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at leat 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular Price' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) => {
							console.log('value: ', value)
							return (value && value <= getValues().regularPrice) || 'Discount should be less than the regular price.'
						},
					})}
				/>
			</FormRow>

			<FormRow label='Description for Website' error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin Photo'>
				<FileInput
					id='image'
					accept='image/*'
					disabled={isWorking}
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button onClick={() => onCloseModal?.()} $variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create New Cabin'}</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
