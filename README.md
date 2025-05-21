# 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma stack moderna e enxuta:

## 🔙 Backend

- **Node.js + Express** – Servidor web leve e performático.  
- **TypeScript** – Tipagem estática para maior segurança e clareza no desenvolvimento.  
- **Nodemon** – Para reiniciar o servidor automaticamente em cada mudança.  
- **CORS** – Permite a comunicação segura entre o frontend e backend em portas diferentes durante o desenvolvimento.  
- **Prisma ORM** – Mapeamento objeto-relacional com foco em produtividade e tipagem.  
- **PostgreSQL (Neon)** – Banco de dados relacional hospedado na nuvem, acessado via variável `DATABASE_URL`.  

## 🎨 Frontend

- **React + Vite** – Estrutura moderna e rápida para SPAs, sem complexidade de SSR.  
- **React Router** – Roteamento de páginas com navegação declarativa.  
- **Tailwind CSS** – Estilização utilitária rápida e responsiva.  
- **shadcn/ui** – Componentes acessíveis e customizáveis prontos para uso com Tailwind.  
- **Lucide** – Ícones modernos e leves.  
- **Framer Motion** – Animações suaves e declarativas.  
- **React Hook Form + Zod** – Manipulação de formulários com validação baseada em schema.  

## 🧹 Code Quality

- **Prettier** – Padronização de formatação de código para manter a consistência entre os arquivos.

---

# 🚀 Instruções para Rodar o Projeto

## ✅ Pré-requisitos

- Docker e Docker Compose instalados na máquina.

## 🧰 Passo a Passo

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### 2. Copie os arquivos .env
- Linux / macOS
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
- Windows (CMD ou PowerShell)
```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

### 3. Verifique as variáveis de ambiente

- No backend/.env, a DATABASE_URL já está apontando para o banco no Neon.
- No frontend/.env, a VITE_API_URL deve apontar para:
```bash
http://localhost:3333/api
```

### 4. Instale as dependências e inicie o backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### 5. Instale as dependências e rode o frontend

```bash
cd frontend
npm install
npm run dev
```

### 6. Acesse a aplicação

- **Frontend** – http://localhost:5173
- **Backend (API)** – http://localhost:3333/api

## 🗃️ Banco de Dados

O projeto utiliza um banco PostgreSQL já provisionado na plataforma Neon, portanto:

✅ Você não precisa instalar nem configurar um banco localmente.
A URL de acesso está incluída no arquivo backend/.env.example.

Sinta-se à vontade para utilizar o CRUD do sistema!

---

# 💡 Como foi a minha abordagem
No backend, escolhi Node.js com Express por serem leves e bem difundidos, o que agiliza o desenvolvimento e a manutenção. Para aumentar a segurança e clareza do código, usei TypeScript, aproveitando a tipagem estática para reduzir erros. Já o Prisma ORM foi adotado pela sua integração fluida com TypeScript e pela produtividade que oferece no mapeamento e acesso ao banco de dados PostgreSQL.

No frontend, optei por React com Vite por sua velocidade e simplicidade na configuração de SPAs. A combinação com Tailwind CSS e shadcn/ui permitiu criar interfaces modernas, responsivas e com boa experiência de usuário de forma eficiente. Além disso, utilizei React Router para gerenciar rotas e React Hook Form junto com Zod para lidar com formulários e validações de forma declarativa, segura e escalável.
