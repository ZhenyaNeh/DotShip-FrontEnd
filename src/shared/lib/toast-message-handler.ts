import { toast } from 'sonner';

export function toastMessageHandler(message?: string) {
  if (message) {
    const errorMessage = message;
    const firstDotIndex = errorMessage.indexOf('.');

    if (firstDotIndex !== -1) {
      toast.error(errorMessage.slice(0, firstDotIndex), {
        description: errorMessage.slice(firstDotIndex + 1),
      });
    } else {
      toast.error(errorMessage);
    }
  } else {
    toast.error('Error from server side');
  }
}
