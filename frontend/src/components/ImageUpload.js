import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/css/cropinfo.css';

const ImageUpload = () => {
  const [result, setResult] = useState(null);
  const [disease, setDisease] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);

  const backgroundStyle = {
    background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  };

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
      formData.append('posted_by_id', userId);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Image uploaded successfully!');
          console.log('Image URL:', responseData.imageUrl);
          const image_id = responseData.image_id;
          const url = `C:/Users/SHRUTI/OneDrive/Desktop/KrushiMitr/farmer-connect/backend/uploads/${responseData.imageUrl}`;

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
              console.log("result : ", result.solution);
              setResult(result.solution);
              setDisease(result.disease)

              try {
                const response = await fetch('/api/addsolution', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ image_id, solution: result.solution, disease:result.disease }),
                });
              } catch (error) {
                console.error(error.message);
              }
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
      <section className="py-2 py-md-5">
        <div className="container-fluid">
          <form onSubmit={handleUpload} encType='multipart/form-data'>
            <h3 className="text-center mb-4">Image Upload</h3>
            <div className="form-group">
              <input type="file" className="form-control" name="image" accept="image/*" onChange={handleImageChange} />
            </div>
            {selectedImage && (
              <div className="d-flex justify-content-center">
                <img className="img-fluid rounded mt-4" loading="lazy" src={URL.createObjectURL(selectedImage)} alt="Image" />
              </div>
            )}
            {result && (
              <div>
                <h4 className="mt-5 text-center"><b>Disease</b> : {disease}</h4>
                <h3 className="m-3">Solution</h3>
                <p className="m-3" style={{ fontSize: '1.2rem' }}>{result}</p>
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
                    marginTop: '10px'
                  }}
                  tabIndex={0}
                >Upload</button>
              </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ImageUpload;
