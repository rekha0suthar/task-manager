import toast from 'react-hot-toast';

export const showSuccessToast = (message) =>
  toast.success(message, {
    duration: 2000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
    className: 'toast-animation',
  });

export const showErrorToast = (message) =>
  toast.error(message, {
    duration: 2000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '10px',
    },
    className: 'toast-animation',
  });
