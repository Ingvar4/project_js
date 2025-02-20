var language = {};
language['english'] = {
    map :  [["I","T","L","I","S","B","F","A","M","P","M"],
            ["A","C","Q","U","A","R","T","E","R","D","C"],
            ["T","W","E","N","T","Y","F","I","V","E","X"],
            ["H","A","L","F","B","T","E","N","F","T","O"],
            ["P","A","S","T","E","R","U","N","I","N","E"],
            ["O","N","E","S","I","X","T","H","R","E","E"],
            ["F","O","U","R","F","I","V","E","T","W","O"],
            ["E","I","G","H","T","E","L","E","V","E","N"],
            ["S","E","V","E","N","T","W","E","L","V","E"],
            ["T","E","N","S","E","O'","C","L","O","C","K"]],
    sentences : {
        default :  [ [[0,0,1],[0,3,4]] , [[9,5,10]] ],
    hours : {
        0 : [[[8,5,10]]],
        1 : [[[5,0,2]]],
        2 : [[[6,8,10]]],
        3 : [[[5,6,10]]] ,
        4 : [[[6,0,3]]],
        5 : [[[6,4,7]]] ,
        6 : [[[5,3,5]]],
        7 : [[[8,0,4]]] ,
        8 : [[[7,0,4]]],  
        9 : [[[4,7,10]]] ,    
        10: [[[9,0,2]]] ,
        11: [[[7,5,10]]],
        12: [[[8,5,10]]]
    },
    minutes :{
      5  : [ [2,6,9]   , [4,0,3] ],
      10 : [ [3,5,7]   , [4,0,3] ],
      15 : [ [1,2,8]   , [4,0,3] ],
      20 : [ [2,0,5]   , [4,0,3] ],
      25 : [ [2,0,9]   , [4,0,3] ],
      30 : [ [3,0,3]   , [4,0,3] ],
      35 : [ [2,0,9]   , [3,9,10]],
      40 : [ [2,0,5]   , [3,9,10]],
      45 : [ [1,2,8]   , [3,9,10]],
      50 : [ [3,5,7]   , [3,9,10] ],
      55 : [ [2,6,9]   , [3,9,10] ],
    },
    incrementHourAt : 29
    }
}

language['german'] = {
  map : [["E","S","M","I","S","T","E","F","Ü","N","F"],
        ["Z","E","H","N","Z","W","A","N","Z","I","G"],
        ["N","A","C","H","V","I","E","R","T","E","L"],
        ["V","O","R","N","A","C","H","H","A","L","B"],
        ["E","I","N","S","I","N","K","Z","W","E","I"],
        ["D","R","E","I","E","A","N","V","I","E","R"],
        ["F","Ü","N","F","N","I","S","E","C","H","S"],
        ["S","I","E","B","E","N","I","A","C","H","T"],
        ["N","E","U","N","Z","E","H","N","E","L","F"],
        ["Z","W","Ö","L","F","K","A","B","U","H","R"]],
  sentences : {
    default : [[[0,0,1], [0,3,5]], [[9,8,10]]],
    hours : {
        0 : [[[9,0,4]]],
        1 : [[[4,0,2]]  , [[4,0,3]] ],
        2 : [[[4,7,10]]],
        3 : [[[5,0,3]]] ,
        4 : [[[5,7,10]]],
        5 : [[[6,0,3]]] ,
        6 : [[[6,6,10]]],
        7 : [[[7,0,5]]] ,
        8 : [[[7,7,10]]],  
        9 : [[[8,0,3]]] ,    
        10: [[[8,4,7]]] ,
        11: [[[8,8,10]]],
        12: [[[9,0,4]]]
    },
    minutes :{
      5  : [ [0,7,10]  , [2,0,3] ],
      10 : [ [1,0,3]   , [2,0,3] ],
      15 : [ [2,4,10]  , [3,3,6] ],
      20 : [ [1,4,10]  , [3,3,6] ],
      25 : [ [0,7,10]  , [3,0,2]  , [3,7,10] ],
      30 : [ [3,7,10] ],
      35 : [ [0,7,10]  , [2,0,3] , [3,7,10] ],
      40 : [ [1,4,10]  , [3,0,2] ],
      45 : [ [2,4,10]  , [3,0,2] ],
      50 : [ [1,0,3]   , [3,0,2] ],
      55 : [ [0,7,10]  , [3,0,2] ],
    },
    incrementHourAt : 24
  }
};

