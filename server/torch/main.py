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
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
import io

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

# allowing CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
# Initialize the MRIClassifier with the loaded model

# Function to preprocess the image to match the model's input requirements
#def preprocess(image):
#    transform = transforms.Compose([
#        transforms.Resize((128, 128)),
#        transforms.PILToTensor(),
#    ])
#    return transform(image)

def preprocess(image):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize to match the model input size
        transforms.ToTensor(),           # Convert PIL Image to Tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize
    ])
    return preprocess(image)

# Set the device to CPU (if we are running on GPU then change this)
device = torch.device('cpu')

# Endpoint to serve the HTML page
@app.get("/")
async def root():
    return {"message": "Welcome to MRI Bonanza"}

### Endpoint to upload an image and get a prediction
# Later on we will fetch the data from the database and get the prediction results into the frontend
# Might have to change so that we will take in the image from the frontend and then return the prediction results
# For testing we have it set so that we have a test image in the server/torch directory might have to change the input later 
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file:
        return {"error": "No files uploaded"}
    # Check if the uploaded file is an image
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return {"error": "File must be an image (png, jpg, jpeg)"}
    # save the uploaded file
    # Maybe change the file location to a more appropriate place
    #file_locaiton = f"../server/torch/{files[0].filename}"
    # file_location = "/Users/rgdix/Desktop/MRI_Tumor_Detection/server/torch/test/has_tumor_test1.png"
    try:
        image = Image.open(io.BytesIO(await file.read()))
    except Exception as e:
        # We are encountering this error currently.
        return {"error": f"Failed to open image: {e}"}
    print(f"Image opened: {image}")
    input_tensor = preprocess(image).unsqueeze(0).float()
    print(f"Input tensor: {input_tensor}")
    with torch.no_grad():
        output = model(input_tensor)
    print(f"Output shape: {output.shape}")
    # Make prediction
    prediction = torch.argmax(output, dim=1).item()
    return {"prediction": prediction}