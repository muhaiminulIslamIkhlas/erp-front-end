import React from 'react'
import './header.scss'

interface HeaderProps{
    text: string;
    Tag: 'h3' | 'h4' | 'h5' | 'h1' | 'h2';
}

 const Header:React.FC<HeaderProps> = ({text,Tag}) => {
  return (
    <Tag className='a-header'>{text}</Tag>
  )
}

export default Header;
