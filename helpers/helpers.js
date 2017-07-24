// This function accepts an object from the 
// curricula table and returns up to 5 related
// by category
function getRelatedByCategory(obj, categoryToMatch, excludeId) {
  var matchObj = {};
  var currentObj = {};
  Object.keys(obj).forEach(function (item) {
    currentObj = obj[item];
    if ((currentObj.category === categoryToMatch) && (currentObj.id !== excludeId)) {
      matchObj[item] = currentObj;
    }
  });

  return matchObj;
}

// This function returns an array of unique categories
// derived from the database object of curricula
function getUniqueCategories(obj) {
  var arrOfUniqueCategories = [];
  var thisCategory;
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(function (item) {
      thisCategory = obj[item].category;
      if (arrOfUniqueCategories.indexOf(thisCategory) === -1) {
        arrOfUniqueCategories.push(thisCategory)
      }
    });
  }

  if (arrOfUniqueCategories.length === 0) {
    return null;
  } 
  return arrOfUniqueCategories;
}

// Accepts an object of query results and returns the results
// that are within the range of [start to end] in the form of
// an object. For example if there are 10 results in the passed
// object and limiter specifies start of 2 and end of 5 it will 
// return an object only cantaining results 2 through 5
function limiter(obj, start, end) {
  if (start < end && typeof start === 'number' && typeof end === 'number') {
    if (typeof obj === 'object') {
      var tempObj = {};
      var currentObj = {};
      Object.keys(obj).forEach(function (item, i) {
        currentObj = obj[item];
        if (currentObj.submited_status === true){ 
          if (i >= start && i <= end) {
            tempObj[item] =currentObj;
          }
        } else {
          end += 1;
        }
      });
      return tempObj;
    } else {
      throw Error('Did not pass an object to the funtion.')
    }
  } else {
    throw Error('The start and end points are invalid!');
  }
}

exports.getRelatedByCategory = getRelatedByCategory;
exports.getUniqueCategories = getUniqueCategories;
exports.limiter = limiter;