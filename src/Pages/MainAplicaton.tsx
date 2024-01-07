import React, { FC, useState } from 'react';
import { setElementValue,setTypeOperatios,setInputChange } from '../store/elemOperation/elemOperation';
import { useAppDispatch } from '../store/store';
import { useAppSelector } from '../store/hooks/hooks';


const MainApplication: FC = () => {

  let ButtonOperatrion: any[][] = [
    ['%', 'CE', 'C', 'DEL'],
    ['1/x', 'x²', '√x', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    ['+/-', 0, ',', '='],
  ];
  const dispatch = useAppDispatch()
  const elementValue = useAppSelector(state => state.elemOperation)

  const handleButtonClick = (row: number, col: number) => {
    console.log(ButtonOperatrion[row][col]);
    if (typeof ButtonOperatrion[row][col] === 'number'){
      console.log('c e[jlbnm kjjk');  
      dispatch(setElementValue(ButtonOperatrion[row][col]))
    }else{
      dispatch(setTypeOperatios(ButtonOperatrion[row][col]))
    }

  }
  const handleInputChange = (value:any) =>{
    dispatch(setInputChange(value))
    console.log(value);
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-rows-6 gap-4 rounded border-[white] bg-black border-2 p-2 relative">
        <div className='flex items-center justify-center'>
          <input className='bg-none h-full w-full p-2 text-right' defaultValue={elementValue.inputValue} value={elementValue.inputValue} onChange={(e) => handleInputChange(e.target.value)}/>
          </div>
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="grid grid-cols-4 gap-1 ">
            {[0, 1, 2, 3].map((col) => (
              <button
                key={col}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleButtonClick(row, col)}
              >
                {`${ButtonOperatrion[row][col]}`}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainApplication;