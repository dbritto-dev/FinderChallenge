/*
  main script for only runs every function
*/

loadJSON('books-schema.json', function(state) {
  Store.setInitialState(state);
  Store.subscribe(render);
  render();

  // Render Side Bar
  SideBarRender(Store.getState().entities);

  // set awesomeplete
  var $query = document.getElementById('query'),
      $queryButton = document.getElementById('queryButton'),
      queryComplete = new Awesomplete($query, {
        minChars: 3,
        maxItems: 7,
        list: _.map(Store.getState().data, 'title')
      });

  var queryHandler = function() {
    ContentRender(SearchBooks(Store.getState().data, {
      type: 'SEARCH_BY_QUERY',
      query: $query.value
    }));
  };

  $queryButton.addEventListener('click', queryHandler, false);
  $query.addEventListener('keyup', function(e) {
    var key = e.which || e.keyCode;

    console.log(this.value.length);
    if (this.value.length > 2) {
      $queryButton.removeAttribute("disabled");
    } else {
      $queryButton.setAttribute("disabled", true);
    }

    // key code 13 is Enter
    if (key == 13) {
      queryHandler();
    }
  }, false);

  // set event to fiterls
  var $filters = document.querySelectorAll('[data-filter]');
  _.each($filters, function($filter) {
    $filter.addEventListener('click', function() {
      var type = $filter.getAttribute('data-filter'),
          query = $filter.getAttribute('data-query');

      switch(type) {
        case "query":
          ContentRender(SearchBooks(Store.getState().data, {
            type: 'SEARCH_BY_QUERY',
            query: query
          }));
          break;

        case "category":
          ContentRender(SearchBooks(Store.getState().data, {
            type: 'SEARCH_BY_CATEGORY',
            category: query
          }));
          break;

        case "language":
          query = query == "all" ?
                  "all" :
                  Store.getState().entities.lang[0][query].id;

          ContentRender(SearchBooks(Store.getState().data, {
            type: 'SEARCH_BY_LANGUAGE',
            language: query
          }));
          break;

        case "publication":
          ContentRender(SearchBooks(Store.getState().data, {
            type: 'SEARCH_BY_TIME_AGO',
            ago: query
          }));
          break;

        case "presentation":
            query = query == "all" ?
                    "all" :
                    Store.getState().entities.edition[0][query].id;

          ContentRender(SearchBooks(Store.getState().data, {
            type: 'SEARCH_BY_PRESENTATION',
            presentation: query
          }));
          break;

        default:
          ContentRender(Store.getState().data);
          break;
      }
    }, false);
  });
});
