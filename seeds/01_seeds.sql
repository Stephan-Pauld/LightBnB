INSERT INTO users (name, email, password) 
VALUES ('Bobby Flay', 'b.flay@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),

('Kat Cora', 'k.cora@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),

('Masahara Morimoro', 'm.moto@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 

VALUES (1, 'greenhouse getaway', 'description', 'https://www.greenhouse-getaway/thumb.com', 'https://www.greenhouse-getaway/cover.com', 123, 4, 5, 6 , 'Canada', '123 cougartown', 'town1', 'B.C', 't1t2t4', true),

(2, 'poolhouse getaway', 'description', 'https://www.poolhouse-getaway/thumb.com', 'https://www.poolhouse-getaway/cover.com', 131, 2, 1, 4 , 'Canada', '123 cougartown', 'town2', 'B.C', 'y7e7d9', true),

(3, 'woodlands getaway', 'description', 'https://www.woodlands-getaway/thumb.com', 'https://www.woodlands-getaway/cover.com', 1213, 14, 35, 6 , 'Canada', '123 cougartown', 'town3', 'B.C', 'b7n6f5', false);

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) 
VALUES (1, 1, 1, '2018-09-11', '2018-09-26'),
(2, 2, 2, '2019-01-04', '2019-02-01'),
(3, 3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'messasge'),
(2, 2, 2, 5, 'messasge'),
(3, 3, 3, 5, 'messasge');