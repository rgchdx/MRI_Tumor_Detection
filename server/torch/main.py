from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, StreamingResponse
import os
import pickle
from torchvision import transforms
import torch
from MRIClassifer import MRIClassifer
import __main__
import torch.serialization

__main__.MRIClassifer = MRIClassifer



#user_dir = os.getcwd()
#file = 'model.pkl'
#model_path = os.path.join(user_dir, file)

# torch.serialization.add_safe_globals([MRIClassifer])
model = torch.load("model.pth", map_location="cpu", weights_only=False)
print(type(model))
print("Model loaded successfully")
# Set the model to evaluation mode
model.eval()

# Initialize the FastAPI app
app = FastAPI()

# Initialize the MRIClassifier with the loaded model

# Function to preprocess the image to match the model's input requirements
def preprocess(image):
    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.PILToTensor(),
    ])
    return transform(image)

# Set the device to CPU (if we are running on GPU then change this)
device = torch.device('cpu')

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