let SquareVerifier = artifacts.require('SquareVerifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    const symbol = "RET721";
    const name = "RealEstateToken721";

    beforeEach(async function () { 
        const _SquareVerifier = await SquareVerifier.new({from:account_one});
        this.contract = await SolnSquareVerifier.new(_SquareVerifier.address, name, symbol, {from: account_one});
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for contract', async function () {
        
        let proof = {
            "a": [
              "0x224b307ff9abe541633b24896a1b6ce257a8b593637afef502606f5d7588b41c",
              "0x24fb8d106ded77f75b36db7a06542805aad6749663dbfff2e08b461f1618c757"
            ],
            "b": [
              [
                "0x2c37baf7b7b78b2555e46ac60ff63c956fc4164d5b9bf884250636e1c7a6f6b4",
                "0x02485e38e6eee1f466169af1c534b72ca368cbd6a9b21d240efd17f25266ffd8"
              ],
              [
                "0x2c47ed0b92a64ede162bb1cf14ff3a1f965e2e47d2a64f682bb6f223164a83b3",
                "0x226f5cf8aea05fe310411ddb03ca3ddc082f6715473509765a0641a6466d5c29"
              ]
            ],
            "c": [
              "0x1a311cbbfa90aa32330752fab0df3d698489d06335c33eb8f57591a9ec269534",
              "0x065299b42ba46e16cfcabf6d6c48adb5ba67912547dc037432e93222d26615d1"
            ]
        };
        
        let inputs =  [
            "0x0000000000000000000000000000000000000000000000000000000000000009",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ];

        let transaction = await this.contract.mintNFT(accounts[0], 2, proof.a, proof.b, proof.c, inputs);
        assert.equal(transaction.logs[1].event, 'Transfer', "Solution wasn't add even with correct proof!");
    }) 

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted for contract', async function () {
    
        let minted = true;

        let proof = {
            "a": [
              "0x224b307ff9abe541633b24896a1b6ce257a8b593637afef502606f5d7588b41c",
              "0x24fb8d106ded77f75b36db7a06542805aad6749663dbfff2e08b461f1618c757"
            ],
            "b": [
              [
                "0x2c37baf7b7b78b2555e46ac60ff63c956fc4164d5b9bf884250636e1c7a6f6b4",
                "0x02485e38e6eee1f466169af1c534b72ca368cbd6a9b21d240efd17f25266ffd8"
              ],
              [
                "0x2c47ed0b92a64ede162bb1cf14ff3a1f965e2e47d2a64f682bb6f223164a83b3",
                "0x226f5cf8aea05fe310411ddb03ca3ddc082f6715473509765a0641a6466d5c29"
              ]
            ],
            "c": [
              "0x1a311cbbfa90aa32330752fab0df3d698489d06335c33eb8f57591a9ec269534",
              "0x065299b42ba46e16cfcabf6d6c48adb5ba67912547dc037432e93222d26615d1"
            ]
        };
        
        let inputs =  [
            "0x0000000000000000000000000000000000000000000000000000000000000009",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ];

        try{
            await this.contract.mintNFT(account_two, 2, proof.a, proof.b, proof.c, inputs, {from: account_one});
        }
        catch(e) {
            minted = false;
        }
        assert.equal(minted, true, "ERC721 token can't be minted for contract!");
    })

    // Test verification with incorrect proof
    it('Test if an ERC721 token can be minted for contract with incorrect proof', async function () {
    
        let minted = true;
    
        let proof = {
            "a": [
              "0x224b307ff9abe541633b24896a1b6ce257a8b593637afef502606f5d7588b41c",
              "0x24fb8d106ded77f75b36db7a06542805aad6749663dbfff2e08b461f1618c757"
            ],
            "b": [
              [
                "0x2c37baf7b7b78b2555e46ac60ff63c956fc4164d5b9bf884250636e1c7a6f6b4",
                "0x02485e38e6eee1f466169af1c534b72ca368cbd6a9b21d240efd17f25266ffd8"
              ],
              [
                "0x2c47ed0b92a64ede162bb1cf14ff3a1f965e2e47d2a64f682bb6f223164a83b3",
                "0x226f5cf8aea05fe310411ddb03ca3ddc082f6715473509765a0641a6466d5c29"
              ]
            ],
            "c": [
              "0x1a311cbbfa90aa32330752fab0df3d698489d06335c33eb8f57591a9ec269534",
              "0x065299b42ba46e16cfcabf6d6c48adb5ba67912547dc037432e93222d26615d1"
            ]
        };
        
        let inputs =  [
            "0x0000000000000000000000000000000000000000000000000000000000000003",
            "0x0000000000000000000000000000000000000000000000000000000000000001"
        ];

        try{
            await this.contract.mintNFT(account_two, 2, proof.a, proof.b, proof.c, inputs, {from: account_one});
        }
        catch(e) {
            minted = false;
        }
        assert.equal(minted, false, "ERC721 token can't be minted for contract with incorrect proof!");
    })

});