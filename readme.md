## gatewayapi(.js)

### Setup

#### Deno

```ts
import { SMS } from 'https://esm.sh/gatewayapi'
```

#### Node.js

```bash
npm i gatewayapi
```

```ts
import { SMS } from 'gatewayapi'
```

### Usage

> [!IMPORTANT]
> You need to open a [gatewayapi](https://gatewayapi.com) account first to use this module.

```ts
const { sendMessage } = new SMS({
  token: '...'
})

const response = await sendMessage({
  sender: 'You',
  message: '123456 is your verification code.',
  to: 4566118311 // +45 66118311
})
```
