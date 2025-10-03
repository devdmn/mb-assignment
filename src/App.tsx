import "./App.css";
import ExpenseSummary from "./features/expenses/ExpenseSummary/ExpenseSummary";
import RecentTransactions from "./features/expenses/RecentTransactions/RecentTransactions";
import TopExpenses from "./features/expenses/TopExpenses/TopExpenses";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 id="heading">Expenses Tracker</h1>
      </header>
      <main className="app-main">
        <ExpenseSummary />
        <div className="app-grid">
          <RecentTransactions />
          <TopExpenses />
        </div>
      </main>
    </div>
  );
}

export default App;

