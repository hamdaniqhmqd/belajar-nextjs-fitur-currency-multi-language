export interface CurrencyMeta {
    cc: string;
    symbol: string;
    name: string;
}

export const loadCurrencySymbols = async (): Promise<Record<string, string>> => {
    const response = await fetch('/data/currencies.json');
    const data: CurrencyMeta[] = await response.json();
    const map: Record<string, string> = {};
    data.forEach(item => {
        map[item.cc.toLowerCase()] = item.symbol;
    });
    return map;
};

export const loadCurrencyRates = async (): Promise<Record<string, number>> => {
    const response = await fetch('/data/usd.json');
    const data = await response.json();
    return data.usd;
};