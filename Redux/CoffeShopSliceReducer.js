import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {
    addCoffeeShopData,
    deleteBasedOnId,
    getCoffeeShopData,
    getSingleCoffeeShopData
} from "../Firebase/firebaseConfig";

const coffeeAdapter = createEntityAdapter({
    selectId: coffee => coffee.id
})
export const getCoffeeShopDataAsync = createAsyncThunk(
    "CoffeeShop/getCoffeeShopData",
    async (_, thunkApi) => {

        try {
            return await getCoffeeShopData();


        } catch (e) {
            thunkApi.rejectWithValue(e.message());
        }

    }
)
export const deleteCoffeeShopAsync = createAsyncThunk(
    "CoffeeShop/SinglegetCoffeeShopData",
    async ({id}, thunkApi) => {
        try {
            await deleteBasedOnId(id);
            return id;
        } catch (e) {

        }
    }
)

export const getSingleCoffeeShopDataAsync = createAsyncThunk(
    "CoffeeShop/Delete",
    async ({id}, thunkApi) => {
        try {
            return await getSingleCoffeeShopData(id);
        } catch (e) {
            thunkApi.rejectWithValue(e.message());
        }
    }
)

export const addCoffeeShopDataAsync = createAsyncThunk(
    "CoffeeShop/AddCoffeeShopData",
    async ({data}, thunkApi) => {
        try {
            await addCoffeeShopData(data);
        } catch (e) {
            thunkApi.rejectWithValue(e.message());
        }
    }
)

export const coffeeShopSlice = createSlice({
    name: "coffeeShop",
    initialState: coffeeAdapter.getInitialState({
        loading: false,
        tags: [],
        searchTerm: [],

    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoffeeShopDataAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCoffeeShopDataAsync.fulfilled, (state, {payload}) => {
            state.loading = false;
            coffeeAdapter.setAll(state, payload);
            state.error = null;
        });
        builder.addCase(getCoffeeShopDataAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });

        builder.addCase(addCoffeeShopDataAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(addCoffeeShopDataAsync.fulfilled, (state) => {
            state.loading = false
            state.error = null;
        });

        builder.addCase(addCoffeeShopDataAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });


        builder.addCase(getSingleCoffeeShopDataAsync.pending, (state) => {
            state.loading = false;

        });
        builder.addCase(getSingleCoffeeShopDataAsync.fulfilled, (state, {payload}) => {
            state.loading = false;
            coffeeAdapter.upsertOne(state, payload);
            state.error = null;
        });
        builder.addCase(getSingleCoffeeShopDataAsync.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })

        builder.addCase(deleteCoffeeShopAsync.pending, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteCoffeeShopAsync.fulfilled, (state, {payload}) => {
            state.loading = false
            coffeeAdapter.removeOne(state, payload);
            state.error = null;
        })
        builder.addCase(deleteCoffeeShopAsync.rejected, (state, {payload}) => {
            state.loading = false

            state.error = payload
        })


    }
})

export const coffeeSelector = coffeeAdapter.getSelectors(state => state.coffeeShop);

export const coffeeShopReducer = coffeeShopSlice.reducer;


