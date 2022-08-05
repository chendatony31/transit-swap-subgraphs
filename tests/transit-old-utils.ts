import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CrossSwap,
  OriginSwap,
  OwnershipTransferPrepared,
  OwnershipTransferred,
  Swap,
  SwapChannel
} from "../generated/TransitOld/TransitOld"

export function createCrossSwapEvent(
  token0: Address,
  token1: Address,
  to: Address,
  amountIn: BigInt,
  fromChainID: BigInt,
  toChainID: BigInt
): CrossSwap {
  let crossSwapEvent = changetype<CrossSwap>(newMockEvent())

  crossSwapEvent.parameters = new Array()

  crossSwapEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  crossSwapEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  crossSwapEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  crossSwapEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  crossSwapEvent.parameters.push(
    new ethereum.EventParam(
      "fromChainID",
      ethereum.Value.fromUnsignedBigInt(fromChainID)
    )
  )
  crossSwapEvent.parameters.push(
    new ethereum.EventParam(
      "toChainID",
      ethereum.Value.fromUnsignedBigInt(toChainID)
    )
  )

  return crossSwapEvent
}

export function createOriginSwapEvent(
  token0: Address,
  token1: Address,
  to: Address,
  amountIn: BigInt,
  amountOut: BigInt,
  userReceive: BigInt
): OriginSwap {
  let originSwapEvent = changetype<OriginSwap>(newMockEvent())

  originSwapEvent.parameters = new Array()

  originSwapEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  originSwapEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  originSwapEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  originSwapEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  originSwapEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )
  originSwapEvent.parameters.push(
    new ethereum.EventParam(
      "userReceive",
      ethereum.Value.fromUnsignedBigInt(userReceive)
    )
  )

  return originSwapEvent
}

export function createOwnershipTransferPreparedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferPrepared {
  let ownershipTransferPreparedEvent = changetype<OwnershipTransferPrepared>(
    newMockEvent()
  )

  ownershipTransferPreparedEvent.parameters = new Array()

  ownershipTransferPreparedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferPreparedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferPreparedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSwapEvent(
  token0: Address,
  token1: Address,
  to: Address,
  amountIn: BigInt,
  amountOut: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return swapEvent
}

export function createSwapChannelEvent(
  trader: Address,
  token0: Address,
  token1: Address,
  channel: string,
  amount: BigInt,
  fees: BigInt,
  toChainID: BigInt
): SwapChannel {
  let swapChannelEvent = changetype<SwapChannel>(newMockEvent())

  swapChannelEvent.parameters = new Array()

  swapChannelEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam("channel", ethereum.Value.fromString(channel))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam("fees", ethereum.Value.fromUnsignedBigInt(fees))
  )
  swapChannelEvent.parameters.push(
    new ethereum.EventParam(
      "toChainID",
      ethereum.Value.fromUnsignedBigInt(toChainID)
    )
  )

  return swapChannelEvent
}
