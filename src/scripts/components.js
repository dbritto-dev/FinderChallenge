//> Components
var SideBarQueriesRender = function(entities) {
  var $queries = document.querySelector('.queries');
  var queriesHTML = _.template(
    '<% _.each(queries, function(query) { %> <li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="<%- query.label %>" data-filter="query"><%- query.label %></a></li> <% }) %>'
  )({ queries: entities.saved });

  $queries.innerHTML = queriesHTML;
};

var SideBarRender = function(entities) {
  var $categories = document.querySelector('.categories');
  var categoriesHTML = '<li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="all" data-filter="category">Todos</a></li>' + _.template(
    '<% _.forIn(categories, function(category, key) { %> <li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="<%- key %>" data-filter="category"><%- category.label %></a></li> <% }) %>'
  )({ categories: entities.categories[0] });

  $categories.innerHTML = categoriesHTML;

  var $languages = document.querySelector('.languages');
  var languagesHTML = '<li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="all" data-filter="language">Todos</a></li>' + _.template(
    '<% _.forIn(languages, function(language, key) { %> <li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="<%- key %>" data-filter="language"><%- language.label %></a></li> <% }) %>'
  )({ languages: entities.lang[0] });

  $languages.innerHTML = languagesHTML;

  var $publication = document.querySelector('.publication');
  var publicationHTML = _.template(
    '<% _.forIn(publication, function(ago, key) { %> <li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="<%- key %>" data-filter="publication"><%- ago.label %></a></li> <% }) %>'
  )({ publication: {
        "all": { label: "Todos" },
        "today": { label: "Hoy" },
        "weeks": { label: "Hace una semana" },
        "months": { label: "Hace un mes" },
        "years": { label: "Hace un año" }
      }
  });

  $publication.innerHTML = publicationHTML;

  var $presentation = document.querySelector('.presentation');
  var presentationHTML = _.template(
    '<% _.forIn(editions, function(edition, key) { %> <li class="pure-menu-item"><a class="pure-menu-link" href="javascript:void(0)" data-query="<%- key %>" data-filter="presentation"><%- edition.label %></a></li> <% }) %>'
  )({ editions: entities.edition[0] });

  $presentation.innerHTML = presentationHTML;
};

var ContentRender = function(books) {
  var $content = document.querySelector('.content');
  var contentHTML = _.template(
    '<% _.each(books, function(book) { %> <div class="pure-u-1-3 book"> <img src="<%- book.image %>"> <h5 class="pure-menu-heading"><%- book.title %></h5> <p style="font-size: 13px"><%- book.teaser %></p> </div> <% }) %>'
  )({ books: _.take(books, 9) });

  $content.innerHTML = contentHTML;
};

var render = function() {
  SideBarQueriesRender(Store.getState().entities);
  ContentRender(Store.getState().data);
};
