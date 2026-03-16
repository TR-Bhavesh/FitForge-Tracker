# 💪 FitForge Tracker

A fully interactive fitness tracking web application to monitor your fitness journey, weight loss, nutrition, and workouts. Built with pure HTML, CSS, and JavaScript with localStorage for data persistence.

## 🌟 Features

### 🔐 User Authentication
- **Sign Up & Login**: Secure user registration and authentication
- **Multi-User Support**: Each user has their own isolated data
- **Profile Management**: Update weight, height, age, and gender anytime

### 📊 Dashboard
- **Body Visualization**: Interactive canvas-based body representation that changes based on your BMI
- **Quick Stats**: Track today's calories, calories burned, water intake, and workout time
- **BMI Calculator**: Calculate and visualize your Body Mass Index
- **Calorie Calculator**: Get personalized daily calorie goals based on your stats and activity level
- **Calorie Burn Estimator**: Estimate calories burned for different activities
- **Progress Tracking**: Real-time progress bars for calorie intake, water, and protein

### 🍽️ Diet Tracker
- **Comprehensive Food Database**: 60+ foods with complete nutrition info
  - Indian foods (Dosa, Rice, Dal, Curry, etc.)
  - Protein sources (Eggs, Chicken, Fish, etc.)
  - Fruits, vegetables, beverages, and snacks
- **Meal Logging**: Track breakfast, lunch, dinner, and snacks
- **Smart Search**: Instant food search with suggestions
- **Custom Food Entry**: Add your own foods with custom nutrition data
- **Meal Combinations**: Quick-add popular food combos:
  - Rice + Curry
  - Dosa + Chutney
  - Eggs + Orange Juice
  - Fish + Rice
  - Chicken + Veggies
  - Protein Shake
- **Nutrition Summary**: Daily totals for calories, protein, carbs, and fats
- **Water Tracker**: Track daily water intake with quick-add buttons
- **Historical View**: View diet data for any date

### 🏋️ Workout Tracker
- **Exercise Database**: 40+ exercises across multiple categories
  - Cardio (Running, Cycling, Swimming, etc.)
  - Strength Training (Bench Press, Squats, Deadlifts, etc.)
  - Flexibility (Yoga, Stretching, Pilates)
  - Sports (Basketball, Soccer, Tennis, etc.)
- **Workout Logging**: Log exercises with duration, intensity, sets, reps, and weight
- **Calorie Calculation**: Automatic calorie burn calculation using MET values
- **Workout Templates**: Pre-made workout routines:
  - Chest + Triceps
  - Back + Biceps
  - Leg Day
  - Shoulders + Core
  - Cardio Blast
  - Full Body
- **Activity Monitoring**: Track daily steps and active minutes
- **Workout Stats**: Total calories burned, duration, and exercises completed
- **Notes**: Add personal notes to each workout

### 📈 Analytics Dashboard
- **Weight Tracking**: Log and visualize weight changes over time
- **Time Range Selection**: View data for 7 days, 30 days, 90 days, or all time
- **Summary Statistics**:
  - Weight change
  - Average daily calories
  - Total workouts
  - Current streak
- **Interactive Charts**:
  - Weight progress line chart
  - Calorie intake vs burned comparison
  - Exercise distribution by category
  - Daily calories burned
  - Macronutrient breakdown
  - Protein intake over time
- **Milestones & Achievements**:
  - First Workout ✅
  - 7-Day Streak 🔥
  - 30-Day Champion 💪
  - 100 Workouts 🏋️
  - 10 lbs Lost ⭐
  - 1000 Calories Burned in One Day 🔥
- **Weekly Calendar**: Visual representation of active days
- **Data Export**: Export your data as JSON or CSV

## 🎨 Design Features

- **Modern UI/UX**: Clean, gradient-based design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, transitions, and visual feedback
- **Color-Coded**: BMI categories and body types use intuitive color coding
- **Icons**: Emoji-based icons for a friendly, approachable interface
- **Muscle Emoji Favicon**: 💪 throughout the app

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:
- User profiles
- Meal logs
- Workout logs
- Water intake
- Weight history
- Activity data
- BMI records

**Note**: Data persists across sessions but stays on your device. Clear your browser data will remove all stored information.

## 🚀 Getting Started

### Local Usage

1. **Clone or Download** the repository
2. **Open** `index.html` in your web browser
3. **Sign Up** with your details:
   - Full name, email, username, password
   - Age, gender, height (cm), weight (lbs)
4. **Start Tracking** your fitness journey!

### GitHub Pages Deployment

1. **Push** all files to a GitHub repository
2. Go to **Settings** → **Pages**
3. Select **main branch** as source
4. Your app will be live at `https://yourusername.github.io/repository-name`
5. **Share** the link with friends!

## 📱 How to Use

### Daily Routine

1. **Login** to your account
2. **Dashboard**: 
   - Check your body visualization
   - View today's stats
   - Calculate calorie goals
   - Estimate calorie burn for planned activities
3. **Diet Tracker**:
   - Log all meals throughout the day
   - Use quick-add combos for common meals
   - Track water intake
4. **Workout Tracker**:
   - Log exercises as you complete them
   - Use templates for structured workouts
   - Update steps and active minutes
5. **Analytics**:
   - Review your progress
   - Log weight changes
   - Check milestones
   - Export data for backup

