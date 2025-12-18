USE health;

-- Default user (password = dogucan)
INSERT INTO users (username, password_hash)
VALUES (
  'gold',
  '$2b$10$LtOiS7PWwgKmohsrgghyheHX8TGr2Z6byAshkXrk36f90rmKzO3kG'
);

-- Test workouts
INSERT INTO workouts
(user_id, workout_date, workout_name, body_part, next_body_part, duration_mins, notes)
VALUES
(
  (SELECT id FROM users WHERE username = 'gold'),
  '2025-12-01',
  'Leg day',
  'Legs',
  'Chest',
  45,
  'Squats and lunges'
),
(
  (SELECT id FROM users WHERE username = 'gold'),
  '2025-12-03',
  'Upper body',
  'Chest',
  'Back',
  40,
  'Bench press and push-ups'
),
(
  (SELECT id FROM users WHERE username = 'gold'),
  '2025-12-05',
  'Yoga session',
  'Core',
  'Legs',
  25,
  'Stretching and balance'
);
