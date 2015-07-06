var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Your code here.

//Function that uses reduce and concat to "flatten" an array of arrays
function arrayFlattener(arrayOfArrays) {

  function concatToFlat(array1, array2) {
    return array1.concat(array2);
  }

  return arrayOfArrays.reduce(concatToFlat);

}

console.log(arrayFlattener([[1,2],[3,4],[5,6]]));

//Calculates the average age difference of mothers and children, for available mother
//data in the data set. Uses the byName object, and the average function provided.
function motherAgeDiff(ancestry) {
  var ageDiffs, ageDiff, mother;
  ageDiffs = [];

  for (var person in ancestry) {
    mother = byName[ancestry[person].mother];
    if (mother != null) {
      ageDiff = ancestry[person].born - mother.born;
      ageDiffs.push(ageDiff);
    }
  }

  return average(ageDiffs);
}

console.log(motherAgeDiff(ancestry));

//Groups values stored in an array using a function, returns a map of group
//names to arrays of group members
function groupBy(array, f) {
  var groups, grouping;
  groups = {};
  for (var i = 0; i < array.length; i ++) {
    //Use function to find grouping
    grouping = f(array[i]);
    //Check if grouping already in groups object, if not create array
    if (!groups.hasOwnProperty(grouping)) {
      groups[grouping] = [];
    }
    //Add item to grouping array in groups
    groups[grouping].push(array[i]);
  }
  return groups;
}

//Takes a person, and returns the century in which they died
function centuryGrouping(person) {
  return (Math.ceil(person.died / 100));
}

//Takes an object with groupings mapped to arrays of group members, and a function to
//apply to each grouping, and returns an object with groupings mapped to new values.
function mapFlattener(mapObject, f) {
  var flattenedMap = {};
  for (var each in mapObject) {
    //Check to ensure that property is that of mapObject, and not from prototype chain
    if (mapObject.hasOwnProperty(each)) {
        flattenedMap[each] = f(mapObject[each]);
    };
  }

  return flattenedMap;
}

//Takes an array of person objects, returns the average age at death for that array.
function avgAge(personArray) {
  var ages = [];
  for (var i = 0; i < personArray.length; i++) {
    ages.push(personArray[i].died - personArray[i].born);
  }
  return average(ages);
}

var centuryGroups = groupBy(ancestry,centuryGrouping);
console.log(mapFlattener(centuryGroups, avgAge));

//Returns true if test function true for all array members, false otherwise.
function every(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (!f(array[i])) {
      return false;
    }
  }
  return true;
}

//Returns true if test function true for any array member, false otherwise.
function some(array, f) {
  for (var i = 0; i < array.length; i++) {
    if (f(array[i])) {
      return true;
    }
  }
  return false;
}

function greaterThanTen(number) {
  return number > 10;
}

function lessThanTen(number) {
  return number < 10;
}

console.log(every([1,2,7,8,9],lessThanTen));
console.log(every([1,2,7,8,9,10],lessThanTen));
console.log(every([1,2,7,8,9,100],greaterThanTen));
console.log(some([1,2,7,8,9,10],lessThanTen));
console.log(some([1,2,7,8,9],greaterThanTen));
console.log(some([1,2,7,8,9,100],greaterThanTen));