var seconds = {
    0 : [[[2,1,3],[3,0],[3,4],[4,0],[4,3],[4,4],[5,0],[5,2],[5,4],[6,0],[6,1],[6,4],[7,0],[7,4],[8,1,3]]],
    1 : [[[2,2],[3,1],[3,2],[4,2],[5,2],[6,2],[7,2],[8,1,3]]],
    2 : [[[2,1,3],[3,0],[3,4],[4,4],[5,3],[6,2],[7,1],[8,0,4]]],
    3 : [[[2,0,4],[3,3],[4,2],[5,3],[6,4],[7,0],[7,4],[8,1,3]]],
    4 : [[[2,3],[3,2],[3,3],[4,1],[4,3],[5,0],[5,3],[6,0,4],[7,3],[8,3]]],
    5 : [[[2,0,4],[3,0],[4,0,3],[5,4],[6,4],[7,0,0],[7,4],[8,1,3]]],
    6 : [[[2,2,3],[3,1],[4,0],[5,0,3],[6,0],[6,4],[7,0],[7,4],[8,1,3]]],
    7 : [[[2,0,4],[3,4],[4,3],[5,2],[6,1],[7,1],[8,1],]],
    8 : [[[2,1,3],[3,0],[3,4],[4,0],[4,4],[5,1,3],[6,0],[6,4],[7,0],[7,4],[8,1,3],]],
    9 : [[[2,1,3],[3,0],[3,4],[4,0],[4,4],[5,1,4],[6,4],[7,3],[8,1,2]]]
};



