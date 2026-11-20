import { type CSSProperties } from 'react'
import './circular-testimonials.css'

export interface CircularImage {
  id: string
  src: string
  alt: string
  label: string
}

interface CircularTestimonialsProps {
  images: CircularImage[]
  activeIndex: number
  onSelect: (index: number) => void
}

/** Controlled image stack, adapted from the supplied CircularTestimonials reference.
 * Scroll progress and accessible navigation share the same active case.
 * Full clinical records use contain rather than the reference's cover crop.
 */
export function CircularTestimonials({ images, activeIndex, onSelect }: CircularTestimonialsProps) {
  if (!images.length) return null
  return <div className="circular-clinical-images" role="group" aria-label="Registros dos casos clínicos em camadas">
    {images.map((image, index) => {
      const left = index === (activeIndex - 1 + images.length) % images.length
      const right = index === (activeIndex + 1) % images.length
      const active = index === activeIndex
      const position = active ? 'active' : left ? 'previous' : right ? 'next' : 'hidden'
      return <button key={image.id} type="button" className="circular-clinical-image" data-position={position}
        tabIndex={active || (!left && !right) ? -1 : 0}
        aria-hidden={position === 'hidden' ? true : undefined}
        aria-label={active ? 'Caso atual, ' + image.label : 'Ver caso ' + (index + 1) + ', ' + image.label}
        aria-current={active ? 'true' : undefined}
        disabled={active}
        onClick={() => onSelect(index)}
        style={{ '--image-order': index } as CSSProperties}>
        <img src={image.src} alt={active ? image.alt : ''} width="1400" height="1400" loading={active || left || right ? 'eager' : 'lazy'} />
        <span className="circular-case-label">0{index + 1} · {image.label}</span>
      </button>
    })}
  </div>
}
