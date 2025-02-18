document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const modal = document.getElementById("question-modal");
  const questionTitle = document.getElementById("question-title");
  const correctAnswerDisplay = document.getElementById("correct-answer");
  const showAnswerButton = document.getElementById("show-answer");
  const assignPointsButton = document.getElementById("assign-points");
  const timerDisplay = document.getElementById("time-remaining");
  const scores = document.querySelectorAll(".score");
  const questionImage = document.getElementById("question-image");  // Add this line

  let activeQuestion = null;
  let timer = null;

  const categories = ["Pakistani City", "Dramaaa", "Guess the Song", "Who is the Star?", "Movies", "Who's kid did this?"];

  const questions = [
    [
      { question: "", answer: "Lahore", points: 100, image: "images/lahore.jpeg" },
      { question: "", answer: "Karachi", points: 200, image: "images/karachi .jpeg" },
      { question: "", answer: "Islamabad", points: 300, image: "images/islamabad .jpeg" },
      { question: "", answer: "Peshawar", points: 400, image: "images/peshawar .jpeg" },
      { question: "", answer: "Faisalabad", points: 500,  image: "images/faislabad.jpeg" },
    ],
    [
      { question: "Kashaf, a tough and ambitious girl from a poor background, and Zaroon, a privileged and charming guy, initially clash but eventually fall in love after understanding each other's struggles.", answer: "Zindagi Gulzar Hai", points: 100 },
      { question: "Arsal and Jiya, cousins who can't stand each other, are forced to marry but, over time, find themselves falling in love while navigating family drama and hilarious situations.", answer: "Suno Chanda", points: 200 },
      { question: "Danish, a devoted husband, faces betrayal when his wife Mehwish chooses wealth over love, leaving him to rebuild his life from heartbreak.", answer: "Mere Paas Tum Ho", points: 300 },
      { question: "Behroz’s choice to marry for love instead of family approval creates a rift in his family, which his children, Wali and Faraah, must heal years later, leading to a journey of love and forgiveness.", answer: "Diyar-e-Dil", points: 400 },
      { question: "Momin, a successful filmmaker, reconnects with his childhood love, Momina, and embarks on a spiritual journey to rediscover his faith and true purpose in life.", answer: "Alif", points: 500 }
    ],
    [
      { question: "Guess the song....", answer: "Pasoori - Coke Studio", points: 100 },
      { question: "Guess the song....", answer: "You are my Soniya - Khabi Khushi Khabi Gham", points: 200 },
      { question: "Guess the song....", answer: "Deewangi Deewangi - Om Shanti Om ", points: 300 },
      { question: "Guess the song....", answer: "Mehendi Laga Ke Rakhna - Dilwale Dulhania Le Jayenge", points: 400 },
      { question: "Guess the song....", answer: "Main Yahaan Hoon - Veer Zara ", points: 500 },
    ],
    [
      { question: "", answer: "Bushra Ansari", points: 100, image: "images/ba.jpeg"},
      { question: "", answer: "Sehar Khan", points: 200, image: "images/sk.jpeg" },
      { question: "", answer: "Sadaf Kanwal", points: 300, image: "images/sk.png"},
      { question: "", answer: "Zaviyar Nauman Ijaz", points: 400, image: "images/zni.jpeg" },
      { question: "", answer: "Mikaal Zulfiqar", points: 500, image: "images/mz.png" },
    ],
    [
      { question: "Which movie features the famous song \"Tum Hi Ho?\"", answer: "Aashiqui 2", points: 100 },
      { question: "Who was the main actor in Maula Jatt?", answer: "Fawad Khan and Mahira Khan", points: 200 },
      { question: "Name 3 movies where Shahrukh Khan and Kajol acted in together? ", answer: "Baazigar, Kabhi Khushi Kabhie Gham, Kuch Kuch Hota Hai, Dilwale ,My Name Is Khan", points: 300 },
      { question: "Which Bollywood actress played the role of \"Poo\" in Kabhi Khushi Kabhie Gham?", answer: "Kareena Kapoor", points: 400 },
      { question: "Name 2 Bollywood movies where Aamir Khan plays the role of a teacher.", answer: "Taare Zameen Par, 3 Idiots", points: 500 },
    ],
    [
      { question: "Whose kid has gotten in the most car accidents?", answer: "Roohi Aunty", points: 100},
      { question: "Who's kid has broken two arms? ", answer: "Moniza Aunty", points: 200},
      { question: "Who's kid broke someones jaw with a cricket bat?", answer: "Afsheen Aunty", points: 300},
      { question: "Who snuck out of the house at 3am to go to popeyes?", answer: "Moniza AUnty", points: 400},
      { question: "Who got a parking ticket and did not tell their parents?", answer: "Afsheen Aunty", points: 500},
    ],
  ]


  // Render the board
  const headerRow = board.insertRow();
  categories.forEach((category) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = category;
    headerRow.appendChild(headerCell);
  });

  for (let i = 0; i < 5; i++) {
    const row = board.insertRow();
    for (let j = 0; j < categories.length; j++) {
      const cell = row.insertCell();
      cell.textContent = questions[j][i].points;
      cell.dataset.categoryIndex = j;
      cell.dataset.questionIndex = i;
      cell.classList.add("question");
    }
  }

  // Handle question click
  board.addEventListener("click", (e) => {
    if (e.target.classList.contains("question")) {
      const categoryIndex = e.target.dataset.categoryIndex;
      const questionIndex = e.target.dataset.questionIndex;

      activeQuestion = questions[categoryIndex][questionIndex];

      questionTitle.textContent = activeQuestion.question;
      correctAnswerDisplay.style.display = "none";
      showAnswerButton.style.display = "inline-block";
      timerDisplay.textContent = 60;
       // Display the image associated with the question
      if (activeQuestion.image) {
        questionImage.src = activeQuestion.image;
        questionImage.style.display = "block"; // Show image if it exists
      } else {
        questionImage.style.display = "none"; // Hide image if no image exists
      }

      modal.style.display = "block";

      let timeLeft = 60;
      clearInterval(timer);
      timer = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
          clearInterval(timer);
          alert("Time's up!");
        }
      }, 1000);

      e.target.classList.add("disabled");
      e.target.classList.remove("question");
    }
  });

  showAnswerButton.addEventListener("click", () => {
    correctAnswerDisplay.textContent = `Answer: ${activeQuestion.answer}`;
    correctAnswerDisplay.style.display = "block";
    showAnswerButton.style.display = "none";
  });

  assignPointsButton.addEventListener("click", () => {
    const team = prompt("Which team gets the points? (1-4)");
    const teamScore = document.querySelector(`.score[data-team="${team}"]`);

    if (teamScore) {
      teamScore.textContent =
        parseInt(teamScore.textContent) + activeQuestion.points;
    }
    modal.style.display = "none";
  });
});
