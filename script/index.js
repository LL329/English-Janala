const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelword = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}
  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);

      clickBtn.classList.add("active");
      displayWord(data.data);
    });
};
const displayWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    // alert("No Word Detected");
    wordContainer.innerHTML = `
     <div class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla">
     <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-2xl font-medium text-gray-400  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-white rounded-xl shadow-lg py-10 px-5 space-y-5 text-center">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া জাইনি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div>
                <p class="text-2xl font-semibold font-bangla">"${word.meaning ? word.meaning : " অর্থ পাওয়া জাইনি"} / ${word.pronunciation ? word.pronunciatiion : "Pronunciation পাওয়া জাইনি"}"</p>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]" ><i class="fa-solid fa-circle-info"></i></button>

                    <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        </div>
    
    `;
    wordContainer.append(card);
  });
};
const displayLesson = (lessons) => {
  // 1. get the contianer and empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get every lessons
  for (let lesson of lessons) {
    // 3.creat element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-brands fa-leanpub"></i> Lesson-${lesson.lessonName}-${lesson.level_no} </button>
    
    `;
    // 4.Append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();

// video 5 -> 9.14
