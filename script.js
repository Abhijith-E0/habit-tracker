let habits = JSON.parse(localStorage.getItem("habits")) || [];

// localStorage.clear()

function saveData(){
    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );
}



function addHabit(){

    let input = document.getElementById("habitInput");

    let text = input.value.trim();


    if(text === ""){
        return;
    }


    habits.push({

        name:text,
        completedDate:null

    });


    input.value="";

    saveData();

    displayHabits();

}




function displayHabits(){

    let list = document.getElementById("habitList");

    list.innerHTML="";


    habits.forEach((habit,index)=>{


        let completedToday =
        habit.completedDate === getTodayDate();



        let div=document.createElement("div");


        div.className="habit";


        div.innerHTML=`

        <span 
        class="${completedToday ? "completed":""}"
        onclick="completeHabit(${index})">

        ${habit.name}

        </span>


        <button 
        class="delete"
        onclick="deleteHabit(${index})">

        Delete

        </button>

        `;


        list.appendChild(div);


    });


    updateProgress();

}




function completeHabit(index){


    let today = getTodayDate();


    if(habits[index].completedDate === today){

        habits[index].completedDate = null;

    }
    else{

        habits[index].completedDate = today;

    }


    saveData();

    displayHabits();

}





function deleteHabit(index){

    habits.splice(index,1);

    saveData();

    displayHabits();

}





function updateProgress(){


    let total = habits.length;


    let completed = habits.filter(

        habit => habit.completedDate === getTodayDate()

    ).length;



    let percent = total === 0 ? 0 :

    Math.round((completed / total) * 100);



    document.getElementById("progressBar")
    .style.width = percent + "%";



    document.getElementById("progressText")
    .innerHTML =
    `${percent}% Completed`;

}





function getTodayDate(){

    let date = new Date();

    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

}



displayHabits();