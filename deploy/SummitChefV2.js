const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))
module.exports = async function (hre) {
  const { ethers,getChainId,deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const smtAddress = (await deployments.get("SummitToken")).address
  console.log('smtAddress:',smtAddress)

  await deploy("SummitChefV2", {
    from: deployer,
    args: [smtAddress],
    log: true,
    deterministicDeployment: false
  })

  const summitChefV2 = await ethers.getContract("SummitChefV2")
  if (await summitChefV2.owner() !== dev) {
    console.log("Transfer ownership of SummitChefV2 to dev")
    await (await summitChefV2.transferOwnership(dev, true, false)).wait()
  }

  await sleep(60)
  console.log('verify the summitChefV2:',summitChefV2.address)
  await hre.run('verify:verify', {
    address: summitChefV2.address,
    contract: 'contracts/SummitChefV2.sol:SummitChefV2',
    constructorArguments: [smtAddress],
  })
}

module.exports.tags = ["SummitChefV2"]
// module.exports.dependencies = ["SMT"]
