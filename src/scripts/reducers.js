// Abstraction of Reducer Redux
Reducer = function(state, action) {
  state = state || {};

  switch(action.type) {
    case ActionTypes.SAVE_QUERY:
      // using unionBy to void duplicate query
      return _.merge({}, state, {
        entities: { saved: _.unionBy(state.entities.saved, [{
            url: '/#/' + Utilty.slugify(action.query),
            label: action.query
          }], 'url')
        }
      });
    default:
      return state;
  }
};
