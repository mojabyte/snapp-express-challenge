import './styles/paginated.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';

type PaginatedProps = {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
};

const Paginated: React.FC<PaginatedProps> = ({ page, setPage, pageCount }) => {
  const isMobile = useMediaQuery({ maxWidth: 580 });
  const isTablet = useMediaQuery({
    maxWidth: 768,
  });

  return (
    <div dir="ltr">
      <ReactPaginate
        className="paginated"
        nextLabel={<BiChevronRight />}
        previousLabel={<BiChevronLeft />}
        initialPage={page}
        forcePage={page}
        onPageChange={page => {
          setPage(page.selected);
        }}
        marginPagesDisplayed={isMobile ? 0 : isTablet ? 1 : 3}
        pageCount={pageCount}
        pageLabelBuilder={page => page.toLocaleString('fa')}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginated;
