import React from 'react'
interface PrivateRouteProps{
    role: string
}
function PrivateRoute({role}:PrivateRouteProps) : JSX.Element {
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute