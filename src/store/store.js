// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Crear un slice con su reducer y acciones
const counterSlice = createSlice({
  name: 'user',
  initialState: { user: '' },
  reducers: {
    setUser: (state, u) => {
      state.value = u;
    },
  }
});

// Exportar las acciones para usarlas en los componentes
export const { setUser } = counterSlice.actions;

// Configurar el store
const store = configureStore({
  reducer: {
    user: counterSlice.reducer
  }
});

export default store;
