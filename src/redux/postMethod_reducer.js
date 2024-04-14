import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const postMethod = createAsyncThunk(
  '/postMethod',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosInstance().post(data.link, data.body);
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
  name: 'postMethod',
  initialState: {
    postMethodData: {},
    postMethodStatus: 'idle',
  },
  reducers: {
    clearDataPost: state => {
      state.postMethodData = {};
      state.postMethodStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postMethod.pending, (state, action) => {
        state.postMethodStatus = 'loading';
      })
      .addCase(postMethod.fulfilled, (state, action) => {
        state.postMethodStatus = 'succeeded';
        state.postMethodData = action.payload; // Gán dữ liệu người dùng từ action.payload
      })
      .addCase(postMethod.rejected, (state, action) => {
        state.postMethodStatus = 'failed';
        state.postMethodData = action.payload; // In ra lỗi từ action.payload
      });
  },
});

export const {clearDataPost} = methodSlice.actions;
export default methodSlice.reducer;
