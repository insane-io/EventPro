import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import {MyContext} from "./Context/MyContext"
import Permissiondenied from "./Pages/Permissiondenied"

const Roles = () => {

  const { user } = useContext(MyContext)
  return (
    <div>
      { user === "principal" || user === "hod" || user === "mentor" || user === "committee" ? <Outlet /> : <Permissiondenied />}
    </div>
  )
}

export default Roles
