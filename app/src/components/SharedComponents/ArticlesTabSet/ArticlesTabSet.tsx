import { Tab } from "../Tab/Tab";

export function ArticlesTabSet({
    tabs, toggleClassName, selectedTab, tabsTranslation, onTabChange,
}: {
    tabs: string[];
    toggleClassName: string;
    selectedTab: string;
    tabsTranslation: Map<string, string>;
    onTabChange?: (tab: string) => void;
}) {
    return (
        <div className={toggleClassName}>
            <ul className='nav nav-pills outline-active'>
                {tabs.map((tab) => (
                    <Tab key={tab} tab={tab} tabName={tabsTranslation.get(tab)} active={tab === selectedTab}
                        onClick={() => onTabChange && onTabChange(tab)} />
                ))}
            </ul>
        </div>
    );
}
