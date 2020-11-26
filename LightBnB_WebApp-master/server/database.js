const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log("EMAIL CHECK");
  return pool.query(`
  SELECT email
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => {
    if (res.rows[0]) {
      console.log("EMAIL LOOKS GOOD");
      return res.rows[0]
    } else {
      return null;
    }
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**c
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  console.log("USERID CHECK");
  return pool.query(`
  SELECT id
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => {
    if (res.rows[0]) {
      return res.rows[0]
    } else {
      return null;
    }
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser =  function(user) {
  console.log("ADD USER CHECK");
  const data = [user.name, user.email, user.password]
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, data)
  .then(res => {
    if (res.rows[0].name || res.rows[0].email) {
      return res.rows[0]
    } else {
      console.log("incorrect information");
    }
  });
  // ADD AN IF STATEMENT CHECKING IF user.name EXists in our DB
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;







// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;





/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
