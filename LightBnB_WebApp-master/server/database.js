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
const getUserWithEmail = function (email) {
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

const getUserWithId = function (id) {
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

const addUser = function (user) {
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
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.id, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.title, properties.parking_spaces, property_reviews.rating, properties.cost_per_night, reservations.start_date, reservations.end_date
    FROM reservations
    JOIN properties On reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = $1
    LIMIT $2`
    , [1, limit])
    //
    //NEED TO FIX SO WE CAN ADD A GUEST ID!!!!!!!!!!!!!!!!!!!
    //
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1 
  `;

  // 3

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND properties.city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  }
  queryString += `GROUP BY properties.id `

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows;
    });
}


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  console.log("ADD PROPERTY");

  const data = [property.title, property.description, property.number_of_bedrooms, property.number_of_bathrooms, property.parking_spaces,
  property.cost_per_night, property.thumbnail_photo_url, property.cover_photo_url, property.street, property.country, property.city, property.province, property.post_code, property.owner_id]

  return pool.query(`
  INSERT INTO properties(name, email, password)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
  `, data)
    .then(res => {
      if (res.rows[0].name || res.rows[0].email) {
        return res.rows[0]
      } else {
        return null;
      }
    });
}
exports.addProperty = addProperty;
