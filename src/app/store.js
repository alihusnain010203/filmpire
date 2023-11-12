
import { configureStore } from "@reduxjs/toolkit";
import { tmbdApi } from "../services/TMBD";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import currentGenreOrCategorieReducer from "../features/currentGenreOrCategorie";
export const store = configureStore({
    reducer: {
        [tmbdApi.reducerPath]: tmbdApi.reducer,
        currentGenreOrCategorie: currentGenreOrCategorieReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmbdApi.middleware),
});

// Automatically set up listeners and hooks for the API
setupListeners(store.dispatch);

export default store;
