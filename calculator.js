
$('.gradePercent').on('input', function(){
	if($(this).hasClass("gradeOutOf")){
		var upper = $(this).siblings(".gradePercent").val();
		var lower = $(this).val()
	} else {
		var upper = $(this).val()
		var lower = $(this).siblings(".gradePercent").val();
	}

	var validfields = true;
	var meanRes = "empty";
	var output = $(this).parent().siblings(".outputWrapper").find(".output");

	if((lower <= 0 && lower != "") || upper < 0){
		alert('invalid fields')
		validfields = false;
	}
	if(upper>lower && lower != ''){
		alert('mark is higher than total');
	}
	
	if(validfields){
		meanRes = (upper / lower)
	}
	if(upper != "" && lower != "" && validfields){
		output.text((meanRes * 100).toFixed(1) + "%")
	} else { output.text("")}
	console.log(meanRes)
	output.data("totalMean", meanRes)
	// if(grade2.value && gradeOutOf.value != ""){
 // 	   o2.dataset.total = (grade2.value / gradeOutOf.value)
 // 	   o2.innerHTML = o2.dataset.total * 100 + "%";
	// }
})

$('#meanBtn').on('click', function(){
	var mean = 0;
	var counter = 0;
	var upperField;
	var upperFieldEmpty;
	var upperFieldInvalid;
	var lowerField;
	var lowerFieldEmpty;
	var lowerFieldInvalid;
	var error;
	var invalid = false;
	var isEmpty = true;

	$(".output").each(function(){

		// These two variables evaluate to boolean values. TRUE if the field is not empty and FALSE if it is.
		
		upperField = $(this).parent().siblings(".gradePercentWrapper").find(".grade").val();
		lowerField = $(this).parent().siblings(".gradePercentWrapper").find(".gradeOutOf").val();
		upperFieldEmpty = upperField ==''; 
		lowerFieldEmpty = lowerField == '';
		upperFieldInvalid = upperField < 0;
		lowerFieldInvalid = lowerField <= 0 && lowerField != '';
		


		// Checks if the two fields are equal in Boolean value. If they are not the same, then it means ONE of the fields are empty.

		if(upperFieldEmpty != lowerFieldEmpty){

			error = true;
		
		}
		
		// Checks for a completely empty form

		if(!upperFieldEmpty && !lowerFieldEmpty){ 

			isEmpty = false;
		}


		if($(this).data("totalMean") >= 0) {
			mean = mean + $(this).data("totalMean")
			counter++
		} 

		if($(this).data("totalMean") == "empty"){
			invalid = true;
			
		}
	})

	if(invalid){
		alert("Invalid Field(s)")
	}
	else if(error){
		alert('Empty Field(s)')
	}
	else if(!isEmpty && !error && !invalid){

		mean = ((mean * 100) / counter).toFixed(1) + "/100"
		
		$('#score').text(mean)

	}
})

$('#weightedBtn').on('click', function(){
	var weightFinal = 0;
	var weightInstance = 0;
	var weightTotal = 0;
	var meanInstance = 0;
	var res;
	var weightFieldEmpty;
	var isEmpty = true;
	var upperFieldEmpty;
	var lowerFieldEmpty;
	var lowerFieldInvalid;
	var hasError = false;
	// get the mean stored * weight given for that instance 
	// +
	// get the mean stored * weight given for that instance 
	// +
	// get the mean stored * weight given for that instance 
	// +
	// get the mean stored * weight given for that instance 
	// /total weight 
	// = round(number) and add "/100"
	$(".gradeWeight").each(function(){
		weightFieldEmpty = $(this).val() == '';
		upperFieldEmpty = $(this).parent().siblings(".gradePercentWrapper").find(".grade").val() == '';
		lowerFieldEmpty = $(this).parent().siblings(".gradePercentWrapper").find(".gradeOutOf").val() == '';
		lowerFieldInvalid = $(this).parent().siblings(".gradePercentWrapper").find(".gradeOutOf").val() == 0;
	
		// if all input is filled, then not empty and is good to go
		if(!upperFieldEmpty && !lowerFieldEmpty && !weightFieldEmpty){
			isEmpty = false;
		}
		// check if both grade values are filled
		if (upperFieldEmpty != lowerFieldEmpty || upperFieldEmpty != weightFieldEmpty) {
			hasError = true;
		}

		if($(this).val() != ""){
			meanInstance = $(this).parent().siblings(".outputWrapper").find(".output").data("totalMean")
			weightInstance = meanInstance * parseFloat($(this).val())
			weightFinal = parseFloat($(this).val()) + weightFinal
			weightTotal = weightTotal + weightInstance
		}
	})

	// console.log(upperFieldEmpty + "upper field")
	// console.log(lowerFieldEmpty + "lower field")
	// console.log(isEmpty + "isEmpty")
	// console.log(error + "error")
	if(!isEmpty && !hasError){
		res = ((weightTotal / weightFinal) * 100).toFixed(1) + "/100"
		$('#score').text(res)
	} else {
		$('#score').text('')
		alert('Empty Weight Field(s)')
	}
})

//val() is for retrieving and setting input values 
//text() is for retrieving and setting non-input values