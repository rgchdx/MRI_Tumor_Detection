from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, StreamingResponse
import os
import pickle

# Load the picke file
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# should we move this to a completely different file that would unpack the model???
class MRIClassifier:
    def __init__(self, model):
        self.model = model
    
    ## change this so that it will generate what we need
    def predict(self, image_path: str):
        # Here you would typically process the image and make a prediction
        # For simplicity, let's assume the model has a predict method
        return self.model.predict(image_path)
    
    def __main__(self):
        # This method could be used to test the model locally
        pass

app = FastAPI()

# Endpoint to serve the HTML page
@app.get("/")
async def root():
    return {"message": "Welcome to MRI Bonanza"}

### Endpoint to upload an image and get a prediction
@app.post("/predict")
async def predict(files: List[UploadFile] = File(...)):
    if not files:
        return {"error": "No files uploaded"}
    if files[0].split(".")[-1] != "jpg" or files[0].split(".")[-1] != "png":
        return {"error": "Only jpg and png files are allowed"}
    # save the uploaded file
    file_locaiton = f"server/torch/{files[0].filename}"
    with open(file_locaiton, "wb") as f:
        f.write(await files[0].read())
    # Make prediction
    prediction = model.predict(file_locaiton)
    return {"prediction": prediction}