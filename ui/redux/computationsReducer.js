const defaultState = {
  fields: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'COMPUTATIONS.ADD': {
      return {
        ...state,
        fields: [
          ...state.fields,
          {
            index: state.fields.length,
            shortname: '',
            fullname: '',
            field: '',
            inputs: [],
            scale: { op: 'MULTIPLY', value: 1 },
            isPostProcessed: true,
          },
        ],
      }
    }

    case 'COMPUTATIONS.REMOVE': {
      return {
        ...state,
        fields: state.fields.filter(item => item.index !== action.index),
      }
    }

    case 'COMPUTATIONS.UPDATE_SHORT_NAME':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, shortname: action.shortname }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.UPDATE_FULL_NAME':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, fullname: action.fullname }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.UPDATE_FIELD':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, field: action.field }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.UPDATE_INPUTS':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, inputs: action.inputs }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.SET_SCALE_OP':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, scale: { ...item.scale, op: action.op } }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.SET_SCALE_VALUE':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, scale: { ...item.scale, value: action.value } }
          }
          return item
        }),
      }

    case 'COMPUTATIONS.TOGGLE_POST_PROCESS':
      return {
        ...state,
        fields: state.fields.map(item => {
          if (item.index === action.index) {
            return { ...item, isPostProcessed: !item.isPostProcessed }
          }
          return item
        }),
      }

    default: {
      return state
    }
  }
}
