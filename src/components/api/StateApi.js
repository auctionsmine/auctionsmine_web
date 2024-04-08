import BaseApi from './BaseApi';

class StateApi extends BaseApi{

    getAllStates(setData){
        const method = "GET";
        const url = `${this.baseUrl}api/v1/state`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

}

export default StateApi;