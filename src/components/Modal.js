import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './modal.css'

function PortalModal({ children, onClick }) {
  const modal = (
    <div className='modal'>
      <div className='modal-content-container'>
        <div className='modal-close' onClick={onClick}>
          <Close />
        </div>
        {children}
      </div>
    </div>
  )
  return createPortal(modal, document.body)
}

export default function Modal({ isOpen, children }) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    function handleKeys(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeys)

    return () => document.removeEventListener('keydown', handleKeys)
  }, [])

  const handleOpen = () => setOpen(!open)

  return (
    <CSSTransition in={open} classNames='modal' unmountOnExit timeout={300}>
      <PortalModal onClick={handleOpen}>{children}</PortalModal>
    </CSSTransition>
  )
}

const Close = () => (
  <svg
    height='30px'
    id='Layer_1'
    version='1.1'
    viewBox='0 0 512 512'
    width='30px'
    fill='white'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
  </svg>
)
