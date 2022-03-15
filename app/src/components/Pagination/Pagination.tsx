import localizedStrings from "../../services/localization";


export function Pagination({
    currentPage, count, itemsPerPage, onPageChange,
}: {
    currentPage: number;
    count: number;
    itemsPerPage: number;
    onPageChange?: (index: number) => void;
}) {
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
                            <a className='page-link' aria-label={localizedStrings.formatString(localizedStrings.pagination.goToPage, pageNumber).toString()} href='#'>
                                {pageNumber}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
