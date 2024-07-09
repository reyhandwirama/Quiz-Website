const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");


let startBtn = document.querySelector(".start"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let  questions = [
  {index:0,video:"assets/video/BurungDika.mp4",correct_answer:"2 BURUNG",incorrect_answers:["1 BURUNG","5 BURUNG","3 BURUNG"],question:"Ada berapa jumlah burung didalam sarang itu ?",type:"multiple"},
  {index:1,video:"assets/video/BebekDika.mp4",correct_answer:"5 BEBEK",incorrect_answers:["1 BEBEK","2 BEBEK","4 BEBEK"],question:"Ada berapa jumlah bebek yang berwarna kuning ?",type:"multiple"},
  {index:2,video:"assets/video/SemutDika.mp4",correct_answer:"1 APEL",incorrect_answers:["2 APEL","3 APEL","5 APEL"],question:"Ada berapa jumlah apel yang dibawa oleh kawanan semut tersebut ?",type:"multiple"},
  {index:3,video:"assets/video/TupaiDika.mp4",correct_answer:"4 TUPAI",incorrect_answers:["1 TUPAI","2 TUPAI","3 TUPAI"],question:"Ada berapa jumlah tupai tersebut ?",type:"multiple"},
  {index:4,video:"assets/video/PisangDika.mp4",correct_answer:"4 PISANG",incorrect_answers:["1 PISANG","2 PISANG","3 PISANG"],question:"Ada berapa jumlah pisang yang dibawa monyet itu ?",type:"multiple"},
  {index:5,video:"assets/video/GajahKiki.mp4",correct_answer:"Untuk mencari makanan dan minum air",incorrect_answers:["Untuk terbang di atas pohon","Untuk menangkap ikan di sungai","Untuk menggali tanah"],question:"Apakah kamu tahu bagaimana gajah menggunakan belalai mereka?",type:"multiple"},
  {index:6,video:"assets/video/JerapahKiki.mp4",correct_answer:"Kaki dan leher yang panjang ",incorrect_answers:["Lidah berduri","Kotoran yang unik","Dengan terbang"],question:"Apa yang membantu jerapah mencapai daun-daun tinggi di atas pohon ?",type:"multiple"},
  {index:7,video:"assets/video/KatakKiki.mp4",correct_answer:"Serangga seperti lalat dan nyamuk",incorrect_answers:["Rumput dan daun","Buah-buahan seperti pisang dan apel","Daging"],question:"Nah, teman-teman, apakah kamu tahu makanan yang disukai katak ?",type:"multiple"},
  {index:8,video:"assets/video/KupukupuKiki.mp4",correct_answer:"Mereka siap terbang dan mencari makanan.",incorrect_answers:["Mereka berlari cepat.","Mereka berenang di sungai.","Mereka berjalan di tanah"],question:"Apa yang terjadi pada kupu-kupu setelah mereka keluar dari kepompong ?",type:"multiple"},
  {index:9,video:"assets/video/RusaKiki.mp4",correct_answer:"Kaki yang kuat dan ramping",incorrect_answers:["Tanduk yang besar","Kulit berbintik putih","Kaki yang besar"],question:"Apa yang membantu rusa berlari dengan cepat dan melompat tinggi?",type:"multiple"},
],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

function randomizeArray(array) {
  // Handle potential errors or empty array
  if (!Array.isArray(array) || array.length === 0) {
    return array; // Return the original array if not an array or empty
  }

  // Create a shuffled copy using the Fisher-Yates shuffle algorithm
  const shuffledArray = [...array]; // Create a copy to avoid modifying the original
  let currentIndex = shuffledArray.length, randomIndex;

  // While there are elements remaining
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the current element with the random element
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex]
    ];
  }

  return shuffledArray;
}

const startQuiz = () => {
  const body = document.querySelector(".opening");
  body.classList.add('quiz-start');
  body.classList.remove('opening');
  questions = randomizeArray(questions);
  loadingAnimation();
  console.log(questions);
  startScreen.classList.add("hide");
  quiz.classList.remove("hide");
  currentQuestion = 1;
  showQuestion(questions[0]);
  document.getElementById("audio").play();
  audio.volume = 0.01;
  
};

startBtn.addEventListener("click", startQuiz);


/* ShowQuestion */
const showQuestion = (question) => {
  audio.volume = 0;
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
    videoQuestion = document.querySelector(".videoQuestion");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];



  videoQuestion.src = question.video;
  videoQuestion.type = 'video/mp4';

  /* Handle video end untuk video quiz */
  function handleVideoEnd() {
    document.getElementById("myVideo").removeEventListener("ended", handleVideoEnd);
    console.log("handlevideoEnd");
      const element = document.getElementById("content-question");
      element.classList.remove("hide");
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
      
      /* clearInterval(timer);
      startTimer(time); */
      document.getElementById("audio").play();
      audio.volume = 0.2;
    
  }
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  document.getElementById("myVideo").addEventListener("ended", handleVideoEnd);
  time = 120;
  
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const questionCorrect = document.querySelector(".question-correction");
const answerText = document.querySelector(".answer-text");

/* Cek jawaban benar / salah */
const checkAnswer = () => {  
  audio.volume = 0;
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      document.querySelector(".videoQuestion1").classList.remove('hide');
      document.querySelector(".videoQuestion").classList.add('hide');
      document.getElementById("correct-question").classList.remove('hide');
      document.querySelector(".question-correction1").innerHTML = `Yeay Kamu Benar 🎉`;
      if(document.querySelector(".videoQuestion").src.includes('Dika')){
        document.querySelector(".videoQuestion1").src = "assets/video/ReaksiBenarDika.mp4";
      }
      else{
        document.querySelector(".videoQuestion1").src = "assets/video/ReaksiBenarKiki.mp4";
      }
      
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.getElementById("correct-question").classList.remove('hide');
      document.querySelector(".videoQuestion").classList.add('hide');
      document.querySelector(".videoQuestion1").classList.remove('hide');
      if(document.querySelector(".videoQuestion").src.includes('Dika')){
        document.querySelector(".videoQuestion1").src = "assets/video/ReaksiSalahDika.mp4";
      }
      else{
        document.querySelector(".videoQuestion1").src = "assets/video/ReaksiSalahKiki.mp4";
      }
      
      questionCorrect.innerHTML = `Yah Jawaban Kamu Salah 😢, Jawaban yang benarnya adalah : <span style='color:#0cef2a;'>${questions[currentQuestion-1].correct_answer.toString()}</span>`;
      answerText.innerHTML = "Terus lah berlatih yaaa 🥰🥰";
      document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  /* Handle video benar/salah ketika selesai */
  function handleVideoEnd1(){
      console.log("handlevideoEnd1");
      document.getElementById("myVideo1").removeEventListener("ended", handleVideoEnd1);
      nextQuestion();
      submitBtn.style.display = "block";
      nextBtn.style.display = "none";
 
    
  }
  
  document.getElementById("myVideo1").addEventListener("ended", handleVideoEnd1);

  
};

 /* Next Question */
const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    questionCorrect.innerHTML = "";
    answerText.innerHTML = "";
    document.querySelector(".question-correction1").innerHTML = ``;
    document.querySelector(".videoQuestion1").classList.add('hide');
      document.querySelector(".videoQuestion").classList.remove('hide');
    window.scrollTo({ top: 0, behavior: "smooth" });
    const element = document.getElementById("content-question");
    element.classList.add("hide");
    const elementCorrect = document.getElementById("correct-question");
      elementCorrect.classList.add('hide');
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
  
};

/* End Screen */
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
const showScore = () => {

  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
  audio.volume = 0.2;
});

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};
