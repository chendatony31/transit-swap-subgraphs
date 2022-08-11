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
  entity.amount = event.params.amountIn
  entity.timestamp = event.block.timestamp
  entity.gasLimit = event.transaction.gasLimit
  let receipt = event.receipt;
  entity.gasUsed = receipt ? receipt.gasUsed : null;
  entity.nonce = event.transaction.nonce

  entity.save()
}
