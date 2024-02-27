import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup, faChartSimple, faChartPie, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane, faFlag } from "@fortawesome/free-regular-svg-icons";

export const MenuItems = [
    {
        title: "Dashboard",
        icon: faChartPie,
        url: "",
    },
    {
        title: "Campaigns",
        icon: faChartSimple,
        url: "campaigns",
    },
    {
        title: "Group",
        icon: faLayerGroup,
        url: "groups",
    },
    {
        title: "Adsvertisements",
        icon: faFlag,
        url: "ads",
    },
    {
        title: "Reports",
        icon: faPaperPlane,
        url: "reports",
    },
];
