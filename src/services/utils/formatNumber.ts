import { useTranslation } from 'react-i18next';

export const useFormatNumber = () => {
  const { i18n, t } = useTranslation();

  const formatNumber = (num: number, digits: number) => {
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

    // Ajuste do separador decimal conforme o idioma
    const lang = i18n.language;
    const decimalSeparator =
      lang.startsWith('en') ? '.' : ','; // espanhol e português usam ','

    const symbol = item ? t(item.symbolKey) : '';

    let result = item
      ? (num / item.value)
          .toFixed(digits)
          .replace(rx, '$1')
          .replace('.', decimalSeparator) + (symbol ? ` ${symbol}` : '')
      : '0';

    if (result === '0' && num > 0 && num < 1) {
      result = num
        .toFixed(1)
        .toString()
        .replace('.', decimalSeparator);
    }

    return result;
  };

  return { formatNumber };
};

export const formatNumber = (num: number, digits: number) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "mil" },
        { value: 1e6, symbol: "milhões" },
        { value: 1e9, symbol: "bilhões" },
        { value: 1e12, symbol: "trilhões" },
        { value: 1e15, symbol: "quatrilhões" },
        { value: 1e18, symbol: "quintilhões" }
    ];

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });

    // return item ? (num / item.value).toFixed(digits).replace(rx, "$1").replace('.', ',') + item.symbol : "0";
    let result = item ? (num / item.value).toFixed(digits).replace(rx, "$1").replace('.', ',') + (item.symbol ? ` ${item.symbol}` : '') : "0";

    if (result === '0' && num > 0 && num < 1) {
        result = num.toFixed(1).toString().replace('.', ',');
    }

    return result;
}
