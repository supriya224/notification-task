"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
import { setNotification } from '../redux/slices/notificationSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

const NotificationButton = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notifications);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const { message, sound } = change.doc.data();
          dispatch(setNotification({ message, sound }));
        }
      });
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (notification.message && notification.sound) {
      playSound(notification.sound);
      triggerToast(notification.message);
      dispatch(setNotification({ message: '', sound: '' }));
    }
  }, [notification, dispatch]);

  const playSound = (soundUrl: string) => {
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
      console.error("Error playing sound:", error);
    });
  };

  const triggerToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000); 
  };

  const handleButtonClick = () => {
    dispatch(setNotification({ message: 'You have a new notification!', sound: '/sounds/sound.mp3' }));
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleButtonClick}
      >
        Get Notification
      </button>

      {toast && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
          {toast}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
