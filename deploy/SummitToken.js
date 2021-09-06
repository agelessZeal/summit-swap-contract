const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))
 module.exports = async function (hre) {

  const { ethers,getChainId,deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer,dev } = await getNamedAccounts()

  console.log('deployer:',deployer,dev)

  const summitToken  = await deploy("SummitToken", {
    from: deployer,
    log: true,
    deterministicDeployment: false
  })

  console.log('SummitToken deployed:',summitToken.address)
  await sleep(60)
  console.log('verify the SummitToken:')
  await hre.run('verify:verify', {
    address: summitToken.address,
    contract: 'contracts/SummitToken.sol:SummitToken',
  })

}

module.exports.tags = ["SMT"]

