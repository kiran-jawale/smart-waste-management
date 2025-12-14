 import { useState, useEffect } from "react";

export const useNotifier = () => {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then(setPermission);
    }
  }, [permission]);

  const sendNotification = (title, body) => {
    if (permission === "granted") {
      new Notification(title, { body });
    } else {
      console.warn("Notification permission is not granted.");
       
      // alert(`${title}: ${body}`);
    }
  };

  return { sendNotification };
};

/* s
  const { sendNotification } = useNotifier();
  
  useEffect(() => {
    sendNotification("Welcome!", "You can now receive notifications.");
  }, [sendNotification]);
*/