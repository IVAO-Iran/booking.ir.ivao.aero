import { ThemeContext, ThemeVariants } from "context/ThemeContext";
import { FunctionComponent, MouseEventHandler, useContext } from "react";
import { FiClipboard, FiCompass, FiGlobe, FiInfo, FiLogOut, FiSun } from "react-icons/fi";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Logo } from "./Logo";

interface SidebarLinkProps {
    title: string;
    href: string;
    icon: JSX.Element;
    indexLink?: boolean;
    state?: any;
}

const SidebarLink: FunctionComponent<SidebarLinkProps> = ({ href, icon, title, state, indexLink = false }) => {
    const activeClasses = "text-white border-b-4 md:border-b-0 md:border-l-4 border-white py-3";
    const inactiveClasses = "text-[#3C55AC] dark:text-[#838383]";

    return (
        <NavLink
            to={href}
            className={({ isActive }) => `block ${isActive ? activeClasses : inactiveClasses}`}
            title={title}
            end={indexLink}
            state={state}
        >
            {({ isActive }) => (
                <div className="w-min mx-auto">
                    <div className={isActive ? "md:-ml-1" : ""}>
                        {icon}
                    </div>
                </div>
            )}
        </NavLink>
    );
};

interface SidebarButtonProps extends Omit<SidebarLinkProps, "href"> {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ icon, title, onClick }) => (
    <button
        className="block text-[#3C55AC] dark:text-[#838383] w-full"
        title={title}
        onClick={onClick}
    >
        <div className="w-min mx-auto">

            {icon}
        </div>
    </button>
);

interface EventSidebarProps {
    visible?: boolean;
}

export const EventSidebar: FunctionComponent<EventSidebarProps> = ({ visible = true }) => {
    const { eventId: eventIdUrl } = useParams();
    let { state: locationState } = useLocation();
    const locationData = locationState as { eventId: number } | undefined;

    const { themeVariant, setThemeVariant } = useContext(ThemeContext);

    const eventId = eventIdUrl || locationData?.eventId;

    const ICON_SIZE = 28;

    if (eventId === undefined) {
        throw new Error("The event id is undefined");
    }

    return (
        <nav className={`${visible ? "" : "hidden"} flex flex-row md:flex-col w-full md:w-28 h-full px-4 md:px-0 bg-blue dark:bg-dark-gray-2 shadow-3xl overflow-x-auto`}>
            <div className="hidden md:block">
                <Logo sidebar={true} />
            </div>

            <div className="flex items-center md:items-stretch flex-row md:flex-col md:my-auto gap-8">
                <SidebarLink
                    href={`/event/${eventId}`}
                    icon={<FiInfo size={ICON_SIZE} />}
                    title="Sobre o evento"
                    indexLink />

                <SidebarLink
                    href={`/event/${eventId}/slots`}
                    icon={<FiCompass size={ICON_SIZE} />}
                    title="Voos" />

                <SidebarLink
                    href={`/event/${eventId}/my-slots`}
                    icon={<FiClipboard size={ICON_SIZE} />}
                    title="Meus Voos"
                    state={{ eventId }} />

                <SidebarButton
                    icon={<FiSun size={ICON_SIZE} />}
                    title="Alterar tema"
                    onClick={() => setThemeVariant(themeVariant === ThemeVariants.DARK ? ThemeVariants.LIGHT : ThemeVariants.DARK)} />

                <SidebarLink
                    href={`/events`}
                    icon={<FiGlobe size={ICON_SIZE} />}
                    title="Ver lista de eventos" />
            </div>
            <div className="my-auto md:my-0 mx-auto md:mx-0 ml-8 md:ml-0 md:mt-auto md:mb-10">
                <SidebarLink
                    href={`/logout`}
                    icon={<FiLogOut size={ICON_SIZE} />}
                    title="Sair" />
            </div>
        </nav>
    )
}
