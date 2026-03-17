// Exercise database — type: 'strength' (sets/reps/weight) or 'timed' (duration)
const exerciseDatabase = [
    // ══════ CARDIO (all timed) ══════
    { name: 'Treadmill Walk', category: 'cardio', type: 'timed', met: 3.5, description: 'Walking on treadmill' },
    { name: 'Treadmill Incline Walk', category: 'cardio', type: 'timed', met: 5.0, description: 'Walking on incline' },
    { name: 'Treadmill Run', category: 'cardio', type: 'timed', met: 8.0, description: 'Running on treadmill' },
    { name: 'Treadmill HIIT', category: 'cardio', type: 'timed', met: 10.0, description: 'Interval sprints on treadmill' },
    { name: 'Jogging', category: 'cardio', type: 'timed', met: 7.0, description: 'Outdoor jogging' },
    { name: 'Running', category: 'cardio', type: 'timed', met: 9.8, description: 'Fast running' },
    { name: 'Sprinting', category: 'cardio', type: 'timed', met: 14.5, description: 'All-out sprint' },
    { name: 'Trail Running', category: 'cardio', type: 'timed', met: 10.5, description: 'Off-road running' },
    { name: 'Cycling', category: 'cardio', type: 'timed', met: 7.5, description: 'Moderate cycling' },
    { name: 'Cycling Uphill', category: 'cardio', type: 'timed', met: 10.0, description: 'Hill cycling' },
    { name: 'Stationary Bike', category: 'cardio', type: 'timed', met: 6.8, description: 'Indoor cycling' },
    { name: 'Spin Class', category: 'cardio', type: 'timed', met: 8.5, description: 'Indoor group cycling' },
    { name: 'Swimming', category: 'cardio', type: 'timed', met: 8.0, description: 'General swimming' },
    { name: 'Swimming Laps', category: 'cardio', type: 'timed', met: 9.5, description: 'Lap swimming (vigorous)' },
    { name: 'Treading Water', category: 'cardio', type: 'timed', met: 4.0, description: 'Treading water' },
    { name: 'Water Aerobics', category: 'cardio', type: 'timed', met: 5.5, description: 'Pool aerobics' },
    { name: 'Elliptical', category: 'cardio', type: 'timed', met: 6.5, description: 'Elliptical machine' },
    { name: 'Stair Climber', category: 'cardio', type: 'timed', met: 8.5, description: 'Stair climbing machine' },
    { name: 'Rowing Machine', category: 'cardio', type: 'timed', met: 8.5, description: 'Indoor rowing' },
    { name: 'Jump Rope', category: 'cardio', type: 'timed', met: 12.3, description: 'Skipping rope' },
    { name: 'Double Unders', category: 'cardio', type: 'timed', met: 13.0, description: 'Jump rope double unders' },
    { name: 'Dancing', category: 'cardio', type: 'timed', met: 6.0, description: 'General dancing' },
    { name: 'Zumba', category: 'cardio', type: 'timed', met: 7.0, description: 'Dance fitness' },
    { name: 'Aerobics', category: 'cardio', type: 'timed', met: 7.0, description: 'Aerobic exercise class' },
    { name: 'Step Aerobics', category: 'cardio', type: 'timed', met: 7.5, description: 'Step-based aerobics' },
    { name: 'Hiking', category: 'cardio', type: 'timed', met: 6.0, description: 'Outdoor hiking' },
    { name: 'Walking', category: 'cardio', type: 'timed', met: 3.5, description: 'Brisk walking' },
    { name: 'Power Walking', category: 'cardio', type: 'timed', met: 4.5, description: 'Fast-paced walking' },
    { name: 'Stair Walking', category: 'cardio', type: 'timed', met: 8.0, description: 'Walking up stairs' },
    { name: 'Battle Ropes', category: 'cardio', type: 'timed', met: 10.3, description: 'Rope wave training' },
    { name: 'Assault Bike', category: 'cardio', type: 'timed', met: 10.5, description: 'Air bike' },
    { name: 'Ski Erg', category: 'cardio', type: 'timed', met: 7.5, description: 'Ski ergometer' },
    { name: 'Sled Push', category: 'cardio', type: 'timed', met: 9.0, description: 'Weighted sled push' },

    // ══════ SPORTS (all timed) ══════
    { name: 'Basketball', category: 'sports', type: 'timed', met: 8.0, description: 'Playing basketball' },
    { name: 'Soccer', category: 'sports', type: 'timed', met: 10.0, description: 'Playing soccer/football' },
    { name: 'Tennis', category: 'sports', type: 'timed', met: 7.3, description: 'Playing tennis' },
    { name: 'Badminton', category: 'sports', type: 'timed', met: 5.5, description: 'Playing badminton' },
    { name: 'Cricket', category: 'sports', type: 'timed', met: 5.0, description: 'Playing cricket' },
    { name: 'Table Tennis', category: 'sports', type: 'timed', met: 4.0, description: 'Ping pong' },
    { name: 'Volleyball', category: 'sports', type: 'timed', met: 6.0, description: 'Playing volleyball' },
    { name: 'Golf', category: 'sports', type: 'timed', met: 4.3, description: 'Playing golf (walking)' },
    { name: 'Handball', category: 'sports', type: 'timed', met: 8.0, description: 'Playing handball' },
    { name: 'Squash', category: 'sports', type: 'timed', met: 7.3, description: 'Playing squash' },
    { name: 'Racquetball', category: 'sports', type: 'timed', met: 7.0, description: 'Playing racquetball' },
    { name: 'Ice Hockey', category: 'sports', type: 'timed', met: 8.0, description: 'Playing ice hockey' },
    { name: 'Field Hockey', category: 'sports', type: 'timed', met: 7.8, description: 'Playing field hockey' },
    { name: 'Rugby', category: 'sports', type: 'timed', met: 8.5, description: 'Playing rugby' },
    { name: 'Lacrosse', category: 'sports', type: 'timed', met: 8.0, description: 'Playing lacrosse' },
    { name: 'Wrestling', category: 'sports', type: 'timed', met: 6.0, description: 'Competitive wrestling' },
    { name: 'Fencing', category: 'sports', type: 'timed', met: 6.0, description: 'Fencing practice' },
    { name: 'Rock Climbing', category: 'sports', type: 'timed', met: 8.0, description: 'Indoor/outdoor climbing' },

    // ══════ MARTIAL ARTS (all timed) ══════
    { name: 'Boxing', category: 'martial_arts', type: 'timed', met: 9.0, description: 'Boxing training' },
    { name: 'Kickboxing', category: 'martial_arts', type: 'timed', met: 10.0, description: 'Kickboxing workout' },
    { name: 'Muay Thai', category: 'martial_arts', type: 'timed', met: 10.0, description: 'Thai boxing' },
    { name: 'MMA Training', category: 'martial_arts', type: 'timed', met: 9.5, description: 'Mixed martial arts' },
    { name: 'Karate', category: 'martial_arts', type: 'timed', met: 5.0, description: 'Karate practice' },
    { name: 'Judo', category: 'martial_arts', type: 'timed', met: 7.0, description: 'Judo training' },
    { name: 'Taekwondo', category: 'martial_arts', type: 'timed', met: 5.0, description: 'Taekwondo practice' },
    { name: 'Brazilian Jiu-Jitsu', category: 'martial_arts', type: 'timed', met: 7.5, description: 'BJJ rolling' },
    { name: 'Heavy Bag', category: 'martial_arts', type: 'timed', met: 8.0, description: 'Punching bag workout' },
    { name: 'Shadow Boxing', category: 'martial_arts', type: 'timed', met: 5.5, description: 'Shadow boxing' },

    // ══════ STRENGTH (sets/reps/weight) ══════
    // Chest
    { name: 'Bench Press', category: 'strength', type: 'strength', met: 5.0, description: 'Chest exercise' },
    { name: 'Incline Bench Press', category: 'strength', type: 'strength', met: 5.0, description: 'Upper chest barbell' },
    { name: 'Incline Dumbbell Press', category: 'strength', type: 'strength', met: 5.0, description: 'Upper chest' },
    { name: 'Decline Bench Press', category: 'strength', type: 'strength', met: 5.0, description: 'Lower chest' },
    { name: 'Dumbbell Flyes', category: 'strength', type: 'strength', met: 4.5, description: 'Chest isolation' },
    { name: 'Cable Flyes', category: 'strength', type: 'strength', met: 4.5, description: 'Chest isolation' },
    { name: 'Chest Press Machine', category: 'strength', type: 'strength', met: 4.5, description: 'Machine chest press' },
    { name: 'Dumbbell Bench Press', category: 'strength', type: 'strength', met: 5.0, description: 'Dumbbell flat bench' },
    { name: 'Dips', category: 'strength', type: 'strength', met: 5.5, description: 'Chest/tricep dips' },
    { name: 'Push-ups', category: 'strength', type: 'strength', met: 3.8, description: 'Bodyweight chest' },
    { name: 'Diamond Push-ups', category: 'strength', type: 'strength', met: 4.2, description: 'Close-grip push-ups' },
    { name: 'Wide Push-ups', category: 'strength', type: 'strength', met: 3.8, description: 'Wide-grip push-ups' },

    // Triceps
    { name: 'Tricep Dips', category: 'strength', type: 'strength', met: 4.2, description: 'Triceps exercise' },
    { name: 'Tricep Pushdown', category: 'strength', type: 'strength', met: 4.0, description: 'Cable triceps' },
    { name: 'Skull Crushers', category: 'strength', type: 'strength', met: 4.0, description: 'Lying tricep extension' },
    { name: 'Overhead Tricep Extension', category: 'strength', type: 'strength', met: 4.0, description: 'Overhead triceps' },
    { name: 'Close Grip Bench Press', category: 'strength', type: 'strength', met: 5.0, description: 'Tricep-focused bench' },
    { name: 'Tricep Kickbacks', category: 'strength', type: 'strength', met: 3.8, description: 'Dumbbell kickbacks' },

    // Back
    { name: 'Lat Pulldown', category: 'strength', type: 'strength', met: 5.0, description: 'Back exercise' },
    { name: 'Cable Rows', category: 'strength', type: 'strength', met: 5.0, description: 'Seated cable rows' },
    { name: 'Barbell Rows', category: 'strength', type: 'strength', met: 5.5, description: 'Bent-over rows' },
    { name: 'Dumbbell Rows', category: 'strength', type: 'strength', met: 5.0, description: 'One-arm rows' },
    { name: 'T-Bar Rows', category: 'strength', type: 'strength', met: 5.5, description: 'T-bar back rows' },
    { name: 'Pendlay Rows', category: 'strength', type: 'strength', met: 5.5, description: 'Strict barbell rows' },
    { name: 'Deadlifts', category: 'strength', type: 'strength', met: 6.0, description: 'Full body pull' },
    { name: 'Romanian Deadlift', category: 'strength', type: 'strength', met: 5.5, description: 'Hamstring focus' },
    { name: 'Sumo Deadlift', category: 'strength', type: 'strength', met: 6.0, description: 'Wide-stance deadlift' },
    { name: 'Rack Pulls', category: 'strength', type: 'strength', met: 5.5, description: 'Partial deadlift' },
    { name: 'Pull-ups', category: 'strength', type: 'strength', met: 8.0, description: 'Bodyweight back' },
    { name: 'Chin-ups', category: 'strength', type: 'strength', met: 8.0, description: 'Underhand pull-ups' },
    { name: 'Wide Grip Pull-ups', category: 'strength', type: 'strength', met: 8.0, description: 'Wide back focus' },
    { name: 'Inverted Rows', category: 'strength', type: 'strength', met: 5.0, description: 'Bodyweight rows' },
    { name: 'Straight Arm Pulldown', category: 'strength', type: 'strength', met: 4.0, description: 'Lat isolation' },

    // Biceps
    { name: 'Barbell Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Biceps exercise' },
    { name: 'Dumbbell Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Dumbbell bicep curls' },
    { name: 'Hammer Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Biceps variation' },
    { name: 'Preacher Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Isolated biceps' },
    { name: 'Concentration Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Focused biceps' },
    { name: 'Cable Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Constant tension curls' },
    { name: 'EZ Bar Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Curved bar curls' },
    { name: 'Incline Dumbbell Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Stretched biceps' },
    { name: 'Spider Curls', category: 'strength', type: 'strength', met: 4.0, description: 'Peak contraction curls' },

    // Legs
    { name: 'Squats', category: 'strength', type: 'strength', met: 6.0, description: 'Barbell back squat' },
    { name: 'Front Squats', category: 'strength', type: 'strength', met: 6.0, description: 'Quad-dominant squat' },
    { name: 'Goblet Squat', category: 'strength', type: 'strength', met: 5.5, description: 'Dumbbell squat' },
    { name: 'Hack Squat', category: 'strength', type: 'strength', met: 5.5, description: 'Machine squat' },
    { name: 'Box Squat', category: 'strength', type: 'strength', met: 5.5, description: 'Squat to box' },
    { name: 'Leg Press', category: 'strength', type: 'strength', met: 5.5, description: 'Quad exercise' },
    { name: 'Leg Curls', category: 'strength', type: 'strength', met: 4.5, description: 'Hamstring exercise' },
    { name: 'Leg Extensions', category: 'strength', type: 'strength', met: 4.5, description: 'Quad isolation' },
    { name: 'Calf Raises', category: 'strength', type: 'strength', met: 4.0, description: 'Calf exercise' },
    { name: 'Seated Calf Raises', category: 'strength', type: 'strength', met: 3.5, description: 'Seated calves' },
    { name: 'Lunges', category: 'strength', type: 'strength', met: 5.0, description: 'Walking lunges' },
    { name: 'Reverse Lunges', category: 'strength', type: 'strength', met: 5.0, description: 'Backward lunges' },
    { name: 'Bulgarian Split Squat', category: 'strength', type: 'strength', met: 5.5, description: 'Single-leg squat' },
    { name: 'Hip Thrust', category: 'strength', type: 'strength', met: 5.0, description: 'Glute exercise' },
    { name: 'Glute Bridge', category: 'strength', type: 'strength', met: 4.0, description: 'Bodyweight glute' },
    { name: 'Step Ups', category: 'strength', type: 'strength', met: 5.0, description: 'Box step ups' },
    { name: 'Good Mornings', category: 'strength', type: 'strength', met: 4.5, description: 'Hamstring/back' },
    { name: 'Nordic Curls', category: 'strength', type: 'strength', met: 5.0, description: 'Bodyweight hamstring' },

    // Shoulders
    { name: 'Shoulder Press', category: 'strength', type: 'strength', met: 5.0, description: 'Barbell overhead press' },
    { name: 'Dumbbell Shoulder Press', category: 'strength', type: 'strength', met: 5.0, description: 'Dumbbell overhead' },
    { name: 'Arnold Press', category: 'strength', type: 'strength', met: 5.0, description: 'Rotational press' },
    { name: 'Lateral Raises', category: 'strength', type: 'strength', met: 4.5, description: 'Side delts' },
    { name: 'Front Raises', category: 'strength', type: 'strength', met: 4.5, description: 'Front delts' },
    { name: 'Rear Delt Flyes', category: 'strength', type: 'strength', met: 4.5, description: 'Rear delts' },
    { name: 'Face Pulls', category: 'strength', type: 'strength', met: 4.0, description: 'Rear delts / rotator' },
    { name: 'Shrugs', category: 'strength', type: 'strength', met: 4.0, description: 'Trap exercise' },
    { name: 'Upright Rows', category: 'strength', type: 'strength', met: 4.5, description: 'Traps & delts' },
    { name: 'Cable Lateral Raises', category: 'strength', type: 'strength', met: 4.5, description: 'Cable side delts' },
    { name: 'Behind Neck Press', category: 'strength', type: 'strength', met: 5.0, description: 'Behind neck OHP' },
    { name: 'Machine Shoulder Press', category: 'strength', type: 'strength', met: 4.5, description: 'Machine overhead' },

    // Olympic lifts
    { name: 'Clean and Jerk', category: 'strength', type: 'strength', met: 8.0, description: 'Olympic lift' },
    { name: 'Snatch', category: 'strength', type: 'strength', met: 8.0, description: 'Olympic snatch' },
    { name: 'Power Clean', category: 'strength', type: 'strength', met: 7.5, description: 'Power clean' },
    { name: 'Hang Clean', category: 'strength', type: 'strength', met: 7.0, description: 'Hang clean' },
    { name: 'Clean Pull', category: 'strength', type: 'strength', met: 6.5, description: 'Clean pull from floor' },
    { name: 'Push Press', category: 'strength', type: 'strength', met: 6.0, description: 'Leg-driven press' },
    { name: 'Overhead Squat', category: 'strength', type: 'strength', met: 6.5, description: 'Squat with bar overhead' },

    // Core
    { name: 'Plank', category: 'strength', type: 'timed', met: 3.5, description: 'Core stability' },
    { name: 'Side Plank', category: 'strength', type: 'timed', met: 3.5, description: 'Oblique stability' },
    { name: 'Bicycle Crunches', category: 'strength', type: 'strength', met: 4.0, description: 'Ab exercise' },
    { name: 'Mountain Climbers', category: 'strength', type: 'timed', met: 8.0, description: 'Dynamic core' },
    { name: 'Russian Twists', category: 'strength', type: 'strength', met: 4.0, description: 'Obliques' },
    { name: 'Leg Raises', category: 'strength', type: 'strength', met: 4.5, description: 'Lower abs' },
    { name: 'Sit-ups', category: 'strength', type: 'strength', met: 3.8, description: 'Classic abs' },
    { name: 'Cable Crunches', category: 'strength', type: 'strength', met: 4.0, description: 'Weighted abs' },
    { name: 'Ab Wheel Rollout', category: 'strength', type: 'strength', met: 5.0, description: 'Advanced core' },
    { name: 'Hanging Leg Raise', category: 'strength', type: 'strength', met: 5.0, description: 'Advanced lower abs' },
    { name: 'Crunches', category: 'strength', type: 'strength', met: 3.5, description: 'Basic crunches' },
    { name: 'V-ups', category: 'strength', type: 'strength', met: 4.5, description: 'Full ab contraction' },
    { name: 'Dead Bug', category: 'strength', type: 'strength', met: 3.5, description: 'Core stability drill' },
    { name: 'Flutter Kicks', category: 'strength', type: 'timed', met: 4.0, description: 'Lower abs' },
    { name: 'Hollow Hold', category: 'strength', type: 'timed', met: 3.8, description: 'Gymnastic core' },

    // Functional / HIIT (timed)
    { name: 'Burpees', category: 'hiit', type: 'timed', met: 10.0, description: 'Full body HIIT' },
    { name: 'Box Jumps', category: 'hiit', type: 'strength', met: 8.0, description: 'Plyometric jump' },
    { name: 'Kettlebell Swing', category: 'hiit', type: 'strength', met: 9.0, description: 'Hip hinge power' },
    { name: 'Turkish Get Up', category: 'hiit', type: 'strength', met: 6.0, description: 'Full body movement' },
    { name: 'Farmer Walk', category: 'hiit', type: 'timed', met: 6.0, description: 'Loaded carry' },
    { name: 'Wall Balls', category: 'hiit', type: 'strength', met: 8.0, description: 'Squat to throw' },
    { name: 'Thrusters', category: 'hiit', type: 'strength', met: 8.5, description: 'Squat to press' },
    { name: 'Man Makers', category: 'hiit', type: 'strength', met: 9.0, description: 'Burpee + row + press' },
    { name: 'Bear Crawl', category: 'hiit', type: 'timed', met: 7.0, description: 'Quadruped crawl' },
    { name: 'Tire Flips', category: 'hiit', type: 'strength', met: 8.0, description: 'Strongman exercise' },
    { name: 'Rope Climb', category: 'hiit', type: 'strength', met: 8.0, description: 'Climbing rope' },
    { name: 'Sled Pull', category: 'hiit', type: 'timed', met: 8.5, description: 'Weighted sled pull' },
    { name: 'Sandbag Clean', category: 'hiit', type: 'strength', met: 7.0, description: 'Sandbag to shoulder' },

    // ══════ FLEXIBILITY (all timed) ══════
    { name: 'Yoga', category: 'flexibility', type: 'timed', met: 3.0, description: 'General yoga' },
    { name: 'Power Yoga', category: 'flexibility', type: 'timed', met: 4.0, description: 'Vigorous yoga' },
    { name: 'Hot Yoga', category: 'flexibility', type: 'timed', met: 4.5, description: 'Heated yoga (Bikram)' },
    { name: 'Stretching', category: 'flexibility', type: 'timed', met: 2.3, description: 'Static stretching' },
    { name: 'Dynamic Stretching', category: 'flexibility', type: 'timed', met: 3.5, description: 'Active mobility' },
    { name: 'Pilates', category: 'flexibility', type: 'timed', met: 3.7, description: 'Core strengthening' },
    { name: 'Foam Rolling', category: 'flexibility', type: 'timed', met: 2.0, description: 'Myofascial release' },
    { name: 'Tai Chi', category: 'flexibility', type: 'timed', met: 3.0, description: 'Moving meditation' },
    { name: 'Mobility Work', category: 'flexibility', type: 'timed', met: 2.5, description: 'Joint mobility drills' },
    { name: 'Barre', category: 'flexibility', type: 'timed', met: 3.5, description: 'Ballet-inspired workout' }
];

