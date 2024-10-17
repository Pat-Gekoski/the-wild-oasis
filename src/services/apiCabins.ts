import { Cabin } from '../features/cabins/cabin.model'
import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		throw new Error(`Cabins could not be loaded.`)
	}

	return data
}

export async function deleteCabin(cabinId: string) {
	const { error, data } = await supabase.from('cabins').delete().eq('id', cabinId)

	if (error) {
		throw new Error(`Could not delete cabin with id: ${cabinId}`)
	}

	return data
}

export async function createEditCabin(newCabin: any, id?: string) {
	const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace(/\//g, '')
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	const cabinData: Cabin = {
		name: newCabin.name,
		maxCapacity: newCabin.maxCapacity,
		regularPrice: newCabin.regularPrice,
		description: newCabin.description,
		image: imagePath,
	}

	if (newCabin.discount) cabinData.discount = newCabin.discount

	let query

	if (!id) {
		query = supabase.from('cabins').insert([cabinData])
	} else {
		query = supabase
			.from('cabins')
			.update({ ...cabinData })
			.eq('id', id)
	}

	const { data, error } = await query.select().single()

	if (error) {
		throw new Error(`Could not create cabin`)
	}

	if (hasImagePath) return data

	const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image, {
		cacheControl: '3600',
		upsert: false,
	})

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id)
		console.error(storageError)
		throw new Error(`Cabin image could not be uploaded so the cabin was not created`)
	}

	return data
}
