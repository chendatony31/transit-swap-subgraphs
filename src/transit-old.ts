import {
  SwapChannel
} from "../generated/TransitOld/TransitOld"
import { Order } from "../generated/schema"

export function handleSwapChannel(event: SwapChannel): void {
  let entity = new Order(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockNumber = event.block.number
  entity.from = event.transaction.from
  entity.trader = event.params.trader
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.channel = event.params.channel
  entity.amount = event.params.amount
  entity.fees = event.params.fees
  entity.toChainID = event.params.toChainID
  entity.isOld = true
  entity.save()
}
