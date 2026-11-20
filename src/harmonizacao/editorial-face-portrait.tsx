export function EditorialFacePortrait({ active }: { active: number }) {
  return <>
    <img className="editorial-face-photo" src="/martelli/rosto-editorial-linhas-v2.webp" alt="Modelo em retrato editorial frontal com iluminação suave e textura natural da pele, para ilustrar as regiões faciais" width="1120" height="1400" loading="lazy" />
    <svg className="editorial-face-overlay" viewBox="0 0 100 125" aria-hidden="true">
      <defs>
        <radialGradient id="editorial-champagne"><stop stopColor="#f8dfb8" stopOpacity=".28" /><stop offset="1" stopColor="#f8dfb8" stopOpacity="0" /></radialGradient>
      </defs>
      <g data-active={active === 0} className="editorial-region">
        <ellipse className="editorial-region-light" cx="50" cy="29" rx="21" ry="10" />
        <path d="M34 28Q50 23 66 28M36 31Q50 27 64 31" />
        <path className="editorial-leader" d="M51 28.75H69L77 22H89" />
      </g>
      <g data-active={active === 1} className="editorial-region">
        <ellipse className="editorial-region-light" cx="50" cy="43" rx="7" ry="9" />
        <path d="M48 39Q47.5 43 48 46M52 39Q52.5 43 52 46" />
        <path className="editorial-leader" d="M52 42.5H66L77 34H89" />
      </g>
      <g data-active={active === 2} className="editorial-region">
        <ellipse className="editorial-region-light" cx="76" cy="50" rx="10" ry="7" />
        <ellipse className="editorial-region-light" cx="24" cy="50" rx="10" ry="7" />
        <path d="M75 48L79 46M75 50H80M75 52L79 54M25 48L21 46M25 50H20M25 52L21 54" />
        <path className="editorial-leader" d="M77 50H89" />
      </g>
    </svg>
  </>
}
