import { HashLoader } from "react-spinners";
const Loader = ({ color }) => {
  return (
    <div className="min-h-[200px] flex justify-center items-center p-5">
      <HashLoader
        color={color}
        // color="#5EEAD4"
      />
    </div>
  );
};

export default Loader;
