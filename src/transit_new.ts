import {
    TransitSwapped
} from "../generated/TransitNew/TransitNew"
import { Order, User } from "../generated/schema"

export function handleSwap(event: TransitSwapped): void {
    let newEntity = new Order(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    newEntity.blockNumber = event.block.number
    newEntity.hash = event.transaction.hash
    newEntity.from = event.transaction.from
    newEntity.to = event.transaction.to
    newEntity.trader = event.params.trader
    newEntity.receiver = event.params.dstReceiver
    newEntity.token0 = event.params.srcToken
    newEntity.token1 = event.params.dstToken
    newEntity.channel = event.params.channel
    newEntity.amountIn = event.params.amount
    newEntity.amountOut = event.params.returnAmount
    newEntity.toChainID = event.params.toChainID
    newEntity.timestamp = event.block.timestamp
    newEntity.gasLimit = event.transaction.gasLimit
    newEntity.nonce = event.transaction.nonce
    newEntity.save()

    let address = User.load(event.transaction.from.toHexString());

    if (address == null) {
        address = new User(event.transaction.from.toHexString())
        address.count = 1
    }
    else {
        address.count += 1
    }
    address.save()
}
