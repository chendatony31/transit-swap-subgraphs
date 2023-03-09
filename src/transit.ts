import {
    SwapChannel, Swap, OriginSwap
} from "../generated/Transit/Transit"
import { Order, User } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleSwapChannel(event: SwapChannel): void {
    let entity1 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() - 1).toString())

    let entity2 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() - 2).toString())


    // 没有已 添加 的 order
    if (entity1 == null && entity2 == null) {
        let newEntity = new Order(
            event.transaction.hash.toHex() + "-" + event.logIndex.toString()
        )
        newEntity.blockNumber = event.block.number
        newEntity.hash = event.transaction.hash
        newEntity.from = event.transaction.from
        newEntity.to = event.transaction.to
        newEntity.trader = event.params.trader
        newEntity.token0 = event.params.token0
        newEntity.token1 = event.params.token1
        newEntity.channel = event.params.channel
        newEntity.amountIn = event.params.amount
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
    // 已经存在order 添加字段
    else {
        let oldEntity = entity1 || entity2;

        if (oldEntity != null) {
            oldEntity.channel = event.params.channel
            oldEntity.toChainID = event.params.toChainID
            oldEntity.save();
        }
    }
}


export function handleSwap(event: Swap): void {
    let entity1 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() + 1).toString())

    let entity2 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() + 2).toString())

    if (entity1 == null && entity2 == null) {
        let newEntity = new Order(
            event.transaction.hash.toHex() + "-" + event.logIndex.toString()
        )
        newEntity.blockNumber = event.block.number
        newEntity.hash = event.transaction.hash
        newEntity.from = event.transaction.from
        newEntity.to = event.transaction.to
        newEntity.token0 = event.params.token0
        newEntity.token1 = event.params.token1
        newEntity.amountIn = event.params.amountIn
        newEntity.amountOut = event.params.amountOut
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
    else {
        let oldEntity = entity1 || entity2;

        if (oldEntity != null && !oldEntity.amountOut) {
            oldEntity.amountOut = event.params.amountOut
            oldEntity.save();
        }
    }
}



export function handleOriginSwap(event: OriginSwap): void {

    let entity1 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() - 1).toString())

    let entity2 = Order.load(event.transaction.hash.toHex() + "-" + (event.logIndex.toI32() + 1).toString())

    if (entity1 == null && entity2 == null) {
        let newEntity = new Order(
            event.transaction.hash.toHex() + "-" + event.logIndex.toString()
        )
        newEntity.blockNumber = event.block.number
        newEntity.from = event.transaction.from
        newEntity.hash = event.transaction.hash
        newEntity.to = event.transaction.to
        newEntity.token0 = event.params.token0
        newEntity.token1 = event.params.token1
        newEntity.amountIn = event.params.amountIn
        newEntity.amountOut = event.params.userReceive
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

    else {

        let oldEntity = entity1 || entity2;

        if (oldEntity != null) {
            oldEntity.amountOut = event.params.userReceive
            oldEntity.save();
        }

    }

}