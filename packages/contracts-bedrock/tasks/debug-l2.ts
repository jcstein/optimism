import fs from 'fs'
import assert from 'assert'

import { OptimismGenesis, State } from '@eth-optimism/core-utils'
import { ethers } from 'ethers'
import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { predeploys } from '../src'

// TODO: this can be replaced with the smock version after
// a new release of foundry-rs/hardhat
const getStorageLayout = async (
    hre: HardhatRuntimeEnvironment,
    name: string
  ) => {
    const buildInfo = await hre.artifacts.getBuildInfo(name)
    const key = Object.keys(buildInfo.output.contracts)[0]
    return (buildInfo.output.contracts[key][name] as any).storageLayout
  }

task('debug-l2', 'create a genesis config')
.addOptionalParam(
    'outfile',
    'The file to write the output JSON to',
    'genesis.json'
)
.setAction(async (args, hre) => {
    const {
    computeStorageSlots,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('@defi-wonderland/smock/dist/src/utils')

    const { deployConfig } = hre

for (const [name, addr] of Object.entries(predeploys)) {
    if (name === 'GovernanceToken') {
        continue
    }
    const artifact = await hre.artifacts.readArtifact(name)
    assertEvenLength(artifact.deployedBytecode)

    const allocAddr = name === 'OVM_ETH' ? addr : toCodeAddr(addr)
    assertEvenLength(allocAddr)

    alloc[allocAddr] = {
        nonce: '0x00',
        balance: '0x00',
        code: artifact.deployedBytecode,
        storage: {},
    }

    const storageLayout = await getStorageLayout(hre, name)
    const slots = computeStorageSlots(storageLayout, variables[name])

    for (const slot of slots) {
        alloc[allocAddr].storage[slot.key] = slot.val
    }
    }
})