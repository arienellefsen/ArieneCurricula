// This function accepts an object from the 
// curricula table and returns up to 5 related
// by category
function getRelatedByCategory(obj, categoryToMatch, excludeId) {
    var matchObj = {};
    var currentObj = {};
    Object.keys(obj).forEach(function(item) {
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
  var uniqCatObjs = [];
  var thisCategory;
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(function (item) {
      thisCategory = obj[item].category;
      if (arrOfUniqueCategories.indexOf(thisCategory) === -1) {
        arrOfUniqueCategories.push(thisCategory)
        uniqCatObjs.push({
          cat: thisCategory
        });
      }
    });
  }

  if (arrOfUniqueCategories.length === 0) {
    return null;
  } 
  return uniqCatObjs;
}

// Accepts an object of query results and returns the results
// that are within the range of [start to end] in the form of
// an object. For example if there are 10 results in the passed
// object and limiter specifies start of 2 and end of 5 it will 
// return an object only containing results 2 through 5
function limiter(obj, start, end) {
    if (start < end && typeof start === 'number' && typeof end === 'number') {
        if (typeof obj === 'object') {
            var tempObj = {};
            var currentObj = {};
            Object.keys(obj).forEach(function(item, i) {
                currentObj = obj[item];
                if (currentObj.submited_status === true) {
                    if (i >= start && i <= end) {
                        tempObj[item] = currentObj;
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

// Accepts a string and removes special characters
// extra spaces and returns the new string in
// lower case
function cleanString(str) {
    var cleanStr = str;
    cleanStr = str.replace(/[^\w\s]/gi, ' ') // Remove non-alpha characters
        .replace(/\n/g, " ") // Change new lines to spaces
        .replace(/\s\s+/g, ' ') // Remove duplicate spaces
        .toLowerCase(); // Move all to lower case
    return cleanStr
}

// Accepts the query result object from database and 
// an array of search terms. The funciton will search 
// each parameter of the object for the terms and
// return an object with matching search results
// in a ranked order of most match to least
function search(obj, arrOfTerms) {
    var resultObj = {};
    var curItem = {};
    var resultStor = [];
    var matchScore = 0;
    var searchString = arrOfTerms.join(" ");
    arrOfTerms.push(searchString);

    Object.keys(obj).forEach(function(item) {
        // The following variable-setting extracts the fields to
        // be searched by the function
        curItem = obj[item];
        name = curItem.curricula_name.toLowerCase();
        cat = curItem.category.toLowerCase();
        subCat = curItem.sub_category.toLowerCase();
        tags = curItem.search_tags.toLowerCase();
        desc = curItem.description.toLowerCase();
        matchScore = 0;

        // Iterate the fields to be searched for each
        // search term in teh array
        arrOfTerms.forEach(function(term) {
            // Checks the curricula name fields for match
            if (name.indexOf(term) > -1) {
                matchScore += 5
                    // If the search term matches a large portion
                    // of the name field then give a higher match score
                if ((term.length / name.length) > .33) {
                    matchScore += 5;
                }
            }

            // Checks the category for a match
            if (cat.indexOf(term) > -1) {
                matchScore += 7
            }

            // Checks the sub-category for match
            if (subCat.indexOf(term) > -1) {
                matchScore += 8
            }

            // Checks search tags for matches
            if (tags.indexOf(term) > -1) {
                matchScore += 4
            }

            // Checks the description for matches
            if (desc.indexOf(term) > -1) {
                matchScore += 3
                    // if a large percentage of the description is
                    // matched then give it more weight in results
                if ((term.length / desc.length) > .33) {
                    matchScore += 5;
                }
            }
        });

        // If any matches were made then add the object to 
        // the running list of results
        if (matchScore > 0) {
            resultStor.push([matchScore, obj[item]]);
        }
    });

    // Sort the results by their match-score
    resultStor.sort(function(a, b) {
        return a[0] < b[0] ? 1 : -1;
    });

    resultStor.forEach(function(item, i) {
        resultObj['match' + i] = item[1];
    });

    return resultObj;
}

// Creates an object of category>subcategory relationships
// Output would look something like the following:
// {
//  cat1: [subCat, subCat2],
//  cat2: [subCat3, subCat4]
// }
function makeCategoryObject(curriculaObject) {
  var catArr = [];
  var subCatArr = [];
  var catObj = {};
  var curCat = "";
  var curSubCat = "";
  var curCatInSub = "";

  // Iterate each category
  Object.keys(curriculaObject).forEach(function(item) {
    curCat = curriculaObject[item].category.toLowerCase().trim();
    // If the category hasn't been seen already (or is unique)
    if (catArr.indexOf(curCat) === -1){
      catArr.push(curCat); // Add it to the seen list
      Object.keys(curriculaObject).forEach(function(item2) { // Iterate all the sub_categories
        curSubCat = curriculaObject[item2].sub_category.toLowerCase().trim();
        curCatInSub = curriculaObject[item2].category.toLowerCase().trim();
        // If the subcategory hasn't been seen yet and the category is 
        // equal to the current category being iterated then
        if (subCatArr.indexOf(curSubCat) === -1 && curCatInSub === curCat){ 
          subCatArr.push(curSubCat); // Add the subcategory to the array that will be aligned to the category
        }
      });
      // Add the subcategories mapped to that parent category to the cat Object
      // Capitalize the first letter of each word
      catObj[capsTheFirstLetterAfterSpace(curCat)] = capsTheFirstLetterAfterSpace(subCatArr.join(", ")).split(", "); 
      subCatArr = []; // Reset the subcategory array
    }
  });

  // If there are no categories to map return null
  if (Object.keys(catObj).length = 0){
    return null;
  }
  return catObj;
}

// Take a string and returns the string with capitalized first
// letter and first character after every space. Multiple 
// Example input of 'qweTy in DA    hous45[[e' will return
// value of 'QweTy In DA    Hous45[[e'
function capsTheFirstLetterAfterSpace(str) {
  if (typeof str === 'string' & str.length > 0) {
    var stringArr = [];
    stringArr = str.split('');
    var fixedString = stringArr.map(function(char, i, arr){
      if (i === 0){
        return char.toUpperCase();
      }

      if (arr[i - 1] === ' '){
        return char.toUpperCase();
      }

      return char;
    });
    return fixedString.join('');
  }
  throw Error('Must pass a string and must be longer then 0 characters.');
}

// Function accepts the curricula or curricula details data and the 
// user data and matches the author username to the userID then
// stores the username in a new curricula object and returns the new object
// Example passing in:
// {
//   curricula_name: ...,
//   category: ...,
//   ...
//   authorId: 1
// }
// will return:
// {
//   curricula_name: ...,
//   category: ...,
//   ...
//   authorId: 1
//   authName: someUsername
// }
function matchAuthorsById(currData, usrData, from) {
  var revisedCurrData = currData;

  Object.keys(currData).forEach(function(curr) {
    Object.keys(usrData).forEach(function(usr) {
      if (usrData[usr].id === currData[curr].authorId) {
        revisedCurrData[curr].authName = usrData[usr].username;
      }
    });
  });
  return revisedCurrData;
}

exports.getRelatedByCategory = getRelatedByCategory;
exports.getUniqueCategories = getUniqueCategories;
exports.limiter = limiter;
exports.cleanString = cleanString;
exports.search = search;
exports.makeCategoryObject = makeCategoryObject;
exports.capsTheFirstLetterAfterSpace = capsTheFirstLetterAfterSpace;
exports.matchAuthorsById = matchAuthorsById;

