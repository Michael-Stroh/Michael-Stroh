var today = new Date();
var nowMonth = today.getMonth();
var monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "October", "November", "December"];
var nowYear = today.getFullYear();

var getnowMonth = document.getElementById("monthJump");
var getnowYear = document.getElementById("yearJump");
var details = document.getElementById("yearAndMonth");



function prev() {

    nowMonth = ( nowMonth === 1 ) ? 11 : nowMonth - 1;
    nowYear = ( nowMonth === 1 ) ? nowYear - 1 : nowYear;
    displayCal( nowMonth, nowYear );
}


function next() {

    nowMonth = ( nowMonth + 1 ) % 12;
    nowYear = ( nowMonth === 12 ) ? nowYear + 1 : nowYear;
    displayCal( nowMonth, nowYear );
}


function todayMoment() {

    var todayMom = new Date();
    displayCal( todayMom.getMonth(), todayMom.getFullYear() );
}


function moveTo() {

    nowMonth = parseInt(getnowMonth.value);
    nowYear = parseInt(getnowYear.value);
    displayCal(nowMonth, nowYear);
}






function displayCal( m, y) {

    var dd = 1;
    var newDay = (new Date(y, m)).getDay();
    var lengthMonth = 32 - new Date(nowYear, nowMonth, 32).getDate();
    var tableName = document.getElementById("contentAddHere");






    tableName.innerHTML = "";
    details.innerHTML = monthsList[m] + " " + y;
    getnowMonth.value = m;
    getnowYear.value = y; 

    for ( var x = 1; x < 7; ++x ) {

        var row = document.createElement("tr");
        for ( var i = 1; i < 8; ++i ) {

            var temp = document.createElement("td");
            var words = document.createTextNode("");

            if ( ( x === 1 ) && (i < newDay) ){
           
                temp.appendChild(words);
              row.appendChild(temp);
            }
            else if ( dd > lengthMonth ) {

                break;
            }
            else {

                //console.log(nowYear);
                var temp = document.createElement("td");
               // var breakThis = document.createElement("br");
                var words = document.createTextNode(dd);           //this is where data will be entered
                temp.innerText += dd + "  " + populateEntry(dd, nowMonth+1, nowYear );
                
                if ( ( dd === today.getDate() ) && ( m === today.getMonth() ) && ( y === today.getFullYear() ) ) {

                    temp.classList.add("colourME");
                }

                //temp.appendChild(words);
                row.appendChild(temp);
                dd++;
            }
        }

        tableName.appendChild(row);
    }


}


function populateEntry( dayOn, monthOn, yearOn) {

    var fullYearTest;
    
    if ( ( dayOn < 10 ) && ( monthOn < 10 ) ) { 

       fullYearTest = yearOn + "-" + "0"+ monthOn + "-" + "0"+ dayOn;

    }
    else if ( ( dayOn < 10 ) && ( monthOn > 9 ) ) {

        fullYearTest = yearOn + "-" + monthOn + "-" + "0"+dayOn;
    }
    else if ( ( monthOn < 10 ) ) {

        fullYearTest = yearOn + "-" + "0" + monthOn + "-" +dayOn;
    }

    else {

        fullYearTest = yearOn + "-" + monthOn + "-" + dayOn;
    }



     





    //fullYearTest = "2019-01-31";



    var holdThis = "";
    var hideTitle;
    var req = new XMLHttpRequest();

    req.open("GET", "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie?api_key=e6ce0e893accab7c031fe1846105ced2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1", false);
    req.onload = function(){

        if ( ( req.readyState == 4 ) && ( req.status == 200 ) ) {		
                
            var values = JSON.parse(req.responseText);
        
            for ( var i = 0; i < 19; i++ ) {

                var apiDate =  values.results[i].release_date;
                var resultFrom = fullYearTest.localeCompare(apiDate); 

                if ( resultFrom === 0 ){

                    //console.log(values.results[i].title);
                    
                    holdThis =  values.results[i].title;
                
                    //console.log(holdThis + "  1");
                }
                //console.log(holdThis + "  2");
                
            }    

            //console.log(holdThis + "  3");
        }
        
    }
    //console.log(holdThis + "  5");

    req.send();
    return holdThis;
}







displayCal(nowMonth, nowYear);