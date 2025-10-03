import React, { Suspense, useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import Card from "../../../components/Card/Card";
import { selectExpensesByCategory } from "../expensesSelectors";
import styles from "./TopExpenses.module.css";

const TopExpensesChart = React.lazy(
  () => import("./TopExpensesChart/TopExpensesChart")
);

const TopExpenses = () => {
  const categoryData = useAppSelector(selectExpensesByCategory);
  const topThree = useMemo(
    () => [...categoryData].sort((a, b) => b.value - a.value).slice(0, 3),
    [categoryData]
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Top Expenses</h2>
      <Card className={styles.chart}>
        {topThree.length > 0 ? (
          <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
            <TopExpensesChart data={topThree} />
          </Suspense>
        ) : (
          <div className={styles.empty}>No expense data available</div>
        )}
      </Card>
    </section>
  );
};

export default TopExpenses;
