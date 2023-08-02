import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useLazyGetMeQuery } from '../store/api/userApi'
import { useTypedSelector } from '../hooks/useTypedSelector';
interface PrivateRouteProps {
  role: "ADMIN"|"USER"
}
function PrivateRoute( { role }: PrivateRouteProps ): JSX.Element {
  const [trigger,{isLoading}] = useLazyGetMeQuery();
  const location = useLocation();
  const user = useTypedSelector(state => state.userState.user);
  useEffect(() =>{
    trigger(Date.now());
  },[location])
  return (
    isLoading || !user
    ?
    <div>Loading</div>
    : user.role == role ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default PrivateRoute