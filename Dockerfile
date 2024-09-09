# Etapa 1: Build da aplicação
FROM node:22 AS build

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração do projeto para o contêiner
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Rode o build da aplicação para produção
RUN npm run build

# Etapa 2: Servir a aplicação em um ambiente de produção
FROM node:22 AS production

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Instale apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copie os arquivos de build da etapa anterior
COPY --from=build /app/dist ./dist

# Exponha a porta onde a aplicação vai rodar
EXPOSE 3000

# Comando para rodar o servidor (por exemplo, usando uma ferramenta como serve ou http-server)
CMD ["npx", "serve", "dist", "-l", "3000"]