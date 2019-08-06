'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection 
 * 
 * @return {collection} array or object returned, modified by our function
 */

const each = (collection, action) => {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
};
module.exports.each = each;

/**
 * identity: returns any given value unchanged
 * 
 * @param {Any value} value: given value
 * 
 * @return {Any value} value: returns value unchanged
 */
 
const identity = (value) => {
    return value;
};
module.exports.identity = identity;

/** typeOf
* 
* Takes a value as a parameter and returns its value type, 
* (string, number, array, etc..)
* 
* @param {any value} value: any value to be checked
* 
* @return {string} param value returned as string of that value
*/

const typeOf = (value) => {
    if (Array.isArray(value)) {
        return 'array';
    } else if (value === null) {
        return "null";
    } else {
        return typeof value;
    }
};
module.exports.typOf = typeOf;

/** first
* Arguments:
*  takes an array and returns the first through however many number items of said array,
* if our argument is not an array returns an array literal.
* 
* @param {an array}  array: an array to iterate through
* @param {a number}  number: a number to check against the array
* 
* @return  {array} the first index of an array or the first element to match our number
*/

const first = (array, number) => {
    if (!Array.isArray(array) || number < 0) {
        return [];
    } else if (number === undefined || typeof number !== 'number') {
        return array[0];
    } else {
        return array.slice(0, number);
    }
};

module.exports.first = first;

/** last
* like first, but returns instead the last however mane number elements of an array
* again if there is no array it returns an array literal
* 
* @param {an array} array: The collection over which to iterate.
* @param {a number}  number:  this number checks against our array
* 
* @return  {array} the last index of an array or the last element to match our number 
*/

const last = (array, number) => {
     if (!Array.isArray(array) || number < 0) {
        return [];
    } if (number > array.length) {
          return array;
    } if (number === undefined || isNaN(number)) {
        return array[array.length-1];
    } else { 
        return array.slice(array.length-number);
    }
};
module.exports.last = last;

/** indexOf
 * loops through our array and returns the index property at that value
 * of the given  array
 * 
 * @param {an array} array: The collection over which to iterate.
 * @param {any value} value:   what to check for in array
 * 
 * @return {number} the index of our array that holds our value, or -1 if no match 
*/

const indexOf = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
        return i;
    }
} return -1;
};
module.exports.indexOf = indexOf;

/** contains
* Checks a value looped through an array, and returns true or
* false based on if that value is in the array or not.
* 
* @param {an array} array: The collection over which to iterate.
* @param {any value} value: what to check for in our array
* 
* @return  {boolean} true or false based if the value is found in the array or not
*/

const contains = (array, value) => {
  let result = false;
  for (let i = 0; i < array.length; i++) {
      result = value === array[i] ? true : result;
          }  return result;
};
module.exports.contains = contains;

/** unique
*    Takes an array and returns a new array of all elements
*  from <array> with duplicates element values removed
* 
* @param {an array} array: an array to iterate through 
* 
* @return {an array} result: returns a new array with no duplicate values
*/

const unique = (array) => {
  let result = [];
 for (let i = 0; i < array.length; i++)
  if (indexOf(result, array[i]) === -1) {
          result.push(array[i]);
    }    return result;
 };
module.exports.unique = unique;

/** filter: Designed to filter values in a collection based on a test. 
  * Takes a collection, Array or Object, and passes each value 
  * in the collection through a test Function. The test Function returns 
  * true if the value passes the test, false otherwise. Values that pass 
  * the test are collected and returned in an output Array.
  * 
  * @param {an array} array: The collection to filter.
  * @param {a function} action: The Function to be applied to each value in 
  * the collection. The test Function must return a Boolean based on some 
  * logic which tests the value given to it.
  * 
  * @return {Array}: An Array containing the filtered collection values. 
  * The Array will contain only the values that passed the test.
*/

const filter = (array, action) => {
    let result = [];
    each(array, function(element, index, arr) {
        if (action(element, index, arr)) {
     result.push(element);   
    }
    });
      return result;
};
module.exports.filter = filter;

/** reject
* Takes an array and runs its elements through a function
*  creating a new array of any and all elements that does not meet
*  the functions requirement
* 
* 
* @param {an array} array: The collection over which to iterate.
* @param {a function} action: The Function to be applied to each value in 
* the collection. 
* 
* @return {array} with elements not passed by the action function
*/

const reject = (array, action) => {
    let result = [];
    each(array, function(element, index, arr) {
        if (action(element, index, arr) === false) {
     result.push(element);   
    }
    });
      return result;
};
module.exports.reject = reject;

/** partition
* Takes an array and a function as arguments, and calls that function 
* for each element in (array) passing its element, key, array arguments
* through the function.  It will then return an array that is made up of 2 sub arrays:
* An array of our truthy values, and an array that containing the values 
* deemed falsey by our function.
* 
* @param {an array} array: The collection over which to iterate.
* @param {a function} action: The Function to be applied to each value in 
* the collection. 
* 
* @return  {an array with 2 sub arrays}   the first with truthy values, and the other with falsey values
*/

