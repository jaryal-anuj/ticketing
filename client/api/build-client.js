import axios from "axios";

export default ({ req })=>{
    //console.log(req.headers.host);
    if(typeof window === 'undefined'){
        let baseURL = "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";
        if(req.headers.host.includes('anujdev-apps.online')){
            baseURL="https://www.anujdev-apps.online";
        }
        return axios.create({
            baseURL:baseURL,
            headers:req.headers
        });
    }else{
        return axios.create({
            baseURL:"/"
        });
    }
}