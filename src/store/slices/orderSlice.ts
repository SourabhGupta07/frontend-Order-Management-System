import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

interface Order {
  _id: string;
  customerName: string;
  email: string;
  contactNumber: string;
  shippingAddress: string;
  productName: string;
  quantity: number;
  productImage?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    search: string;
    dateFrom: string;
    dateTo: string;
  };
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {
    search: '',
    dateFrom: '',
    dateTo: '',
  },
};

// 🔹 Fetch orders with filters + pagination
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/orders', { params });
      return response.data; // { data: [], pagination: {} }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// 🔹 Update order quantity
export const updateOrderQuantity = createAsyncThunk(
  'orders/updateQuantity',
  async (
    { id, quantity }: { id: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/quantity`, {
        quantity,
      });
      return response.data.data; // ✅ must return updated order
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update quantity'
      );
    }
  }
);

// 🔹 Delete order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/orders/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete order'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.pagination.total += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update order
      .addCase(updateOrderQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
        state.pagination.total -= 1;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearError, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
