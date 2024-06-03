import axios from "axios"
import { Esferas } from "."
import { formatNumber } from "services/utils"

const endpoint = `${import.meta.env.VITE_URL_INFO_DATA}`

//TODO: remover camada

export const getInfoData = async (camada: number | undefined, esfera: number | undefined, estados: Array<string> | undefined,  fpnd: string | undefined ) => {
    // console.log('getInfoData:', camada, esfera, estados)
    
    try {
        const _url = _getUrl(camada, esfera, estados, fpnd)
        console.log(_url)
        const res = await axios.get(_url)
        if (!res?.data) throw ('No data')
        return _formatData(res.data)
    } catch (error) {
        return undefined
    }
}

const _formatData = (data: any) => {
    let _data = {...data}

    for (let [key, value] of Object.entries(_data)){
        if (typeof value === 'number') {
            _data[key] = formatNumber(value, 1)
        }
    }

    return _data
}

const _getUrl = (camada: number | undefined, esfera: number | undefined, estados: Array<string> | undefined, fpnd: string | undefined ) => {
    let url = endpoint

    if (camada!==undefined) {
        url += `?camada=${camada}`
    }

    if (esfera!==undefined) {
        url += camada!==undefined ? '&' : '?'
        url += `esfera=${Esferas[esfera]}`
    } 

    if (estados !==undefined && estados.length) {
        url += camada!==undefined || esfera!==undefined ? '&' : '?'
        for (let i=0; i< estados.length; i++) {
            if (i > 0) {
                url += '&'
            }
            url += `estados=${estados[i]}`
        }
    }
    if (fpnd!==undefined) {
        url += `&fpnd=${fpnd}`
    }

    return encodeURI(url)
}