'use client'

import { useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'

type ActionStyle = 'booking' | 'treatment'
type MenuItem = { href: string; label: string }

function ButtonFace({ children }: { children: ReactNode }) {
  return <>
    <span className="clinic-booking-metal" aria-hidden="true" />
    <span className="clinic-booking-face">{children}<span aria-hidden="true">↗</span></span>
  </>
}

export function ClinicAction({ children, className, variant = 'booking', ...props }:
  ComponentPropsWithoutRef<'a'> & { variant?: ActionStyle }) {
  return (
    <a {...props} className={['clinic-action', 'clinic-action--' + variant, className].filter(Boolean).join(' ')}>
      {variant === 'booking' ? <ButtonFace>{children}</ButtonFace> : children}
    </a>
  )
}

export function ClinicSubmit({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
  return <button {...props} type="submit" className="clinic-action clinic-action--booking"><ButtonFace>{children}</ButtonFace></button>
}

export function ClinicHeader({ label, links }: { label: string; links: readonly MenuItem[] }) {
  const menu = useRef<HTMLDialogElement>(null)
  const menuId = useId()
  const [open, setOpen] = useState(false)

  function showMenu() {
    menu.current?.showModal()
    setOpen(true)
    menu.current?.querySelector<HTMLAnchorElement>('nav a')?.focus()
  }

  return (
    <header className="clinic-header">
      <a className="clinic-wordmark" href="#inicio">{label}</a>
      <button className="clinic-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={open} aria-controls={menuId} onClick={showMenu}>
        <span aria-hidden="true" /><span aria-hidden="true" />
      </button>
      <dialog ref={menu} id={menuId} className="clinic-nav" aria-label="Menu principal" onClose={() => setOpen(false)}>
        <div className="clinic-nav-header">
          <a className="clinic-wordmark" href="#inicio" onClick={() => menu.current?.close()}>{label}</a>
          <button className="clinic-menu-toggle clinic-menu-close" type="button" aria-label="Fechar menu" onClick={() => menu.current?.close()}>
            <span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
        <nav className="clinic-nav-links" aria-label="Navegação principal">
          {links.map(({ href, label: text }) => <a key={href} href={href} onClick={() => menu.current?.close()}>{text}</a>)}
        </nav>
      </dialog>
    </header>
  )
}

export function ClinicHero({ treatment, title, description, media, mediaCredit, appointment, treatmentHref, afterActions, className }:
  {
    treatment: string
    title: ReactNode
    description?: ReactNode
    media: ReactNode
    mediaCredit?: string
    appointment: ReactNode
    treatmentHref: string
    afterActions?: ReactNode
    className?: string
  }) {
  return (
    <section className={['clinic-hero', className].filter(Boolean).join(' ')} id="inicio" aria-labelledby="hero-title">
      <div className="clinic-opening" aria-hidden="true">
        <span className="clinic-opening-panel clinic-opening-panel--top" />
        <span className="clinic-opening-panel clinic-opening-panel--bottom" />
        <span className="clinic-opening-title">{treatment}</span>
      </div>
      <figure className="clinic-hero-figure">
        <div className="clinic-hero-frame">
          <div className="clinic-hero-scene">{media}</div>
          <span className="clinic-hero-shade" aria-hidden="true" />
          <span className="clinic-hero-glass" aria-hidden="true">{treatment}</span>
        </div>
        {mediaCredit && <figcaption>{mediaCredit}</figcaption>}
      </figure>
      <div className="clinic-hero-copy">
        <h1 id="hero-title"><span className="clinic-sr-only">{treatment}. </span>{title}</h1>
        {description && <p>{description}</p>}
        <div className="clinic-actions" id="contato-inicial">
          {appointment}
          <ClinicAction href={treatmentHref} variant="treatment">Conhecer o tratamento</ClinicAction>
        </div>
        <small>Dra. Priscilla Martelli · CRO 121952</small>
        {afterActions}
      </div>
    </section>
  )
}

export function ClinicTreatmentCard({ title, description, image, href, appointment }: {
  title: string
  description: string
  image: ReactNode
  href: string
  appointment: ReactNode
}) {
  const titleId = useId()
  return (
    <article className="clinic-treatment-card" aria-labelledby={titleId}>
      <div className="clinic-treatment-photo">{image}</div>
      <div className="clinic-treatment-copy">
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
        <div className="clinic-actions">
          {appointment}
          <ClinicAction href={href} variant="treatment">Saiba mais</ClinicAction>
        </div>
      </div>
    </article>
  )
}
