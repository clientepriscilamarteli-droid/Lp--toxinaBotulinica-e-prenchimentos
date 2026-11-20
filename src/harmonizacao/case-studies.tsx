import { useRef, useState, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { appointmentHref } from '../clinic'
import { Appointment } from './landing-sections'
import { CircularTestimonials } from '../components/ui/circular-testimonials'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const cases = [
  {
    id: 'frontal',
    title: 'O rosto visto como um conjunto.',
    region: 'Visão frontal',
    procedure: 'Preenchimento facial',
    context: 'As fotografias de frente permitem observar as proporções do rosto por inteiro, com atenção ao contorno e à relação entre as regiões.',
    observation: 'Compare o conjunto do rosto. A posição e a iluminação também influenciam a leitura das fotografias.',
    before: '/martelli/frontal-antes.jpg',
    after: '/martelli/frontal-depois.jpg',
    original: '/martelli/registros/frontal-original.jpg',
    position: '50% 50%',
  },
  {
    id: 'toxina',
    title: 'A expressão entre as sobrancelhas.',
    region: 'Glabela',
    procedure: 'Toxina botulínica',
    context: 'Registro do rosto ao franzir a testa. O comparativo permite observar as linhas entre as sobrancelhas durante essa expressão.',
    observation: 'Observe a região central e a expressão das sobrancelhas nos dois registros.',
    before: '/martelli/toxina-antes.jpg',
    after: '/martelli/toxina-depois.jpg',
    original: '/martelli/registros/toxina-original.jpg',
    position: '50% 25%',
  },
  {
    id: 'labial',
    title: 'Contorno e volume dos lábios.',
    region: 'Detalhe labial',
    procedure: 'Preenchimento labial',
    context: 'Este registro foi fotografado em detalhe para mostrar os lábios. O enquadramento original está preservado nas duas imagens.',
    observation: 'Percorra o contorno e observe as proporções do lábio superior e inferior.',
    before: '/martelli/labial-antes.jpg',
    after: '/martelli/labial-depois.jpg',
    original: '/martelli/registros/labial-original.jpg',
    position: '50% 45%',
  },
  {
    id: 'perfil',
    title: 'Proporções vistas de perfil.',
    region: 'Perfil facial',
    procedure: 'Preenchimento facial',
    context: 'Registro de perfil enviado na pasta de preenchimentos. As fotografias mostram as proporções do rosto nessa perspectiva.',
    observation: 'Observe o perfil como um conjunto, considerando a diferença de posição entre as fotografias.',
    before: '/martelli/perfil-antes.jpg',
    after: '/martelli/perfil-depois.jpg',
    original: '/martelli/registros/perfil-original.jpg',
    position: '50% 32%',
  },
  {
    id: 'perfil-suave',
    title: 'Um outro olhar para o contorno.',
    region: 'Contorno de perfil',
    procedure: 'Preenchimento facial',
    context: 'Um segundo caso de perfil, para observar como o planejamento considera proporções diferentes em cada pessoa.',
    observation: 'Observe o contorno completo. Maquiagem, posição e iluminação diferem entre os registros.',
    before: '/martelli/perfil-suave-antes.jpg',
    after: '/martelli/perfil-suave-depois.jpg',
    original: '/martelli/registros/perfil-suave-original.jpg',
    position: '50% 50%',
  },
]

type ClinicalCase = (typeof cases)[number]

function CaseStudySlider({ clinicalCase }: { clinicalCase: ClinicalCase }) {
  const [position, setPosition] = useState(50)
  return <div className="scroll-comparison" style={{ '--case-position': position + '%' } as CSSProperties}>
    <img src={clinicalCase.after} alt={'Depois · ' + clinicalCase.region} />
    <div className="scroll-comparison-before"><img src={clinicalCase.before} alt={'Antes · ' + clinicalCase.region} /></div>
    <div className="scroll-divider" aria-hidden="true"><span>↔</span></div>
    <input type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} aria-label="Comparar antes e depois" aria-valuetext={position + '% da foto anterior visível'} />
    <span className="scroll-photo-label">Antes</span><span className="scroll-photo-label after">Depois</span>
  </div>
}