### Your Custom Routine (Example: Bhavesh's 12-Day Plan)

The app supports any routine you create:

**Morning (6:00 AM)**:
- Log breakfast: 4 egg whites + orange juice
- Log water: 500ml

**Work Hours**:
- Update water intake periodically

**Lunch (1:00 PM)**:
- Quick add: Dosa + Fish Sticks combo
- Log water: 300ml

**Gym (6:00-7:45 PM)**:
- Use workout template or log individual exercises
- Track: Strength training sets/reps, cardio duration
- Automatic calorie burn calculation

**Dinner (8:15 PM)**:
- Log meal: 4 egg whites + dosa
- Log water: 300ml

**Night**:
- Check dashboard for daily summary
- View analytics for progress

## 🎯 Key Features Explained

### Body Visualization
- Dynamic body shape rendering based on BMI
- Visual representation shows:
  - **Underweight** (BMI < 18.5): Thinner body, blue color
  - **Normal** (18.5-24.9): Athletic build, purple color, visible muscle definition
  - **Overweight** (25-29.9): Fuller body, orange color
  - **Obese** (30+): Larger body, red color

### Calorie Tracking
- **Intake**: All food logged with precise calorie counts
- **Burn**: Exercise-based burn calculation using MET (Metabolic Equivalent of Task) values
- **Net Calories**: Visual comparison of intake vs burn
- **Goal Alignment**: Progress bars show how you're tracking against goals

### Smart Calculations
- **BMI**: (weight in lbs × 703) / (height in inches)²
- **BMR**: Mifflin-St Jeor Equation based on gender, age, weight, height
- **TDEE**: BMR × Activity Level multiplier
- **Target Calories**: TDEE ± Goal adjustment
- **Macros**: Optimized protein/carbs/fats based on your goal
- **Exercise Calories**: MET × weight(kg) × time(hours)

## 🔧 Technical Details

- **Framework**: Vanilla JavaScript (No dependencies!)
- **Charts**: Chart.js for analytics visualizations
- **Storage**: localStorage API
- **Responsive**: CSS Grid & Flexbox
- **Fonts**: Google Fonts (Poppins)
- **Canvas**: HTML5 Canvas for body visualization

## 📊 Food Database Highlights

Over 60 foods categorized:
- **Indian Cuisine**: Dosa, Idli, Rice, Chapati, Dal, Curries, Biryani, etc.
- **Proteins**: Eggs, Chicken, Fish, Paneer, Tofu, Greek Yogurt
- **Carbs**: Rice, Oats, Quinoa, Sweet Potato, Bread, Pasta
- **Fruits**: Banana, Apple, Orange, Mango, Grapes, Berries
- **Vegetables**: Broccoli, Spinach, Cucumber, Tomato, Carrots
- **Beverages**: Juices, Milk, Coffee, Tea
- **Snacks**: Nuts, Nut Butters, Oils

Each food includes:
- Calories
- Protein (g)
- Carbs (g)
- Fat (g)
- Serving size

## 🏆 Milestones System

The app tracks and rewards consistency:
- **Behavioral**: First workout, streaks
- **Performance**: 100 workouts, 1000 cal burn
- **Results**: Weight loss achievements

## 🤝 Multi-User Support

Perfect for:
- **Personal Use**: Track your own journey
- **Family**: Each family member can have their own account
- **Friends**: Share the app link, everyone gets their own data
- **Gym Buddies**: Compare progress (data is private per account)

## 🔒 Privacy

- All data stored locally on your device
- No server, no database, no tracking
- No internet required after initial load (except Chart.js CDN)
- Complete privacy and control

## 🎨 Customization

You can easily customize:
- **Colors**: Edit CSS variables in `styles.css`
- **Food Database**: Add more foods in `diet.js`
- **Exercise Library**: Expand exercises in `workout.js`
- **Templates**: Create new workout templates
- **Goals**: Modify calorie calculation formulas

## 📝 Tips for Best Results

1. **Be Consistent**: Log every meal and workout
2. **Stay Hydrated**: Use the water tracker daily
3. **Track Weight**: Log weight weekly for accurate trends
4. **Use Templates**: Save time with pre-made workout routines
5. **Review Analytics**: Check weekly progress to stay motivated
6. **Set Realistic Goals**: Use the calorie calculator for proper targets
7. **Export Data**: Regularly backup your data

## 🐛 Troubleshooting

**Lost Data?**
- Check if you're logged into the correct account
- Don't clear browser cache/localStorage
- Export data regularly as backup

**Charts Not Loading?**
- Ensure internet connection for Chart.js CDN
- Check browser console for errors

**Body Visualization Not Updating?**
- Update your profile with current weight/height
- Refresh the page

## 🚀 Future Enhancements (Ideas)

- Meal planning and prep
- Recipe database
- Photo progress tracking
- Social features (optional)
- Workout video library
- Nutrition tips and articles
- Push notifications/reminders
- Barcode scanner for food
- Integration with fitness devices

## 📄 License

Free to use and modify for personal and educational purposes.

## 👨‍💻 Credits

Built with ❤️ for fitness enthusiasts who want complete control over their tracking without subscriptions or data sharing.

---

**Start Your Fitness Journey Today! 💪**

Transform your body, track your progress, achieve your goals!
