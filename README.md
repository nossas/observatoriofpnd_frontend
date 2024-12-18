# Observatório das Florestas Públicas - Frontend

Esse é o Frontend do Observatório das Florestas Públicas é uma iniciativa do IPAM e da Amazônia de Pé para que a sociedade civil possa monitorar as Florestas Públicas Não Destinadas da Amazônia e cobrar sua proteção. Este projeto é responsável pela interface do Observatório FPND, utilizando tecnologias modernas como **React** e **Vite**. Ele integra dados de diversas fontes para criar visualizações de mapas interativos. A aplicação faz uso de APIs para obter dados geoespaciais e exibi-los no frontend, facilitando a análise e o monitoramento por parte dos usuários.

## 📋 Pré-requisitos

Antes de rodar o projeto localmente, você precisa garantir que os seguintes pré-requisitos estão instalados:

- **Node.js** (versão 20.17.0)
  - Para gerenciar a instalação das dependências e execução do projeto.
- **npm** (gerenciador de pacotes do Node.js)
  - Para instalar as dependências do projeto e executar scripts.
- **nvm** (Node Version Manager, opcional, se você precisar gerenciar versões do Node)
  - Para garantir que você está usando a versão correta do Node.js.
- **Docker** (opcional, se você preferir usar containers)
  - Para rodar o projeto em um ambiente isolado com o Docker.

### Instalando o Node.js e npm via nvm

Se você não tem o Node.js instalado, pode usar o **nvm** (Node Version Manager) para instalar a versão correta:

```bash
nvm install 20.17.0
nvm use 20.17.0
```

### Instale as Dependências

Instale as dependências do projeto usando npm (ou yarn, se preferir):
```bash
npm install
```

### Configure as Variáveis de Ambiente

Para rodar o projeto localmente, algumas variáveis de ambiente precisam estar configuradas. Existe um arquivo .env.development com os valores como o a seguir que indicam por exemplo as rotas de API que o mapa precisa para carregar os dados:
```bash
VITE_DEFAULT_PROJECTION=EPSG:3857
VITE_MAP_DEFAULT_CENTER=-6400000,-530000
VITE_MAP_DEFAULT_ZOOM=6
VITE_URL_AJUDA=https://google.com
VITE_URL_COMO_AGIR=https://google.com
VITE_URL_GOOGLE_MAP_API_TERRAIN=https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}
VITE_URL_INFO_DATA=http://localhost:8003/info-data
VITE_URL_MAP_DATA=http://localhost:8003/map-data
VITE_URL_MVT=http://localhost:8003/mvt/fpnd/{z}/{x}/{y}.pbf
```

Faça o build e Execute o Servidor de Desenvolvimento
```bash
npm run build
npm run dev
```

## Integração Contínua

Este projeto utiliza Docker para facilitar o ambiente de desenvolvimento e produção. O arquivo Dockerfile contém as instruções necessárias para construir e rodar a aplicação em um container.

Basicamente o workflow construído para o Github Actions seta as variáveis de ambiente para a produção, considerando o método de criação do ambiente que o Vite impõe, tendo que inserir o prefixo '_VITE__' antes das variáveis, também criadas no Dockerfile.
