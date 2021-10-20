import { useEffect, useState } from "react";
import styled from "styled-components";


function App() {
  const [inp1, setInp1] = useState<number>(0)
  const [inp2, setInp2] = useState<number>(0)
  const [allCombinations, setAllCombinations] = useState<number[]>([])
  const [random, setRandom] = useState<string>("")

  function handleCombinations(num1: number, num2: number) { 
    function combinations(k: number, n: number) {
      let result: number[] = []
      let stack: number[] = []
      function combine(currentNumber: number){
        if(stack.length === k) {
          let newCombo: any = stack.slice()
          result.push(newCombo.toString());
          return;
        }
        if(currentNumber > n) {
          return;
        }
    
        stack.push(currentNumber)
        combine(currentNumber + 1);  
        stack.pop();
        combine(currentNumber + 1);
      }
      combine(1);
      return result;
    }
    setAllCombinations(combinations(num1, num2))
  }

  const handleRandom = (num1: number, num2: number) => {
    const arr: number[] = []
    for (let i = 0; i < num1; i++) {
      const num = Math.floor(Math.random() * num2 + 1)
      if (arr.includes(num)) {
        num1 += 1
        continue
      }
      arr.push(num)
    }
    setRandom(arr.toString())
  }

  const handleInp1 = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    setInp1(+e.target.value)
  }
  const handleInp2 = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    setInp2(+e.target.value)
  }
  return (
    <Container>
      <Wrapper>
        <Input type="number" max={100} value={inp1} onChange={handleInp1}/>
        <Input type="number" max={100} value={inp2} onChange={handleInp2}/>
        <Button onClick={() => handleCombinations(inp1, inp2)}>Generate</Button>
        <Button onClick={() => handleRandom(inp1, inp2)}>Get Random</Button>
        {random && <p>{random}</p>}
      </Wrapper>
      <Wrap>
        {allCombinations.map((comb, i) => (
          <span key={i}>{comb}</span>
        ))}
      </Wrap>
    </Container>
  );
}

export default App;

const Container = styled.main`
`
const Wrapper = styled.div`
  background-image: radial-gradient(yellow, lime);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  >p {
    position: absolute;
    top: 30vh;
    margin: auto;
    font-size: 1.5rem;
  }
`
const Input = styled.input`
  width: 60px;
  padding: 10px 0px 10px 20px;
  font-size: 1.5rem;
`
const Button = styled.button`
  border: 2px solid orange;
  background-color: lightcoral;
  padding: 15px 20px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: coral;
  }
`
const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  >span {
    margin: 5px;
    padding: 0 10px;
    outline: 1px solid darkgray;
    flex: 1;
    text-align: center;
  }
`
