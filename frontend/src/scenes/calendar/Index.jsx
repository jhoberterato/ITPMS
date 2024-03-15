import React from 'react'
import { useParams } from 'react-router-dom'
import PC from "./pc/Index"
import Printer from "./printer/Index"

const Index = () => {
    const {cat} = useParams()

    return (
       <>
            {
                cat === "pc" ? <PC /> : <Printer />
            }
       </>
    )
}

export default Index