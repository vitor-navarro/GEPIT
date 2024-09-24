// src/pages/index.tsx
import Header from './components/Header';
import ItemList from './components/ItemList';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <ItemList />
      </div>
    </div>
  );
}
