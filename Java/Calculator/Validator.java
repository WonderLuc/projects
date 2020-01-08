import java.util.Scanner;

public class Validator{
	 String str;
	 String[] numbers = new String[3];
	  
	 public Validator(String intNum ){
		 str = intNum;
		 numbers[0] = str.split(" ")[0];
		 numbers[1] = str.split(" ")[1];
		 numbers[2] = str.split(" ")[2];
	 } 
		 // Проверяем корректность введенных данных
	public boolean isValid() {
		
		try{//Проверяем на введение строки не длинее , чем x + y
			if(numbers.length < str.split(" ").length ){throw new Exception("Too many values");}
			// Проверяем на возможность проведения операции 
			switch (numbers[1]){
			case "+":
				break;
			case "-":
				break;
			case "*":
				break;
			case "/":
				break;
			default:
				throw new Exception("Not valid operation");
		}
		//Проверяем являются ли числа римскими 
		if ( (this.romanianNumbers(numbers[0]) != 0) && (this.romanianNumbers(numbers[2]) != 0)){	
				}
		// Проверяем являются ли числа целоцисленными 
		else if( ( numbers[0].length() <3 && this.isDigit(numbers[0])) && ( numbers[2].length() <3 && this.isDigit(numbers[2])) ){ 
			// Проверяем не больше ли они 10 
		    if ( (Integer.parseInt(numbers[0]) < 11) && (Integer.parseInt(numbers[2]) < 11)  ){
		    } else{
		    throw new Exception("Not valid value");
		}
			
			}
		else{
		    throw new Exception("Not valid value");
		}
			
	} catch (Exception e){
		System.err.println(e.getMessage());
		return false;
		
			}
		//Если запись валидна возвращает true
		return true;
	}
	// Соотносим римские цифры с арабскими и проверяем , что они не больше 10
	public  int romanianNumbers (String num){
		String number = num;
		int result = 0;
		switch (number){
			case "I":
			result = 1;
				break;
			case "II":
			result = 2;
				break;
			case "III":
			result = 3;
				break;
			case "IV":
			result = 4;
				break;
			case "V":
			result = 5;
				break;
            case "VI":
			result = 6;
				break;	
			case "VII":
			result = 7;
				break;
			case "VIII":
			result = 8;
				break;	
			case "IX":
			result = 9;
				break;	
			case "X":
			result = 10;
				break;					
							
	}
	return result;
	}
	// Метод для проверки возможности преобразования введенного значения не римской цифры
	public boolean isDigit(String num) throws NumberFormatException{
	    try{
	        Integer.parseInt(num);
	        return true;
	    }catch( NumberFormatException e){
	        return false;
	    }
	    
	}
	
	public static void main(String[] args){
	try{
		Scanner in = new Scanner(System.in);
		for( int i = 0; i == 0;){
			System.out.println("Please input your example for calculation: ");
		    String userInput = in.nextLine();			
			Validator call = new Validator(userInput);
			boolean check = call.isValid();
			if(!check){break;}
		Calculator operate = new Calculator(userInput);
			System.out.println("Result:");
			operate.converter();
			System.out.println(operate.operation());
			System.out.println("---------");
		}
	} catch( Exception e){
	System.err.println("Bad data inputed");}
	
	    
	}
}

