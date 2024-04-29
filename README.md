Welcome to FitnessX App, your comprehensive fitness hub application developed using FastAPI and React Native. 

This app allows users to explore a vast Airtable API containing data of exercises along with their animations, categorized by equipment and muscle groups.

Features

Exercise Exploration: Users can explore a vast database of exercises categorized by equipment and muscle groups.

Workout Logging: Implemented workout logging functionality, allowing users to track their exercise routines and progress over time.

Visualization: Visualize workout data over time to track progress and performance trends using.

Visually Appealing UI/UX: Designed a visually appealing user interface to enhance user engagement and provide an enjoyable browsing experience.

Technologies Used

FastAPI: Utilized FastAPI for the backend to handle data processing and communication with the database.

React Native: Developed the frontend using React Native for seamless cross-platform compatibility.

MongoDb:Used a NoSQl Database to represent complex user data comprising of multiple exercises,workouts and sets for each user.

Object: User

        - name: String
        - email: String
        - password: String
        - exercises: Array of Exercise Objects

Object: Exercise

        - name: String
        - workouts: Array of Workout Objects

Object: Workout

        - date: Date
        - sets: Array of Set Objects

Object: Set

        - weight: Number
        - reps: Number


![IMG-20240427-WA0006_48](https://github.com/Yasshhhhh/FitnessNativeApp/assets/91091885/3bde4602-a9a5-49e5-bf09-ea46cb40693a)


![IMG-20240427-WA0007_48](https://github.com/Yasshhhhh/FitnessNativeApp/assets/91091885/892aee00-8687-448c-9eb0-9fa2952ab3a0)


![IMG-20240427-WA0005_48](https://github.com/Yasshhhhh/FitnessNativeApp/assets/91091885/e1d806e8-3396-4a51-9bfe-488e98060939)


https://github.com/Yasshhhhh/FitnessNativeApp/assets/91091885/7eafbb45-6687-4778-8c71-f51c52ae4f1b






