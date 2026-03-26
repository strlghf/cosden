import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value === 0) return

      state.value -= 1;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementBy: (state, action: PayloadAction<number>) => {
      if (state.value <= 9) return

      state.value -= action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, () => {
      console.log("incrementAsync.pending");
    })
    .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.value += action.payload
    });

    builder.addCase(decrementAsync.pending, () => {
      console.log("decrementAsync.pending");
    })
    .addCase(decrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
      if (state.value === 0) return

      state.value -= action.payload
    })
  }
}); 

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return amount;
  }
)

export const decrementAsync = createAsyncThunk(
  "counter/decrementAsync",
  async (amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return amount;
  }
)

export const { increment, decrement, incrementBy, decrementBy } = counterSlice.actions;

export default counterSlice.reducer;