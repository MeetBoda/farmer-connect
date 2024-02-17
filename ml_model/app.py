from flask import Flask, request, jsonify
import tensorflow as tf
from keras.preprocessing.image import img_to_array, load_img
from keras.applications.vgg19 import preprocess_input
import numpy as np
from PIL import Image
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
model = tf.keras.models.load_model('base_model.h5')


ref = {0: 'Apple___Apple_scab', 1: 'Apple___Black_rot', 2: 'Apple___Cedar_apple_rust',
        3: 'Apple___healthy', 4: 'Blueberry___healthy', 5: 'Cherry_(including_sour)___Powdery_mildew',
          6: 'Cherry_(including_sour)___healthy', 7: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 
          8: 'Corn_(maize)___Common_rust_', 9: 'Corn_(maize)___Northern_Leaf_Blight', 10: 'Corn_(maize)___healthy',
            11: 'Grape___Black_rot', 12: 'Grape___Esca_(Black_Measles)', 
            13: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 14: 'Grape___healthy', 
            15: 'Orange___Haunglongbing_(Citrus_greening)', 16: 'Peach___Bacterial_spot', 
            17: 'Peach___healthy', 18: 'Pepper,_bell___Bacterial_spot', 19: 'Pepper,_bell___healthy', 
            20: 'Potato___Early_blight', 21: 'Potato___Late_blight', 22: 'Potato___healthy', 
            23: 'Raspberry___healthy', 24: 'Soybean___healthy', 25: 'Squash___Powdery_mildew',
              26: 'Strawberry___Leaf_scorch', 27: 'Strawberry___healthy', 28: 'Tomato___Bacterial_spot', 
              29: 'Tomato___Early_blight', 30: 'Tomato___Late_blight', 31: 'Tomato___Leaf_Mold', 
              32: 'Tomato___Septoria_leaf_spot', 33: 'Tomato___Spider_mites Two-spotted_spider_mite', 
              34: 'Tomato___Target_Spot', 35: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 
              36: 'Tomato___Tomato_mosaic_virus', 37: 'Tomato___healthy'}

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = request.json
    print(data)
    image_path = data.get('imageUrl')

    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img)
    img_array = preprocess_input(np.expand_dims(img_array, axis=0))

    pred = np.argmax(model.predict(img_array))
    print(int(pred))
    return jsonify({'predictedClass': ref[pred]})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
