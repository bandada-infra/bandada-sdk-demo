<p align="center">
    <h1 align="center">
      Bandada SDK Demo
    </h1>
</p>

[Bandada_SDK_DEMO_ScriptExec.webm](https://github.com/0xjei/bandada-sdk-demo/assets/20580910/c868374a-a7d9-458c-b00e-d8a8d0224a92)

| Simple and intuitive demonstration of interaction with Bandada's off-chain groups. |
| ---------------------------------------------------------------------------------- |

This example script uses the [Bandada API SDK](https://github.com/privacy-scaling-explorations/bandada/tree/main/libs/api-sdk) to interact with a pre-existing off-chain group.

In one-click you will be able to print group information, add or remove members, and create a merkle inclusion proof. This proof is a zero-knowledge proof that verifies a user's membership in the group without revealing their identity.

To learn more about Bandada, please visit the [repository](https://github.com/privacy-scaling-explorations/bandada) and [documentation](https://pse-team.notion.site/Bandada-82d0d9d3c6b64b7bb2a09d4c7647c083?pvs=4).

## 🛠 Installation

Clone this repository:

```bash
git clone https://github.com/vplasencia/bandada-sdk-demo.git
```

and install the dependencies:

```bash
cd bandada-sdk-demo && yarn
```

## 🔧 Configuration

Copy the `.env.example` file to a new file named `.env`:

```bash
cp .env.example .env
```

You just need to activate your API key via the [Bandada Dashboard](https://app.bandada.pse.dev/) homepage. Then you need to copy & paste the key into the `ADMIN_API_KEY` environment variable.

## 📜 Usage

Use the following command to run the script:

```bash
yarn bandada
```

## 👨‍💻 Contributing

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