const partition = (array, action) => {
   let result = [[],[]];
       each(array, function(element, index, arr){
           if (action(element, index, arr)){
               result[0].push(element);
           }
       });
       each(array, function(element, index, arr){
           if (action(element, index, arr) === false){
               result[1].push(element);
           }
       });
       return result;
};
module.exports.partition = partition;

/** map
* Takes a collection and a function as its arguments.
* calls our each function to run through every element in our collection. 
* whether its an array or an object, and returns the value of each function call
* in a new array
* 
* @param {Array or Object} collection: The collection over which to iterate.
* @param {a Function} action: The Function to be applied to each value in 
*  the collection.
* 
* @return {array} new array with the action function call on all elements
*/

const map = (collection, action) => {
     let result = [];
     each(collection, function(element, index, arr) {
           if (action(element, index, arr)) {
               result.push(action(element, index, arr));
           }
});
 return result;
};
module.exports.map = map;

/** pluck
* Takes an array of objects and a property as arguments.
* Uses our map function to iterate through the collection, and
* return an array containing the value of property for every element in array
* 
* @param {an Array} arr: The collection over which to iterate.
* @param {a property}  prop: a property to get the value for comparison
* 
* @return {array} an array containing values that match prop param
*/

const pluck = (arr, prop) => {
  return map(arr, function(element) {
    return element[prop];  });
  };
module.exports.pluck = pluck;

/** every
* Takes a collection and a function as its arguments.
* Calls a function for every element of collection, 
* looks over the values within a collection , and returns true if all values within
* our collection are deemed true after passing through our function.
* If even one of the values returns false it will return the collections value as
* false.  If no function is passed, it will judge the truthiness of the collection
* and return a boolean
* 
* @param {Array or Object} collection: The collection over which to iterate.
* @param {Function} action: The Function to be applied to each value in 
* the collection. 
* 
* @return {boolean} returns boolean based on truthiness of elements in collection
* 
*/

const every = (collection, action) => {
   let newArray = [];
  each(collection, function(element, index, container){
      if (action === undefined && element !== false) {
          let result = true;
          newArray.push(result);
   } else if (action === undefined) {
          let result = false;
          newArray.push(result);
     } else if (action(element, index, container) === true) {
          let result = true;
          newArray.push(result);
      } else {
          let result = false;
          newArray.push(result);
      } return newArray;
  });
  if(newArray.includes(false)) {
      return false;
  } else {
      return true;
  }
};
module.exports.every = every;

/** some
* Takes a collection and a function as arguments.
* Uses our each function to iterate through all values of given collection and
* returns true if our function deems any one in the collection is true no matter if
* all other values are false
* If it is false for all elements, it returns false
* Will return true if no function is given but element value is truthy
* 
* @param {Array or Object} collection: The collection over which to iterate.
* @param {Function} action: The Function to be applied to each value in 
* the collection. 
* 
* @return {boolean} returns false unless at least one element in collection has truthiness
*/

const some = (collection, action) => {
    let newArray = [];
  each(collection, function(element, index, container){
      if (action === undefined && element) {
          let result = true;
          newArray.push(result);
   } else if (action === undefined) {
          let result = false;
          newArray.push(result);
     } else if (action(element, index, container) === true) {
          let result = true;
          newArray.push(result);
      } else {
          let result = false;
          newArray.push(result);
      } return newArray;
  });
  if(newArray.includes(true)) {
      return true;
  } else {
      return false;
  }
};
module.exports.some = some;

/** reduce
* Takes a collection, a function and a seed as it's arguments.  
* It then calls the function for every element in the collection using the seed as the first element,
* or if no seed is given, uses the first element in the collection, passing the arguments
* the function then takes the result of the first pass and uses it's returned
* value as the argument for the next iteration.  The end reult will return will give us the value 
* of the final function call
* 
* @param {Array or Object} collection: The collection over which to iterate.
* @param {a function} action: The Function to be applied to each value in 
* the collection.
* @param {a seed} seed: a starting point for function to cycle
* 
* @return - {array, object, number or string} the single value of the function call on all elements in our collection
* 
*/

 const reduce = (collection, action, seed) => {
    var prevResult;
   each(collection, function(element, index, collection) {
       if (index === 0 && seed || seed === 0) {
           prevResult = seed;
           prevResult = action(prevResult, element, index);
       } else if (index === 0 && !seed){
           prevResult = collection[0];
       } else {
           prevResult = action(prevResult, element, index);
    } 
   });  return prevResult;
};
module.exports.reduce = reduce;
/** extend
* Takes two or more object as arguments
* Goes through each object with our each function and passes all properties from
* all other objects to our first object.  It then returns that object.
* 
* @param {Object(s)} param takes two or more object
* 
* @return {object} our first object with all other properties from other objects 
*/

const extend = (obj1, ...objs) => {

   each(objs, function(element, index, objs) {
   Object.assign(obj1, objs[index]);
   });
   return obj1;
};
module.exports.extend = extend;