import React from 'react'
import {useSelector} from 'react-redux'

import Logged from "./home/logged"
import Regular from "./home/regular"

export default function Home() {
    const user = useSelector(state => state?.auth?.authData)
    
    return (
        <div> 
           {user && user?.token ?  <Logged/> : <Regular/>}
        </div>
    )
}
