## gatewayapi(.js)

### Setup

> [!IMPORTANT]  
> You need to open a [gatewayapi](https://gatewayapi.com) account first to use this module. After you have signed up, you can create a new API token [here](https://gatewayapi.com/app/settings/api-oauth/).

#### Deno

```ts
import { Client } from 'https://esm.sh/gatewayapi'
```

#### Node.js

```bash
npm i gatewayapi
```

```ts
import { Client } from 'gatewayapi'
```

### Usage

The SDK is fully typed, so getting started shouldn't be much of a challenge.

```ts
const gatewayapi = new Client({
  token: '...'
})
```

#### `getAccountBalance()`

```ts
const { data, error } = await gatewayapi.getAccountBalance()
```

#### `getPrices()`

```ts
const { data, error } = await gatewayapi.getPrices({
  format: 'json'
})
```

#### `sendMessage()`

```ts
const { data, error } = await gatewayapi.sendMessage({
  sender: 'You',
  message: '123456 is your verification code.',
  to: 4566118311 // +45 66118311
})
```
