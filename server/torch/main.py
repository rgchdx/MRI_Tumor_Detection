from typing import List
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, StreamingResponse
import os
import pickle
from torchvision import transforms
import torch
from torch import nn
import timm
import __main__



user_dir = os.getcwd()
file = 'model.pkl'
model_path = os.path.join(user_dir, file)

class MRIClassifer(nn.Module):
    def __init__(self, num_classes=53):
        super(MRIClassifer, self).__init__()
        # Where we define all the parts of the model
        self.base_model = timm.create_model('efficientnet_b0', pretrained=True)
        self.features = nn.Sequential(*list(self.base_model.children())[:-1])

        enet_out_size = 1280
        # Make a classifier
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(enet_out_size, num_classes)
        )
    
    def forward(self, x):
        # Connect these parts and return the output
        x = self.features(x)
        output = self.classifier(x)
        return output

# Load the picke file
model = MRIClassifer()  # Initialize model structure
model.load_state_dict(torch.load(model_path, map_location='torch.device("cpu")'))
model.eval()

# Initialize the FastAPI app
app = FastAPI()

# Initialize the MRIClassifier with the loaded model
classifier = MRIClassifer(model)

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