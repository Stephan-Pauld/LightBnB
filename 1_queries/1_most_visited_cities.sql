SELECT city, COUNT(reservations.*)
FROM properties
JOIN reservations ON properties.id = property_id
GROUP BY city
ORDER BY COUNT(reservations.*) DESC;