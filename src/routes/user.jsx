import { useState, useEffect } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc, getDoc, collection, setDoc } from 'firebase/firestore';

import logo from '../assets/logo.png';
import { FadeLoader } from 'react-spinners';
import { useStoreConsumer } from '../context/storeProvider';
const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, userEmailData } = useStoreConsumer();
  const navigate = useNavigate();

  const userData =
    user &&
    user.find(
      (item) => item.email === userEmailData.email && userEmailData.email
    );
  const userId = userData.id;
  console.log(userId);
  const handleImageUpload = async (userId) => {
    try {
      if (userImage) {
        if (!userImage.type || !userImage.type.startsWith('image/')) {
          console.error('Selected file is not an image.');
          return;
        }

        if (userImage.size > 5 * 1024 * 1024) {
          console.error(
            'Selected image is too large. Please select a smaller image.'
          );
          return;
        }
        const storageRef = ref(storage, `profileImages/${userId}`);
        await uploadBytes(storageRef, userImage);
        const url = await getDownloadURL(storageRef);
        console.log('Image URL:', url);
        return url;
      }
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSave = async () => {
    if (displayName && phoneNumber) {
      try {
        setLoading(true);
        let updatedData = {
          ...userData,
          displayName,
          phoneNumber,
        };
        if (isEditingPhoto && userImage) {
          const photoURL = await handleImageUpload(userId); // Upload the image
          console.log(photoURL);

          if (photoURL) {
            updatedData.photoURL = photoURL;
            console.log('Image URL:', photoURL);
          } else {
            console.error('Image upload failed.');
            return;
          }
        }

        const itemToEdit = doc(db, 'users', userId);
        await updateDoc(itemToEdit, updatedData);
        setIsEditing(false);
        navigate('/products');
        window.location.reload('/products');
      } catch (error) {
        console.error('Error in updating:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Phone Number is mandatory');
    }
  };

  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setPhoneNumber(userData.phoneNumber || '');
      setUserImage(userData.photoURL || '');
    }
  }, [userData]);

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log('error', error));
  };
  const handleEdit = () => {
    setIsEditing(true);
    setDisplayName(userData.displayName);
    setPhoneNumber(userData.phoneNumber);
    setUserImage(userData.photoURL || userImage);
  };
  const editPhoto = () => {
    setIsEditingPhoto(true);
    setIsEditing(true);
  };
  return (
    <div>
      <Navbar className='user-nav' />
      <h1 className='name'>
        Hello
        <span className='user-name'>
          {displayName ? ` ${displayName}` : 'Please log in'}
        </span>
      </h1>
      <div className='user-profile'>
        <div className='user-details'>
          <img
            className='user-img'
            src={userData.photoURL || userImage}
            alt=''
          />
          <div className={`user-data ${loading ? 'blur' : ''}`}>
            <div className='input-container'>
              <div className='input-section'>
                <input
                  type='text'
                  name='displayName'
                  placeholder='Name'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className='input-section'>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className='input-section'>
                <input
                  type='number'
                  name='phoneNumber'
                  placeholder='Ph number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className='img-section'>
                <div>
                  {' '}
                  <input
                    className='img-input'
                    type='file'
                    accept='image/*'
                    onChange={(e) => setUserImage(e.target.files[0])}
                    disabled={!isEditingPhoto}
                  />
                </div>
                <div>
                  <button
                    className='button'
                    onClick={editPhoto}
                    disabled={!isEditing}
                  >
                    Edit Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='cart-button'>
            {!isEditing ? (
              <button className='button' onClick={handleEdit}>
                Edit profile
              </button>
            ) : (
              <>
                <button className='button' onClick={handleSave}>
                  Save Changes
                </button>
              </>
            )}
            <button className='button' onClick={logOut}>
              Logout
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className='loader-container'>
          <FadeLoader
            color='#e70c0c'
            margin={-1}
            loading={loading}
            size={100}
          />
        </div>
      )}
    </div>
  );
};

export default User;