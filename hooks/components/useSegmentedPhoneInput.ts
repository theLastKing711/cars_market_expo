import useLoadingStore from "@/state/useLoadingStore";
import { useMemo, useRef, useState } from "react";



function useSegmentedNumberInput(length: number) {

    const [numbers, setNumbers] = useState([...new Array<string>(length).fill("")]);


    const [isFirstInputFocused, toggleIsFirstInputFocused] = useState(false);


    const firstInputRef = useRef<any[]>(null);

    const emptyNumbers = () => {
        const emptyNumbers = 
            numbers.map(item => "");
        setNumbers(emptyNumbers);
    }

    return {
        numbers,
        setNumbers,
        emptyNumbers,
        firstInputRef,
        isFirstInputFocused,
        toggleIsFirstInputFocused
    }

}


export function useSegmentedPhoneInput() {

    return useSegmentedNumberInput(9);

}

export function useSegmentedPasswordInput() {

    return useSegmentedNumberInput(4);

}
