import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'counter',
  initialState: {
    userData: {
      name: '',
      email: '',
      gender: '',
    },
    fatherInfo: {
      name: '',
    email: '',
    gender: '',
    },
    address: {
      residentialAddress: '',
      residentialDistrict: '',
      residentialState: '',
      residentialPincode: '',
      permanentAddress: '',
      permanentDistrict: '',
      permanentState: '',
      permanentPincode: '',
      copyResidential: false,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setFatherInfo: (state, action) => {
      state.fatherInfo = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setUser, setFatherInfo, setAddress } = registerSlice.actions;
