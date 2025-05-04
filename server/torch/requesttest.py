import pip._vendor.requests 

url = "http://127.0.0.1:8000/predict"
file_path = "test/no_tumor_test1.png" # add some image here or add a test file for tumor images

with open(file_path, "rb") as file:
    files = {"files": (file_path, file, "image/jpeg")}
    response = pip._vendor.requests.post(url, files=files)
    
print(response.status_code)
print(response.json())
