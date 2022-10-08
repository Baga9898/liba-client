import { getNewResourcesFirst } from "../api/actions/resource";

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

export const setDefaultResource = (setResource: any) => {
    setResource({
        id: 0,
        name: '',
        link: '',
        description: '',
        category: '',
        date: '',
    });
}

export const newResourcesIsFirst = (
    setRequestIsLoading: any, 
    baseURL: string, 
    getParams: any, 
    setAllResources: any, 
    setIsLoading: any, 
    setSortType: any
) => {
    getNewResourcesFirst(
        setRequestIsLoading,
        baseURL,
        getParams,
        setAllResources,
        setIsLoading,
    );
    setSortType('newFirst');
    localStorage.setItem('sortMode', 'newFirst');
}