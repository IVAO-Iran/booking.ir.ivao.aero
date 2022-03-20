import { FunctionComponent } from "react";
import { Header, Subheader } from "components/typography/Typography";
import { SlotTypeOptions } from "types/SlotFilter";
import { FilterCard } from "./FilterCard";
import { getEventTypeName } from "types/Event";

interface SlotsQtdData {
    departure?: number;
    landing?: number;
    private?: number;
}

interface SlotTypeFilterProps {
    eventName: string;
    eventType: string;
    eventBanner?: string;
    slotsQtdData?: SlotsQtdData;
    selectedSlotType?: SlotTypeOptions | null;
    showPriveSlots?: boolean;
    onSlotTypeChange: (newType: SlotTypeOptions) => void;
}

export const SlotTypeFilter: FunctionComponent<SlotTypeFilterProps> = ({
    eventName, eventType, eventBanner,
    slotsQtdData, selectedSlotType, showPriveSlots = true, onSlotTypeChange
}) => {
    return (
        <nav className="relative bg-white dark:bg-black">
            <div
                className="hidden dark:lg:block absolute rounded-md w-full h-48 opacity-10"
            >
                <img src={eventBanner}
                    alt={`${eventName} logo`}
                    width={288}
                    height={285} />
            </div>

            <div className="relative z-20 h-full flex flex-row md:flex-col justify-between md:justify-start items-center flex-wrap gap-8 px-6 pt-9">
                <div className="self-start">
                    <Header textSize="text-lg" textColor="text-blue dark:text-white">{eventName}</Header>
                    <Subheader textSize="text-md" textColor="text-light-blue dark:text-white">{getEventTypeName(eventType)}</Subheader>
                </div>

                <FilterCard
                    slotType={SlotTypeOptions.LANDING}
                    quantity={slotsQtdData?.landing}
                    onClick={() => onSlotTypeChange(SlotTypeOptions.LANDING)}
                    active={selectedSlotType === SlotTypeOptions.LANDING} />

                <FilterCard
                    slotType={SlotTypeOptions.TAKEOFF}
                    quantity={slotsQtdData?.departure}
                    onClick={() => onSlotTypeChange(SlotTypeOptions.TAKEOFF)}
                    active={selectedSlotType === SlotTypeOptions.TAKEOFF} />

                {showPriveSlots && (
                    <FilterCard
                        slotType={SlotTypeOptions.PRIVATE}
                        quantity={slotsQtdData?.private}
                        onClick={() => onSlotTypeChange(SlotTypeOptions.PRIVATE)}
                        active={selectedSlotType === SlotTypeOptions.PRIVATE} />
                )}
            </div>
        </nav>
    );
}