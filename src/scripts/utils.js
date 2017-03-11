Utilty = {
  slugify: function(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');
  },
  timeAgo: function(date) {
    date = +new Date(date);

    var days = Math.floor((Date.now() - date) / (1e5 * 864)),
        weeks = Math.floor(days / 7),
        months = Math.floor(days / 30),
        years = Math.floor(days / 365);

    if (years >= 1) {
      return 'years';
    } else if (months >= 1) {
      return 'months';
    } else if (weeks >= 1) {
      return 'weeks';
    } else if (days >= 1) {
      return 'days';
    } else {
      return 'today';
    }
  }
};
