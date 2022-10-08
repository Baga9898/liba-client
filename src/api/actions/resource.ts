import axios from "axios";

export const getOneResource = async (
    resourceId: number,
    setDefaultResource: any,
    setResource: any,
    setRequestIsLoading: any,
    baseURL: string,
    resource: any,
) => {
    setDefaultResource(setResource);
    setRequestIsLoading(true);
    try {
        await axios.get(`${baseURL}/${resourceId}`)
        .then((response: any) => {
            setResource({...resource, name: response.data.name});
        })
    } catch (error) {
        console.error(error);
    }
    setRequestIsLoading(false);
}

export const getNewResourcesFirst = async (
    setRequestIsLoading: any,
    baseURL: string,
    getParams: any,
    setAllResources: any,
    setIsLoading: any,
) => {
    setRequestIsLoading(true);
    try {
        await axios.get(baseURL, {params: getParams})
        .then((response: any) => {
            const newArray = response.data;
            const reverseArray = newArray.reverse();
            setAllResources(reverseArray);
            setIsLoading(false);
        })
    } catch (error) {
        console.error(error);
        setIsLoading(false);
    }
    setRequestIsLoading(false);
}