import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSearch, selectSortOrder } from "../expensesSelectors";
import { setSearch, setSortOrder } from "../expensesSlice";
import styles from "./ExpenseSearch.module.css";

const ExpenseSearch = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearch);
  const sortOrder = useAppSelector(selectSortOrder);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value as "asc" | "desc"));
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search here"
        value={searchValue}
        onChange={handleSearch}
      />
      <select className={styles.sort} value={sortOrder} onChange={handleSort}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
    </div>
  );
};

export default ExpenseSearch;
