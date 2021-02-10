const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const {promisifyAll} = require("grpc-promise");

const packageDefinition = protoLoader.loadSync(
    `${__dirname}/../protos/base_node.proto`,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const tariGrpc = protoDescriptor.tari.rpc;

function connect(address) {
    const client = new tariGrpc.BaseNode(address, grpc.credentials.createInsecure());
    promisifyAll(client, {metadata: new grpc.Metadata()});
    return client;
}

function Client(address) {
    this.inner = connect(address);

   ['getVersion', 'listHeaders', 'getBlocks', 'getMempoolTransactions', 'getChainMetdata'].forEach((method) => {
        this[method] = (arg) => this.inner[method]().sendMessage(arg);
    })
}

Client.connect = (address) => new Client(address)

module.exports = {
    Client,
    types: tariGrpc,
};
