# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

<br>

# How to install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle).

To install, download or clone the repo, then:

`npm install`  

`cd eth-contracts`  
`truffle compile`  

`ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --accounts=20`

<br>

# Develop

To run truffle tests, switch from the root folder to eth-contracts:

`cd eth-contracts`  

then run  

`truffle test ./test/TestERC721Mintable.js`  

<br>

# Generate Proof with Zokrates

1. Using [Docker](https://docs.docker.com/get-docker/) to install and instantiate a Zokrates zkSnarks development environment
2. Navigate to the zokrates project folder: `cd zokrates/code`
3. Run ZoKrates docker container: `docker run -v $(pwd):/home/zokrates/code -ti zokrates/zokrates /bin/bash` 
4. Now you are inside the container. Change path to the code/square folder: `cd code/square/`
5. Compile the program written in ZoKrates DSL: `zokrates compile -i square.code`
6. Generate the Trusted Setup: `zokrates setup`
7. Compute Witness: `zokrates compute-witness -a 3 9`
8. Generate Proof: `zokrates generate-proof`
9. Export Verifier: `zokrates export-verifier`  
   The last command generates our 'verifier' smart contract which I moved to the **eth-contracts/contracts** folder and renamed to **SquareVerifier.sol** afterwards.  
   In the contract file I changed the solidity info to `pragma solidity ^0.5.0;`

<br>

# Versions

`truffle version`

> Truffle v5.3.2 (core: 5.3.2)  
> Solidity - ^0.5.0 (solc-js)  
> Node v15.14.0  
> Web3.js v1.3.5

<br>

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
