import Enlace from './Enlace.jsx'

export default function Logo() {
  return (
    <Enlace a="inicio" className="brand">
      <img src="./img/logo.svg" alt="Logotipo de AnonimaX" width="32" height="32" />
      <span>Anonima<span>X</span></span>
    </Enlace>
  )
}
