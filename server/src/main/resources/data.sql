BEGIN;
--
-- admin's default password is IqX56ONgi910, this is not meant to be used in production
-- it is important to change admin's password as soon as the app boots for the first time!
-- obviously it should go without saying that default credentials for applications/services that are used as proof-of-concept
-- should never be allowed in production
--
INSERT INTO
  remo.users
  (username, password, first_name, last_name, email, occupation, enabled)
VALUES
  ('admin', '24fd41469f4be2460a7f93b60f0bdc41f637495bd15bcfe40a0b6517489726caf3a7b2d7142ddf13', 'Administrator', 'Application', 'admin@domain.com', 'Administrator', TRUE);
INSERT INTO
  remo.authorities
  (username, authority)
VALUES
  ('admin', 'ROLE_ACTUATOR');
INSERT INTO
  remo.authorities
  (username, authority)
VALUES
  ('admin', 'ADMIN');

COMMIT;