// Workout templates
const workoutTemplates = {
    'chest-triceps': [
        { exercise: 'Bench Press', sets: 4, reps: 10, duration: 15 },
        { exercise: 'Incline Dumbbell Press', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Cable Flyes', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Dips', sets: 3, reps: 10, duration: 10 },
        { exercise: 'Tricep Pushdown', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Skull Crushers', sets: 3, reps: 12, duration: 10 }
    ],
    'back-biceps': [
        { exercise: 'Deadlifts', sets: 3, reps: 5, duration: 15 },
        { exercise: 'Lat Pulldown', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Barbell Rows', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Cable Rows', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Barbell Curls', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Hammer Curls', sets: 3, reps: 12, duration: 10 }
    ],
    'legs': [
        { exercise: 'Squats', sets: 4, reps: 8, duration: 20 },
        { exercise: 'Leg Press', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Romanian Deadlift', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Leg Curls', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Leg Extensions', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Calf Raises', sets: 4, reps: 15, duration: 10 }
    ],
    'shoulders-core': [
        { exercise: 'Shoulder Press', sets: 4, reps: 10, duration: 15 },
        { exercise: 'Lateral Raises', sets: 3, reps: 15, duration: 12 },
        { exercise: 'Face Pulls', sets: 3, reps: 15, duration: 10 },
        { exercise: 'Shrugs', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Plank', sets: 1, reps: 1, duration: 3 },
        { exercise: 'Hanging Leg Raise', sets: 3, reps: 12, duration: 8 },
        { exercise: 'Russian Twists', sets: 3, reps: 20, duration: 5 }
    ],
    'push': [
        { exercise: 'Bench Press', sets: 4, reps: 8, duration: 15 },
        { exercise: 'Dumbbell Shoulder Press', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Incline Dumbbell Press', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Lateral Raises', sets: 3, reps: 15, duration: 10 },
        { exercise: 'Tricep Pushdown', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Overhead Tricep Extension', sets: 3, reps: 12, duration: 10 }
    ],
    'pull': [
        { exercise: 'Deadlifts', sets: 3, reps: 5, duration: 15 },
        { exercise: 'Pull-ups', sets: 4, reps: 8, duration: 12 },
        { exercise: 'Barbell Rows', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Face Pulls', sets: 3, reps: 15, duration: 10 },
        { exercise: 'Barbell Curls', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Hammer Curls', sets: 3, reps: 12, duration: 10 }
    ],
    'upper-body': [
        { exercise: 'Bench Press', sets: 4, reps: 8, duration: 15 },
        { exercise: 'Lat Pulldown', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Dumbbell Shoulder Press', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Dumbbell Rows', sets: 3, reps: 10, duration: 10 },
        { exercise: 'Barbell Curls', sets: 3, reps: 12, duration: 10 },
        { exercise: 'Tricep Dips', sets: 3, reps: 12, duration: 10 }
    ],
    'lower-body': [
        { exercise: 'Squats', sets: 4, reps: 8, duration: 20 },
        { exercise: 'Hip Thrust', sets: 3, reps: 12, duration: 15 },
        { exercise: 'Bulgarian Split Squat', sets: 3, reps: 10, duration: 15 },
        { exercise: 'Leg Curls', sets: 3, reps: 12, duration: 12 },
        { exercise: 'Calf Raises', sets: 4, reps: 15, duration: 10 },
        { exercise: 'Lunges', sets: 3, reps: 12, duration: 12 }
    ],
    'cardio': [
        { exercise: 'Treadmill Incline Walk', sets: 1, reps: 1, duration: 15 },
        { exercise: 'Stationary Bike', sets: 1, reps: 1, duration: 15 },
        { exercise: 'Rowing Machine', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Jump Rope', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Elliptical', sets: 1, reps: 1, duration: 10 }
    ],
    'hiit': [
        { exercise: 'Burpees', sets: 1, reps: 1, duration: 5 },
        { exercise: 'Battle Ropes', sets: 1, reps: 1, duration: 5 },
        { exercise: 'Mountain Climbers', sets: 1, reps: 1, duration: 5 },
        { exercise: 'Box Jumps', sets: 4, reps: 10, duration: 5 },
        { exercise: 'Kettlebell Swing', sets: 4, reps: 15, duration: 5 },
        { exercise: 'Assault Bike', sets: 1, reps: 1, duration: 5 }
    ],
    'full-body': [
        { exercise: 'Deadlifts', sets: 3, reps: 5, duration: 15 },
        { exercise: 'Bench Press', sets: 3, reps: 8, duration: 15 },
        { exercise: 'Pull-ups', sets: 3, reps: 8, duration: 10 },
        { exercise: 'Squats', sets: 3, reps: 8, duration: 15 },
        { exercise: 'Shoulder Press', sets: 3, reps: 10, duration: 12 },
        { exercise: 'Plank', sets: 1, reps: 1, duration: 2 }
    ],
    'yoga-flow': [
        { exercise: 'Dynamic Stretching', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Yoga', sets: 1, reps: 1, duration: 30 },
        { exercise: 'Stretching', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Foam Rolling', sets: 1, reps: 1, duration: 10 }
    ],
    'olympic-lifting': [
        { exercise: 'Power Clean', sets: 5, reps: 3, duration: 20 },
        { exercise: 'Clean and Jerk', sets: 4, reps: 2, duration: 20 },
        { exercise: 'Snatch', sets: 4, reps: 2, duration: 20 },
        { exercise: 'Front Squats', sets: 3, reps: 5, duration: 15 },
        { exercise: 'Push Press', sets: 3, reps: 5, duration: 12 }
    ],
    'boxing-circuit': [
        { exercise: 'Shadow Boxing', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Heavy Bag', sets: 1, reps: 1, duration: 15 },
        { exercise: 'Jump Rope', sets: 1, reps: 1, duration: 10 },
        { exercise: 'Burpees', sets: 1, reps: 1, duration: 5 },
        { exercise: 'Plank', sets: 1, reps: 1, duration: 3 }
    ]
};

// ═══════════════════════════════════════════════
// SESSION STATE
// ═══════════════════════════════════════════════
let activeSession = null;   // { startTime, exercises: [ { name, category, met, sets: [{weight,reps,done}] } ] }
let sessionTimerInterval = null;

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('workout.html')) {
        checkAuth();
        updateUserDisplay();
        loadTodaysWorkout();
        loadActivityData();
        document.getElementById('workoutDate').value = getTodayDate();
        restoreSession();
    }
});

// ═══════════════════════════════════════════════
// LIVE SESSION — start / end / timer
// ═══════════════════════════════════════════════
function startSession() {
    activeSession = {
        startTime: Date.now(),
        exercises: []
    };
    persistSession();
    enterSessionUI();
    showNotification('Workout session started! 💪');
}

function enterSessionUI() {
    document.getElementById('startSessionCard').style.display = 'none';
    document.getElementById('liveSessionBanner').style.display = '';
    document.getElementById('liveAddExercise').style.display = '';

    // Start timer
    if (sessionTimerInterval) clearInterval(sessionTimerInterval);
    sessionTimerInterval = setInterval(updateSessionTimer, 1000);
    updateSessionTimer();
}

function updateSessionTimer() {
    if (!activeSession) return;
    const elapsed = Date.now() - activeSession.startTime;
    const secs = Math.floor(elapsed / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const display = h > 0
        ? `${h}:${String(mm).padStart(2,'0')}:${String(s).padStart(2,'0')}`
        : `${String(mm).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    document.getElementById('sessionTimer').textContent = display;
}

function endSession() {
    if (!activeSession) return;
    if (!confirm('End this workout session?')) return;

    clearInterval(sessionTimerInterval);

    const elapsedMs = Date.now() - activeSession.startTime;
    const totalMin = Math.round(elapsedMs / 60000);
    const date = getTodayDate();
    const workouts = loadUserData('workouts');

    let totalCals = 0;
    let totalSets = 0;
    let totalExercises = activeSession.exercises.filter(ex => ex.sets.some(s => s.done)).length || 1;

    // Distribute time proportionally across STRENGTH exercises (timed exercises use their own duration)
    let totalCompletedSets = 0;
    activeSession.exercises.forEach(ex => { if (!ex.timed) totalCompletedSets += ex.sets.filter(s => s.done).length; });
    if (totalCompletedSets === 0) totalCompletedSets = totalExercises; // fallback

    activeSession.exercises.forEach(ex => {
        const completedSets = ex.sets.filter(s => s.done);
        totalSets += completedSets.length;

        if (ex.timed) {
            // TIMED: use the actual entered duration and intensity
            const s = completedSets[0] || ex.sets[0];
            const durMin = s.duration || 1;
            const intensity = s.intensity || 'moderate';
            const cals = calculateCaloriesBurned(ex.name, durMin, currentUser.weight, currentUser.height, currentUser.age, currentUser.gender, intensity);
            totalCals += cals;

            const workout = {
                id: Date.now() + Math.random(),
                date: date,
                exercise: ex.name,
                category: ex.category,
                duration: durMin,
                intensity: intensity,
                caloriesBurned: cals,
                sets: 0,
                reps: 0,
                weight: 0,
                sessionId: activeSession.startTime,
                timestamp: new Date().toISOString()
            };
            workouts.push(workout);
        } else {
            // STRENGTH: proportional time split
            const setFraction = completedSets.length > 0 ? completedSets.length / totalCompletedSets : 1 / totalExercises;
            const durPerExercise = Math.max(1, Math.round(totalMin * setFraction));
            const cals = calculateCaloriesBurned(ex.name, durPerExercise, currentUser.weight, currentUser.height, currentUser.age, currentUser.gender, 'moderate');
            totalCals += cals;

            const workout = {
                id: Date.now() + Math.random(),
                date: date,
                exercise: ex.name,
                category: ex.category,
                duration: durPerExercise,
                intensity: 'moderate',
                caloriesBurned: cals,
                sets: completedSets.length,
                reps: completedSets.length > 0 ? completedSets[0].reps : 0,
                weight: completedSets.length > 0 ? completedSets[0].weight : 0,
                setsDetail: completedSets.map(s => ({ weight: s.weight, reps: s.reps })),
                sessionId: activeSession.startTime,
                timestamp: new Date().toISOString()
            };
            workouts.push(workout);
        }
    });

    saveUserData('workouts', workouts);

    // Show summary
    showSessionSummary(totalMin, totalExercises, totalSets, totalCals);

    // Reset
    activeSession = null;
    clearPersistedSession();
    exitSessionUI();
    loadTodaysWorkout();
}

function exitSessionUI() {
    document.getElementById('startSessionCard').style.display = '';
    document.getElementById('liveSessionBanner').style.display = 'none';
    document.getElementById('liveAddExercise').style.display = 'none';
    document.getElementById('liveExerciseCards').innerHTML = '';
    document.getElementById('sessionExCount').textContent = '0 exercises';
}

function showSessionSummary(mins, exercises, sets, cals) {
    const body = document.getElementById('sessionSummaryBody');
    body.innerHTML = `
        <div class="summary-item"><span class="summary-label">⏱️ Duration</span><span class="summary-value">${mins} min</span></div>
        <div class="summary-item"><span class="summary-label">🏋️ Exercises</span><span class="summary-value">${exercises}</span></div>
        <div class="summary-item"><span class="summary-label">📊 Total Sets</span><span class="summary-value">${sets}</span></div>
        <div class="summary-item"><span class="summary-label">🔥 Calories</span><span class="summary-value">${cals} kcal</span></div>
    `;
    document.getElementById('sessionSummaryModal').style.display = 'flex';
}

function closeSessionSummary() {
    document.getElementById('sessionSummaryModal').style.display = 'none';
}

// Persist session to localStorage so it survives page reload
function persistSession() {
    if (activeSession) {
        localStorage.setItem('fitforge_live_session', JSON.stringify(activeSession));
    }
}
function clearPersistedSession() {
    localStorage.removeItem('fitforge_live_session');
}
function restoreSession() {
    const raw = localStorage.getItem('fitforge_live_session');
    if (raw) {
        try {
            activeSession = JSON.parse(raw);
            enterSessionUI();
            renderAllLiveCards();
        } catch(e) {
            localStorage.removeItem('fitforge_live_session');
        }
    }
}

// ═══════════════════════════════════════════════
// LIVE SESSION — add exercise / sets
// ═══════════════════════════════════════════════
// Helper: is exercise timed-based?
function isTimedExercise(name) {
    var db = exerciseDatabase.find(function(e) { return e.name.toLowerCase() === name.toLowerCase(); });
    return db ? db.type === 'timed' : false;
}

function addExerciseToSession() {
    if (!activeSession) { startSession(); }

    const nameInput = document.getElementById('exerciseSearch');
    const exName = nameInput.value.trim();
    if (!exName) { showNotification('Type an exercise name first'); return; }

    const dbEntry = exerciseDatabase.find(e => e.name.toLowerCase() === exName.toLowerCase());
    const category = dbEntry ? dbEntry.category : (document.getElementById('exerciseCategory').value || 'strength');
    const met = dbEntry ? dbEntry.met : 5.0;
    const timed = dbEntry ? dbEntry.type === 'timed' : false;

    const exercise = {
        name: dbEntry ? dbEntry.name : exName,
        category: category,
        met: met,
        timed: timed,
        sets: timed
            ? [{ duration: 0, intensity: 'moderate', done: false }]   // timed: duration in minutes
            : [{ weight: 0, reps: 0, done: false }]                  // strength: weight & reps
    };

    activeSession.exercises.push(exercise);
    persistSession();
    renderAllLiveCards();

    nameInput.value = '';
    document.getElementById('exerciseSuggestions').classList.remove('active');
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length > 1 ? 's' : ''}`;
    showNotification(`Added ${exercise.name}`);
}

function renderAllLiveCards() {
    const container = document.getElementById('liveExerciseCards');
    if (!activeSession) { container.innerHTML = ''; return; }

    container.innerHTML = activeSession.exercises.map((ex, ei) => {
        const allDone = ex.sets.length > 0 && ex.sets.every(s => s.done);
        const timed = ex.timed;

        if (timed) {
            // ── TIMED EXERCISE: Duration + Intensity ──
            const s = ex.sets[0]; // timed exercises have a single entry
            return `
            <div class="live-exercise-card${allDone ? ' completed' : ''}">
                <div class="live-exercise-header">
                    <div>
                        <h3>${ex.name}</h3>
                        <span style="font-size:.8rem;color:var(--text-secondary)">${ex.category} • timed</span>
                    </div>
                    <button class="btn-delete" onclick="removeSessionExercise(${ei})" title="Remove">✕</button>
                </div>
                <div class="timed-exercise-inputs" style="display:flex;gap:12px;align-items:end;padding:12px 0;">
                    <div style="flex:1">
                        <label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px">Duration (min)</label>
                        <input type="number" min="0" value="${s.duration || ''}" placeholder="0"
                            onchange="updateSet(${ei},0,'duration',this.value)" ${s.done ? 'disabled' : ''}
                            style="width:100%;padding:8px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:8px;color:var(--text-primary);font-size:1rem">
                    </div>
                    <div style="flex:1">
                        <label style="font-size:.8rem;color:var(--text-secondary);display:block;margin-bottom:4px">Intensity</label>
                        <select onchange="updateSet(${ei},0,'intensity',this.value)" ${s.done ? 'disabled' : ''}
                            style="width:100%;padding:8px;background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:8px;color:var(--text-primary);font-size:1rem">
                            <option value="low"${s.intensity==='low'?' selected':''}>Low</option>
                            <option value="moderate"${s.intensity==='moderate'?' selected':''}>Moderate</option>
                            <option value="high"${s.intensity==='high'?' selected':''}>High</option>
                        </select>
                    </div>
                    <button class="btn-complete-set${s.done ? ' done' : ''}" onclick="toggleSet(${ei},0)"
                        style="min-width:40px;height:40px;margin-bottom:0">
                        ${s.done ? '✓' : '○'}
                    </button>
                </div>
            </div>`;
        } else {
            // ── STRENGTH EXERCISE: Weight / Reps table ──
            return `
            <div class="live-exercise-card${allDone ? ' completed' : ''}">
                <div class="live-exercise-header">
                    <div>
                        <h3>${ex.name}</h3>
                        <span style="font-size:.8rem;color:var(--text-secondary)">${ex.category}</span>
                    </div>
                    <button class="btn-delete" onclick="removeSessionExercise(${ei})" title="Remove">✕</button>
                </div>
                <table class="sets-table">
                    <thead><tr><th>Set</th><th>Weight (kg)</th><th>Reps</th><th></th></tr></thead>
                    <tbody>
                        ${ex.sets.map((s, si) => `
                        <tr class="${s.done ? 'set-done' : ''}">
                            <td>${si + 1}</td>
                            <td><input type="number" min="0" value="${s.weight || ''}" placeholder="0"
                                onchange="updateSet(${ei},${si},'weight',this.value)" ${s.done ? 'disabled' : ''}></td>
                            <td><input type="number" min="0" value="${s.reps || ''}" placeholder="0"
                                onchange="updateSet(${ei},${si},'reps',this.value)" ${s.done ? 'disabled' : ''}></td>
                            <td>
                                <button class="btn-complete-set${s.done ? ' done' : ''}" onclick="toggleSet(${ei},${si})">
                                    ${s.done ? '✓' : '○'}
                                </button>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
                <button class="btn-add-set" onclick="addSet(${ei})">+ Add Set</button>
            </div>`;
        }
    }).join('');
}

function updateSet(exIdx, setIdx, field, val) {
    if (!activeSession) return;
    // For intensity it's a string; for numbers parse as float
    if (field === 'intensity') {
        activeSession.exercises[exIdx].sets[setIdx][field] = val;
    } else {
        activeSession.exercises[exIdx].sets[setIdx][field] = parseFloat(val) || 0;
    }
    persistSession();
}

function toggleSet(exIdx, setIdx) {
    if (!activeSession) return;
    const s = activeSession.exercises[exIdx].sets[setIdx];
    s.done = !s.done;
    persistSession();
    renderAllLiveCards();
}

function addSet(exIdx) {
    if (!activeSession) return;
    const ex = activeSession.exercises[exIdx];
    // Don't add sets for timed exercises (they use a single duration entry)
    if (ex.timed) return;
    const lastSet = ex.sets.slice(-1)[0];
    ex.sets.push({
        weight: lastSet ? lastSet.weight : 0,
        reps: lastSet ? lastSet.reps : 0,
        done: false
    });
    persistSession();
    renderAllLiveCards();
}

function removeSessionExercise(exIdx) {
    if (!activeSession) return;
    if (!confirm(`Remove ${activeSession.exercises[exIdx].name}?`)) return;
    activeSession.exercises.splice(exIdx, 1);
    persistSession();
    renderAllLiveCards();
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length !== 1 ? 's' : ''}`;
}

// ═══════════════════════════════════════════════
// EXERCISE SEARCH (session search + quick-log)
// ═══════════════════════════════════════════════
function searchExercise() {
    const searchTerm = document.getElementById('exerciseSearch').value.toLowerCase();
    const suggestions = document.getElementById('exerciseSuggestions');
    
    if (searchTerm.length < 2) { suggestions.classList.remove('active'); return; }
    
    let matches = exerciseDatabase.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm) || ex.description.toLowerCase().includes(searchTerm)
    );
    const category = document.getElementById('exerciseCategory').value;
    if (category) matches = matches.filter(ex => ex.category === category);
    matches = matches.slice(0, 8);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(ex => `
            <div class="suggestion-item" onclick="selectExercise('${ex.name}', '${ex.category}')">
                <strong>${ex.name}</strong>
                <span>${ex.description} • ${ex.category}</span>
            </div>
        `).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function filterExercises() { searchExercise(); }

function selectExercise(exerciseName, category) {
    document.getElementById('exerciseSearch').value = exerciseName;
    document.getElementById('exerciseSuggestions').classList.remove('active');
}

// Quick-log search (separate inputs)
function searchExerciseQuick() {
    const searchTerm = document.getElementById('quickExSearch').value.toLowerCase();
    const suggestions = document.getElementById('quickExSuggestions');
    
    if (searchTerm.length < 2) { suggestions.classList.remove('active'); return; }
    
    let matches = exerciseDatabase.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm) || ex.description.toLowerCase().includes(searchTerm)
    );
    const category = document.getElementById('quickExCategory').value;
    if (category) matches = matches.filter(ex => ex.category === category);
    matches = matches.slice(0, 8);
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(ex => `
            <div class="suggestion-item" onclick="selectExerciseQuick('${ex.name}', '${ex.category}')">
                <strong>${ex.name}</strong>
                <span>${ex.description} • ${ex.category}</span>
            </div>
        `).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function selectExerciseQuick(exerciseName, category) {
    document.getElementById('quickExSearch').value = exerciseName;
    document.getElementById('quickExSuggestions').classList.remove('active');
    const sf = document.getElementById('quickStrengthFields');
    if (category === 'strength') sf.classList.remove('hidden'); else sf.classList.add('hidden');
}

// ═══════════════════════════════════════════════
// QUICK LOG — add exercise directly (no session)
// ═══════════════════════════════════════════════
function addExercise() {
    const exerciseName = document.getElementById('quickExSearch').value;
    const duration = parseInt(document.getElementById('quickExDuration').value);
    const intensity = document.getElementById('quickExIntensity').value;
    const notes = document.getElementById('quickExNotes').value;
    const date = document.getElementById('workoutDate').value || getTodayDate();
    
    if (!exerciseName || !duration) {
        alert('Please enter exercise name and duration');
        return;
    }
    
    const exercise = exerciseDatabase.find(e => e.name.toLowerCase() === exerciseName.toLowerCase());
    let category = exercise ? exercise.category : 'cardio';
    
    const caloriesBurned = calculateCaloriesBurned(exerciseName, duration, currentUser.weight, currentUser.height, currentUser.age, currentUser.gender, intensity);
    
    const workout = {
        id: Date.now(),
        date: date,
        exercise: exerciseName,
        category: category,
        duration: duration,
        intensity: intensity,
        caloriesBurned: caloriesBurned,
        notes: notes,
        timestamp: new Date().toISOString()
    };
    
    if (category === 'strength') {
        workout.sets = parseInt(document.getElementById('quickExSets').value) || 0;
        workout.reps = parseInt(document.getElementById('quickExReps').value) || 0;
        workout.weight = parseInt(document.getElementById('quickExWeight').value) || 0;
    }
    
    const workouts = loadUserData('workouts');
    workouts.push(workout);
    saveUserData('workouts', workouts);
    
    // Clear
    document.getElementById('quickExSearch').value = '';
    document.getElementById('quickExDuration').value = '';
    document.getElementById('quickExNotes').value = '';
    document.getElementById('quickExSets').value = '';
    document.getElementById('quickExReps').value = '';
    document.getElementById('quickExWeight').value = '';
    
    loadTodaysWorkout();
    showNotification(`Logged ${exerciseName}! Burned ${caloriesBurned} calories!`);
}

// ═══════════════════════════════════════════════
// TODAY'S WORKOUT DISPLAY
// ═══════════════════════════════════════════════
function loadTodaysWorkout() {
    const date = document.getElementById('workoutDate')?.value || getTodayDate();
    const workouts = getDataForDate('workouts', date);
    
    const container = document.getElementById('todayWorkouts');
    
    if (workouts.length === 0) {
        container.innerHTML = '<p class="empty-message">No exercises logged yet. Start your workout!</p>';
        document.getElementById('todayCaloriesBurned').textContent = '0';
        document.getElementById('todayDuration').textContent = '0';
        document.getElementById('todayExercises').textContent = '0';
        return;
    }
    
    let totalCalories = 0, totalDuration = 0;
    workouts.forEach(w => { totalCalories += w.caloriesBurned || 0; totalDuration += w.duration || 0; });
    
    document.getElementById('todayCaloriesBurned').textContent = totalCalories;
    document.getElementById('todayDuration').textContent = totalDuration;
    document.getElementById('todayExercises').textContent = workouts.length;
    
    container.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <div class="workout-header">
                <div>
                    <h4>${workout.exercise}</h4>
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">${workout.category} • ${workout.intensity} intensity</span>
                </div>
                <button class="btn-delete" onclick="deleteWorkout(${workout.id})">Delete</button>
            </div>
            <div class="workout-details">
                <div class="workout-detail"><span>Duration</span><span>${workout.duration} min</span></div>
                <div class="workout-detail"><span>Calories</span><span>${workout.caloriesBurned} kcal</span></div>
                ${workout.sets ? `<div class="workout-detail"><span>Sets</span><span>${workout.sets}</span></div>` : ''}
                ${workout.setsDetail ? `<div class="workout-detail"><span>Detail</span><span>${workout.setsDetail.map((s,i)=>`S${i+1}: ${s.weight}kg×${s.reps}`).join(', ')}</span></div>` : 
                    (workout.sets && workout.reps ? `<div class="workout-detail"><span>Sets × Reps</span><span>${workout.sets} × ${workout.reps}</span></div>` : '')}
                ${workout.weight ? `<div class="workout-detail"><span>Weight</span><span>${workout.weight} kg</span></div>` : ''}
            </div>
            ${workout.notes ? `<p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">📝 ${workout.notes}</p>` : ''}
        </div>
    `).join('');
}

function deleteWorkout(workoutId) {
    if (!confirm('Delete this workout entry?')) return;
    let workouts = loadUserData('workouts');
    workouts = workouts.filter(w => w.id !== workoutId);
    saveUserData('workouts', workouts);
    loadTodaysWorkout();
    showNotification('Workout deleted');
}

function loadWorkoutForDate() { loadTodaysWorkout(); }

// ═══════════════════════════════════════════════
// TEMPLATES — now starts a live session
// ═══════════════════════════════════════════════
function loadTemplate(templateId) {
    const template = workoutTemplates[templateId];
    if (!template) return;

    // Start a session with template exercises
    if (!activeSession) {
        activeSession = { startTime: Date.now(), exercises: [] };
    }

    template.forEach(item => {
        const dbEntry = exerciseDatabase.find(e => e.name === item.exercise);
        if (!dbEntry) return;
        const timed = dbEntry.type === 'timed';
        const sets = [];
        if (timed) {
            sets.push({ duration: item.duration || 0, intensity: 'moderate', done: false });
        } else {
            for (let i = 0; i < (item.sets || 3); i++) {
                sets.push({ weight: 0, reps: item.reps || 0, done: false });
            }
        }
        activeSession.exercises.push({
            name: item.exercise,
            category: dbEntry.category,
            met: dbEntry.met,
            timed: timed,
            sets: sets
        });
    });

    persistSession();
    enterSessionUI();
    renderAllLiveCards();
    document.getElementById('sessionExCount').textContent = `${activeSession.exercises.length} exercise${activeSession.exercises.length > 1 ? 's' : ''}`;
    showNotification('Template loaded into session! Fill in weights & reps as you go.');
}

// ═══════════════════════════════════════════════
// ACTIVITY TRACKING (unchanged)
// ═══════════════════════════════════════════════
function loadActivityData() {
    const today = getTodayDate();
    const activityData = getDataForDate('activity', today);
    
    let steps = 0, activeMinutes = 0;
    if (activityData.length > 0) {
        const latest = activityData[activityData.length - 1];
        steps = latest.steps || 0;
        activeMinutes = latest.activeMinutes || 0;
    }
    
    document.getElementById('stepsToday').value = steps;
    document.getElementById('activeMinutes').value = activeMinutes;
    updateSteps();
    updateActiveMinutes();
}

function updateSteps() {
    const steps = parseInt(document.getElementById('stepsToday').value) || 0;
    const percentage = Math.min((steps / 10000) * 100, 100);
    document.getElementById('stepsDisplay').textContent = steps.toLocaleString();
    document.getElementById('stepsProgress').style.width = percentage + '%';
    saveActivityData();
}

function updateActiveMinutes() {
    const minutes = parseInt(document.getElementById('activeMinutes').value) || 0;
    const percentage = Math.min((minutes / 60) * 100, 100);
    document.getElementById('activeDisplay').textContent = minutes;
    document.getElementById('activeProgress').style.width = percentage + '%';
    saveActivityData();
}

function saveActivityData() {
    const today = getTodayDate();
    const steps = parseInt(document.getElementById('stepsToday').value) || 0;
    const activeMinutes = parseInt(document.getElementById('activeMinutes').value) || 0;
    
    let allActivity = loadUserData('activity');
    allActivity = allActivity.filter(a => a.date !== today);
    allActivity.push({
        id: Date.now(),
        date: today,
        steps: steps,
        activeMinutes: activeMinutes,
        timestamp: new Date().toISOString()
    });
    saveUserData('activity', allActivity);
}
