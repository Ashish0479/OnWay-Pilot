import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";


let parsedData = {};
try {
  const storedData = localStorage.getItem('data');
  if (storedData && storedData !== "undefined") {
    parsedData = JSON.parse(storedData);
  } else {
    parsedData = {};
  }
} catch (error) {
  console.warn("Invalid JSON in localStorage for 'data'", error);
  parsedData = {};
}


const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  data: parsedData,
};


export const createAccount = createAsyncThunk(
  '/auth/createAccount',
  async (data, { rejectWithValue }) => {
    console.log("incoming data to the thunk", data);
    try {
      const response = await axiosInstance.post('/rider/register', data);

      toast.promise(Promise.resolve(response), {
        success: (res) => res?.data?.message || "Account created successfully",
        loading: 'Hold back tight, we are registering your id...',
        error: 'Ohh No!, Something went wrong. Please try again.',
      });

      return response;
    } catch (error) {
      console.log("Signup Error:", error);

     
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


export const login = createAsyncThunk(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("authToken", token);
      }

      toast.promise(Promise.resolve(response), {
        success: (res) => res?.data?.message || "Logged in successfully",
        loading: 'Hold back tight, logging you in...',
        error: 'Ohh No!, Something went wrong. Please try again.',
      });

      return response;
    } catch (error) {
      console.log("Login Error:", error);

      
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const sendPhoneOTP = createAsyncThunk(
  '/auth/sendOTP',
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/send-rider-otp', { phoneNumber: phone });

      toast.promise(Promise.resolve(response), {
        success: (res) => res?.data?.message || "OTP sent successfully",
        loading: 'Sending OTP...',
        error: 'Ohh No!, Something went wrong. Please try again.',
      });

      return response;
    } catch (error) {
      console.log("Send OTP Error:", error);    
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const verifyPhoneOTP = createAsyncThunk(
  '/auth/verify-phone-otp',
  async ({ phone, otp }, { rejectWithValue }) => {
    console.log("incoming data to the thunk", phone, otp);
    try {
      const response = await axiosInstance.post('/auth/verify-rider-otp', { phoneNumber: phone, otp });
      
      const token = response?.data?.data?.token;

      if (token) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("data", JSON.stringify(response?.data?.data));
        localStorage.setItem("role", "pilot");
      
        localStorage.setItem("authToken", token);
      }

      toast.promise(Promise.resolve(response), {
        success: (res) => res?.data?.message || "OTP verified successfully",
        loading: 'Verifying OTP...',
        error: 'Ohh No!, Something went wrong. Please try again.',
      });

      return response;
    } catch (error) {
      console.log("Verify OTP Error:", error);    
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }}
);

export const logout = createAsyncThunk('/auth/logout', async () => {
  console.log("incoming data to the thunk");
  try {
    const response = axiosInstance.post('/auth/logout');
    toast.promise(response, {
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      loading: 'Logging out...',
      error: 'Ohh No!, Something went wrong. Please try again.',
    });
    const apiResponse = await response;
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.data?.userRole,
          state.data = action?.payload?.data?.data?.userData

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', action?.payload?.data?.data?.userRole);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));
      })
      .addCase(logout.fulfilled, (state) => {
        // reducer which will execute when the logout thunk is fulfilled
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('role', '');
        localStorage.setItem('data', JSON.stringify({}));
        state.isLoggedIn = false;
        state.role = '';
        state.data = {};
      })
  }
});

export default AuthSlice.reducer;