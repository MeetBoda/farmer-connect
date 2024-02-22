import React, { useState } from 'react';
import Navbar from './Navbar';

const ImageUpload = () => {

  const backgroundStyle = {
    background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  };

  const containerStyle = {
    minHeight: '70vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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
          const url = `C:/Users/SHRUTI/OneDrive/Desktop/KrushiMitr/farmer-connect/backend/uploads/${responseData.imageUrl}`
          try {
            const response = await fetch('http://127.0.0.1:8080/predict', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ imageUrl: url }),
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

  return (
    <div>
      <Navbar />
      <div style={backgroundStyle}>
        <div className="container mt-4" style={containerStyle}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleUpload} encType='multipart/form-data'>
                <h2 className="text-center mb-4">Image Upload</h2>
                <div className="form-group">
                  <input type="file" className="form-control" name="image" accept="image/*" onChange={handleImageChange} />
                </div>
                {selectedImage && (
                  <div className="form-group">
                    <h4>Selected Image :</h4>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="img-fluid"
                    />
                  </div>
                )}
                <div className="form-group text-center">
                  <button className="btn btn-primary"
                    type="submit"
                    style={{
                      border: 'none',
                      backgroundColor: '#799b6e',
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                    tabIndex={0}
                  >Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;