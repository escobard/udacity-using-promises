/*
Instructions:
(1) Refactor .forEach below to create a sequence of Promises that always resolves in the same
    order it was created.
  (a) Fetch each planet's JSON from the array of URLs in the search results.
  (b) Call createPlanetThumb on each planet's response data to add it to the page.
(2) Use developer tools to determine if the planets are being fetched in series or in parallel.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

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
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Refactor this code!
     */
    getJSON('../data/earth-like-results.json')
    .then(function(response) {

    // sets the resolve method of the new promise
    var sequence = Promise.resolve();

    // grabs the fetch.response.results array, then for each index in the array 
    // resolves the previous promise, for each arry index
      response.results.forEach(function(url) {

    // resolves the promise, then adds a .then to fetch the JSON data
    // each .then needs to wait for the promise before it to resolve() before it can execute. 
    // this makes the promises run in a sequence (one by one)
       /* sequence = sequence.then(function(){
        	return getJSON(url)
        }) */

    // to run the promises in parallel, the following might be implemented
    // this runs things in parallel because we are not adding to the promise sequence, rather it creates 2 thens to follow the original
    // promise resolve()
    // important to note that this kind of sequence can cause issues if its important to receive the .then results in an order
    	 sequence.then(function(){
    	 	return getJSON(url);
    	 })
    // follows the return of the getJSON data, and returns it for use in the next promise which generates the thumbnail
    // the foreach loop generates 2 thens, but the problem here is there are no .catch to catch errors 
        .then(createPlanetThumb);
      });
    })
    .catch(function(error){
    	console.log(error);
    })
  });
})(document);