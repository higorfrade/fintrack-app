import moment from "moment";

export const addThousandSeparator = (amount) => {
    if (amount == null || isNaN(amount)) return "";

    //Converte o número para String para lidar com os decimais
    const numStr = amount.toString();
    const parts = numStr.split('.');

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // Regex para o formato brasileiro
    // Lida com os primeiros 3 digitos e depois com os outros 3
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== '') {
        const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        integerPart = formattedOtherNumbers + '.' + lastThree;
    } else {
        integerPart = lastThree;
    }

    return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};


export const prepareTransactionLineChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
    
    // Reduce para agrupar as transações por data ('date')
    const groupedByDate = data.reduce((acc, item) => {
        const dateKey = item.date; // string da data

        // Se ainda não existe um grupo para essa data, cria
        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey, // data original
                totalAmount: 0, // soma dos valores do dia
                items: [] // lista de transações do dia
            };
        }

        // Soma o valor e adiciona ao Array de transações do dia
        acc[dateKey].totalAmount += item.amount;
        acc[dateKey].items.push(item);
        return acc;
    }, {});

    // Converte o objeto para Array
    let chartData = Object.values(groupedByDate);

    
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date)); // ordena as datas da menor para maior

    // Adiciona um campo Month
    chartData = chartData.map((dataPoint) => ({
        ...dataPoint,
        month: moment(dataPoint.date).format('DD MMM'),
    }));

    return chartData; // Array agrupado
};