/*
Instructions:
(1) Rewrite get with the Fetch API: https://davidwalsh.name/fetch
(2) Finish the getJSON method. getJSON should take a URL and return the parsed JSON response.
  (a) getJSON needs to return a Promise!
(3) Test by console.logging the response and by passing the query string from getJSON to addSearchHeader.
(4) Handle errors by passing "unknown" to addSearchHeader.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */
// more on the fetch API here : https://developer.mozilla.org/en/docs/Web/API/Fetch_API
// and here is the official MDN article https://developer.mozilla.org/en/docs/Web/API/Fetch_API#Browser_compatibility
// not very useful for production, since safari and opera not yet compatible with fetch

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  /**
   * XHR wrapped in a Promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    // this makes it so that the get function returns a fetch promise.
    return fetch(url, {

    // this sets the method of async. retreival, and is optional
      method: 'get'
    });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    // returns fetch promise, and the .then method after successful response
    return get(url).then(function(response) {
      // once response has been received, is the same as json.parse.
      // this response.json() function is specific to the fetch API
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    // loads the web components by selecting the home section of the application
    home = document.querySelector('section[data-route="home"]');
    // returns the JSON file based on the 
    getJSON('../data/earth-like-results.json')
    // after json retreival adds the query to the header, and a console log with the response of the request.
    .then(function(response) {
      addSearchHeader(response.query);
      console.log(response);
    })
    // catches the request if there are any errors
    .catch(function(error) {
      addSearchHeader('unknown');
      console.log(error);
    });
  });
})(document);
