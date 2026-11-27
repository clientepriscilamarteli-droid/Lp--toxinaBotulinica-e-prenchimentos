import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clinic } from '../clinic'
import { Appointment, Arrow, Booking, Brand, appointment } from './landing-sections'
import './page.css'
import { useInstitutionalMotion } from '../hooks/use-institutional-motion'
import { InteractiveExplainer } from './interactive-treatment'
import { ClinicalCaseStudies } from './case-studies'
import './interactive-sections.css'
import './scroll-experience.css'
import { EditorialFacePortrait } from './editorial-face-portrait'
import './editorial-face-map.css'
import './institutional-identity.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">

      <header className="hero-header wrap"><Brand /><span>Jardim Paulista · São Paulo</span></header>
      <figure className="hero-portrait hero-portrait-rose">
        <img src="/retratos/retrato-rose.jpg" alt="Dra. Priscilla Martelli em retrato profissional com blusa rosé" width="616" height="870" fetchPriority="high" />
      </figure>
      <div className="hero-intro">

        <p>Rejuvenesça com naturalidade.<br />Valorize os traços que são seus.</p>
        <small>Uma avaliação atenta à sua expressão, às proporções e ao que você deseja cuidar.</small>
      </div>
      <a className="round-cta" href={appointment} target="_blank" rel="noreferrer"><span>Agendar avaliação <Arrow /></span></a>
      <h1 className="hero-title" id="hero-title">
        <span>Toxina <em>botulínica</em></span>
        <span><em>Preenchimentos</em></span>
      </h1>
      <div className="hero-bottom wrap">
        <a href="#tratamentos">Conheça seu próximo cuidado <span aria-hidden="true">↓</span></a>
        <span>Dra. Priscilla Martelli · Cirurgiã-dentista · CRO 121952</span>
      </div>
    </section>
  )
}

function ConcernSection() {
  return (
    <section className="concern wrap section-space" id="tratamentos" aria-labelledby="concern-title">
      <div className="concern-photo reveal">
        <img src="/martelli/planejamento.jpg" alt="Dra. Priscilla durante o planejamento de um atendimento facial" width="1200" height="1600" loading="lazy" />
        <span>O planejamento começa por você.</span>
      </div>
      <div className="concern-copy reveal">
        <h2 id="concern-title">Expressão leve.<br /><em>Identidade presente.</em></h2>
        <p>Você sorri, se surpreende, franze a testa. As linhas que acompanham esses movimentos fazem parte da expressão.</p>
        <p>Se você gostaria de suavizar algumas delas ou cuidar do volume e dos contornos do rosto, a avaliação ajuda a entender as opções.</p>
        <ul className="concern-list">
          <li>Linhas que se acentuam na testa e entre as sobrancelhas.</li>
          <li>Marcas ao redor dos olhos ao sorrir.</li>
          <li>Desejo de cuidar do contorno dos lábios e das proporções faciais.</li>
        </ul>
        <Appointment />
      </div>
    </section>
  )
}

const regions = [
  { name: 'Testa', x: 50, y: 23, text: 'Linhas horizontais que aparecem ao elevar as sobrancelhas. O planejamento considera também a posição e o movimento das sobrancelhas.' },
  { name: 'Glabela', x: 50, y: 34, text: 'Região entre as sobrancelhas, onde se formam linhas ao franzir a testa. A avaliação observa a atividade dos músculos dessa área.' },
  { name: 'Pés de galinha', x: 76, y: 40, text: 'Linhas nas laterais dos olhos que ficam mais visíveis ao sorrir. A indicação considera seu sorriso e a expressão de cada lado do rosto.' },
]

