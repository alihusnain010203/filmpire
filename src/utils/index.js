import axios from "axios";
import {REACT_APP_TMDB_KEY} from "../../env.js"
export const MovieApi=axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params:{
        api_key:REACT_APP_TMDB_KEY
    }
})
const redirect_to=window.location.href+'/'
export const fetchToken=async()=>{
    try {
        const {data}=await MovieApi.get('/authentication/token/new');
        const requestToken=data.request_token;
        if(requestToken){
            localStorage.setItem('requestToken',requestToken);

            const url=`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirect_to}/approved`;
            window.location.href=url;
        }
    } catch (error) {
        console.log("error",error);
    }
};

export const createSessionId = async () => {
    const requestToken = localStorage.getItem('requestToken');
    
    try {
        const response = await MovieApi.post('/authentication/session/new', {
            request_token: requestToken
        });

        const { session_id } = response.data;
        localStorage.setItem('session_id', session_id);
        return session_id;
    } catch (error) {
        console.error("Error creating session ID:", error);
    }
}
