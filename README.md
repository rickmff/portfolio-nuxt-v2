# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy com Dokploy + Nixpacks

Este projeto está configurado para deploy com Dokploy usando Nixpacks.

### Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no Dokploy:

- `CONTENTFUL_SPACE_ID` - ID do espaço do Contentful
- `CONTENTFUL_ACCESS_TOKEN` - Token de acesso do Contentful
- `VITE_CONTENTFUL_SPACE_ID` - ID do espaço do Contentful (para uso no cliente)
- `VITE_CONTENTFUL_ACCESS_TOKEN` - Token de acesso do Contentful (para uso no cliente)

### Configuração

O arquivo `nixpacks.toml` já está configurado para:
- Usar Node.js 20
- Instalar dependências com `npm ci`
- Fazer build com `npm run build`
- Iniciar o servidor com `node .output/server/index.mjs`

O Nixpacks detectará automaticamente a configuração e fará o deploy.