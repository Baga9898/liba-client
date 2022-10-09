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
