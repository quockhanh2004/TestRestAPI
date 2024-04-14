import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const putMethod = createAsyncThunk(
  '/putMethod',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosInstance().put(data.link, data.body);
      if (response.error) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const methodSlice = createSlice({
  name: 'putMethod',
  initialState: {
    putMethodData: {},
    putMethodStatus: 'idle',
  },
  reducers: {
    clearDataPut: state => {
      state.putMethodData = {};
      state.putMethodStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(putMethod.pending, (state, action) => {
        state.putMethodStatus = 'loading';
      })
      .addCase(putMethod.fulfilled, (state, action) => {
        state.putMethodStatus = 'succeeded';
        state.putMethodData = action.payload; // Gán dữ liệu người dùng từ action.payload
      })
      .addCase(putMethod.rejected, (state, action) => {
        state.putMethodStatus = 'failed';
        state.putMethodData = action.payload; // In ra lỗi từ action.payload
      });
  },
});

export const {clearDataPut} = methodSlice.actions;
export default methodSlice.reducer;
