import { LuHandCoins, LuLandmark, LuList, LuListFilter, LuWallet } from "react-icons/lu";
import fintrack_logo from "./fintrack-logo.png";
import fintrack_alt_logo from "./fintrack-w-logo.png";

export const assets = {
    fintrack_logo,
    fintrack_alt_logo
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
        label: "Category",
        icon: LuList,
        path: "/category"
    },
    {
        id: "03",
        label: "Income",
        icon: LuWallet,
        path: "/income"
    },
    {
        id: "04",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "05",
        label: "Filter",
        icon: LuListFilter,
        path: "/filter"
    }
];