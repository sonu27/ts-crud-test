# NodeJS CRUD app using MySQL and TypeScript

## Running locally
Make sure you have NodeJS v12

```
docker-compose up -d
npm install
npm run db:migrate
npm run start-dev
```

## Technical Choices Made

TypeScript - various reasons, mainly type checking and better domain modelling
MySQL - familarity, and simplicity for this use case
No ORM - simplicity for this use case, would have gone with Moongoose if I had choosen MongoDB

Todo
Handle foreign key failures and deletes organisations which are parents
