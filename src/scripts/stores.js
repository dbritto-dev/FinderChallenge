// Abstraction of Store Redux
Store = (function(reducer) {
  var state;
  var listeners = [];

  var setInitialState = function(initialState) {
    state = initialState;
  };

  var getState = function() {
    return state;
  };

  var dispatch = function(action) {
    state = reducer(state, action);
    _.each(listeners, function(listener) {
      listener();
    });
  };

  var subscribe = function(listener) {
    listeners.push(listener);
    return function() {
      listeners = _.filter(listeners, function(l) {
        return l !== listener;
      });
    };
  };

  dispatch({});

  return {
    setInitialState: setInitialState,
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
})(Reducer);
