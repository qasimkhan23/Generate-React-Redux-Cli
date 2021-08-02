module.exports = `const defaultState = {
  exmaple: "",
};
function reducer(state = defaultState, action) {
  switch (action.type) {
    case "EXAMPLE": {
      return {
        ...state,
        exmaple: "update here",
      };
    }
    default:
      return state;
  }
}
export default reducer;
`;
