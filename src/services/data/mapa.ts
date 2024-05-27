import axios from "axios"

const endpoint = `${import.meta.env.VITE_URL_MAP_DATA}`

export const getMapData = async () => {
    const res = await axios.get(endpoint)
    if (res?.data) return res.data
    return {}
}
