import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addThousandSeparator } from "../utils/utils";

// Recebe um array agrupado por data preparado pela função prepareTransactionLineChartData()
const CustomLineChart = ({ data }) => {
    /* Define um Tooltip personalizado: active: se o tooltip deve aparecer quando o mouse estiver sobre o ponto
    payload: os dados desse ponto e label: valor da chave XAxis (month) */
    const CustomToolTip = ({active, payload, label}) => {
        // Se tiver ativo e possuir dados válidos
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // pega os dados desse ponto

            // Agrupa as transações por categoria dentro do dia
            const groupedItemsForTooltip = dataPoint.items.reduce((acc, item) => {
                const {categoryName, amount} = item;

                // Cria o agrupamento se ainda não existir
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        categoryName: categoryName,
                        totalAmount: 0
                    }
                }
                acc[categoryName].totalAmount += amount; // soma o valor
                return acc;
            }, {});

            // Converte o Objeto em um Array
            const categoriesInTooltip = Object.values(groupedItemsForTooltip);

            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p> {/*Exibe o label*/}
                    <hr className="my-1 border-gray-200" />

                    <p className="text-sm text-gray-700 font-bold mb-2">
                        {/*Exibe o valor total do dia*/}
                        Total: <span className="text-black">R&#36; {addThousandSeparator(dataPoint.totalAmount)}</span>
                    </p>

                    {/*Exibe os detalhes por categoria*/}
                    {categoriesInTooltip && categoriesInTooltip.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-1">Detalhes:</p>
                            {categoriesInTooltip.map((groupedItem, index) => (
                                <div key={index} className="flex justify-between text-xs text-gray-700">
                                    <span>{groupedItem.categoryName}:</span>
                                    <span>R&#36; {addThousandSeparator(groupedItem.totalAmount)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        {/*Se o tooltip não estiver ativo*/}
        return null;
    }

    {/*Renderização do gráfico*/}
    return (
        <div className="bg-white">
            <ResponsiveContainer width="100%" height={300}> {/*Deixa o gráfico responsivo*/}
                <AreaChart data={data}> {/*Área do gráfico*/}
                    <defs>
                        <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1"> {/*Cria um degradê vertical para o fundo*/}
                            <stop offset="5%" stopColor="#1e90ff" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#1e90ff" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="none" /> {/*Sem grades visíveis*/}
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" /> {/*Define o eixo X*/}
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" /> {/*Define o eixo Y*/}
                    <Tooltip content={<CustomToolTip />} /> {/*Substitui o Tooltip padrão pelo customizado*/}

                    {/*Curva suave, valor do eixo Y, cor da linha, degradê criado acima, grossura da linha, ponto nos nós da linha*/}
                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#1e90ff"
                        fill="url(#transactionGradient)"
                        strokeWidth={3}
                        dot={{ r: 3, fill: "#00bfff" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomLineChart;