const { WETH } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();

  let wethAddress = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c';

  // if (chainId === "31337") {
  //   wethAddress = (await deployments.get("WETH9Mock")).address;
  // } else if (chainId in WETH) {
  //   wethAddress = WETH[chainId].address;
  // } else {
  //   throw Error("No WETH!");
  // }

  // const factoryAddress = (await deployments.get("UniswapV2Factory")).address;
  const factoryAddress = '0x9f8D694d1c6aA6586Dc2BDae4a1340Ba824fBB29'

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["UniswapV2Router02"];
