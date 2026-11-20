# Martelli Care Clinic — Landing page

Landing page de toxina botulínica e preenchimentos da Dra. Priscilla Martelli, desenvolvida em React, TypeScript, Vite e GSAP.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

A página inicial da LP é `/`. O build está em `dist/`.

## Vercel

Importe este repositório na Vercel. O `vercel.json` configura Vite, `npm run build` e saída `dist`. A Root Directory é a raiz do repositório. Não são necessárias variáveis de ambiente. A rota `/harmonizacao` redireciona para `/`.

## Conteúdo e manutenção

- Página e estilos em `src/harmonizacao`.
- Componente de imagens em camadas em `src/components/ui/circular-testimonials.tsx`.
- WhatsApp e contatos em `src/clinic.ts`.
- Registros clínicos e fotografias em `public/`.
- O retrato do mapa facial é uma modelo ilustrativa gerada por IA e identificada como ilustração na página. Não representa um resultado clínico.
- Os registros de antes e depois fornecidos pela clínica preservam o enquadramento original e incluem aviso sobre variação individual.
- O formulário prepara a mensagem para WhatsApp, com consentimento obrigatório. Não há backend de captura de dados.
- As avaliações têm link para a fonte pública no Trustindex.

O pacote inclui somente os arquivos necessários à LP, sem credenciais, arquivos de trabalho ou imagens intermediárias de geração.
