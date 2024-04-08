import BaseApi from './BaseApi';

class AuctionApi extends BaseApi{

    getAllAuctions(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/auction`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getByFilter(setData, auctionFilter){
        const method = "POST";
        const url = `${this.baseUrl}api/v1/auction/filter`;
        console.log(url);
        super.myFetch(setData, method, url, auctionFilter);
    }

    getPet(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/auction/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

}

export default AuctionApi;