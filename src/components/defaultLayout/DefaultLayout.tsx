/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom'
import { Header } from '../header/Header'
import { LayoutContainer } from './DefaultLayoutStyles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
