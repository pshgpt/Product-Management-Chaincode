class ProductManagement extends Contract {

  // To add new Part asset 
  async createParts(ctx, args) {

    let argsJson = JSON.parse(args);
    let todaysDate = new Date();
    let date = todaysDate.getDate() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getFullYear();
    const iterator = await ctx.stub.getQueryResult("{\"selector\":{\"docType\":\"Parts\",\"serialNumber\":\"" + argsJson[0] + "\"}}");

    if (iterator == null) {
      throw new Error("Error in fetching details");
    }
    const res = await iterator.next();
    if (res.value != null) {
      console.log("Part Serialnumber Already Exist " + argsJson[0]);
      throw new Error("Part Serialnumber Already Exist " + argsJson[0]);
    }
    const part = {
      docType: "Parts",
      serialNumber: argsJson[0],
      partType: argsJson[1],
      creationDate: date,
      owner: argsJson[2]

    };
    await ctx.stub.putState(argsJson[0], Buffer.from(JSON.stringify(part)));

  }

  // To add new Product asset 
  async createProducts(ctx, args) {

    let argsJson = JSON.parse(args);
    let todaysDate = new Date();
    let date = todaysDate.getDate() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getFullYear();
    const iterator = await ctx.stub.getQueryResult("{\"selector\":{\"docType\":\"Products\",\"serialNumber\":\"" + argsJson[0] + "\"}}");

    if (iterator == null) {
      throw new Error("Error in fetching details");
    }
    const res = await iterator.next();
    if (res.value != null) {
      console.log("Product Serialnumber Already Exist " + argsJson[0]);
      throw new Error("Product Serialnumber Already Exist " + argsJson[0]);
    }
    const product = {
      docType: "Products",
      serialNumber: argsJson[0],
      productType: argsJson[1],
      creationDate: date,
      owner: argsJson[2],
      parts: argsJson[3] // array of Parts serialnumber to be passed

    };
    await ctx.stub.putState(argsJson[0], Buffer.from(JSON.stringify(product)));

  }

  // To get Part asset based on there serial number 
  async getPartsBySerialnumber(ctx, args) {
	  
    const iterator = await ctx.stub.getQueryResult("{\"selector\":{\"docType\":\"Parts\",\"serialnumber\":\"" + argsJson[0] + "\"}}");
    if (iterator == null) {
      throw new Error("Error in fetching details");

    }
    const allResults = [];
    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        const Key = res.value.key;
        let Record;
        try {
          Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          Record = res.value.value.toString('utf8');
        }
        allResults.push({ Key, Record });
      }
      if (res.done) {
        await iterator.close();
        return JSON.stringify(allResults);
      }
    }
  }

  // Check if the Part asset exists and belongs to the same owner who is requesting ownership change
  async newOwnerOfPart(ctx, args) {
	  
    let argsJson = JSON.parse(args);
    const iterator = await ctx.stub.getQueryResult("{\"selector\":{\"docType\":\"Parts\",\"serialNumber\":\"" + argsJson[0] + "\",\"owner\":\"" + argsJson[1] + "\"}}");                                               
    if (iterator == null) {
      throw new Error("Error in fetching details");
    }
    const res = await iterator.next();
    const parts = JSON.parse(res.value.value.toString('utf8'));
    if (parts == null) {
      throw new Error("Error in parsing parts details");
    }
    const part = {
      docType: parts.docType,
      serialNumber: parts.serialNumber,
      partType: parts.partType,
      creationDate: parts.creationDate,
      owner: argsJson[2]
    };
    await ctx.stub.putState(argsJson[0], Buffer.from(JSON.stringify(part)));
  }

  // Check if the Product asset exists and belongs to the same owner who is requesting ownership change
  async newOwnerOfProduct(ctx, args) {
	  
    let argsJson = JSON.parse(args);
    const iterator = await ctx.stub.getQueryResult("{\"selector\":{\"docType\":\"Products\",\"serialNumber\":\"" + argsJson[0] + "\",\"owner\":\"" + argsJson[1] + "\"}}");
    if (iterator == null) {
      throw new Error("Error in fetching details");
    }
    const res = await iterator.next();
    const products = JSON.parse(res.value.value.toString('utf8'));
    if (products == null) {
      throw new Error("Error in parsing products details");
    }
    const product = {
      docType: products.docType,
      serialNumber: products.serialNumber,
      productType: products.productType,
      creationDate: products.creationDate,
      owner: argsJson[2],
      parts: products.parts
    };
    await ctx.stub.putState(argsJson[0], Buffer.from(JSON.stringify(product)));
  }

  // To get history of a particular Product asset 
  async getHistoryOfProduct(ctx, args) {
	  
    let iterator = await ctx.stub.getHistoryForKey(argsJson[0]);
    let result = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value) {
        const obj = JSON.parse(res.value.value.toString('utf8'));
        result.push(obj);
      }
      res = await iterator.next();
    }
    await iterator.close();
    return result;
  }

}
module.exports = ProductManagement;
