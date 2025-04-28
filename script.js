// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");

// 변수 선언
let formula = ""; // 수식
let resultNum = 0; // 계산 결과
let historyList = []; // 계산 기록

// 기록 업데이트
const updateHistory = () => {
  // 1. historyWrap 내 HTML 초기화 ✅
  historyWrap.innerHTML = "";

  // 2. historyWrap 내 계산 기록(historyList) 요소들 추가 ✅
  historyList.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.formula} = ${item.result}`;
    li.addEventListener("click", () => deleteHistory(index)); // 클릭하면 삭제
    historyWrap.appendChild(li);
  });
};

const deleteHistory = (index) => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  historyList.splice(index, 1);
  updateHistory();
};

// 계산 함수
const calculate = (e) => {
  const clicked = e.target.textContent;

  if (clicked === "=") {
    try {
      // 수식을 계산하고 소수점 2자리로 고정
      resultNum = eval(formula);
      resultNum = parseFloat(resultNum.toFixed(2));
      result.textContent = resultNum;

      // 기록 저장
      historyList.push({ formula, result: resultNum });
      updateHistory();

      // 수식 초기화 (결과를 계속 이어 쓸 거면 주석처리)
      formula = "";

    } catch (err) {
      result.textContent = "Error";
    }

  } else if (clicked === "C") {
    // 전체 초기화
    formula = "";
    result.textContent = "";

  } else if (clicked === "←") {
    // 마지막 문자 삭제
    formula = formula.slice(0, -1);
    result.textContent = formula;

  } else {
    // 숫자나 연산자 누르면 수식에 추가
    formula += clicked;
    result.textContent = formula;
  }
};

// 숫자 버튼 이벤트 리스너 등록 ✅
const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach((btn) => {
  btn.addEventListener("click", calculate);
});

// 연산자 버튼 이벤트 리스너 등록 ✅
const calcBtns = document.querySelectorAll(".calc-btn");
calcBtns.forEach((btn) => {
  btn.addEventListener("click", calculate);
});
