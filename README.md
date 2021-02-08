# Tari Base Node GRPC client

Async GRPC client library for the Tari Base Node.

## Usage

```javascript
    const {Client} = require('@tari/base-node-grpc-client');

    const baseNodeAddress = 'localhost:18142';
    const client = Client.connect(baseNodeAddress);
    const {version} = await client.getVersion();
    console.log(version);
```
