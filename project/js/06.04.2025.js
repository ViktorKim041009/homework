let num1, num2, sign, result=NaN;

num1=Number (prompt("Введите первое число","0"));
num2=Number (prompt("Введите второе число","0"));
sign=prompt("Введите действие (+,-,*,./)","+")

switch(sign) {
    case "+":
        result = num1 + num2;
        break;
        
    case "-":
        result = num1 - num2;
        break;
        
    case "*":
        result = num1 * num2;
        break;
     case "":
        result = num1 / num2; 
        break;
}
if (isNaN(result)){
    alert("Некорректный ввод!");
} else{
    alert(`Ответ: ${result}`)
}