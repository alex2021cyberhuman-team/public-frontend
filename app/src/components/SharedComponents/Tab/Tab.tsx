import { classObjectToClassName } from "../../../types/infrastructure/style";


export function Tab({
    tab, tabName, active, onClick
}: { tab: string; tabName?: string | undefined; active: boolean; onClick: () => void; }) {
    return (
        <li className='nav-item'>
            <button
                className={classObjectToClassName({ 'nav-link': true, active, 'btn-link': true })}
                type='button'
                onClick={(ev) => {
                    ev.preventDefault();
                    onClick();
                }}
            >
                {tabName || tab}
            </button>
        </li>
    );
}
