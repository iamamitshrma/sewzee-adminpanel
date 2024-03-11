export const sidebarList = [
    {
        id: 1,
        label: "Dashboard",
        link: "/dashboard",
    },

    {
        id: 2,
        label: "Users",
        link: "/users",
    },
    {
        id: 3,
        label: "Customer",
        link: "/customer",
        collapse: "customer",
        options: [
            {
                id: 11,
                label: "Marketplace",
                link: "/customer/marketplace",
            },
            {
                id: 21,
                label: "Tailor",
                link: "/customer/tailor",
            },
        ],
    },
    {
        id: 4,
        label: "Brands",
        link: "/brands",
    },
    {
        id: 5,
        label: "Boutiques",
        link: "/boutiques",
    },
    {
        id: 6,
        label: "Tailors",
        link: "/tailors",
    },
    {
        id: 7,
        label: "Drivers",
        link: "/drivers",
    },
    {
        id: 8,
        label: "Banner & Thumb..",
        link: "/banner",
        collapse: "banner",
        options: [
            {
                id: 71,
                label: "Marketplace Banner",
                link: "/banner/marketplace",
            },
            {
                id: 81,
                label: "Tailor Banner",
                link: "/banner/tailor",
            },
        ],
    },

    {
        id: 9,
        label: "Category",
        link: "/category",
        collapse: "category",
        options: [
            {
                id: 71,
                label: "Category",
                link: "/category",
            },
            {
                id: 81,
                label: "Category Banner",
                link: "/category/thumbs",
            },
        ],
    },
    {
        id: 10,
        label: "Orders",
        link: "/orders",
        collapse: "orders",
        options: [
            {
                id: 71,
                label: "Marketplace Order",
                link: "/orders/marketplace",
            },
            {
                id: 81,
                label: "Tailor Order",
                link: "/orders/tailor",
            },
        ],
    },
    {
        id: 11,
        label: "Footer Text",
        link: "/footer-text",
    },
];

export const colorsArray = [
    { name: "Red", label: "Red", code: "#FF0000" },
    { name: "Green", label: "Green", code: "#008000" },
    { name: "Blue", label: "Blue", code: "#0000FF" },
    { name: "Yellow", label: "Yellow", code: "#FFFF00" },
    { name: "Purple", label: "Purple", code: "#800080" },
    { name: "Orange", label: "Orange", code: "#FFA500" },
    { name: "Pink", label: "Pink", code: "#FFC0CB" },
    { name: "Brown", label: "Brown", code: "#A52A2A" },
    { name: "Black", label: "Black", code: "#000000" },
    { name: "White", label: "White", code: "#FFFFFF" },
    { name: "Gray", label: "Gray", code: "#808080" },
    { name: "Cyan", label: "Cyan", code: "#00FFFF" },
    { name: "Magenta", label: "Magenta", code: "#FF00FF" },
    { name: "Lime", label: "Lime", code: "#00FF00" },
    { name: "Teal", label: "Teal", code: "#008080" },
    { name: "Navy", label: "Navy", code: "#000080" },
    { name: "Maroon", label: "Maroon", code: "#800000" },
    { name: "Olive", label: "Olive", code: "#808000" },
    { name: "Silver", label: "Silver", code: "#C0C0C0" },
    { name: "Gold", label: "Gold", code: "#FFD700" },
];
