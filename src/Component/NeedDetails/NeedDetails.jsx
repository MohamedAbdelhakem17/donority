import React from 'react'
import useGetOneItem from '../../Context/ItemDetails/ItemDetailsContext'

export default function NeedDetails() {
    const { details } = useGetOneItem()
    console.log(details)
    return (
        <div>NeedDetails</div>
    )
}
