//https://stackoverflow.com/a/9462382

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
