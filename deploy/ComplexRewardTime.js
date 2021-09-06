const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))
module.exports = async function (hre) {
  const { ethers,getChainId,deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const smtAddress = (await deployments.get("SummitToken")).address
  console.log('smtAddress:',smtAddress)

  const summitChefV2 = (await ethers.getContract("SummitChefV2")).address
  console.log('summitChefV2:',summitChefV2)

  const rewardPersecond = 1300000000000000


  await deploy("ComplexRewarderTime", {
    from: deployer,
    args: [smtAddress,rewardPersecond,summitChefV2],
    log: true,
    deterministicDeployment: false
  })

  const complexRewarder = await ethers.getContract("ComplexRewarderTime")
  // if (await summitChefV2.owner() !== dev) {
  //   console.log("Transfer ownership of SummitChefV2 to dev")
  //   await (await summitChefV2.transferOwnership(dev, true, false)).wait()
  // }

  await sleep(60)
  console.log('verify the complexRewarder:',complexRewarder.address)
  await hre.run('verify:verify', {
    address: complexRewarder.address,
    contract: 'contracts/mocks/ComplexRewarderTime.sol:ComplexRewarderTime',
    constructorArguments: [smtAddress,rewardPersecond,summitChefV2],
  })
}

module.exports.tags = ["ComplexRewarderTime"]
// module.exports.dependencies = ["SMT"]
