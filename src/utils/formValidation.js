export function minLengthValidation(inputData, minLenght) {
   const { value } = inputData;

   removeClassErrorSuccess(inputData);

   if(value.length >= minLenght) {
      inputData.classList.add('input-success');
      return true;
   } else if(value.length < minLenght && value !== "") {
      inputData.classList.add("input-error")
      return false;
   }
}

export function emailValidation(inputData) {
   // eslint-disable-next-line no-useless-escape
   const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   const { value } = inputData;

   removeClassErrorSuccess(inputData);

   const resultValidation = emailValid.test(value);

   if(resultValidation){
      inputData.classList.add('input-success');
      return true;
   }else{
      inputData.classList.add("input-error")
      return false;
   }
}


function removeClassErrorSuccess(inputData) {
   inputData.classList.remove("input-success");
   inputData.classList.remove("input-error");

}