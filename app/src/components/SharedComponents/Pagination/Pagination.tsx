import { useLocalization } from "../../../services/localization/reactLocalization";

export function Pagination({
    currentPage, count, itemsPerPage, onPageChange,
}: {
    currentPage: number;
    count: number;
    itemsPerPage: number;
    onPageChange?: (index: number) => void;
}) {
    const {localization} = useLocalization();
    const pageCount = Math.ceil(count / itemsPerPage);
    const pageNumbers = [...new Array(pageCount)].map(x => x + 1);
    return (
        <nav>
            <ul className='pagination'>
                {pageCount
                    > 1 && pageNumbers.map((pageNumber) => (
                        <li
                            key={`page-number-${pageNumber}`}
                            className={`page-item${currentPage !== pageNumber ? '' : ' active'}`}
                            onClick={onPageChange && (() => onPageChange(pageNumber))}
                        >
                            <button className='page-link' aria-label={localization.formatString(localization.pagination.goToPage, pageNumber).toString()}>
                                {pageNumber}
                            </button>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
