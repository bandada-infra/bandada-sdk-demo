# Bandada SDK Demo

This is an example of project using the [Bandada SDK](https://github.com/privacy-scaling-explorations/bandada/tree/main/libs/api-sdk).

## Run Locally

### Clone the Repository

```bash
git clone https://github.com/vplasencia/bandada-sdk-demo.git
```

### Install dependencies

```bash
yarn
```

### Add the environment variables

1. Copy the `.env.example` file to a new file named `.env`:

```bash
cp .env.example .env
```

2. Create a new Bandada off-chain group using the Bandada Dashboard: [https://bandada.pse.dev](https://bandada.pse.dev).

3. Update each environment variable name with the correct value using the [Bandada Dashboard](https://bandada.pse.dev).

### Run the bandada-sdk file

```bash
yarn bandada
```

### Code quality and formatting

Run [ESLint](https://eslint.org/) to analyze the code and catch bugs:

```bash
yarn lint
```

Run [Prettier](https://prettier.io/) to check formatting rules:

```bash
yarn prettier
```

Or to automatically format the code:

```bash
yarn prettier:write
```
