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
  historyList.forEach((submit, index) => {
    const li = document.createElement("li");

    const enter = document.createElement("span");
    enter.innerText = submit;

    const delete_btn = document.createElement("button");
    delete_btn.innerText = "X";
    delete_btn.addEventListener("click", () => {
      deleteHistory(index);
    });
    li.appendChild(enter);
    li.appendChild(delete_btn);
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
  // 1. 클릭된 값 받아오기 ✅
  const value = e.target.innerText;
  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅

  if (value === "=") {
    resultNum = eval(formula); // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
    resultNum = Math.round(resultNum * 100) / 100; // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
    result.innerText = resultNum;
    historyList.unshift(`${formula} = ${resultNum}`);
    if (historyList.length > 5) {
      historyList.pop();
    }
    updateHistory();
    formula = resultNum.toString();
    return;
  } else if (value === "C") {
    formula = "";
    result.innerText = "";
    historyList = [];
    updateHistory();
  } else if (value === "←") {
    // HTML 내의 &#8592; 는 화살표이며, JavaScript에선 ← 를 사용
    formula = formula.slice(0, -1);
    result.innerText = formula;
  } else {
    formula += value;
    result.innerText = formula;
  }
};

// .num-bt 이벤트 리스너 등록 ✅
document.querySelectorAll(".num-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});

// .calc-btn 이벤트 리스너 등록 ✅
document.querySelectorAll(".calc-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});
