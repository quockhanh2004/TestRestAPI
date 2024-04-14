import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const DangNhap = createAsyncThunk(
  'user/login',
  async (data, thunkAPI) => {
    try {
      const response = await AxiosInstance().post('/users/login', data);
      if (response.error) {
        return thunkAPI.rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    loginData: {},
    loginStatus: 'idle',
  },
  reducers: {
    clearData: state => {
      state.loginData = {};
      state.loginStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(DangNhap.pending, (state, action) => {
        state.loginStatus = 'loading';
      })
      .addCase(DangNhap.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.loginData = action.payload;
      })
      .addCase(DangNhap.rejected, (state, action) => {
        state.loginStatus = 'failed';
        console.log(action.payload);
      });
  },
});
export const {clearData} = LoginSlice.actions;
export default LoginSlice.reducer;
