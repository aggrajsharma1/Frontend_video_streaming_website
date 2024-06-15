import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function hide(isMenuOpen, setIsMenuOpen) {
    if (isMenuOpen) {
        const menu = document.querySelector(".header")
        menu.style.position = "absolute"
        menu.style.top = "-100%"
        setIsMenuOpen(!isMenuOpen)
    } else {
        const menu = document.querySelector(".header")
        menu.style.position = "static"
        setIsMenuOpen(!isMenuOpen)
    }
}

function MenuButton() {

    const [isMenuOpen, setIsMenuOpen] = useState(true)
    return (
        <div onClick={() => hide(isMenuOpen, setIsMenuOpen)} className='text-white text-3xl'>
            {
                isMenuOpen ? <IoClose /> : <IoMdMenu />
            }
        </div>
    )
}

export default MenuButton