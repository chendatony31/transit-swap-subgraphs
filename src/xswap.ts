import {
    Swap
} from "../generated/Xswap/Xswap"
import { Order, User } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleSwap(event: Swap): void {
    let entity = new Order(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.blockNumber = event.block.number
    entity.from = event.transaction.from
    entity.to = event.transaction.to
    entity.token0 = event.params.token0
    entity.token1 = event.params.token1
    entity.amount = event.params.amountIn
    entity.timestamp = event.block.timestamp
    entity.gasLimit = event.transaction.gasLimit
    let receipt = event.receipt;
    entity.gasUsed = receipt ? receipt.gasUsed : null;
    entity.nonce = event.transaction.nonce
    entity.save()

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
