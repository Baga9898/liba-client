export const showNHideNotification = (
    status: string, 
    message: string,
    setNotificationStatus: (status: string) => void,
    setNotificationText: (message: string) => void,
    setNotificationIsOpen: (isOpen: boolean) => void,
) => {
    setNotificationStatus(status);
    setNotificationText(message);
    setNotificationIsOpen(true);
    setTimeout(() => {
        setNotificationIsOpen(false);
    }, 3000);
}

export const setDefaultAuthForm = (setAuthForm: any) => {
    setAuthForm({
        username: '',
        password: '',
    });
}