USE health;

-- Default user (password = dogucan)
INSERT INTO users (username, password_hash)
VALUES (
  'gold',
  '$2b$10$LwpDvqqaS1F6aHMZ.BVy6e7y3KMfjHtWWcbefn.sPHiY7B6pTIO7C'
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
