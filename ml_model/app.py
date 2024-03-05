from flask import Flask, request, jsonify
import tensorflow as tf
from keras.preprocessing.image import img_to_array, load_img
from keras.applications.vgg19 import preprocess_input
import numpy as np
from PIL import Image
from flask_cors import CORS, cross_origin
import openai
import requests
import json

app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model('base_model.h5')

ref = {0: 'Apple__Apple_scab', 1: 'Apple_Black_rot', 2: 'Apple__Cedar_apple_rust',
        3: 'Apple__healthy', 4: 'Blueberry_healthy', 5: 'Cherry(including_sour)___Powdery_mildew',
          6: 'Cherry_(including_sour)__healthy', 7: 'Corn(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
          8: 'Corn_(maize)__Common_rust', 9: 'Corn_(maize)__Northern_Leaf_Blight', 10: 'Corn(maize)___healthy',
            11: 'Grape__Black_rot', 12: 'Grape_Esca(Black_Measles)', 
            13: 'Grape__Leaf_blight(Isariopsis_Leaf_Spot)', 14: 'Grape___healthy', 
            15: 'Orange__Haunglongbing(Citrus_greening)', 16: 'Peach___Bacterial_spot', 
            17: 'Peach__healthy', 18: 'Pepper,_bell_Bacterial_spot', 19: 'Pepper,_bell__healthy', 
            20: 'Potato__Early_blight', 21: 'Potato_Late_blight', 22: 'Potato__healthy', 
            23: 'Raspberry__healthy', 24: 'Soybean_healthy', 25: 'Squash__Powdery_mildew',
              26: 'Strawberry__Leaf_scorch', 27: 'Strawberry_healthy', 28: 'Tomato__Bacterial_spot', 
              29: 'Tomato__Early_blight', 30: 'Tomato_Late_blight', 31: 'Tomato__Leaf_Mold', 
              32: 'Tomato__Septoria_leaf_spot', 33: 'Tomato__Spider_mites Two-spotted_spider_mite', 
              34: 'Tomato__Target_Spot', 35: 'Tomato__Tomato_Yellow_Leaf_Curl_Virus', 
              36: 'Tomato__Tomato_mosaic_virus', 37: 'Tomato__healthy'}

openai.api_key = "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"

URL = "https://api.openai.com/v1/chat/completions"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    image_path = data.get('imageUrl')

    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img)
    img_array = preprocess_input(np.expand_dims(img_array, axis=0))

    pred = np.argmax(model.predict(img_array))
    print(ref[pred])
    predicted_class = ref[pred]
    
    payload = {
      "model" : "gpt-3.5-turbo",
      "messages" : [{"role" : "user", "content": f"What is {predicted_class} ? and how can someone overcome it ?"}],
      "temperature":1.0,
      "top_p" : 1.0,
      "n":1,
      "stream":False,
      "presence_penalty":0,
      "frequency_penalty":0,
    }

    headers = {
        "Content-Type":"application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }

    response = requests.post(URL, headers=headers, json=payload)
    data = response.json()  # Parse JSON response

    content = data['choices'][0]['message']['content']
    # print(content)
    return content

if __name__ == '__main__':
    app.run(debug=True, port=8080)