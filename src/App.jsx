import { useState } from "react";
import "./App.css";

const satisficationlvl = [
  { level: "Dissatisfied", percentage: 0 },
  { level: "It was okay", percentage: 5 },
  { level: "It was good", percentage: 10 },
  { level: "Absolutely amazing", percentage: 20 },
];

function App() {
  const [bill, setbill] = useState(0);

  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const reset = () => {
    setbill("");
    setPercentage1(0);
    setPercentage2(0);
  };

  return (
    <>
      <div>
        <Billinput bill={bill} setbill={setbill} />
        <Satisfication
          satisficationlvl={satisficationlvl}
          setPercentage={setPercentage1}
          percentage={percentage1}
        >
          {" "}
          How did you like the service?
        </Satisfication>

        <Satisfication
          satisficationlvl={satisficationlvl}
          setPercentage={setPercentage2}
          percentage={percentage2}
        >
          {" "}
          How did your friend liked the service?
        </Satisfication>

        {bill > 0 && (
          <>
            <Totaltip //if bill is greater than 0, only then render these two components
              bill={bill}
              percentage1={percentage1}
              percentage2={percentage2}
            />

            <ResetButton reset={reset} />
          </>
        )}
      </div>
    </>
  );
}

export default App;

export const Billinput = ({ setbill, bill }) => {
  return (
    <div className="billinput">
      <p>How much was the bill</p>
      <input
        placeholder="Input the bill"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      ></input>
    </div>
  );
};

export const Satisfication = ({
  satisficationlvl,
  children,
  setPercentage,
  percentage,
}) => {
  // function handlefirstlvl(e){
  //   setLevel(e.target.value)
  // }
  // function handlesecondlvl(){
  //   setLevel2(e.target.value)
  // }
  return (
    <div>
      {children}
      <select
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        {satisficationlvl.map((lvl) => (
          <option value={lvl.percentage} key={lvl.level}>
            {lvl.level} {lvl.percentage}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Totaltip = ({ bill, percentage1, percentage2 }) => {
  let totaltip = (percentage1 + percentage2) / 2;
  let totalcharge = totaltip + bill;

  return (
    <p className="total-tip">
      You pay ${totalcharge} (${bill} + ${totaltip} Tip)
    </p>
  );
};

export const ResetButton = ({ reset }) => {
  return <button onClick={reset}>Reset</button>;
};
