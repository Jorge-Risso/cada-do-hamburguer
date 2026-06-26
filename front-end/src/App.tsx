import "./App.css";
import Input from "./components/Input";

const App = () => {
  return (
    <>
      <p className="text-3xl flex gap-2 font-bold bg-black p-6">
        <Input placeholder="Email" type="email" />
        <Input placeholder="password" type="password" />
      </p>
    </>
  );
};

export default App;
