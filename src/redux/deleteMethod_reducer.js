import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const deleteMethod = createAsyncThunk(
  '/deleteMethod',
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
  name: 'deleteMethod',
  initialState: {
    deleteMethodData: {},
    deleteMethodStatus: 'idle',
  },
  reducers: {
    clearDataDelete: state => {
      state.deleteMethodData = {};
      state.deleteMethodStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteMethod.pending, (state, action) => {
        state.deleteMethodStatus = 'loading';
      })
      .addCase(deleteMethod.fulfilled, (state, action) => {
        state.deleteMethodStatus = 'succeeded';
        state.deleteMethodData = action.payload; // Gán dữ liệu người dùng từ action.payload
      })
      .addCase(deleteMethod.rejected, (state, action) => {
        state.deleteMethodStatus = 'failed';
        state.deleteMethodData = action.payload; // In ra lỗi từ action.payload
      });
  },
});

export const {clearDataDelete} = methodSlice.actions;
export default methodSlice.reducer;
