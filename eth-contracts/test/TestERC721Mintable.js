var ERC721MintableComplete = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    const symbol = "RET721";
    const name = "RealEstateToken721";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});

            // TODO: mint multiple tokens
            for(let x = 0; x < 20; x++){
              let status = await this.contract.mint(accounts[x], x, {from:account_one});
            }
        })

        it('should return total supply', async function () { 
            let amount = await this.contract.totalSupply();
            assert.equal(parseInt(amount), 20, "Wrong amount for total supply!");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(parseInt(balance), 1, "Wrong token balance returned!");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(2, {from: account_three});
            assert.equal(tokenURI,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2","wrong tokenURI returned" );
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenOwner = await this.contract.ownerOf(6);
            assert.equal(tokenOwner, accounts[6], "Wrong Owner - should be #6");
            await this.contract.transferFrom(accounts[6], accounts[7], 6, {from:accounts[6]});
            tokenOwner = await this.contract.ownerOf(6);
            assert.equal(tokenOwner, accounts[7], "Wrong Owner - should be #7");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name,symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let errorCount = 0;
            try
            {
                await this.contract.mint(accounts[2], 5, "token", {from:accounts[2]});
            }
            catch(err)
            {
                errorCount++;
            }
            assert.equal(errorCount, 1, "Expected revert");
        })

        it('should return contract owner', async function () { 
            let ContractOwner = await this.contract.owner();
            assert.equal(ContractOwner, account_one, "Did not return the contract owner!");
        })

    });
})