import { PaperSegmentedButtonItem } from "@/types/shared";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

export const REACTPAPERBOOLLIST: ListItem[] = [
    {
        _id: '1',
        value: 'نعم'
    },
    {
        _id: '0',
        value: 'لا'
    }
]

export const REACTPAPERBOOLSEGMENTEDBUTTONS: PaperSegmentedButtonItem[] = [
    {
        value: '1',
        label: 'نعم'
    },
    {
        value: '0',
        label: 'لا'
    }
]

export const REACTPAPERBOOLSEGMENTEDBUTTONSWITHUNSPECIFEDOPTION= [
    ...REACTPAPERBOOLSEGMENTEDBUTTONS,
    {
        value: '',
        label: 'غير محدد'
    }
]