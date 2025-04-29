// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");

// 변수 선언
let formula = ""; // 수식
let resultNum = 0; // 계산 결과
let historyList = []; // 계산 기록

// 기록 업데이트
const updateHistory = () => {
  historyWrap.innerHTML = "";
  historyList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.formula} = ${item.result}</span>
      <button onclick="deleteHistory(${index})">삭제</button>
    `;
    historyWrap.appendChild(li);
  });
};

const deleteHistory = (index) => {
  historyList.splice(index, 1);
  updateHistory();
};

const calculate = (e) => {
  const value = e.target.innerText;

  if (value === "=") {
    try {
      resultNum = eval(formula);
      resultNum = Math.round(resultNum * 100) / 100;
      result.innerText = resultNum;

      historyList.unshift({
        formula: formula,
        result: resultNum,
      });

      updateHistory();
      formula = resultNum.toString();
    } catch {
      result.innerText = "error";
      formula = "";
    }
  } else if (value === "C") {
    formula = "";
    result.innerText = "0";
  } else if (value === "←") {
    formula = formula.slice(0, -1);
    result.innerText = formula || "0";
  } else {
    formula += value;
    result.innerText = formula;
  }
};

document.querySelectorAll(".num-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});

document.querySelectorAll(".calc-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});
