import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import {MyContext} from "./Context/MyContext"
import Permissiondenied from "./Pages/Permissiondenied"

const Roles = () => {

  const { user } = useContext(MyContext)
  return (
    <div>
      { user === "Principal" || user === "HOD" || user === "Mentor" || user === "Committee" ? <Outlet /> : <Permissiondenied />}
    </div>
  )
}

export default Roles
