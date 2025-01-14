export function buildEmptyObject<T extends Record<string, string|string[]>>(obj: any): T
{
    const typedObject: T = 
        Object.entries(obj).map( ([key, value])  => {
            const x = {} as any;
            if(typeof value == 'string')
                x[key] = ''
            else 
                x[key] = [];
            
            return x;
        }) as any as T;

    return typedObject;
}

export function buildQueryParamsString<T,K extends keyof T = keyof T>(params: {key: K, value: string|string[]}[]) {
    
    const stringQueryParm = params.reduce((prev, {key: currentKey, value: currentValue}, index) => {

        const currentKeyAsString = currentKey as string; 

        if(typeof currentValue !== "string")
        {
            const query = currentValue.reduce(
                (prevArray, currentArrayItem) => {
                    if(index == 0)
                    {
                        
                        if(prev == "")
                        {
                            return `${prev}?${currentKeyAsString}[]=${currentArrayItem}`;
                        }

                        return `${prev}&${currentKeyAsString}[]=${currentArrayItem}`;
                    }

                    return `${prevArray}&${currentKeyAsString}[]=${currentArrayItem}`;
                }
                , 
                ""
            );

            return query;
        }

        if(prev == "" && currentValue != "")
        {
            return `?${currentKeyAsString}=${currentValue}`;
        }

        if(prev == "" && currentValue == "")
        {
            return prev;
        }

        if(prev != "" && currentValue != "")
        {
            return `${prev}&${currentKeyAsString}=${currentValue}`;
        }
        
        return prev;

    }, "");

    return stringQueryParm;

}