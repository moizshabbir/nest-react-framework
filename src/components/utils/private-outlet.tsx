import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { store } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import { useEffect } from 'react'


export function PrivateOutlet() {
  const login = useAppSelector(state => state.login)
  const location = useLocation()
    console.log("on Redirect", login.value);
  useEffect(() => {
    console.log("In Use Effect ", login.value);
  }, [login.value]);

  return login.value.access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}