function InteractiveFaceMap() {
  const [active, setActive] = useState(0)
  const section = useRef<HTMLElement>(null)
  const plane = useRef<HTMLDivElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      trigger.current = ScrollTrigger.create({
        trigger: section.current, start: 'top top', end: 'bottom bottom',
        onUpdate: self => setActive(Math.min(2, Math.floor(self.progress * 3))),
      })
      return () => { trigger.current = null }
    })
    return () => media.revert()
  }, { scope: section })

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const views = [
      { scale: 1.4, xPercent: 0, yPercent: 14 },
      { scale: 1.65, xPercent: 0, yPercent: 12 },
      { scale: 1.85, xPercent: -34, yPercent: 9 },
    ]
    gsap.to(plane.current, { ...views[active], transformOrigin: '50% 35%', duration: 1.05, ease: 'power2.inOut', overwrite: 'auto' })
  }, { scope: section, dependencies: [active] })

  function chooseRegion(index: number) {
    if (trigger.current) {
      const scroll = trigger.current
      window.scrollTo({ top: scroll.start + (scroll.end - scroll.start) * ((index + .35) / 3), behavior: 'auto' })
    }
    setActive(index)
  }

  return (
    <section ref={section} className="face-scroll-section" aria-labelledby="face-title" id="regioes">
      <div className="face-map editorial-face-map face-scroll-stage wrap">
        <div className="face-copy">
          <h2 id="face-title">Um olhar para<br /><em>cada expressão.</em></h2>
          <p>Role para explorar cada região. Você também pode selecionar os pontos na fotografia.</p>
          <div className="region-buttons" role="group" aria-label="Escolher região facial">
            {regions.map(({ name }, index) => <button type="button" key={name} aria-pressed={index === active} onClick={() => chooseRegion(index)}>{name}<span aria-hidden="true">↗</span></button>)}
          </div>
          <div className="region-description" aria-live="polite" aria-atomic="true"><h3>{regions[active].name}</h3><p>{regions[active].text}</p></div>
          <small>Imagem editorial ilustrativa. A escolha dos pontos de aplicação é individual.</small>
          <div className="face-scroll-progress" aria-hidden="true">{regions.map((region,index) => <span key={region.name} data-active={index === active}>0{index + 1}<i /></span>)}<span>Continue rolando ↓</span></div>
        </div>
        <div className="face-visual">
          <div className="face-photo-plane" ref={plane}>
            <EditorialFacePortrait active={active} />
            {regions.map(({ name, x, y }, index) => <button type="button" key={name} className={'face-hotspot' + (index === active ? ' active' : '')} aria-label={'Conhecer região ' + name} aria-pressed={index === active} onClick={() => chooseRegion(index)} style={{ left: x + '%', top: y + '%' }}><span className="editorial-hotspot-dot" aria-hidden="true" /><span className="hotspot-label">{name}</span></button>)}
          </div>
          <div className="editorial-photo-caption" aria-hidden="true"><span>0{active + 1}</span><span>{regions[active].name}</span></div>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const benefits = [
    { title: 'Suavidade na expressão', copy: 'A toxina pode suavizar linhas associadas à contração muscular, com planejamento para o seu rosto.', photo: '/martelli/avaliacao.jpg', alt: 'Dra. Priscilla avaliando o rosto' },
    { title: 'Proporções em equilíbrio', copy: 'O preenchimento permite trabalhar áreas específicas de volume e contorno conforme a indicação.', photo: '/procedimentos/atendimento-facial-martelli.jpg', alt: 'Dra. Priscilla em atendimento facial na clínica' },
    { title: 'Cuidado que acompanha', copy: 'Você recebe orientações para o procedimento e o acompanhamento proposto para o seu plano.', photo: '/retratos/img-1-1.png', alt: 'Dra. Priscilla em retrato na clínica' },
  ]
  return (
    <section className="benefits wrap section-space" aria-labelledby="benefits-title">
      <div className="section-heading reveal"><h2 id="benefits-title">Rejuvenesça com<br /><em>atenção aos seus traços.</em></h2></div>
      <div className="benefits-grid">
        {benefits.map(({ title, copy, photo, alt }) => <article className="benefit reveal" key={title}><img src={photo} alt={alt} loading="lazy" /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
      </div>
    </section>
  )
}

function DoctorSection() {
  return (
    <section className="doctor wrap section-space" aria-labelledby="doctor-title">
      <figure className="doctor-portrait reveal"><img src="/retratos/dra-priscilla.jpg" alt="Dra. Priscilla Martelli" width="617" height="838" loading="lazy" /><figcaption>Cirurgiã-dentista · CRO 121952</figcaption></figure>
      <div className="doctor-copy reveal">
        <h2 id="doctor-title">Dra. Priscilla<br /><em>Martelli.</em></h2>
        <p>O cuidado começa pela escuta. Entender o que você deseja preservar e o que gostaria de tratar orienta a avaliação e a escolha dos recursos.</p>
        <p>Na Martelli Care Clinic, a Dra. Priscilla planeja o atendimento considerando anatomia, expressão, proporções e histórico de procedimentos.</p>
        <ul className="credentials"><li>Graduação em Odontologia pela UNIOESTE.</li><li>Especialização em Harmonização Orofacial pela NEOM.</li><li>Atendimento no Jardim Paulista, em São Paulo.</li></ul>
        <Appointment />
      </div>
    </section>
  )
}

function TreatmentTimeline() {
  const steps = [
    ['Avaliação', 'Sua história, seus objetivos e a expressão do seu rosto em uma conversa atenta.'],
    ['Planejamento', 'Definição das regiões e das opções de tratamento, com explicação dos cuidados e riscos.'],
    ['Aplicação', 'O procedimento é realizado conforme a indicação e o plano discutido na consulta.'],
    ['Acompanhamento', 'Orientações após o atendimento e definição da necessidade de retorno.'],
  ]
  return (
    <section className="timeline-section" aria-labelledby="timeline-title">
      <div className="wrap">
        <div className="section-heading reveal"><h2 id="timeline-title">Cuidado em<br /><em>cada etapa.</em></h2></div>
        <ol className="treatment-timeline">{steps.map(([title, text], index) => <li key={title} className="reveal"><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </div>
    </section>
  )
}

const reviewsUrl = 'https://www.trustindex.io/reviews/doutorapriscillamartelli.com.br'
const reviews = [
  { name: 'Bruna rocha', image: '/martelli/avaliacao-bruna.jpg', date: 'mar. 2025', text: 'O atendimento é sempre personalizado' },
  { name: 'ingrid resende', image: '/martelli/avaliacao-ingrid.jpg', date: 'fev. 2023', text: 'Lugar super aconchegante e sofisticado' },
  { name: 'Mateus Ribeiro', image: '/martelli/avaliacao-mateus.jpg', date: 'fev. 2023', text: 'Ótima estrutura e profissionais.' },
  { name: 'Bruno Souza', image: '/martelli/avaliacao-bruno.jpg', date: 'dez. 2022', text: 'super recomendo!' },
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  return (
    <section className="testimonials wrap section-space" aria-labelledby="reviews-title">
      <div className="review-heading reveal"><div><h2 id="reviews-title">Palavras de<br /><em>quem confia.</em></h2></div><a className="review-rating" href={reviewsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">★★★★★</span><strong>4,6 <small>/ 5</small></strong><span>42 avaliações do Google via Trustindex <Arrow /></span></a></div>
      <div className="review-carousel reveal" role="region" aria-label="Depoimentos de pacientes">
        <article className="review-card" aria-live="polite">
          <div className="review-author"><img src={reviews[current].image} alt={'Foto de perfil de ' + reviews[current].name} width="60" height="60" loading="lazy" /><div><h3>{reviews[current].name}</h3><span>Google · {reviews[current].date}</span></div><span className="review-google" aria-label="Google">G</span></div>
          <span className="review-stars" aria-label="Avaliação de 5 estrelas">★★★★★</span>
          <blockquote>“{reviews[current].text}”<small>Trecho da avaliação pública</small></blockquote>
          <a className="text-link" href={reviewsUrl + '#:~:text=' + encodeURIComponent(reviews[current].text)} target="_blank" rel="noreferrer">Ler avaliação completa <Arrow /></a>
          <div className="review-controls"><button type="button" aria-label="Depoimento anterior" onClick={() => setCurrent((current + reviews.length - 1) % reviews.length)}>←</button><span>{current + 1} / {reviews.length}</span><button type="button" aria-label="Próximo depoimento" onClick={() => setCurrent((current + 1) % reviews.length)}>→</button></div>
        </article>
        <div className="experience-mosaic">
          <figure className="experience-main"><img src="/retratos/clinica-5.png" alt="Dra. Priscilla com uma paciente sorrindo na clínica" width="716" height="888" loading="lazy" /><figcaption>Encontros, cuidado e confiança.</figcaption></figure>
          <figure><img src="/retratos/consultorio-martelli.jpg" alt="Espaço de consulta da Martelli Care Clinic, com poltronas e mesa de atendimento" loading="lazy" /></figure>
          <figure><img src="/procedimentos/tecnologia-em-atendimento.jpg" alt="Dra. Priscilla em atendimento com tecnologia facial" loading="lazy" /></figure>
        </div>
      </div>
      <div className="experience-bottom">
        <div className="review-people" role="group" aria-label="Escolher uma avaliação">{reviews.map((review, index) => <button key={review.name} type="button" onClick={() => setCurrent(index)} aria-pressed={current === index} aria-label={'Ler avaliação de ' + review.name}><img src={review.image} alt="" width="48" height="48" loading="lazy" /><span>{review.name.split(' ')[0]}</span></button>)}</div>
        <p>Histórias de quem passou por aqui.<br /><a className="text-link" href={reviewsUrl} target="_blank" rel="noreferrer">Conheça todas as avaliações <Arrow /></a></p>
      </div>
    </section>
  )
}

const faqs = [
  ['A aplicação dói?', 'As aplicações podem causar desconforto breve. Na consulta, a Dra. Priscilla explica as medidas de conforto adequadas ao procedimento e ao seu caso.'],
  ['Quando aparecem os resultados?', 'A toxina tem efeito gradual nos dias após a aplicação. No preenchimento, o volume pode ser percebido inicialmente, mas o inchaço pode modificar o aspecto nos primeiros dias. A avaliação esclarece o período esperado para cada tratamento.'],
  ['Quanto tempo dura?', 'O efeito da toxina costuma durar alguns meses. No preenchimento, a duração varia com o produto e a área tratada. A resposta individual e o plano de acompanhamento também influenciam.'],
  ['O planejamento pode preservar a naturalidade?', 'O objetivo é cuidar dos pontos que incomodam, considerando a expressão e as proporções do seu rosto. A dose, as áreas e a técnica são discutidas individualmente.'],
  ['Existem contraindicações?', 'Sim. Alergia ao produto e infecção na região, por exemplo, precisam ser avaliadas. Informe doenças, medicamentos, gestação, amamentação e procedimentos prévios. A profissional verifica se o tratamento é adequado para você.'],
  ['Qual é o valor do tratamento?', 'O investimento depende da avaliação e do plano proposto. A equipe informa os valores e as condições do atendimento pelo WhatsApp, após entender a sua necessidade.'],
]

function FAQAccordion() {
  return <section className="faq wrap section-space" aria-labelledby="faq-title"><div className="reveal"><h2 id="faq-title">Sua dúvida<br /><em>pode estar aqui.</em></h2><a className="text-link" href={appointment} target="_blank" rel="noreferrer">Conversar com a equipe <Arrow /></a></div><div className="faq-list reveal">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}<p className="clinical-sources">Saiba mais sobre <a href="https://www.aad.org/public/cosmetic/wrinkles/botulinum-toxin-faqs" target="_blank" rel="noreferrer">toxina botulínica</a> e <a href="https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2025/anvisa-alerta-sobre-risco-de-botulismo-apos-administracao-de-toxina-botulinica/" target="_blank" rel="noreferrer">cuidados com a aplicação</a>.</p></div></section>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  useInstitutionalMotion(root, 'toxina')
  const [showFixed, setShowFixed] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('inicio')!
    const observer = new IntersectionObserver(([entry]) => setShowFixed(!entry.isIntersecting && entry.boundingClientRect.bottom < 0))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-title > span', { y: 28, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power2.out' })
      gsap.to('.hero-portrait img', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-intro, .hero-title, .round-cta', { y: -35, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } })
    })
    return () => media.revert()
  }, { scope: root })

  return (
    <div className="martelli-lp" ref={root}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <main id="conteudo">
        <HeroSection />
        <ConcernSection />
        <InteractiveExplainer />
        <InteractiveFaceMap />
        <BenefitsSection />
        <ClinicalCaseStudies />
        <DoctorSection />
        <TreatmentTimeline />
        <TestimonialsSection />
        <FAQAccordion />
        <Booking />
      </main>
      <footer className="footer wrap"><Brand /><p>Dra. Priscilla Martelli · Cirurgiã-dentista · CRO 121952<br />Martelli Care Clinic · Jardim Paulista, São Paulo</p><div><a href={clinic.instagram} target="_blank" rel="noreferrer">Instagram da clínica <Arrow /></a><a href={clinic.doctorInstagram} target="_blank" rel="noreferrer">Instagram da Dra. Priscilla <Arrow /></a></div></footer>
      {showFixed && <><a className="floating-whatsapp" href={appointment} aria-label="Conversar com a clínica pelo WhatsApp" target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span> WhatsApp</a><div className="sticky-cta"><Appointment>Agendar pelo WhatsApp</Appointment></div></>}
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)

