import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

interface IData {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IDataState {
  data: IData[] | null;
  loading: boolean;
}

const initialState: IDataState = {
  loading: true,
  data: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    initData: (state, { payload }: { payload: IData[] }) => {
      return {
        loading: false,
        data: payload,
      };
    },
    addData: (state, { payload }) => {
      state.data?.push(payload);
    },
    editData: (state, { payload }) => {
      if (state.data) state.data[payload.index] = payload.data;
    },
    deleteData: (state, { payload }) => {
      if (state.data?.length)
        state.data = state.data?.filter((user) => user.id !== payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { initData, addData, editData, deleteData } = dataSlice.actions;

export const initDataThunk = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token");

  var config = {
    url: "https://dz-dev-discord-assigment1-api.herokuapp.com/data",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios(config);

  dispatch(initData(data));
};

export default dataSlice.reducer;
