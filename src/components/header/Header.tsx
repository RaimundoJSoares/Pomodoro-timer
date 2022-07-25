/* eslint-disable prettier/prettier */
import { HeaderStyles } from './HeaderStyles'
import Logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderStyles>
      <span><img src={Logo} alt="logo" /> </span>
      <nav>
        <NavLink to="/" title="Timer"> <Timer size={24}/> </NavLink>
        <NavLink to="/history" title="Histórico"> <Scroll size={24}/>  </NavLink>
      </nav>
    </HeaderStyles>
  )
}
