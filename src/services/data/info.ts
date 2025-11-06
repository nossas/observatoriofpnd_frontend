import axios from "axios";
import i18n from "i18next";
import { Esferas } from ".";
import { TFunction } from "i18next";

const endpoint = `${import.meta.env.VITE_URL_INFO_DATA}`;

// --- Nova função adaptada para i18n (sem hook)
export const formatNumber = (num: number, digits: number, t: TFunction, lang?: string) => {
  const lookup = [
    { value: 1, symbolKey: '' },
    { value: 1e3, symbolKey: 'number.thousand' },
    { value: 1e6, symbolKey: 'number.million' },
    { value: 1e9, symbolKey: 'number.billion' },
    { value: 1e12, symbolKey: 'number.trillion' },
    { value: 1e15, symbolKey: 'number.quadrillion' },
    { value: 1e18, symbolKey: 'number.quintillion' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(item => num >= item.value);

  const currentLang = lang || i18n.language;
  const decimalSeparator = currentLang.startsWith("en") ? "." : ","; // PT/ES usam ','

  const symbol = item ? t(item.symbolKey) : '';

  let result = item
    ? (num / item.value)
        .toFixed(digits)
        .replace(rx, "$1")
        .replace(".", decimalSeparator) + (symbol ? ` ${symbol}` : "")
    : "0";

  if (result === "0" && num > 0 && num < 1) {
    result = num.toFixed(1).toString().replace(".", decimalSeparator);
  }

  return result;
};

// --- Função principal
export const getInfoData = async (
  camada: number | undefined,
  esfera: number | undefined,
  estados: Array<string> | undefined,
  fpnd: string | undefined
) => {
  try {
    const _url = _getUrl(camada, esfera, estados, fpnd);
    const res = await axios.get(_url);
    if (!res?.data) throw "No data";

    const formatedData = {
      ..._formatData(res.data),
      esfera: Esferas[esfera || 0],
    };

    return formatedData;
  } catch (error) {
    return undefined;
  }
};

// --- Formata os números conforme idioma
const _formatData = (data: any) => {
  const t = i18n.t.bind(i18n); // acessa o tradutor global
  const lang = i18n.language;

  let _data = { ...data };

  for (let [key, value] of Object.entries(_data)) {
    if (typeof value === "number") {
      _data[key] = formatNumber(value, 1, t, lang);
    }
  }

  return _data;
};

// --- Monta URL da API
const _getUrl = (
  camada: number | undefined,
  esfera: number | undefined,
  estados: Array<string> | undefined,
  fpnd: string | undefined
) => {
  let url = endpoint;

  if (camada !== undefined) {
    url += `?camada=${camada}`;
  }

  if (esfera !== undefined) {
    url += camada !== undefined ? "&" : "?";
    url += `esfera=${Esferas[esfera]}`;
  }

  if (estados !== undefined && estados.length) {
    url += camada !== undefined || esfera !== undefined ? "&" : "?";
    for (let i = 0; i < estados.length; i++) {
      if (i > 0) url += "&";
      url += `estados=${estados[i]}`;
    }
  }

  if (fpnd !== undefined) {
    url += `&fpnd=${fpnd}`;
  }

  return encodeURI(url);
};