var wordClock = {
    letterMap 			: null,
  	
    prevSentence    : [],
    prevSecond      : null,
    language        : null,
    letters         : null,
  	
    state						: 0, // 0 = Normal Clock, 1 = Show Seconds + Minutes
  
    
  init : function(language){    
    this.letters = document.getElementById('letters');
    this.language = language;
    
    this.buildLetters();
    
		this.startClock();
  },
  
  startClock : function(){
       
    this.hideLetters(this.prevSentence);
    this.hideNumber(this.prevSecond);
       
    this.showMinutes();
    
    if (this.state == 0){
   	 	this.showText(); 
    }else{
    	this.showSeconds();
    }
  },
  
  switchState : function(state){
    if (state !== undefined){
    	this.state = state;
    }else{
    	this.state = ++this.state % 2;
    }
		this.startClock();
  },
  
  buildLetters : function(){
    //Clear Letters
    this.letters.innerHTML = "";
    
    // Create 2D Array to store the span elements.
    this.letterMap = [];
    for (var i=0;i<this.language.map.length;i++){
    	this.letterMap.push([]);
    }
    //"Draw" Letters
    for (var x=0;x<this.language.map.length;x++){
       for (var y=0;y<this.language.map[x].length;y++){
            var span = document.createElement('span');     
                span.innerHTML = this.language.map[x][y];
         		// Add the letter to the lettrMap
            this.letterMap[x].push(span);
            this.letters.appendChild(span);
       }
    } 
  },
  
  
  showText: function(){
    if (this.state !== 0)
      return;
    
    // Hide last Sentence
    this.hideLetters(this.prevSentence);
    
    
    var showClock = false;
    var plural = true;
    var hours = this.getHours();
    var minutes = this.getMinutes();
        
    var showArr = [];
        showArr.push(this.language.sentences.default[0]);
    
    if (minutes < 5){
        showClock = true;
        plural = false;
    }else{
        minutes -= minutes % 5;
        showArr.push(this.language.sentences.minutes[minutes]);
        if (minutes > this.language.sentences.incrementHourAt){
            // Increment hour
            hours = (hours+1) % 12;
        }
    }
      
    if (plural && (this.language.sentences.hours[hours].length === 2)){
      showArr.push(this.language.sentences.hours[hours][1])
    }else{
        showArr.push(this.language.sentences.hours[hours][0]);
    }
      
    if (showClock)
      showArr.push(this.language.sentences.default[1]);    
        
    this.showLetters(showArr);
    this.prevSentence = showArr;
      
    var that = this;
    		// Wait for the rest of the 5min.
        setTimeout(function(){that.showText();}, (5 - (this.getMinutes() % 5)) * 60000 - this.getSeconds()*1000 - this.getMilliseconds());
  },
  
  showMinutes : function(){
    var minutes = this.getMinutes() % 5;
    
    if (minutes === 0){
       this.hideMinutesDot(4);
    }else{
    	 this.showMinutesDot(minutes);
    }
          
    var that = this;
    setTimeout(function(){that.showMinutes();}, (60-this.getSeconds())*1000 - this.getMilliseconds());
  },
  
  showSeconds : function(){
      if (this.state != 1)
         return;
    
    	var seconds = this.getSeconds();
    
      this.hideNumber(this.prevSecond);       
    	this.showNumber(seconds);
    
    	this.prevSecond = seconds;
    	var that = this;
      setTimeout(function(){that.showSeconds();},1000-this.getMilliseconds());     
  },
  
  getHours : function(){
    var hour = (new Date()).getHours();
        return (hour > 11) ? hour - 12 : hour;
    },
  
  getMinutes : function(){
        return (new Date()).getMinutes(); 
    },
  
  getSeconds: function(){
      return  (new Date()).getSeconds(); 
  },
  getMilliseconds: function(){
      return  (new Date()).getMilliseconds(); 
  },
  hideNumber : function(number){  
    			if (number == undefined || number == null) return;
  		  	var tens = seconds[~~(number/10)];
        	var ones = seconds[(number % 10)];        	
          this.changeClassLetters(tens, "", 0);
        	this.changeClassLetters(ones, "", 6);
  },
  showNumber : function(number){  
        tens = seconds[~~(number/10)];
        ones = seconds[(number % 10)];
        this.changeClassLetters(tens, "light", 0);
        this.changeClassLetters(ones, "light", 6);
  },
  hideLetters : function(la){      
      this.changeClassLetters(la, "", 0);
  },
  showLetters : function(la){
      this.changeClassLetters(la, "light", 0);
  },
  hideMinutesDot : function(count){
  	this.changeClassMinutes(count, '');
  },
  showMinutesDot : function(count){
  	this.changeClassMinutes(count, 'light');
  },
  changeClassLetters: function(la, value, offset){ 
    for (var s=0;s<la.length;s++){
      for (var d=0;d<la[s].length;d++){
          var x = la[s][d][0];
          var y = la[s][d][1]+ offset;
          if (la[s][d].length === 3){
            var end = la[s][d][2]  + offset;
            for (var i=y;i<=end;i++){
              this.letterMap[x][i].className = value;
            }
          }else{
             this.letterMap[x][y].className = value;
          }
      }
    }    
  },
  changeClassMinutes : function(count, value){
      for (var i=0;i<count;i++){          
          document.getElementById("e"+i).className = value;
      }          
  } 
};

wordClock.init(language['english']);

$('#settings a').on('click', function(e){
  if (e.target.id == "state"){
      wordClock.switchState();
    	if (wordClock.state){
    			$(e.target).html("show text");
    	}else{
    			$(e.target).html("show seconds");      
      }
  }else{
 			wordClock.init(language[e.target.id]);
  }
  e.preventDefault();
});

var clock = $("#clock");
var buttons = $("#settings .button");

$('#settings').on("click", ".button", function(e){
	var target = $(e.target);
  buttons.removeClass("selected");
  target.toggleClass("selected");
  clock.css({backgroundColor:    target.css("backgroundColor")});
});