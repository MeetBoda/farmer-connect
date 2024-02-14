import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // You can perform additional actions with the selected image, such as uploading it to a server.
    // For simplicity, we're just setting it in the state in this example.
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userid");

    if (!userId) {
      console.error('User ID not found. Please make sure the user is logged in.');
      return;
    }

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Image uploaded successfully!');
          console.log('Image URL:', responseData.imageUrl);

          try {
            const response = await fetch('http://127.0.0.1:8080/predict', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify( responseData.imageUrl ),
            });

            if (response.ok) {
              const result = await response.json();
              console.log('Predicted Class:', result.predictedClass);
              // Update your UI to display the predicted class
            } else {
              const errorText = await response.text();
              throw new Error(`Error predicting class: ${errorText}`);
            }
          } catch (error) {
            console.error(error.message);
          }

        } else {
          const errorText = await response.text();
          throw new Error(`Error uploading image: ${errorText}`);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.error('Please select an image to upload.');
    }
  };

  const handleUploadml = async (e) => {
    e.preventDefault();
    const imageUrl = "backend/uploads/Common-corn-rust.jpeg";
    try {
      const response = await fetch('http://127.0.0.1:8080/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Predicted Class:', result.predictedClass);
        // Update your UI to display the predicted class
      } else {
        const errorText = await response.text();
        throw new Error(`Error predicting class: ${errorText}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleUpload} method='post' encType='multipart/form-data'>
        <div>
          <h2>Image Upload</h2>
          <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <div>
              <h4>Selected Image Preview:</h4>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
              />
            </div>
          )}
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
