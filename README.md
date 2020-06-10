# Product-Management-Chaincode

The Product Management Chaincode is written in Nodejs for Hyperledger Fabric. We are using CouchBD to pull the data from the blockchain using rich queries.
It has two assets

1. Parts -
      docType,
      serialNumber,
      partType,
      creationDate,
      owner
      
2. Products -
      docType,
      serialNumber,
      productType,
      creationDate,
      owner,
      parts

It has the following functions

1. createParts
This function is used to add a new Part asset in the blockchain. It has different attributes such as serialNumber, partType etc and we are saving the transaction using the serialNumber in the blockchain.

2. createProducts
This function is used to add a new Product asset in the blockchain. It has different attributes such as serialNumber, productType etc and we are saving the transaction using the serialNumber in the blockchain.

3. getPartsBySerialnumber
This function is used to get a particular Part asset value based on the serialNumber.

4. newOwnerOfPart
This function is used to change the owner of a particular part asset by checking if a particular Part asset exists and belongs to the same owner who is requesting ownership change.

5. newOwnerOfProduct
This function is used to change the owner of a particular product asset by checking if a particular Product asset exists and belongs to the same owner who is requesting ownership change

6. getHistoryOfProduct
This function returns a history of a particular Product values across time.
