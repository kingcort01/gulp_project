var i = 0;

function init(){
		
	for(var x = 0; x <= 99; x++){

		console.log("This is number : ", x * i);

		if(x % 2 == 0){

			i++;

		}

	}

}

init();