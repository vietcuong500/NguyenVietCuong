import "./App.css";
import { Converter } from "./modules/converter/components/Converter";

function App() {
  return (
    <div className="relative items-center justify-center w-full h-screen">
      <div className="absolute w-full h-1/2 top-0 left-0 bg-green-950"></div>
      <div className="absolute z-10 w-full flex flex-col gap-8 items-center justify-center h-full">
        <p className="text-4xl uppercase font-bold text-neutral-200 text-center">
          Currency Converter
        </p>
        <Converter />
      </div>
    </div>
  );
}

export default App;
