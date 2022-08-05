import { BigInt } from "@graphprotocol/graph-ts"
import {
  TransitOld,
  CrossSwap,
  OriginSwap,
  OwnershipTransferPrepared,
  OwnershipTransferred,
  Swap,
  SwapChannel
} from "../generated/TransitOld/TransitOld"
import { ExampleEntity } from "../generated/schema"

export function handleCrossSwap(event: CrossSwap): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.token0 = event.params.token0
  entity.token1 = event.params.token1

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._ANY_SWAP_ROUTER_(...)
  // - contract._CONTRACT_WHITE_LIST_(...)
  // - contract._EXECUTOR_(...)
  // - contract._FEES_MODEL_(...)
  // - contract._MIX_BRIDGE_(...)
  // - contract._NEW_OWNER_(...)
  // - contract._ORIGIN_BRIDGE_(...)
  // - contract._OTHER_BRIDGE_(...)
  // - contract._OWNER_(...)
  // - contract._WRAPPED_TOKEN_(...)
  // - contract._XSWAP_APPROVE_(...)
  // - contract.supportContract(...)
}

export function handleOriginSwap(event: OriginSwap): void {}

export function handleOwnershipTransferPrepared(
  event: OwnershipTransferPrepared
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleSwap(event: Swap): void {}

export function handleSwapChannel(event: SwapChannel): void {}