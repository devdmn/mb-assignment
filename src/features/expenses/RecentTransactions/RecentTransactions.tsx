import styles from "./RecentTransactions.module.css";
import ExpenseSearch from "../ExpenseSearch/ExpenseSearch";
import ExpenseList from "./ExpenseList/ExpenseList";

const RecentTransactions = () => {
  return (
    <section className={styles.container}>
      <div className={styles.searchRow}>
        <h2 className={styles.title}>Recent Transactions</h2>
        <ExpenseSearch />
      </div>
      <ExpenseList />
    </section>
  );
};

export default RecentTransactions;