export function ClinicalCaseStudies() {
  const section = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const [selected, setSelected] = useState(0)
  const [comparison, setComparison] = useState(false)
  const clinicalCase = cases[selected]

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      trigger.current = ScrollTrigger.create({
        trigger: section.current, start: 'top top', end: 'bottom bottom', toggleClass: 'is-active',
        onUpdate: self => setSelected(Math.min(cases.length - 1, Math.floor(self.progress * cases.length))),
      })
      return () => { trigger.current = null }
    })
    return () => media.revert()
  }, { scope: section })

  function chooseCase(index: number) {
    setComparison(false)
    if (trigger.current) {
      const scroll = trigger.current
      window.scrollTo({ top: scroll.start + (scroll.end - scroll.start) * ((index + .35) / cases.length), behavior: 'auto' })
    }
    setSelected(index)
  }

  return <section ref={section} className="results-scroll" id="resultados" aria-labelledby="results-title">
    <div className="results-sticky">
      <div className="wrap results-canvas">
        <header className="results-intro"><div><h2 id="results-title">Cada rosto,<br /><em>um planejamento.</em></h2></div><p className="results-scroll-hint">Role para conhecer os casos <span aria-hidden="true">↓</span></p></header>
        <div className="results-scene">
          <div className="results-caption" aria-live="polite" aria-atomic="true">
            <span className="results-case-number">0{selected + 1} <i /> {clinicalCase.procedure}</span>
            <h3>{clinicalCase.region}.</h3>
            <p>{clinicalCase.id === 'labial' ? 'Contorno e volume em um registro de detalhe labial.' : clinicalCase.title}</p>
            <details key={clinicalCase.id}><summary>Sobre este registro <span aria-hidden="true">+</span></summary><p>{clinicalCase.context}</p></details>
            <Appointment href={appointmentHref(clinicalCase.procedure)}>Planejar meu cuidado</Appointment>
          </div>
          <div className="results-photo-area">
            <div className="results-photo" ref={photo}>
              {comparison ? <CaseStudySlider key={clinicalCase.id} clinicalCase={clinicalCase} /> : <CircularTestimonials activeIndex={selected} onSelect={chooseCase} images={cases.map(item => ({ id: item.id, src: item.original, alt: 'Antes e depois completos · ' + item.region, label: item.region }))} />}
            </div>
            <div className="results-photo-toolbar"><button type="button" aria-pressed={comparison} onClick={() => setComparison(!comparison)}>{comparison ? 'Ver fotos lado a lado' : 'Comparar arrastando'} <span aria-hidden="true">↔</span></button><a href={clinicalCase.original} target="_blank" rel="noreferrer">Ampliar ↗</a></div>
          </div>
        </div>
        <div className="results-bottom"><nav className="results-progress" aria-label="Escolher caso clínico">{cases.map((item,index) => <button type="button" key={item.id} onClick={() => chooseCase(index)} aria-current={selected === index ? 'step' : undefined} aria-label={'Ver caso ' + (index + 1) + ', ' + item.region}><span>0{index + 1}</span><i /></button>)}</nav><div className="results-arrows"><button type="button" aria-label="Caso anterior" onClick={() => chooseCase((selected + cases.length - 1) % cases.length)}>←</button><span>{selected + 1} / {cases.length}</span><button type="button" aria-label="Próximo caso" onClick={() => chooseCase((selected + 1) % cases.length)}>→</button></div></div>
        <p className="results-disclosure">Dra. Priscilla Martelli · CRO 121952. Resultados individuais. Expressão e iluminação podem variar.</p>
      </div>
    </div>
  </section>
}
