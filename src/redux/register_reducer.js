import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const DangKyTaiKhoan = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosInstance().post('/users/register', data);
      if (response.error) {
        return thunkAPI.rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerData: {},
    registerStatus: 'idle',
  },
  reducers: {
    clearRegisterData: state => {
      state.registerData = {};
      state.registerStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(DangKyTaiKhoan.pending, (state, action) => {
        state.registerStatus = 'loading';
      })
      .addCase(DangKyTaiKhoan.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        // console.log(state.registerStatus);
        state.registerData = action.payload; // Gán dữ liệu người dùng từ action.payload
      })
      .addCase(DangKyTaiKhoan.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerData = action.payload; // In ra lỗi từ action.payload
      });
  },
});
export const {clearRegisterData} = registerSlice.actions;
export default registerSlice.reducer;
