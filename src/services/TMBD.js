import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";        
import {REACT_APP_TMDB_KEY} from '../../env.js'
// 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
export const tmbdApi = createApi({
    reducerPath:'tmbdApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder)=>({
        //get genres
     GetGenres:builder.query({
         query:()=>`genre/movie/list?api_key=${REACT_APP_TMDB_KEY}`,
     }),
        // Get Movie by Type
        getMovieByType: builder.query({
            query: ({currentGenreOrCategorieName,page,searchQuery}) =>{
                if(searchQuery){
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${REACT_APP_TMDB_KEY}`
                }
                if(currentGenreOrCategorieName && typeof currentGenreOrCategorieName === 'string'){
                    return `movie/${currentGenreOrCategorieName}?&page=${page}&api_key=${REACT_APP_TMDB_KEY}`
                }
                if(currentGenreOrCategorieName && typeof currentGenreOrCategorieName === 'number'){
                    return `discover/movie?with_genres=${currentGenreOrCategorieName}&api_key=${REACT_APP_TMDB_KEY}&page=${page}`
                }
                return `movie/popular?api_key=${REACT_APP_TMDB_KEY}&page=${page}`
            }
        }),
    })
})

export const {useGetMovieByTypeQuery,useGetGenresQuery} = tmbdApi