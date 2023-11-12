import { createSlice } from "@reduxjs/toolkit";

export const currentGenreOrCategorie = createSlice({
    name: 'currentGenreOrCategorie',
    initialState: {
        currentGenreOrCategorieName: "",
        page:1,
        searchQuery:""
    },
    reducers:{
        selectGenreOrCategorie:(state,action)=>{
            state.currentGenreOrCategorieName = action.payload;
            state.searchQuery = ""
        },
        searchMovie:(state,action)=>{
            state.searchQuery = action.payload
        }
    }

})
export const {selectGenreOrCategorie , searchMovie} = currentGenreOrCategorie.actions;
export default currentGenreOrCategorie.reducer;