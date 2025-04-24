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
  historyWrap.innerHTML = ""; // innerHTML을 초기화 하면 historyWrap 내의 요소를 초기화 -> 만들었던 <li>태그들이 제거됨

  // 2. historyWrap 내 계산 기록(historyList) 요소들 추가 ✅
  // historyList의 각 요소에 대해서
  historyList.forEach((history) => {
    // <li>태그를 생성, 태그에 해당 요소의 내용을 넣음, class 지정
    const addHistory = document.createElement("li");
    addHistory.innerText = history;
    addHistory.className = "added-history";

    // 삭제 버튼을 추가
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "delete-button";

    // 삭제 버튼을 클릭하면 deleteHistory함수를 호출, 이때 해당 요소의 index를 인자로 넘겨서 실행
    deleteBtn.addEventListener("click", () => {
      deleteHistory(historyList.indexOf(history)); // .indexOf()는 배열에서 요소의 위치를 찾거나 존재 여부를 확인할 때 유용함. 지금은 요소의 index를 알아내기 위해 사용
    });

    // 이렇게 만들어진 게 historyWrap에 출력되도록
    addHistory.appendChild(deleteBtn);
    historyWrap.appendChild(addHistory);
  });
};

const deleteHistory = (index) => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  historyList.splice(index, 1); // historyList 배열에서 "index부터 1개 제거" 라는 뜻 (= 해당 index 제거)
  updateHistory();
};

// 계산 함수
const calculate = (e) => {
  // 1. 클릭된 값 받아오기 ✅
  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  //
  // 추가 정보
  // HTML 내의 &#8592; 는 화살표이며, JavaScript에선 ← 를 사용
  // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
  // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
  //
  // 이거 혹시 밑에 이벤트 리스너 안에 함수를 여기다 다 옮기고 .addEventListener("click", calculate()); 하면 됨 ?
  // 이렇게 하면 안 됨. 삭제 버튼 이벤트 리스너에서. 화살표 함수로 호출하는 방식이 맞다고. .addEventListener("click", () => {calculate()});
  // nBtn이랑 cBtn이랑 무관하게 btn으로 써도 되나 ?
  // 된다면 else 내용이 중복이긴 해서 축약된다는 이점이 있기는 한데
  // 근데 어짜피 num-btn이랑 calc-btn이랑 따로 이벤트 리스너를 달아주니까 함수만 통합하고 각각 달아줘도 될 듯

  // 만약 누른 버튼이 C 라면 기록까지 전부 다 없어져야 함 -> 모든 값 초기화 후 최신화
  if (e.innerText == "C") {
    formula = "";
    resultNum = 0;
    historyList = [];
    result.innerText = formula;
    updateHistory();
  }
  // 또는 누른 버튼이 ← 라면
  else if (e.innerText == "←") {
    formula = formula.slice(0, -1); // 문자열에서 마지막 문자 제거
    result.innerText = formula; // 마지막 문자가 제거된 수식(formula)을 <div>태그에 넣어서 출력
  }
  // 또는 누른 버튼이 = 라면
  else if (e.innerText == "=") {
    resultNum = Number.isInteger(eval(formula)) // 수식(formula)을 계산하는데 Number.isInteger()를 사용해 계산 결과가 정수인지 확인
      ? eval(formula) // 참이라면 resultNum에 계산 결과를 그대로 대입
      : parseFloat(eval(formula).toFixed(2)); // 거짓이라면 resultNum에 계산 결과의 소수점 2번째 자리까지 반올림하여 대입, parseFloat()로 무조건적으로 소수점 2자리까지 출력되는 문제를 해결
    result.innerText = resultNum; // 계산 결과를 <div>태그에 넣어서 출력
    historyList.push(`${formula} = ${resultNum}`); // 수식과 결과를 historyList 배열 맨 끝에 문자열로 추가
    // 만약 기록이 5개를 초과한다면
    if (historyList.length == 6) {
      historyList.splice(0, 1); // 첫 번째 인덱스를 삭제
    }
    updateHistory(); // 기록이 추가될 때마다 최신화
    formula = String(resultNum); // 수식(formula)의 값을 계산 결과로 초기화, eval()로 문자열 수식을 계산하면 결과가 숫자(Number) 타입으로 변하는데 String()을 통해 다시 문자열 형식으로 변경
  }
  // 아니라면
  else {
    formula += e.innerText; // 누른 버튼의 값을 수식(formula)에 넣고
    result.innerText = formula; // 수식(formula)을 <div>태그에 넣어서 출력
  }
};

// .num-btn 이벤트 리스너 등록 ✅
const numBtn = document.querySelectorAll(".num-btn"); // num-btn 클래스 NodeList로

// forEach()를 사용해서 NodeList의 각 버튼마다 처리하도록, nBtn은 현재 클릭된 num-btn 버튼
numBtn.forEach((nBtn) => {
  nBtn.addEventListener("click", () => {
    calculate(nBtn);
  });
});

// .calc-btn 이벤트 리스너 등록 ✅
const calcBtn = document.querySelectorAll(".calc-btn"); // calc-btn 클래스 NodeList로

// forEach()를 사용해서 NodeList의 각 버튼마다 처리하도록, cBtn은 현재 클릭된 calc-btn 버튼
calcBtn.forEach((cBtn) => {
  cBtn.addEventListener("click", () => {
    calculate(cBtn);
  });
});
