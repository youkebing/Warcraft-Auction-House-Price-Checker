const calPrice = require("../data/calprice.js");

class PriceService{

    get_items_price(item,callback){

        let jsonComp = JSON.parse(item.comps); //convert json
        let resultData = {item:item.item,price:0,comps:[]};

        //calculate cheapest price for main item
        calPrice.itemPrice({comp:item.item,quantity:1},result => {
            resultData.price = result.num;
        });

        //calculate each comp item's cheapest price
        jsonComp.forEach(comp => {
            calPrice.itemPrice(comp,result => {
                if (typeof result === "object"){
                    resultData.comps.push(result);
                    if (resultData.comps.length == jsonComp.length){
                        callback(resultData); 
                    }
                }
            });
        });
    }
}

module.exports = {"PriceService":PriceService}