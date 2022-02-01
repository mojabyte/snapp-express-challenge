import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';

import { SortMeta } from 'modules/home/types/HomeTypes';

type HeaderProps = {
  sortData: SortMeta;
};

const Header: React.FC<HeaderProps> = ({ sortData }) => {
  const [sort, setSort] = useQueryParam('sort', StringParam);

  return (
    <div className="flex items-center p-4 h-16 bg-white shadow-sm">
      <label className="px-2">مرتب سازی: </label>
      <select
        onChange={e => setSort(e.target.value === 'default' ? undefined : e.target.value)}
        value={sort}
      >
        <option value="default">{sortData?.default_title}</option>
        {sortData?.results.map(({ name, translation }) => (
          <option key={name} value={name}>
            {translation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
