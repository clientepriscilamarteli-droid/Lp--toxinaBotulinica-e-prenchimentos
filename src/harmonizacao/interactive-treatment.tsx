import { useState } from 'react'
import { Appointment } from './landing-sections'
import { appointmentHref } from '../clinic'

const goals = [
  { label: 'Suavizar linhas de expressão', treatment: 'Toxina botulínica', title: 'Seu sorriso continua sendo seu.', text: 'Ao sorrir, franzir a testa ou levantar as sobrancelhas, os músculos movimentam a pele. A toxina reduz temporariamente a atividade de músculos selecionados, suavizando as linhas ligadas a esses movimentos.', planning: 'A Dra. Priscilla observa seu rosto em repouso e em movimento para planejar as regiões e a dose, com atenção à sua expressão.' },
  { label: 'Cuidar do volume e do contorno', treatment: 'Preenchimento facial', title: 'Equilíbrio começa pelas proporções.', text: 'O preenchimento pode trabalhar volume, contorno e sustentação em regiões específicas. A escolha considera o conjunto do rosto, a anatomia e o que você deseja valorizar.', planning: 'Na avaliação, a Dra. Priscilla conversa sobre seus objetivos, analisa as proporções e explica as possibilidades, os limites e os cuidados do tratamento.' },
]

export function InteractiveExplainer() {
  const [selected, setSelected] = useState(0)
  const goal = goals[selected]
  return (
    <section className="treatment-lab treatment-story" id="entenda-o-tratamento" aria-labelledby="treatment-title">
      <div className="wrap story-layout">
        <div className="story-intro reveal">
          <h2 id="treatment-title">Você se reconhece.<br /><em>O cuidado respeita.</em></h2>
          <p>Talvez você queira suavizar uma linha. Ou dar mais equilíbrio a um contorno. O primeiro passo é entender o que faz sentido para o seu rosto.</p>
          <span className="story-signature">Naturalidade começa no planejamento.</span>
        </div>
        <div className="story-content reveal">
          <p className="story-question">O que você gostaria de cuidar?</p>
          <div className="story-choices" role="group" aria-label="Escolher objetivo do cuidado">
            {goals.map((item, index) => <button type="button" key={item.treatment} aria-pressed={selected === index} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}<span aria-hidden="true">↗</span></button>)}
          </div>
          <div className="story-answer" aria-live="polite" aria-atomic="true">
            <span className="lab-label">{goal.treatment}</span>
            <h3>{goal.title}</h3>
            <p>{goal.text}</p>
            <p className="story-planning">{goal.planning}</p>
          </div>
          <Appointment variant="lab-appointment" href={appointmentHref(goal.treatment)}>Planejar meu cuidado</Appointment>
          <small className="story-next">Converse com a equipe para agendar sua avaliação.</small>
        </div>
      </div>
    </section>
  )
}
