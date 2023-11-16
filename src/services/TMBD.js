import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REACT_APP_TMDB_KEY } from '../../env.js'
// 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
export const tmbdApi = createApi({
    reducerPath: 'tmbdApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        //get genres
        GetGenres: builder.query({
            query: () => `genre/movie/list?api_key=${REACT_APP_TMDB_KEY}`,
        }),
        // Get Movie by Type
        getMovieByType: builder.query({
            query: ({ currentGenreOrCategorieName, page, searchQuery }) => {
                if (searchQuery) {
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${REACT_APP_TMDB_KEY}`
                }
                if (currentGenreOrCategorieName && typeof currentGenreOrCategorieName === 'string') {
                    return `movie/${currentGenreOrCategorieName}?&page=${page}&api_key=${REACT_APP_TMDB_KEY}`
                }
                if (currentGenreOrCategorieName && typeof currentGenreOrCategorieName === 'number') {
                    return `discover/movie?with_genres=${currentGenreOrCategorieName}&api_key=${REACT_APP_TMDB_KEY}&page=${page}`
                }
                return `movie/popular?api_key=${REACT_APP_TMDB_KEY}&page=${page}`
            }
        }),
        //Get Recomended Movies
        getRecomendedMovies: builder.query({
            query: ({ movie_id }) => `movie/${movie_id}/recommendations?api_key=${REACT_APP_TMDB_KEY}`
        }),
        //Get Favourite and Watchlist
        getFavouriteAndWatchlist: builder.query({
            query: ({ user_id, session_id,ListName}) => `account/${user_id}/${ListName}/movies?api_key=${REACT_APP_TMDB_KEY}&session_id=${session_id}`,
        }),
        // GetMovieDetail
        getMovieDetail: builder.query({
            query: (id) => `movie/${id}?append_to_response=credits,videos,images&api_key=${REACT_APP_TMDB_KEY}`
        }),
        // Get Actors Details
        getActorsDetails: builder.query({
            query: (id) => `person/${id}?api_key=${REACT_APP_TMDB_KEY}`
        }),
        // getMovieByactors
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${REACT_APP_TMDB_KEY}`,
          }),

    })
})

export const { useGetMovieByTypeQuery, useGetGenresQuery, useGetMovieDetailQuery, useGetRecomendedMoviesQuery, useGetActorsDetailsQuery, useGetMoviesByActorIdQuery, useGetFavouriteAndWatchlistQuery } = tmbdApi