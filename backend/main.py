from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pymongo import MongoClient
from typing import List, Optional
import logging
from datetime import datetime
from bson import ObjectId  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = "mongodb+srv://Logger:123@cluster0.h8n3gqg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DATABASE_NAME = "GymLogger"  
COLLECTION_NAME = "Users"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db[COLLECTION_NAME]

if client is not None:
    print("Connected to MongoDB")
else:
    print("Not Connected")    


class Set(BaseModel):
    weight: float
    reps: int

class Workout(BaseModel):
    date: datetime
    sets: List[Set]

class Exercise(BaseModel):
    name: str
    workouts: List[Workout]

class User(BaseModel):
    name: str
    email: str
    password: str
    exercises: Optional[List[Exercise]] = None

class Login(BaseModel):
    email: str
    password: str

class ExerciseLog(BaseModel):
    name: str
    workout: dict
    

logging.basicConfig(level=logging.INFO)



# Routes
@app.get('/')
async def hello():
     return "hello"

@app.post('/upload')
async def upload(req:ExerciseLog):
    try:
        logging.info(req.workout)
        email=req.workout['email']
        exerciseName=req.name
        user_data = users_collection.find_one({"email": email})
        exercise_exists = any(exercise["name"] == exerciseName for exercise in user_data["exercises"])
        if not exercise_exists:
            users_collection.update_one(
            {"email": email},
            {"$push": {"exercises": {"name":exerciseName, "workouts": []}}}
        )

        newWorkout={
            "date":req.workout['date'],
            "sets":req.workout['sets']
        } 
      

        users_collection.update_one({"email": email, "exercises.name": exerciseName},{"$push": {"exercises.$.workouts": newWorkout}})
        return "Set Succesfully Logged"
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post('/login')
async def login(request:Login):
    logging.info("Hellso, world!")
    try:
        email = request.email
        password = request.password
        user_data = users_collection.find_one({"email": email})

        if user_data is None:
            raise HTTPException(status_code=404, detail="User not found")

        if password != user_data["password"]:
            raise HTTPException(status_code=404, detail="Incorrect password")

        user_dict = {
            "name": user_data["name"],
            "email": user_data["email"],
            "password": user_data["password"],
            "exercises": user_data["exercises"]
        }
        
        logging.info(user_data)
        return user_dict
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    




@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail}
    )

if __name__ == "__main__":
    import uvicorn
    port = 5000  
    print(f"Starting FastAPI server on port {port}") 
    uvicorn.run(app, host="0.0.0.0", port=port)
