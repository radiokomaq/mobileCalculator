import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ElemOperationState {
  value1: number;
  value2: number;
  typeOperatoin: string;
  inputValue: string;
  result: number;
}

const initialState: ElemOperationState = {
  value1: 0,
  typeOperatoin: '',
  inputValue: '0',
  value2: 0,
  result: 0
};

const craftResult = (result: string) => {
  const sanitizedExpression = result.replace(/[^-()\d/*+.]/g, '');
  return eval(sanitizedExpression);
}
function isFractional(number: number) {
  return number !== Math.floor(number);
}

const elemOperationSlice = createSlice({
  name: "elemOperation",
  initialState,
  reducers: {
    setElementValue: (state, action: PayloadAction<number>) => {
      if (!state.typeOperatoin) {
        state.value1 = Number(`${state.value1}${action.payload}`);
        state.inputValue = state.inputValue === '0' || state.inputValue === '-0'
          ? String(state.inputValue.charAt(0) === '-' ? '-' + action.payload : action.payload)
          : String(`${state.inputValue}${action.payload}`);
      } else {
        state.value2 = Number(`${state.value1}${action.payload}`);
        state.result = 0;
        state.inputValue += action.payload;
      }
    },
    setTypeOperatios: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case '=': {
          state.result = craftResult(state.inputValue)
          state.inputValue = String(state.result);
          break;
        }
        case 'x²': {
          state.inputValue = String(craftResult(state.inputValue) ** 2);
          break;
        }
        case '√x': {
          state.inputValue = String(Math.sqrt(craftResult(state.inputValue)));
          break;
        }
        case '%': {
          const match = state.inputValue.match(/(\d*\.?\d*)[^0-9]*$/);
          const matchBefor = state.inputValue.match(/(\d+)\s*[-+*/]\s*\d+\s*$/);
          if (match && matchBefor) {
            state.inputValue = state.inputValue.replace(/(\d*\.?\d*)[^0-9]*$/, String((parseFloat(match[0]) * parseFloat(matchBefor[1])) / 100));
          }
          break
        }
        case '1/x': {
          state.inputValue = String(1 / (craftResult(state.inputValue)));
          break;
        }
        case 'CE': {
          state.inputValue = String(0);
          state.typeOperatoin = '';
          break;
        }
        case 'C':
        case 'DEL': {
          if (state.inputValue.length == 1) {
            state.inputValue = '0';
          } else {
            state.inputValue = state.inputValue.substring(0, state.inputValue.length - 1);
          }
          break;
        }
        case ',': {
          const match = state.inputValue.match(/(\d*\.?\d*)[^0-9]*$/)!;
          const operators = ['*', '+', '-', '/'];
        console.log('resulT :',parseFloat(match[0]));
        if (!isFractional(parseFloat(match[0])) || !operators.some(op => state.inputValue.endsWith(op))) {

            if (state.inputValue.endsWith('.')) {
              state.inputValue = state.inputValue.slice(0, -1);
            } else {
              state.inputValue += '.'
            }
          }  
          break;
        }
        case '+/-': {
          state.inputValue = state.inputValue.charAt(0) === '-' ? state.inputValue.slice(1) : '-' + state.inputValue;
          break;
        }
        default: {
          state.typeOperatoin = action.payload;
          state.inputValue += action.payload;
          break;
        }
      }

    },
    setInputChange: (state, action: PayloadAction<string>) => {
      console.log('inputChanhe');
      state.inputValue = action.payload
    }

  },
});

export const { setElementValue, setTypeOperatios, setInputChange } = elemOperationSlice.actions;
export default elemOperationSlice.reducer;



