const initialState = {
  users: {
    loggedIn: false,
    delete: false,
    deleteId: "",
    edit: false,
    editObj: "",
    invoiceStatus: "",
    invoices: [],
    status: false,
    invoiceObj: {},
    refresh: false,
  },
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVOICE":
      return {
        ...state,

        users: {
          ...state.users,
          invoices: action.payload.invoices,
        },
      };
    case "RE_FETCH":
      return {
        ...state,

        users: {
          ...state.users,
          status: action.payload.status,
        },
      };
    case "SINGLE_INVOICE":
      return {
        ...state,

        users: {
          ...state.users,
          invoiceObj: action.payload.obj,
          refresh: action.payload.refresh,
        },
      };

    case "LOG_OUT":
      return {
        ...state,

        users: {
          ...state.users,
          loggedIn: action.payload.drawer,
          delete: false,
        },
      };
    case "DELETE_ALERT":
      return {
        ...state,
        users: {
          ...state.users,
          delete: action.payload.show,
          deleteId: action.payload.id,
        },
      };
    case "EDIT_INVOICE": {
      return {
        ...state,
        users: {
          ...state.users,
          edit: action.payload.drawer,
          editObj: action.payload.obj,
          deleteId: action.payload.id,
        },
      };
    }

    case "INVOICE_STATUS":
      return {
        ...state,
        users: {
          ...state.users,
          invoiceStatus: action.payload.stus,
        },
      };

    default:
      return state;
  }
};

export const user = currentUser;
