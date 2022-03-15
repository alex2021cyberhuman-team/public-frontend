import { classObjectToClassName } from "../../../types/infrastructure/style";


export function Tab({
    tab, tabName, active, onClick
}: { tab: string; tabName: string | undefined; active: boolean; onClick: () => void; }) {
    return (
        <li className='nav-item'>
            <a
                className={classObjectToClassName({ 'nav-link': true, active })}
                href='#'
                onClick={(ev) => {
                    ev.preventDefault();
                    onClick();
                }}
            >
                {tabName || tab}
            </a>
        </li>
    );
}
