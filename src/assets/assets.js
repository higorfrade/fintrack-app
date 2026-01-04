import { LuHandCoins, LuLandmark, LuList, LuListFilter, LuWallet } from "react-icons/lu";
import fintrack_logo from "./fintrack-logo.png";
import fintrack_alt_logo from "./fintrack-w-logo.png";
import fintrack_app from "./fintrack-showcase.png";

export const assets = {
    fintrack_logo,
    fintrack_alt_logo,
    fintrack_app
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLandmark,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Categoria",
        icon: LuList,
        path: "/category"
    },
    {
        id: "03",
        label: "Receita",
        icon: LuWallet,
        path: "/income"
    },
    {
        id: "04",
        label: "Despesa",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "05",
        label: "Filtro",
        icon: LuListFilter,
        path: "/filter"
    }
];