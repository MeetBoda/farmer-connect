from flask import Flask, request, jsonify
import tensorflow as tf
from keras.preprocessing.image import img_to_array, load_img
from keras.applications.vgg19 import preprocess_input
import numpy as np

app = Flask(__name__)
model = tf.keras.models.load_model('base_model.h5')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    image_path = data.get('imageUrl')

    img = load_img(image_path, target_size=(256, 256))
    img_array = img_to_array(img)
    img_array = preprocess_input(np.expand_dims(img_array, axis=0))

    pred = np.argmax(model.predict(img_array))
    print(int(pred))
    return jsonify({'predictedClass': int(pred)})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
