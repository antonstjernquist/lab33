let rootReducer = (state, action) => {
    switch( action.type ) {

        case 'UPDATE':
            return {
                ...state,
                value: state.value + action.amount
            };

        default:
            return state;
    }
};

export default rootReducer;