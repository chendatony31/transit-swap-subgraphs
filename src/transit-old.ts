import {
  Swap
} from "../generated/TransitOld/TransitOld"
import { Order } from "../generated/schema"

export function handleSwap(event: Swap): void {
  let entity = new Order(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockNumber = event.block.number
  entity.from = event.transaction.from
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1
  entity.amountIn = event.params.amountIn

  entity.save()
}
